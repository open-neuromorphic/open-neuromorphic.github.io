FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04

WORKDIR /app

COPY . .

RUN apt update && apt install -y git wget python3 python3-pip python3-dev cmake build-essential

RUN pip3 install --upgrade "jax[cuda11_pip]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html

RUN pip3 install torch torchvision torchaudio

RUN pip3 install -r ./requirements.txt

RUN ["chmod","+x","./run_benchmarks.sh"]

CMD [ "./run_benchmarks.sh", "16" ]
