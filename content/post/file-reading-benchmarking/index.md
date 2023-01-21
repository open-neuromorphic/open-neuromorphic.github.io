---
title: "Reading events from disk, fast"
date: 2023-01-11
description: "Reduce loading times and disk footprint drastically. "
draft: true
image: file_read_benchmark.png
tags: ["file encoding", "events"]
---

## Data formats for event-based data

In contrast to png/jpg for images, there is no standard format for events. When streaming data from an event camera, we get millions of tuples of microsecond timestamps, x/y coordinates and polarity indicators per second that look something like this:

    [(11718661,  762, 147, 1) (11718665,  833, 184, 1)
     (11718669, 1161,  72, 1) (11718674, 1110, 100, 0)
     (11718679, 1073,  23, 1) (11718684, 1134,  56, 1)
     (11718688,  799, 304, 0) (11718691,  391, 289, 0)
     (11718694,  234, 275, 1) (11718699,  512, 335, 1)]


With the emergence of event-based sensors, likewise came numerous ways how to store the data. A straightforward idea is to resort to existing packages such as hdf5 and numpy. When training spiking neural networks, file reading speed is a bottleneck we need to keep in mind. As the spatial resolution of event cameras grows, we receive more and more events per second! Training on bigger datasets means that we want to keep in mind the file reading speed of our data. Here we list the results of our benchmark of different file type encodings and software frameworks that can decode files. 

![benchmark](file_read_benchmark.png)

The file size depends on the encoding, whereas the reading speed depends on the particular implementation of how files are read. In terms of file size, we can see that numpy doesn't use any compression whatsoever, resulting in some 1.7GB file for our sample data. Prophesee's [evt3](https://docs.prophesee.ai/stable/data/encoding_formats/evt3.html) format achieves the best compression by cleverly encoding differences in timestamps. In terms of reading speed, numpy is the fastest as it doesn't deal with any compression on disk. Unzipping the compressed events from disk on the other hand using h5py is by far the slowest. Using [Expelliarmus](https://github.com/open-neuromorphic/expelliarmus) and the [evt2](https://docs.prophesee.ai/stable/data/encoding_formats/evt2.html) file format, we get very close to numpy reading speeds while at the same time only using a fourth of the disk space. This becomes particularly important for larger datasets which can easily reach some 3-4TB when encoded in an inefficient file format. 

## Prophesee encoding formats

Prophesee used three main encodings for their data: DAT, EVT2 and EV3. 

### DAT

![DAT format](dat-format.png)

The [DAT](https://docs.prophesee.ai/stable/data/file_formats/dat.html) format encodes an event to a 64 bits word, divided in the following way (following Little Endian (LE) ordering):
* bits 31-0 (**32** bits) are dedicated to the **timestamp**. Hence, each DAT recording can store at most **1h12m** long.
* bits 45-32 (**14** bits) are allocated for the **x address** of the event.
* bits 59-46 (**14** bits) are allocated for the **y address** of the event.
* bits 63-60 (**4** bits) are dedicated to the **polarity** of the event.

It is evident that the data is not compressed but simply stored in a binary format. One might say that the description does not follow the picture provided in the documentation, but this is the actual format when reading 64 bits at time from the binary file on a LE machine. Check the code [here](https://github.com/open-neuromorphic/expelliarmus/blob/cc9fbf1f53bfccd75c920e37d4ed94aa5aec3b1b/expelliarmus/src/dat.c#L136).

The C++ code needed to decode such an event is the following:

```c
/* Function that decodes a DAT event to a (ts, x, y, p) tuple.
 *
 * @param[in]   buff    64 bits buffer read from the DAT file.
 * @param[out]  ts      64 bits timestamp.
 * @param[out]  x       16 bits x address.
 * @param[out]  y       16 bits y address.
 * @param[out]  p       8 bit polarity.
 */
void decode_event(
    const uint64_t buff, 
    int64_t& ts, 
    int16_t& x, 
    int16_t& y, 
    uint8_t& p
    ) {
    const uint64_t mask_32b = 0xFFFFFFFF; 
    const uint32_t mask_14b = 0x3FFF; 
    const uint32_t mask_4b = 0xF; 

    const uint32_t upper_32b = (buff >> 32); // Upper 32 bits.
    const uint32_t lower_32b = (buff & mask_32b); // Lower 32 bits.

    ts = lower_32b; // Timestamp.
    x = upper & mask_14b; // X address.
    y = (upper >> 14) & mask_14b; // Y address
    p = (upper >> 28) & mask_4b; // Polarity.

    return; 
}
```

### EVT2

Here things get interesting. For [EVT2](https://docs.prophesee.ai/stable/data/encoding_formats/evt2.html), each event is encoded to **32** bits words. In particular, two kinds of events are used: `CD_OFF` and `CD_ON`, respectively associated to events with **negative** and **positive** polarity.

A CD event is structured in the following way: 

```c
/* 
 *          4 bits          6 bits      11 bits     11 bits
 *  ---------------------------------------------------------
 * | Event type (on/off) | Timestamp | X address | Y address |
 *  ---------------------------------------------------------
 */
```

* the first 4 bits are the event type. One might see this as the value of the polarity bit.
* then, 6 bits are dedicated to the timestamp. However, the full resolution time stamp is given by this merged with the **upper 28 bits** passed in another event, called `TIME HIGH`, as it is shown in the following: 

![EVT2 timestamp encoding](evt2-timestamp.jpg)

Hence, the **lower 6 bits** are passed during a `CD_*` event, while the **upper 28 bits** are passed during a `TIME HIGH` event, which is structured in the following way: 

```c
/* 
 *       4 bits                    28 bits
 *  --------------------------------------------------------
 * | Time high code |             Timestamp                 |
 *  --------------------------------------------------------
 */

```

Since the lower 6 bits change **more frequently** than the upper one, many events can be encoded in `CD_*` ones before sending out a new `TIME_HIGH` reference. 

Probably the reader would like to see some code, and here it comes:

```c
/* Function that decodes an EVT2 event to a (ts, x, y, p) tuple.
 *
 * @param[in]   buff    32 bits buffer read from the DAT file.
 * @param[out]  ts      64 bits timestamp.
 * @param[out]  x       16 bits x address.
 * @param[out]  y       16 bits y address.
 * @param[out]  p       8 bit polarity.
 */
void decode_event(
    const uint32_t buff, 
    int64_t& ts, 
    int16_t& x, 
    int16_t& y, 
    uint8_t& p
    ) {
    const uint32_t mask_28b = 0xFFFFFFF; 
    const uint32_t mask_11b = 0x7FF; 
    const uint32_t mask_6b = 0x3F; 
    const uint32_t mask_4b = 0xF; 

    static uint64_t ts_high = 0; // Static so that ts_high value is 
                                 // remembered the next time the 
                                 // function is called.
    
    uint8_t evt_type = (buff >> 28) & mask_4b; 

    switch (evt_type) {
        case 0x0: // CD_OFF
            p = 0; 
        case 0x1: // CD_ON
            p = 1; 
            ts = (ts_high << 28) | ((buff >> 22) & mask_6b); 
            x = (buff >> 11) & mask_11b; 
            y = buff & mask_11b; 
            break; 

        case 0x8: // TIME_HIGH
            ts_high = buff & mask_28b; 
    }

    return; 
}
```

The version that actually works is available [here](https://github.com/open-neuromorphic/expelliarmus/blob/cc9fbf1f53bfccd75c920e37d4ed94aa5aec3b1b/expelliarmus/src/evt2.c#L169).

### EVT3

With EVT3, compression is even higher: events are encoded to **16 bits** words. 
