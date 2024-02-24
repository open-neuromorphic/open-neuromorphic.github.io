# SNN library benchmarking

In data-generation.ipynb we benchmark forward and backward calls of different libraries. 

# Installation (using Docker)

1. Ensure you have Docker installed with NVIDIA runtime support
2. Build the docker container by running `./build.sh`
3. Run `./bench.sh` to do the benchmark
    * Plots should automatically be generated in the present directory

If something goes wrong, follow the steps in the docker container and the `docker/run_benchmarks.sh` manually

# Installation (DEPRECATED)
Start with creating a new Conda environment. Use Python 3.10 in order to use torch.compile (3.11 not supported in Aug 2023)
```
conda create -n frameworks python=3.10 pip
conda activate frameworks
```
Then install PyTorch (adjust for your CUDA version). Instructions available [here](https://pytorch.org/get-started/locally/)
```
conda install pytorch torchvision torchaudio pytorch-cuda=11.7 -c pytorch -c nvidia
```
Install the benchmarked frameworks from PyPI
```
pip install -r requirements.txt
```
At the time of testing (02/08/2023), SpikingJelly v0.0...14 contains a [bug](https://github.com/fangwei123456/spikingjelly/issues/401) in the latest CuPy implementation, so you'll have to install from source. Hopefully they'll release v0.....15 soon.
https://github.com/fangwei123456/spikingjelly

You'll also need to [install CuPy](https://docs.cupy.dev/en/stable/install.html) to enable it as a backend.

In addition I installed Lava-dl via Conda after the pip install
```
conda install lava-dl -c conda-forge
```

# Rules of adding benchmarks
1. The implementation you're benchmarking must be in the library's docs. 

# Docker

The following commands will build the docker image, generate the figures and copy them to this folder.
`./bench.sh` takes the batch size as its first argument.

```
./build.sh
./bench.sh 32
```
