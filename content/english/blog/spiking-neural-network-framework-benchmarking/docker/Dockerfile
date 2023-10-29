FROM pytorch/pytorch:2.1.0-cuda11.8-cudnn8-devel

WORKDIR /app

COPY . .

RUN pip3 install --upgrade "jax[cuda11_local]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html

RUN pip3 install norse spyx tonic snntorch rockpool cupy-cuda11x

RUN apt update && apt install -y git wget

RUN ["chmod","+x","./run_benchmarks.sh"]

CMD [ "./run_benchmarks.sh", "16" ]
