---
title: "Reading events from disk, fast"
date: 2023-01-30
description: "Reduce loading times and disk footprint drastically. "
draft: false
image: file_read_benchmark.png
tags: ["file encoding", "events", "event camera", "compression"]
---

## Data formats for event-based data

When recording a video using a conventional camera, you record all the frames and only then compress the stream for storage in post-processing, for example through frame difference encoding. This is a major reason why your GB-sized raw video can shrink to MBs easily when using video codecs such H.264. 

In contrast to conventional cameras, event cameras only record changes in illumination rather than absolut brightness, and therefore output compressed data to begin with. That would mean that the amount of data is a lot less than from conventional cameras, right? Well, whereas conventional cameras record at a constant clock rate of maybe 25Hz, an event camera captures changes at a rate of Mhz. That means that the data rate is a lot higher in contrast to conventional cameras. When streaming data from an event camera, we get millions of tuples of microsecond timestamps, x/y coordinates and polarity indicators per second that look something like this:

    #  time, x, y, polarity
    [(18661,  762, 147, 1) 
     (18669, 1161,  72, 1) 
     (18679, 1073,  23, 0) 
     (18688,  799, 304, 0) 
     (18694,  234, 275, 1)]

So how can we store that data efficiently? 
A straightforward idea is to resort to existing packages such as hdf5 and numpy and store the arrays of events directly. This however is not the most efficient format possible. Event camera manufacturers have come up with new ways to encode event stream efficiently. Not only are we concerned about the size of event files on disk, but we also want to be able to read them back to memory as fast as possible! 
Because when training spiking neural networks using events, file reading speed is a bottleneck we need to keep in mind.  Training on bigger datasets means that we want to keep in mind the file reading speed of our data. Here we list the results of our benchmark of different file type encodings and software frameworks that can decode files.

<!-- As the spatial resolution of event cameras grows, we receive more and more events per second! -->
![Comparison among file size and read speed of different encodings and software tools.](file_read_benchmark.png)

The file size depends on the encoding, whereas the reading speed depends on the particular implementation/framework of how files are read. In terms of file size, we can see that numpy doesn't use any compression whatsoever, resulting in some 1.7GB file for our sample data. Prophesee's [evt3](https://docs.prophesee.ai/stable/data/encoding_formats/evt3.html) format achieves the best compression by cleverly encoding differences in timestamps. In terms of reading speed, numpy is the fastest as it doesn't deal with any compression on disk. Unzipping the compressed events from disk on the other hand using h5py is by far the slowest. Using [Expelliarmus](https://github.com/open-neuromorphic/expelliarmus) and the [evt2](https://docs.prophesee.ai/stable/data/encoding_formats/evt2.html) file format, we get very close to numpy reading speeds while at the same time only using a fourth of the disk space. This becomes particularly important for larger datasets which can easily reach some 3-4TB when encoded in an inefficient file format. 

## Authors
* [Gregor Lenz](https://lenzgregor.com) [to be continued by @Gregor].
* [Fabrizio Ottati](https://fabrizio-ottati.dev) is a Ph.D. student in the HLS Laboratory of the Department of Electronics and Communications, Politecnico di Torino. His main interests are event-based cameras, digital hardware design and neuromorphic computing. He is one of the maintainers of two open source projects in the field of neuromorphic computing, [Tonic](https://tonic.readthedocs.io) and [Expelliarmus](https://expelliarmus.readthedocs.io), and one of the founders of [Open Neuromorphic](https://open-neuromorphic.org).
