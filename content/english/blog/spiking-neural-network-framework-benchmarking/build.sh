#!/bin/bash

docker rm snn-bench
docker rmi snn-bench
docker build ./docker --progress=plain -t snn-bench