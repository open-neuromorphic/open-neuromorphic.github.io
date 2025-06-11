FROM nvidia/cuda:12.2.2-devel-ubuntu22.04

RUN apt update && apt install -y git wget python3 python3-pip python3-dev cmake build-essential

WORKDIR /app

COPY . .

# Lava requires a venv, so we have to 
#  1. install lava
#  2. activate venv
#  3. install dependencies ¯\_(ツ)_/¯ 
RUN pip3 install git+https://github.com/fangwei123456/spikingjelly.git
RUN pip3 install poetry
RUN git clone https://github.com/lava-nc/lava-dl.git && \
    cd lava-dl && \
    poetry config virtualenvs.in-project true && \
    poetry install && \
    source /app/lava-dl/.venv/bin/activate && \
    pip3 install --upgrade "jax[cuda11_pip]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html && \
    pip3 install torch torchvision torchaudio && \
    pip3 install -r ./requirements.txt

CMD [ "./run_benchmarks.sh", "16" ]
