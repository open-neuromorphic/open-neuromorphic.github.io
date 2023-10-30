FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04

WORKDIR /app

COPY . .

RUN apt update && apt install -y git wget python3 python3-pip

RUN pip3 install --upgrade "jax[cuda11_local]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html

RUN pip3 install torch==2.0.0 torchvision==0.15.1 torchaudio==2.0.1 --index-url https://download.pytorch.org/whl/cu118

RUN pip3 install -r ./requirements.txt

RUN pip3 install git+https://github.com/lava-nc/lava-dl.git \
    && pip3 install git+https://github.com/fangwei123456/spikingjelly.git


RUN ["chmod","+x","./run_benchmarks.sh"]

CMD [ "./run_benchmarks.sh", "16" ]
