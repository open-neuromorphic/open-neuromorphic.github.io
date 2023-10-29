#!/bin/bash

docker rm snn-bench
docker rmi snn-bench
docker build ./docker -t snn-bench
docker run -it --gpus all --name snn-bench snn-bench
docker cp snn-bench:/app/data.csv .
docker cp snn-bench:/app/fig/ .
