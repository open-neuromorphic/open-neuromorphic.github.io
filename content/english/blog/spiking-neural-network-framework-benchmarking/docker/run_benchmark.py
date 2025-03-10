from utils import timeit, benchmark_framework, log_result

import argparse
import numpy as np
import os


def rockpool_jax_lif_jit_cpu():
    import rockpool
    from rockpool.nn.modules import LIFJax, LinearJax
    from rockpool.nn.combinators import Sequential
    import numpy as np
    import jax

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = Sequential(
            LinearJax(shape=(n_neurons, n_neurons)),
            LIFJax(n_neurons),
        )
        input_static = jax.numpy.array(np.random.rand(batch_size, n_steps, n_neurons))

        def apply(mod, input):
            output = mod(input)
            return output

        apply = jax.jit(apply, backend="cpu")

        def loss(mod, input):
            out, _, _ = mod(input)
            return out.sum()

        grad_loss = jax.jit(jax.grad(loss, allow_int=True), backend="cpu")

        # - Force compilation
        apply(model, input_static)
        grad_loss(model, input_static)

        return dict(
            model=model,
            jit_fwd=apply,
            jit_bwd=grad_loss,
            n_neurons=n_neurons,
            input=input_static,
        )

    def forward_fn(bench_dict):
        model, apply, input = (
            bench_dict["model"],
            bench_dict["jit_fwd"],
            bench_dict["input"],
        )
        bench_dict["output"] = apply(model, input)[0]
        return bench_dict

    def backward_fn(bench_dict):
        model, loss, input = (
            bench_dict["model"],
            bench_dict["jit_bwd"],
            bench_dict["input"],
        )
        loss(model, input)

    benchmark_title = f"Rockpool jax CPU accel.<br>v{rockpool.__version__}"

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def rockpool_jax_lif_jit_gpu():
    import rockpool
    from rockpool.nn.modules import LIFJax, LinearJax
    from rockpool.nn.combinators import Sequential
    import numpy as np
    import jax

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = Sequential(
            LinearJax(shape=(n_neurons, n_neurons)),
            LIFJax(n_neurons),
        )
        input_static = np.random.rand(batch_size, n_steps, n_neurons)

        def apply(mod, input):
            return mod(input)

        apply = jax.jit(apply, backend="gpu")

        def loss(mod, input):
            out, _, _ = mod(input)
            return out.sum()

        grad_loss = jax.jit(jax.grad(loss, allow_int=True), backend="gpu")

        # - Force compilation
        apply(model, input_static)
        grad_loss(model, input_static)

        return dict(
            model=model,
            jit_fwd=apply,
            jit_bwd=grad_loss,
            n_neurons=n_neurons,
            input=input_static,
        )

    def forward_fn(bench_dict):
        model, apply, input = (
            bench_dict["model"],
            bench_dict["jit_fwd"],
            bench_dict["input"],
        )
        bench_dict["output"] = apply(model, input)[0]
        return bench_dict

    def backward_fn(bench_dict):
        model, loss, input = (
            bench_dict["model"],
            bench_dict["jit_bwd"],
            bench_dict["input"],
        )
        loss(model, input)

    benchmark_title = f"Rockpool jax GPU accel.<br>v{rockpool.__version__}"

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def rockpool_jax_lif_jit_tpu():
    import rockpool
    from rockpool.nn.modules import LIFJax, LinearJax
    from rockpool.nn.combinators import Sequential
    import numpy as np
    import jax

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = Sequential(
            LinearJax(shape=(n_neurons, n_neurons)),
            LIFJax(n_neurons),
        )
        input_static = np.random.rand(batch_size, n_steps, n_neurons)

        def apply(mod, input):
            return mod(input)

        apply = jax.jit(apply, backend="tpu")

        def loss(mod, input):
            out, _, _ = mod(input)
            return out.sum()

        grad_loss = jax.jit(jax.grad(loss, allow_int=True), backend="tpu")

        # - Force compilation
        apply(model, input_static)
        grad_loss(model, input_static)

        return dict(
            model=model,
            jit_fwd=apply,
            jit_bwd=grad_loss,
            n_neurons=n_neurons,
            input=input_static,
        )

    def forward_fn(bench_dict):
        model, apply, input = (
            bench_dict["model"],
            bench_dict["jit_fwd"],
            bench_dict["input"],
        )
        bench_dict["output"] = apply(model, input)[0]
        return bench_dict

    def backward_fn(bench_dict):
        model, loss, input = (
            bench_dict["model"],
            bench_dict["jit_bwd"],
            bench_dict["input"],
        )
        loss(model, input)

    benchmark_title = f"Rockpool jax TPU accel.<br>v{rockpool.__version__}"

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def rockpool_native():
    import rockpool
    from rockpool.nn.modules import LIF, Linear
    from rockpool.nn.combinators import Sequential
    import numpy as np

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = Sequential(
            Linear(shape=(n_neurons, n_neurons)),
            LIF(n_neurons),
        )
        input_static = np.random.rand(batch_size, n_steps, n_neurons)

        model(input_static)

        return dict(model=model, n_neurons=n_neurons, input=input_static)

    def forward_fn(bench_dict):
        mod, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = mod(input_static)[0]
        return bench_dict

    def backward_fn(bench_dict):
        pass

    benchmark_title = f"Rockpool numpy<br>v{rockpool.__version__}"

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def rockpool_torch():
    import torch

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from rockpool.nn.modules import LIFTorch, LinearTorch
    from rockpool.nn.combinators import Sequential
    import rockpool

    benchmark_title = f"Rockpool torch<br>v{rockpool.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = Sequential(
            LinearTorch(shape=(n_neurons, n_neurons)),
            LIFTorch(n_neurons),
        ).to(device)
        input_static = torch.randn(batch_size, n_steps, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        output = model(input_static)[0]
        bench_dict["output"] = output
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def rockpool_exodus():
    import torch

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from rockpool.nn.modules import LIFExodus, LinearTorch
    from rockpool.nn.combinators import Sequential
    import rockpool

    benchmark_title = f"Rockpool EXODUS<br>v{rockpool.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = Sequential(
            LinearTorch(shape=(n_neurons, n_neurons)),
            LIFExodus(n_neurons),
        ).to(device)
        input_static = torch.randn(batch_size, n_steps, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        output = model(input_static)[0]
        bench_dict["output"] = output
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def rockpool_torch_cuda_graph():
    from rockpool.nn.modules import LIFTorch
    import torch

    class StepPWL(torch.autograd.Function):
        """
        Heaviside step function with piece-wise linear surrogate to use as spike-generation surrogate
        """

        @staticmethod
        def forward(
            ctx,
            x,
            threshold=torch.tensor(1.0),
            window=torch.tensor(0.5),
            max_spikes_per_dt=torch.tensor(2.0**16),
        ):
            ctx.save_for_backward(x, threshold)
            ctx.window = window
            nr_spikes = ((x >= threshold) * torch.floor(x / threshold)).float()
            # nr_spikes[nr_spikes > max_spikes_per_dt] = max_spikes_per_dt.float()
            clamp_bool = (nr_spikes > max_spikes_per_dt).float()
            nr_spikes -= (nr_spikes - max_spikes_per_dt.float()) * clamp_bool
            return nr_spikes

        @staticmethod
        def backward(ctx, grad_output):
            x, threshold = ctx.saved_tensors
            grad_x = grad_threshold = grad_window = grad_max_spikes_per_dt = None

            mask = x >= (threshold - ctx.window)
            if ctx.needs_input_grad[0]:
                grad_x = grad_output / threshold * mask

            if ctx.needs_input_grad[1]:
                grad_threshold = -x * grad_output / (threshold**2) * mask

            return grad_x, grad_threshold, grad_window, grad_max_spikes_per_dt

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        mod = LIFTorch(
            n_neurons, spike_generation_fn=StepPWL, max_spikes_per_dt=2.0**16
        ).cuda()
        input_static = torch.randn(batch_size, n_steps, n_neurons, device=device)

        # - Warm up the CUDA stream
        s = torch.cuda.Stream()
        s.wait_stream(torch.cuda.current_stream())
        with torch.cuda.stream(s):
            for i in range(3):
                y_pred, _, _ = mod(input_static)

        # - Capture the graph
        g = torch.cuda.CUDAGraph()

        with torch.cuda.graph(g):
            static_y_pred, _, _ = mod(input_static)

        return dict(
            model=g, input=input_static, n_neurons=n_neurons, output=static_y_pred
        )

    def forward_fn(bench_dict):
        model = bench_dict["model"]
        model.replay()
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    benchmark_title = f"LIFTorch using CUDA graph replay acceleration"

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def sinabs():
    import torch
    from torch import nn

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from sinabs.layers import LIF
    import sinabs

    benchmark_title = f"Sinabs<br>v{sinabs.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = nn.Sequential(
            nn.Linear(n_neurons, n_neurons),
            LIF(tau_mem=torch.tensor(10.0)),
        ).to(device)
        input_static = torch.randn(batch_size, n_steps, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        sinabs.reset_states(model)
        bench_dict["output"] = model(input_static)
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def sinabs_exodus():
    import torch
    from torch import nn

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from sinabs.exodus.layers import LIF
    import sinabs

    benchmark_title = f"Sinabs EXODUS<br>v{sinabs.exodus.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = nn.Sequential(
            nn.Linear(n_neurons, n_neurons),
            LIF(tau_mem=torch.tensor(10.0)),
        ).to(device)
        input_static = torch.randn(batch_size, n_steps, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        sinabs.reset_states(model)
        bench_dict["output"] = model(input_static)
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def norse():
    import torch
    from torch import nn

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from norse.torch.module import LIFBoxCell, LIFBoxParameters
    from norse.torch import SequentialState
    import norse

    benchmark_title = f"Norse<br>v{norse.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        p = LIFBoxParameters(
            tau_mem_inv=torch.tensor([100.0], device="cuda"),
            v_leak=torch.tensor([0.0], device="cuda"),
            v_th=torch.tensor([1.0], device="cuda"),
            v_reset=torch.tensor([0.0], device="cuda"),
            alpha=torch.tensor([100.0], device="cuda"),
        )
        model = SequentialState(
            nn.Linear(n_neurons, n_neurons),
            LIFBoxCell(p),
        )
        model = torch.compile(model, mode="reduce-overhead")
        model = model.to(device)
        input_static = torch.randn(n_steps, batch_size, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        # output.sum().backward() # JIT compile everything
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        torch.compiler.cudagraph_mark_step_begin()
        model, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = model(input_static)[0]
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def snntorch():
    import torch
    from torch import nn

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    import snntorch

    benchmark_title = f"snnTorch<br>v{snntorch.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        class Model(nn.Module):
            def __init__(self, beta: float = 0.95):
                super().__init__()
                self.fc = nn.Linear(n_neurons, n_neurons)
                self.lif = snntorch.Leaky(beta=beta)
                self.mem = self.lif.init_leaky()

            def forward(self, x):
                output = []
                mem = self.mem
                for inp in x:
                    cur = self.fc(inp)
                    spk, mem = self.lif(cur, mem)
                    output.append(spk)
                return torch.stack(output)

        model = Model()
        # model = torch.compile(model, mode="max-autotune")
        model = model.to(device)
        input_static = torch.randn(n_steps, batch_size, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = model(input_static)
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


# mix of https://spikingjelly.readthedocs.io/zh_CN/latest/activation_based_en/basic_concept.html#step-mode
# and https://github.com/fangwei123456/spikingjelly/blob/master/spikingjelly/activation_based/examples/rsnn_sequential_fmnist.py
def spikingjelly():
    import torch
    from torch import nn

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from spikingjelly.activation_based import neuron, surrogate, functional, layer

    benchmark_title = f"SpikingJelly PyTorch<br>v0.0.0.0.15"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        class Model(nn.Module):
            def __init__(self, tau=5.0):
                super().__init__()
                self.model = nn.Sequential(
                    layer.Linear(n_neurons, n_neurons),
                    neuron.LIFNode(
                        tau=tau, surrogate_function=surrogate.ATan(), step_mode="m"
                    ),
                )

            def forward(self, x):
                functional.reset_net(self.model)
                return self.model(x)

        model = Model().to(device)
        input_static = torch.randn(n_steps, batch_size, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = model(input_static)
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def spikingjelly_cupy():
    import torch
    from torch import nn

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    from spikingjelly.activation_based import neuron, surrogate, functional, layer

    benchmark_title = f"SpikingJelly CuPy<br>v0.0.0.0.15"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        class Model(nn.Module):
            def __init__(self, tau=5.0):
                super().__init__()
                self.model = nn.Sequential(
                    layer.Linear(n_neurons, n_neurons),
                    neuron.LIFNode(
                        tau=tau, surrogate_function=surrogate.ATan(), step_mode="m"
                    ),
                )
                functional.set_backend(self.model, backend="cupy")

            def forward(self, x):
                functional.reset_net(self.model)
                return self.model(x)

        model = Model().to(device)
        input_static = torch.randn(n_steps, batch_size, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = model(input_static)
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def lava():
    import torch

    torch.cuda.set_per_process_memory_fraction(0.7, device=None)
    import lava.lib.dl.slayer as slayer

    benchmark_title = f"Lava DL<br>v0.4.0.dev0"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        neuron_params = {
            "threshold": 0.1,
            "current_decay": 1,
            "voltage_decay": 0.1,
            "requires_grad": True,
        }
        # slayer.block automatically add quantization.
        # They can be disabled by setting pre_hook_fx=None
        model = slayer.block.cuba.Dense(
            neuron_params, n_neurons, n_neurons, pre_hook_fx=None
        ).to(device)
        input_static = torch.randn(batch_size, n_neurons, n_steps).to(device)
        with torch.no_grad():
            model(input_static)
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = model(input_static)
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def spyx_full():
    os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"] = ".3"
    import spyx
    import spyx.nn as snn
    import jax
    import jax.numpy as jnp
    import jmp
    import haiku as hk

    policy = jmp.get_policy("full")

    hk.mixed_precision.set_policy(hk.Linear, policy)
    hk.mixed_precision.set_policy(snn.LIF, policy)

    benchmark_title = f"Spyx full-precision v{spyx.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        def Model(x):
            x = hk.BatchApply(hk.Linear(n_neurons, with_bias=False))(x)

            core = hk.DeepRNN(
                [
                    snn.LIF((n_neurons,), activation=spyx.axn.Axon(spyx.axn.arctan())),
                ]
            )

            # static unroll for maximum performance
            spikes, V = hk.dynamic_unroll(
                core, x, core.initial_state(x.shape[0]), time_major=False, unroll=5
            )

            return spikes, V

        input_static = jnp.ones(shape=(n_steps, batch_size, n_neurons), dtype=jnp.uint8)

        key = jax.random.PRNGKey(0)
        # Since there's nothing stochastic about the network, we can avoid using an RNG as a param!
        SNN = hk.without_apply_rng(hk.transform(Model))
        params = SNN.init(rng=key, x=input_static)

        @jax.jit
        def net_eval(weights, events):
            readout = SNN.apply(weights, events)
            traces, V_f = readout
            return traces.sum()

        model = (net_eval, params)

        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        net_eval, params = model
        net_eval(params, input_static)
        bench_dict["output"] = input_static
        return bench_dict

    def backward_fn(bench_dict):
        input_static = bench_dict["input"]
        net_eval, params = bench_dict["model"]
        jax.grad(net_eval)(params, input_static)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


def spyx_half():
    os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"] = ".3"
    import spyx
    import spyx.nn as snn
    import jax
    import jax.numpy as jnp
    import jmp
    import haiku as hk

    policy = jmp.get_policy("half")

    hk.mixed_precision.set_policy(hk.Linear, policy)
    hk.mixed_precision.set_policy(snn.LIF, policy)

    benchmark_title = f"Spyx half-precision v{spyx.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        def Model(x):
            x = hk.BatchApply(hk.Linear(n_neurons, with_bias=False))(x)

            core = hk.DeepRNN(
                [
                    snn.LIF((n_neurons,), activation=spyx.axn.Axon(spyx.axn.arctan())),
                ]
            )

            # static unroll for maximum performance
            spikes, V = hk.dynamic_unroll(
                core, x, core.initial_state(x.shape[0]), time_major=False, unroll=5
            )

            return spikes, V

        input_static = jnp.ones(shape=(n_steps, batch_size, n_neurons), dtype=jnp.uint8)

        key = jax.random.PRNGKey(0)
        # Since there's nothing stochastic about the network, we can avoid using an RNG as a param!
        SNN = hk.without_apply_rng(hk.transform(Model))
        params = SNN.init(rng=key, x=input_static)

        @jax.jit
        def net_eval(weights, events):
            readout = SNN.apply(weights, events)
            traces, V_f = readout
            return traces.sum()

        model = (net_eval, params)

        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        net_eval, params = model
        net_eval(params, input_static)
        bench_dict["output"] = input_static
        return bench_dict

    def backward_fn(bench_dict):
        input_static = bench_dict["input"]
        net_eval, params = bench_dict["model"]
        jax.grad(net_eval)(params, input_static)

    return prepare_fn, forward_fn, backward_fn, benchmark_title


benchmarks = {
    "rockpool_torch": rockpool_torch,
    "rockpool_exodus": rockpool_exodus,
    "rockpool_native": rockpool_native,
    "rockpool_jax_cpu": rockpool_jax_lif_jit_cpu,
    "rockpool_jax_gpu": rockpool_jax_lif_jit_gpu,
    "rockpool_jax_tpu": rockpool_jax_lif_jit_tpu,
    "rockpool_torch_cuda_graph": rockpool_torch_cuda_graph,
    "sinabs": sinabs,
    "sinabs_exodus": sinabs_exodus,
    "norse": norse,
    "snntorch": snntorch,
    "spikingjelly": spikingjelly,
    "spikingjelly_cupy": spikingjelly_cupy,
    "lava": lava,
    "spyx_full": spyx_full,
    "spyx_half": spyx_half,
}

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("benchmark", choices=benchmarks.keys())
    parser.add_argument("batch_size")
    args = parser.parse_args()

    benchmark = benchmarks[args.benchmark]

    batch_size = int(args.batch_size)
    n_steps = 500
    n_layers = 1  # doesn't do anything at the moment
    device = "cuda"

    for n_neurons in [
        # 512,
        4096,
        8192,
        16384,
    ]:  #  1024, 2048, 4096, 8192, 16384,
        prepare_fn, forward_fn, backward_fn, bench_desc = benchmark()
        print("Benchmarking", bench_desc, "with n_neurons =", n_neurons)
        forward_times, backward_times = benchmark_framework(
            prepare_fn=prepare_fn,
            forward_fn=forward_fn,
            backward_fn=backward_fn,
            benchmark_desc=bench_desc,
            n_neurons=n_neurons,
            n_layers=n_layers,
            n_steps=n_steps,
            batch_size=batch_size,
            device=device,
        )

        if (
            bench_desc[:4] == "Spyx"
        ):  # Spyx uses grad which computes the forward and backward pass in one go, so we need to subtract here.
            backward_times = (
                np.array(backward_times).mean() - np.array(forward_times).mean()
            )
            memory = "nan"
        else:
            import torch

            memory = torch.cuda.max_memory_allocated()

        log_result(
            bench_desc,
            n_neurons,
            np.array(forward_times).mean(),
            np.array(backward_times).mean(),
            memory,
        )
