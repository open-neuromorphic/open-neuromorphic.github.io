from typing import Callable, Optional, List, Tuple
import warnings
from csv import writer

from time import time

def log_result(framework, neurons, forward, backward, memory):
    with open('data.csv', 'a') as f:
        w = writer(f)
        w.writerow([framework, neurons, forward, backward, memory])


def timeit(
    callable: Callable,
    min_runs: int = 3,
    max_runs: int = 5000,
    min_time: float = 2.0,
    warmup_calls: int = 1,
) -> List[float]:

    # - Warmup
    for _ in range(warmup_calls):
        callable()

    # - Take at least min_time seconds, at least min_runs runs
    exec_count = 0
    t_total = 0.0
    collected_times = []
    while ((t_total <= min_time) or (exec_count < min_runs)) and (
        exec_count < max_runs
    ):
        # - Time a single run
        t_start = time()
        callable()
        collected_times.append(time() - t_start)

        exec_count += 1
        t_total = sum(collected_times)

    return collected_times


def benchmark_framework(
    prepare_fn: Callable,
    forward_fn: Callable,
    backward_fn: Callable,
    benchmark_desc: Optional[str] = None,
    n_neurons: int = 512,
    n_layers: int = 4,
    n_steps: int = 500,
    batch_size: int = 10,
    device: str = "cpu",
) -> Tuple[List, List, List]:
    forward_times = []
    backward_times = []

    try:
        # - Prepare benchmark
        bench_dict = prepare_fn(
            batch_size=batch_size, 
            n_steps=n_steps, 
            n_neurons=n_neurons,
            n_layers=n_layers, 
            device=device
        )

        # - Forward pass
        forward_times.append(timeit(lambda: forward_fn(bench_dict)))
        bench_dict = forward_fn(bench_dict)
        assert bench_dict["output"].shape == bench_dict["input"].shape

        # - Backward pass
        backward_times.append(timeit(lambda: backward_fn(bench_dict)))

    except Exception as e:
        # - Fail nicely with a warning if a benchmark dies
        warnings.warn(
        f"Benchmark {benchmark_desc} failed with error {str(e)}."
        )

        # - No results for this run
        forward_times.append([])
        backward_times.append([])

    # - Build a description of the benchmark
    benchmark_desc = f"{benchmark_desc}; " if benchmark_desc is not None else ""
    benchmark_desc = f"{benchmark_desc}B = {batch_size}, T = {n_steps}"

    # - Return benchmark results
    return forward_times, backward_times
