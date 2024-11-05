#!/bin/bash

source /app/lava-dl/.venv/bin/activate

echo "running benchmarks with batch size $1"

echo "framework,neurons,forward,backward,memory" >data.csv

for benchmark in "rockpool_jax_cpu" "rockpool_native" "rockpool_torch" "rockpool_exodus" "rockpool_jax_tpu" "rockpool_torch_cuda_graph" "rockpool_jax_gpu" "sinabs" "sinabs_exodus" "norse" "snntorch" "spikingjelly" "spikingjelly_cupy" "lava" "spyx_full" "spyx_half"; do
    python3 ./run_benchmark.py $benchmark $1
done

python3 ./plot.py --batch_size $1

echo "done"

