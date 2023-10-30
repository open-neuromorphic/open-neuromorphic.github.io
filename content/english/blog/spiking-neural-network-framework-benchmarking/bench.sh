#!/bin/bash

docker rm snn-bench
if [[ "$S2" == "build" ]]; then
docker rmi snn-bench
docker build ./docker -t snn-bench
fi
docker run -it --gpus all --name snn-bench snn-bench ./run_benchmarks.sh $1
docker cp snn-bench:/app/data.csv .
docker cp snn-bench:/app/fig/ .
cp ./fig/* .
rm -fr fig
