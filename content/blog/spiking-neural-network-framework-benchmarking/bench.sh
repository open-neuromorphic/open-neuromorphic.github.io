#!/bin/bash

docker rm snn-bench
docker run -it --gpus all --name snn-bench snn-bench ./run_benchmarks.sh $1
docker cp snn-bench:/app/data.csv .
docker cp snn-bench:/app/fig/ .
cp ./fig/* .
rm -fr fig
