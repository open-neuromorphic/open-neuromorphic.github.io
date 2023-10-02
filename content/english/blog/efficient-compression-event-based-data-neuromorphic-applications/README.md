# File format benchmark

In this notebook and article we want to compare the size and reading speed of different files formats that handle events. The `plot-generation.ipynb` notebook contains the benchmarks. Please make sure to install all the required packages before running it using 

```
pip install -r requirements.txt
```

## Current benchmarks
The file format defines the compression factor and therefore file size on disk, as well as the speed with which it can be read to some extent, although that will be implementation-dependent. If we have no way of writing events to file in a particular format, events from that file need to be the source for all other formats (currently aedat4) which are generated afterwards.

| Format   | Framework   | Can write events |
|--------------|-----------|------------------|
| [evt2](https://docs.prophesee.ai/stable/data/encoding_formats/evt2.html)   |[Expelliarmus](https://github.com/open-neuromorphic/expelliarmus) |  &#9745;  |
| [evt3](https://docs.prophesee.ai/stable/data/encoding_formats/evt3.html) | [Expelliarmus](https://github.com/open-neuromorphic/expelliarmus)  | &#9745;  |
| [dat](https://docs.prophesee.ai/stable/data/file_formats/dat.html) | [Expelliarmus](https://github.com/open-neuromorphic/expelliarmus)  | &#9745;  |
| [dat](https://docs.prophesee.ai/stable/data/file_formats/dat.html) | [AEStream](https://github.com/norse/aestream)  | &#9744;  |
| [aedat4](https://gitlab.com/inivation/inivation-docs/-/blob/master/Software%20user%20guides/AEDAT_file_formats.md#aedat-40) | [AEDAT](https://github.com/neuromorphicsystems/aedat)   | &#9744;  |
| [eventstream](https://github.com/neuromorphic-paris/event_stream) | [loris](https://github.com/neuromorphic-paris/loris)  | &#9745;  |
| [numpy](https://numpy.org/) | [numpy](https://numpy.org/)  | &#9745;  |
| [hdf5](https://www.hdfgroup.org/solutions/hdf5/) | [h5py](https://github.com/h5py/h5py)  | &#9745;  |
