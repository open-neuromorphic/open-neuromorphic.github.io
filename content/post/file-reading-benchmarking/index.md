---
title: "Reading events from disk, fast"
date: 2023-01-30
description: "Reduce loading times and disk footprint drastically. "
draft: false
image: file_read_benchmark.png
tags: ["file encoding", "events", "event camera", "compression"]
---

# Efficient compression for event-based data

## Datasets grow larger in size
As neuromorphic algorithms tackle more complex tasks that are linked to bigger datasets, and event cameras mature to have higher spatial resolution, it is worth looking at how to encode that data efficiently when storing it on disk. To give you an example, Prophesee's latest automotive object detection dataset is some 3.4 TB in size for under 40h of recordings with a single camera.

## Event cameras record with fine-grained temporal resolution
In contrast to conventional cameras, event cameras output changes in illumination, which is already a form of compression. But the output data rate is still a lot higher compared to conventional cameras because of the microsecond temporal resolution that event cameras are able to record with. When streaming data from an event camera, we get millions of tuples of microsecond timestamps, x/y coordinates and polarity indicators per second that look something like this:

    #  time, x, y, polarity
    [(18661,  762, 147, 1) 
     (18669, 1161,  72, 1) 
     (18679, 1073,  23, 0) 
     (18688,  799, 304, 0) 
     (18694,  234, 275, 1)]

## File size vs reading speed trade-off
So how can we store such a list of events efficiently? 
A straightforward idea is to resort to formats such as hdf5 and numpy and store the arrays of events directly. But without exploiting any structure in the recorded data, those uncompressed formats end up having the largest file footprint. For our example automotive dataset, this would result in some 7-8 TB of data, which is undesirable. Event camera manufacturers have come up with ways to encode event streams more efficiently. Not only are we concerned about the size of event files on disk, but we also want to be able to read them back to memory as fast as possible! 
In the following figure we plot the results of our benchmark of different file type encodings and software frameworks that can decode files.

![Comparison among file size and read speed of different encodings and software tools.](file_read_benchmark.png)

Ideally, we want to be close to the origin where we read fast and compression is high. The file size depends on the encoding, whereas the reading speed depends on the particular implementation/framework of how files are read. In terms of file size, we can see that numpy doesn't use any compression whatsoever, resulting in some 1.7GB file for our sample recording. Prophesee's [evt3](https://docs.prophesee.ai/stable/data/encoding_formats/evt3.html) and the generic lossless [brotli](https://github.com/google/brotli) formats achieve the best compression. In terms of reading speed, numpy is the fastest as it doesn't deal with any compression on disk. Unzipping the compressed events from disk on the other hand using h5py is by far the slowest. Using [Expelliarmus](https://github.com/open-neuromorphic/expelliarmus) and the [evt2](https://docs.prophesee.ai/stable/data/encoding_formats/evt2.html) file format, we get very close to numpy reading speeds while at the same time only using a fourth of the disk space. 

## Capable frameworks
The authors of this post have released [Expelliarmus](https://github.com/open-neuromorphic/expelliarmus) as a lightweight, well-tested, pip-installable framework that can read and write different formats easily. If you're working with dat, evt2 or evt3 formats, why not give it a try? 

## Summary
When training spiking neural networks on event-based data, we want to be able to feed new data to the network as fast as possible. But given the high data rate of an event camera, the amount of data quickly becomes an issue itself. So we want to choose a good trade-off between a dataset size that's manageable and reading speed. We hope that this article will help future recorders of large-scale datasets to pick a good format. 

## Comments
The aedat4 file contains IMU events as well as change detection events, which increases the file size artificially in contrast to the other benchmarked formats.

## Authors
* [Gregor Lenz](https://lenzgregor.com).
* [Fabrizio Ottati](https://fabrizio-ottati.dev) is a Ph.D. student in the HLS Laboratory of the Department of Electronics and Communications, Politecnico di Torino. His main interests are event-based cameras, digital hardware design and neuromorphic computing. He is one of the maintainers of two open source projects in the field of neuromorphic computing, [Tonic](https://tonic.readthedocs.io) and [Expelliarmus](https://expelliarmus.readthedocs.io), and one of the founders of [Open Neuromorphic](https://open-neuromorphic.org).
* [Alexandre Marcireau](https://github.com/aMarcireau).
