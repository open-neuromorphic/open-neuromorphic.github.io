# SNN library benchmarking

In data-generation.ipynb we benchmark forward and backward calls of different libraries. 

# Installation
Start with creating a new Conda environment
```
conda create -n frameworks pip
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
SpikingJelly v0.0...14 contains a [bug](https://github.com/fangwei123456/spikingjelly/issues/401) in the latest CuPy implementation, so you'll have to install from source.

In addition I installed Lava-dl via Conda
```
conda install lava-dl -c conda-forge
```

# Rules of adding benchmarks
1. The implementation you're benchmarking must be in the library's docs. 