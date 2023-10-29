#!/bin/bash

pip3 install -r ./requirements.txt

wget https://github.com/lava-nc/lava-dl/releases/download/v0.4.0/lava_dl-0.4.0.tar.gz
pip3 install ./lava_dl-0.4.0.tar.gz

echo "running benchmarks with batch size $1"

echo "framework,neurons,forward,backward,memory" >data.csv

for benchmark in "rockpool_torch" "rockpool_exodus" "sinabs" "sinabs_exodus" "norse" "snntorch" "spikingjelly" "spikingjelly_cupy" "lava" "spyx_full" "spyx_half"; do
    echo "running $benchmark benchmark"
    python3 ./run_benchmark.py $benchmark $1
done

echo "done"
