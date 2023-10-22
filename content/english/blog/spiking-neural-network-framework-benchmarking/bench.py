import torch
import torch.nn as nn
import numpy as np
from utils import timeit, benchmark_framework

import os
os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"] = ".3"
torch.cuda.set_per_process_memory_fraction(0.7, device=None)

def rockpool_torch():
    from rockpool.nn.modules import LIFTorch, LinearTorch
    from rockpool.nn.combinators import Sequential
    import rockpool

    benchmark_title = f"Rockpool<br>v{rockpool.__version__}"

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
    
    
    
def sinabs():
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
    from norse.torch.module.lif import LIF
    from norse.torch import SequentialState
    import norse

    benchmark_title = f"Norse<br>v{norse.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        model = SequentialState(
            nn.Linear(n_neurons, n_neurons),
            LIF(),
        )
        # model = torch.compile(model, mode="max-autotune")
        model = model.to(device)
        input_static = torch.randn(n_steps, batch_size, n_neurons).to(device)
        with torch.no_grad():
            model(input_static)
        # output.sum().backward() # JIT compile everything
        return dict(model=model, input=input_static, n_neurons=n_neurons)

    def forward_fn(bench_dict):
        model, input_static = bench_dict["model"], bench_dict["input"]
        bench_dict["output"] = model(input_static)[0]
        return bench_dict

    def backward_fn(bench_dict):
        output = bench_dict["output"]
        loss = output.sum()
        loss.backward(retain_graph=True)

    return prepare_fn, forward_fn, backward_fn, benchmark_title
    
    
def snntorch():
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
    from spikingjelly.activation_based import neuron, surrogate, functional, layer

    benchmark_title = f"SpikingJelly PyTorch<br>v0.0.0.0.15"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        class Model(nn.Module):
            def __init__(self, tau=5.0):
                super().__init__()
                self.model = nn.Sequential(
                    layer.Linear(n_neurons, n_neurons),
                    neuron.LIFNode(tau=tau, surrogate_function=surrogate.ATan(), step_mode='m'),
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
    from spikingjelly.activation_based import neuron, surrogate, functional, layer

    benchmark_title = f"SpikingJelly CuPy<br>v0.0.0.0.15"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        class Model(nn.Module):
            def __init__(self, tau=5.0):
                super().__init__()
                self.model = nn.Sequential(
                    layer.Linear(n_neurons, n_neurons),
                    neuron.LIFNode(tau=tau, surrogate_function=surrogate.ATan(), step_mode='m'),
                )
                functional.set_backend(self.model, backend='cupy')

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
    import lava.lib.dl.slayer as slayer

    benchmark_title = f"Lava DL<br>v0.4.0.dev0"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        neuron_params = {
                        'threshold'     : 0.1,
                        'current_decay' : 1,
                        'voltage_decay' : 0.1,
                        'requires_grad' : True,     
                    }
        # slayer.block automatically add quantization.
        # They can be disabled by setting pre_hook_fx=None
        model = slayer.block.cuba.Dense(neuron_params, n_neurons, n_neurons, pre_hook_fx=None).to(device)
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
    import spyx
    import spyx.nn as snn
    import jax
    import jax.numpy as jnp
    import jmp
    import haiku as hk
    
    policy = jmp.get_policy('full')

    hk.mixed_precision.set_policy(hk.Linear, policy)
    hk.mixed_precision.set_policy(snn.LIF, policy)

    benchmark_title = f"Spyx full-precision v{spyx.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        def Model(x):
    
            x = hk.BatchApply(hk.Linear(n_neurons, with_bias=False))(x)
            
            core = hk.DeepRNN([
                snn.LIF((n_neurons,), activation=spyx.axn.Axon(spyx.axn.arctan())),
            ])
    
            # static unroll for maximum performance
            spikes, V = hk.dynamic_unroll(core, x, core.initial_state(x.shape[0]), time_major=False, unroll=5)
        
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
    import spyx
    import spyx.nn as snn
    import jax
    import jax.numpy as jnp
    import jmp
    import haiku as hk
    
    policy = jmp.get_policy('half')

    hk.mixed_precision.set_policy(hk.Linear, policy)
    hk.mixed_precision.set_policy(snn.LIF, policy)

    benchmark_title = f"Spyx half-precision v{spyx.__version__}"

    def prepare_fn(batch_size, n_steps, n_neurons, n_layers, device):
        def Model(x):
    
            x = hk.BatchApply(hk.Linear(n_neurons, with_bias=False))(x)
            
            core = hk.DeepRNN([
                snn.LIF((n_neurons,), activation=spyx.axn.Axon(spyx.axn.arctan())),
            ])
    
            # static unroll for maximum performance
            spikes, V = hk.dynamic_unroll(core, x, core.initial_state(x.shape[0]), time_major=False, unroll=5)
        
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
    
batch_size = 96
n_steps = 500
n_layers = 1  # doesn't do anything at the moment
device = "cuda"
data = []


for benchmark in [spyx_half, spyx_full, spikingjelly_cupy, rockpool_torch, rockpool_exodus, sinabs, sinabs_exodus, snntorch, norse,]: # lava, spikingjelly
    for n_neurons in [512, 4096, 8192, ]: #  1024, 2048, 4096, 8192, 16384,
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

        if bench_desc[:4] == "Spyx": # Spyx uses grad which computes the forward and backward pass in one go, so we need to subtract here.
            backward_times = np.array(backward_times).mean() - np.array(forward_times).mean()

        data.append(
            [
                bench_desc,
                np.array(forward_times).mean(),
                np.array(backward_times).mean(),
                n_neurons,
            ]
        )



import pandas as pd

df = pd.DataFrame(data, columns=["framework", "forward", "backward", "neurons"])
df = df.melt(
    id_vars=["framework", "neurons"],
    value_vars=["forward", "backward"],
    var_name="pass",
    value_name="time [s]",
)
df.to_csv("data.csv")
 
