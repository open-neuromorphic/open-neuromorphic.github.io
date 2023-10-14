---
title: "Training Spiking Neural Networks Using Lessons from Deep Learning"
description: "Explore the future of deep learning and spiking neural networks. Learn from decades of research in deep learning, gradient descent, and neuroscience for biologically plausible spiking neural networks."
date: 2023-10-14
author: "Papers"
whee: "ok"
image: open-neuromorphic-thumbnail.png
math: true
---








{{< accordion title="Authors" >}}- Jason K. Eshraghian*
  - UC Santa Cruz
  - University of Michigan
  - jeshragh@ucsc.edu
- Max Ward
  - UWA 
  - Harvard University
- Emre Neftci
  - Forschungszentrum J\"ulich
  - RWTH Aachen
- Xinxin Wang
  - University of Michigan
- Gregor Lenz
  - SynSense
- Girish Dwivedi 
  - UWA
- Mohammed Bennamoun
  - UWA
- Doo Seok Jeong
  - Hanyang University
- Wei D. Lu*
  - University of Michigan
  - wluee@umich.edu
<p></p>{{< /accordion >}}

## Abstract

The brain is the perfect place to look for inspiration to develop more efficient neural networks. The inner workings of our synapses and neurons provide a glimpse at what the future of deep learning might look like. This paper serves as a tutorial and perspective showing how to apply the lessons learnt from several decades of research in deep learning, gradient descent, backpropagation and neuroscience to biologically plausible spiking neural neural networks. 

We also explore the delicate interplay between encoding data as spikes and the learning process; the challenges and solutions of applying gradient-based learning to spiking neural networks (SNNs); the subtle link between temporal backpropagation and spike timing dependent plasticity, and how deep learning might move towards biologically plausible online learning.
Some ideas are well accepted and commonly used amongst the neuromorphic engineering community, while others are presented or justified for the first time here. 

The fields of deep learning and spiking neural networks evolve very rapidly. We endeavour to treat this document as a \'dynamic' manuscript that will continue to be updated as the common practices in training SNNs also change.

A series of companion interactive tutorials complementary to this paper using our Python package, _snnTorch_, are also made available.\footnote{Link to interactive tutorials: <a href="https://snntorch.readthedocs.io/en/latest/tutorials/index.html">https://snntorch.readthedocs.io/en/latest/tutorials/index.html</a>.}


## Introduction 
Deep learning has solved numerous problems in computer vision<sup>[1](#line-1)</sup> <sup>[2](#line-10)</sup> <sup>[3](#line-19)</sup> <sup>[4](#line-27)</sup> <sup>[5](#line-36)</sup> <sup>[6](#line-353)</sup>, speech recognition<sup>[1](#line-52)</sup> <sup>[2](#line-211)</sup> <sup>[3](#line-61)</sup>, and natural language processing<sup>[1](#line-238)</sup> <sup>[2](#line-246)</sup> <sup>[3](#line-254)</sup> <sup>[4](#line-261)</sup> <sup>[5](#line-269)</sup>. Neural networks have been instrumental in outperforming world champions in a diverse range of games, from Go to Starcraft<sup>[1](#line-276)</sup> <sup>[2](#line-287)</sup>. They are now surpassing the diagnostic capability of clinical specialists in numerous medical tasks<sup>[1](#line-298)</sup> <sup>[2](#line-309)</sup> <sup>[3](#line-320)</sup> <sup>[4](#line-335)</sup>. But for all the state-of-the-art models designed every day, a Kaggle<sup>[1](#line-2010)</sup> contest for state-of-the-art energy efficiency would go to the brain, every time. A new generation of brain-inspired spiking neural networks (SNNs) is poised to bridge this efficiency gap.

The amount of computational power required to run top performing deep learning models has increased at a rate of 10$\times$ per year from 2012 to 2019<sup>[1](#line-220)</sup> <sup>[2](#line-381)</sup>. The rate of data generation is likewise increasing at an exponential rate. The backbone of OpenAI's ChatGPT language model, GPT-3, contains 175 billion learnable parameters, estimated to consume roughly 190,000~kWh to train<sup>[1](#line-346)</sup> <sup>[2](#line-371)</sup> <sup>[3](#line-388)</sup>.
Meanwhile, our brains operate within $\sim$12-20~W of power. This is in addition to churning through a multitude of sensory input, all the while ensuring our involuntary biological processes do not shut down<sup>[1](#line-403)</sup>. If our brains dissipated as much heat as state-of-the-art deep learning models, then natural selection would have wiped humanity out long before we could have invented machine learning. To be fair, none of the authors can emulate the style of Shakespeare, or write up musical guitar tabs with the same artistic flair of GPT-4.

<div class="flex items-center justify-center">{{< image src="figures/graphical-abstract-2.jpg" caption="Spiking neural networks (SNNs) have pervaded many streams of deep learning that are in need of low-power, resource-constrained, and often portable operation. The utility of SNNs even extends to the modeling of neural dynamics across individual neurons and higher-level neural systems." >}}</div>


### Neuromorphic Computing: A Quick Snapshot
Neuromorphic (\'brain-like') engineering strives to imitate the computational principles of the brain to drive down the energy cost of artificial intelligence systems. To replicate a biological system, we build on three parts:

1. **Neuromorphic sensors** that take inspiration from biological sensors, such as the retina or cochlear, and typically record _changes_ in a signal instead of sampling it at regular intervals. Signals are only generated when a change occurs, and the signal is referred to as a \'spike'.
1. **Neuromorphic algorithms** that learn to make sense of spikes are known as spiking neural networks (SNNs). Instead of floating point values, SNNs work with single-bit, binary activations (spikes) that encode information over time, rather than in an intensity. As such, SNNs take advantage of low-precision parameters and high spatial and temporal sparsity.\footnote{A subtle caveat: it is possible for an SNN to accept non-spiking, continuous-valued input, and train the model to find the most efficient spike-based representation.}
1. These models are designed with power-efficient execution on specialized **neuromorphic hardware** in mind. Sparse activations reduce data movement both on and off a chip to accelerate neuromorphic workloads, which can lead to large power and latency gains when compared to the same task on conventional hardware.

Armed with these three components, neuromorphic systems are equipped to bridge the efficiency gap between today's and future intelligent systems.

What lessons can be learnt from the brain to build more efficient neural networks? Should we replicate the genetic makeup of a neuron right down to the molecular level<sup>[1](#line-411)</sup> <sup>[2](#line-227)</sup>? Do we look at the way memory and processing coalesce within neurons and synapses<sup>[1](#line-419)</sup> <sup>[2](#line-430)</sup>? Or should we aim to extract the learning algorithms that underpin the brain<sup>[1](#line-441)</sup>?
This paper hones in on the intricacies of training brain-inspired neuromorphic algorithms, ultimately moving towards the goal of harnessing natural intelligence to further improve our use of artificial intelligence.
SNNs can already be optimized using the tools available to the deep learning community. But the brain-inspired nature of these emerging sensors, neuron models, and training methods are different enough to warrant a deep dive into biologically-inspired neural networks.

### Neuromorphic Systems in the Wild
The overarching aim is to combine artificial neural networks (ANNs), which have already proven their worth in a broad range of domains, with the potential efficiency of SNNs<sup>[1](#line-452)</sup>. 
So far, SNNs have staked their claim to a range of applications where power efficiency is of utmost importance.

<a href='#fig-abstract'>fig-abstract</a> offers a small window into the uses of SNNs, and their domain only continues to expand. Spiking algorithms have been used to implement low-power artificial intelligence algorithms across the medical, robotics, and mixed-reality domains, amongst many other fields. Given their power efficiency, initial commercial products often target Edge computing applications, close to where the data is recorded. 

In biosignal monitoring, nerve implants for brain-machine or biosignal interfaces have to pre-process information locally at minimum power and lack the bandwidths to transmit data for cloud computation. Work done in that direction using SNNs includes on-chip spike sorting<sup>[1](#line-2381)</sup> <sup>[2](#line-2389)</sup>, biosignal anomaly detection<sup>[1](#line-2343)</sup> <sup>[2](#line-2353)</sup> <sup>[3](#line-178)</sup> <sup>[4](#line-189)</sup> and brain-machine interfaces<sup>[1](#line-2397)</sup> <sup>[2](#line-2372)</sup>.
Beyond biomedical intervention, SNN models are also used in robotics in an effort to make them more human-like and to drive down the cost of operation<sup>[1](#line-2407)</sup> <sup>[2](#line-2417)</sup> <sup>[3](#line-200)</sup>. Unmanned aerial vehicles must also operate in low-power environments to extract as much value from lightweight batteries, and have benefited from using neuromorphic processors<sup>[1](#line-2442)</sup>.
Audio signals can be processed with sub-mW power consumption and low latency on neuromorphic hardware as SNNs provide an efficient computational mechanism for temporal signal processing<sup>[1](#line-2511)</sup>.

A plethora of efficient computer vision applications using spiking neural networks are reviewed in Ref.<sup>[1](#line-2362)</sup>. SNNs are equally suitable to track objects such as satellites in the sky for space situational awareness<sup>[1](#line-2323)</sup> <sup>[2](#line-2333)</sup>, scientific computing<sup>[1](#line-1142)</sup>, and have been researched to promote sustainable uses of artificial intelligence, such as in monitoring material strain in smart-buildings<sup>[1](#line-2451)</sup> and wind power forecasting in remote areas that face power delivery challenges<sup>[1](#line-2458)</sup>. At the 2018-19 Telluride Neuromorphic and Cognition Workshops, a neuromorphic robot was even built to play foosball!<sup>[1](#line-2489)</sup>

Beyond neuromorphic applications, SNNs are also used to test theories about how natural intelligence may arise, from the higher-level learning rules of the brain<sup>[1](#line-1327)</sup> and how memories are formed<sup>[1](#line-114)</sup>, down to lower-level neuronal and synaptic dynamics<sup>[1](#line-103)</sup>.

### Overview of Paper
The brain's neural circuitry is a physical manifestation of its neural algorithm; understanding one will likely lead to an understanding of the other. This paper will hone in on one particular aspect of neural models: those that are compatible with modern deep learning. <a href='#fig-tax'>fig-tax</a> provides an illustrated overview of the structure of this paper, and we will start from the ground up:

<div class="flex items-center justify-center">{{< image src="figures/fig_tax.png" caption="An overview of the paper structure." >}}</div>


*  In <a href='#sec-2'>sec-2</a>, we will rationalise the commonly accepted advantages of using spikes, and derive a spiking neuron model from basic principles.
*  These spikes will be assigned meaning in <a href='#sec-3'>sec-3</a> by exploring various spike encoding strategies, how they impact the learning process, and how objective and regularisation functions can be used to sway the spiking patterns of an SNN.
*  In <a href='#sec-4'>sec-4</a>, the challenges of training SNNs using gradient-based optimisation will be explored, and several solutions will be derived. These include defining derivatives at spike times and using approximations of the gradient.
*  In doing so, a subtle link between the backpropagation algorithm and the spike-timing-dependent plasticity (STDP) learning rule will emerge, and be used in the subsequent section to derive online variants of backprop that move towards biologically plausible learning mechanisms (<a href='#fig-tax'>fig-tax</a>).

 The aim is to combine artificial neural networks (ANNs), which have already proven their worth in a broad range of domains, with the potential efficiency of SNNs<sup>[1](#line-452)</sup>. 

## From Artificial to Spiking Neural Networks  
<div class="flex items-center justify-center">{{< image src="figures/fig1_p2.png" caption="Neurons communicate via spikes. (a) Diagram of a neuron. (b) Measuring an action potential propagated along the axon of a neuron. Fluctuating subthreshold voltages are present in the soma, but become severely attenuated over distances beyond 1~mm<sup>[1](#line-561)</sup>. Only the action potential is detectable along the axon. (c) The neuron's spike is approximated with a binary representation. (d) Event-Driven Processing. Only dynamic segments of a scene are passed to the output (\'1'), while static regions are suppressed (\'0'). (e) Active Pixel Sensor and Dynamic Vision Sensor." >}}</div>

The neural code refers to how the brain represents information, and while many theories exist, the code is yet to be cracked. There are several persistent themes across these theories, which can be distilled down to _\'the three S's'_: spikes, sparsity, and static suppression. These traits are a good starting point to show _why_ the neural code might improve the efficiency of ANNs. Our first observation is:

> 1. **Spikes:** Biological neurons interact via _spikes_

Neurons primarily process and communicate with action potentials, or `\'spikes'', which are electrical impulses of approximately 100~mV in amplitude. In most neurons, the occurrence of an action potential is far more important than the subtle variations of the action potential<sup>[1](#line-561)</sup>. Many computational models of neurons simplify the representation of a spike to a discrete, single-bit, all-or-nothing event (<a href='#fig-1'>fig-1</a>(a-c)). Communicating high-precision activations between layers, routing them around and between chips is an expensive undertaking. 
Multiplying a high-precision activation with a high-precision weight requires conversion into integers, decomposition of multiplication into multiple additions which introduces a carry propagation delay. On the other hand, a spike-based approach only requires a weight to be multiplied by a spike (\'1'). This trades the cumbersome multiplication process with a simple memory read-out of the weight value.

Despite the activation being constrained to a single bit, spiking networks are vastly different from binarised neural networks. What actually matters is the \emph{timing} of the spike. Time is not a binarised quantity, and can be implemented using clock signals that are already distributed across a digital circuit. After all, why not use what is already available?

> 2. **Sparsity:** Biological neurons spend most of their time at rest, silencing a majority of activations to _zero_ at any given time

Sparse tensors are cheap to store. The space that a simple data structure requires to store a matrix grows with the number of entries to store. In contrast, a data structure to store a sparse matrix only consumes memory with the number of non-zero elements. Take the following list as an example:

\begin{center}
     \fontfamily{courier}\selectfont
 \colorbox{light-gray}{[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]}
\end{center}

Since most of the entries are zero, we could save time by writing out only the non-zero elements as would occur in run-length encoding (indexing from zero):

\begin{center}
    _`\'1 at position 10; 1 at position 20''_
\end{center}

For example, <a href='#fig-1'>fig-1</a>(c) shows how a single action potential can be represented by a sparsely populated vector. The sparser the list, the more space can be saved.

> 3. **Static Suppression (a.k.a., event-driven processing):** The sensory system is more responsive to changes than to static input

The sensory periphery features several mechanisms that promote neuron excitability when subject to dynamic, changing stimuli, while suppressing its response to static, unchanging information. In retinal ganglion cells and the primary visual cortex, the spatiotemporal receptive fields of neurons promote excitable responses to regions of spatial contrast (or edges) over regions of spatial invariance<sup>[1](#line-639)</sup>. Analogous mechanisms in early auditory processing include spectro-temporal receptive fields, which cause neurons to respond more favourably to changing frequencies in sound over static frequencies<sup>[1](#line-550)</sup>. These processes occur on short timescales (milliseconds), while perceptual adaptation has also been observed on longer timescales (seconds)<sup>[1](#line-1099)</sup> <sup>[2](#line-1110)</sup> <sup>[3](#line-568)</sup>, causing neurons to become less responsive to prolonged exposure to fixed stimuli. 

A real-world engineering example of event-driven processing is 
the dynamic vision sensor (DVS), or the \'silicon retina', which is a camera that reports changes in brightness and stays silent otherwise (<a href='#fig-1'>fig-1</a>(d-e))<sup>[1](#line-597)</sup> <sup>[2](#line-608)</sup> <sup>[3](#line-617)</sup> <sup>[4](#line-2169)</sup> <sup>[5](#line-543)</sup>. This also means that each pixel activates independently of all other pixels, as opposed to waiting for a global shutter to produce a still frame. The reduction of active pixels leads to huge energy savings when compared to conventional CMOS image sensors. This mix of low-power and asynchronous pixels allows for fast clock speeds, giving commercially available DVS cameras a microsecond temporal resolution without breaking a sweat<sup>[1](#line-628)</sup>. The difference between a conventional frame-based camera and an event-based camera is illustrated in <a href='#fig-event'>fig-event</a>.

<div class="flex items-center justify-center">{{< image src="figures/event_based.png" caption="Functional difference between a conventional frame-based camera (above) and an event-based camera/silicon retina (below). The former records the scene as a sequence of images at a fixed frame rate. It operates independently of activity in the scene and can result in motion blur due to the global shutter. The silicon retina's output is directly driven by visual activity in the scene, as every pixel reacts to a change in illuminance." >}}</div>


### Spiking Neurons
ANNs and SNNs can model the same types of network topologies, but SNNs trade the artificial neuron model with a spiking neuron model instead (<a href='#fig-2'>fig-2</a>). Much like the artificial neuron model<sup>[1](#line-2116)</sup>, spiking neurons operate on a weighted sum of inputs. Rather than passing the result through a sigmoid or ReLU nonlinearity, the weighted sum contributes to the membrane potential $U(t)$ of the neuron. If the neuron is sufficiently excited by this weighted sum, and the membrane potential reaches a threshold $\theta$, then the neuron will emit a spike to its subsequent connections. But most neuronal inputs are spikes of very short bursts of electrical activity. It is quite unlikely for all input spikes to arrive at the neuron body in unison (<a href='#fig-2'>fig-2</a>(c)). This indicates the presence of temporal dynamics that \'sustain' the membrane potential over time.

<div class="flex items-center justify-center">{{< image src="figures/fig2_p2.png" caption="Leaky Integrate-and-Fire (LIF) Neuron Model. (a) An insulating bilipid membrane separates the intracellular and extracellular medium. Gated ion channels allow charge carriers, such as Na$^+$, to diffuse through the membrane. (b) The capacitive membrane and resistive ion channels form an RC circuit. When the membrane potential exceeds a threshold $\theta$, a spike is generated. (c) Input spikes generated by $I_{\rm in}$ are passed to the neuron body via the dendritic tree. Sufficient excitation will cause spike emission at the output. (d) A simulation depicting the membrane potential $U(t)$ reaching the threshold, arbitrarily set to $\theta=0.5 V$, which generates output spikes." >}}</div>


These dynamics were quantified back in 1907<sup>[1](#line-463)</sup>. Louis Lapicque stimulated the nerve fiber of a frog leg using a hacked-together current source, and observed how long it took the frog leg to twitch based on the amplitude and duration of the driving current $I_{\rm in}$<sup>[1](#line-473)</sup>. He concluded that a spiking neuron coarsely resembles a low-pass filter circuit consisting of a resistor $R$ and a capacitor $C$, later dubbed the leaky integrate-and-fire (LIF) neuron (<a href='#fig-2'>fig-2</a>(b)). This holds up a century later: physiologically, the capacitance arises from the insulating lipid bilayer forming the membrane of a neuron. The resistance arises from gated ion channels that open and close, modulating charge carrier diffusion across the membrane (<a href='#fig-2'>fig-2</a>(a--b))<sup>[1](#line-484)</sup>. The dynamics of the passive membrane modeled using an RC circuit can be represented as:

$$  \tau\frac{dU(t)}{dt} = -U(t) + I\_{\rm in}(t)R  $$

where $\tau=RC$ is the time constant of the circuit. Typical values of $\tau$ fall on the order of 1-100 milliseconds. The solution of (\ref{eq:1}) for a constant current input is:

$$  U(t) = I\_{\rm in}R + [U\_0 - I\_{\rm in}R]e^{-\frac{t}{\tau}}  $$

\noindent which shows how exponential relaxation of $U(t)$ to a steady state value follows current injection, where $U_0$ is the initial membrane potential at $t=0$. To make this time-varying solution compatible with a sequence-based neural network, the forward Euler method is used in the simplest case to find an approximate solution to <a href='#eq-1'>eq-1</a>:

$$  U[t]=\beta U[t-1] + (1-\beta)I\_{\rm in}[t]  $$

where time is explicitly discretised, $\beta = e^{-1/\tau}$ is the decay rate (or \'inverse time constant') of $U[t]$, and the full derivation is provided in <a href='#app-a1'>app-a1</a>. 

In deep learning, the weighting factor of an input is typically a learnable parameter. Relaxing the physically viable assumptions made thus far, the coefficient of input current in <a href='#eq-euler'>eq-euler</a>, $(1-\beta)$, can be subsumed into a learnable weight $W$. The simplification $I_{\rm in}[t] = WX[t]$ is made to decouple the effect of $\beta$ on the input $X[t]$. Here, $X[t]$ is treated as a single input. A full-scale network would vectorise $X[t]$ and $W$ would be a matrix, but is treated here as a single input to a single neuron for simplicity. Finally, accounting for spiking and membrane potential reset gives:

$$  U[t] = \underbrace{\beta U[t-1]}\_\text{\rm decay} + \underbrace{WX[t]}\_\text{\rm input} - \underbrace{S\_{\rm out}[t-1]\theta}\_\text{\rm reset}  $$

$S_{\rm out}[t] \in \{0,1\}$ is the output spike generated by the neuron, where if activated ($S_{\rm out}=1$), the reset term subtracts the threshold $\theta$ from the membrane potential. Otherwise, the reset term has no effect ($S_{\rm out}=0$). 
A complete derivation of <a href='#eq-2'>eq-2</a> with all simplifying assumptions is provided in <a href='#app-a1'>app-a1</a>. A spike is generated if the membrane potential exceeds the threshold:

$$   S\_{\rm out}[t] = \begin{cases} 1,  & \text{\rm if $U[t] >\theta$} \\\\  0, & \text{otherwise} \\\\ \end{cases}    $$

An example of how this might be coded in Python is as follows:

```python
def lif(X, U):
    beta = 0.9 # set decay rate
    W = 0.5 # learnable parameter
    theta = 1 # set threshold
    S = 0 # initialize output spike
    
    U = beta * U + W*X - S * theta # iterate over one time step of Eq. 4
    S = (U > theta) # Eq. 5
    return S, U
```

In your exploration of LIF neurons, you may come across many slight variants. Some variations include:

*  The spike threshold (_Line 8_) might be applied _before_ updating the membrane potential (_Line 7_). This induces a one-step delay between the input signal $X$, and when it can trigger a spike.
*  The above derivations use a \'reset-by-subtraction\' (or _soft reset_) mechanism. But an alternative shown in <a href='#app-a1'>app-a1</a> is a \'reset-to-zero' mechanism (or _hard reset_).
*  The factor $(1-\beta)$ from <a href='#eq-euler'>eq-euler</a> may be included as a co-efficient to the input term, $WX$. This will allow you to simulate a neuron model with realistic time constants, but does not offer any advantages when ultimately applied to deep learning.

Alternatively to the above code-block, this can be continuously executed in snnTorch over discrete time steps:

```python
import snntorch as snn

lif = snn.Leaky(beta=0.9, threshold=1) # initialize neuron

infinite_loop = True
while infinite_loop:
    S, U = lif(X*W, U) # Eq.4 and Eq. 5 are recurrently returned
```

An extensive list of alternative neuron types (both LIF and otherwise) is detailed in <a href='#sec-alt-neurons'>sec-alt-neurons</a>, along with a brief overview of their use cases.

A graphical depiction of the LIF neuron is provided in <a href='#fig-2-5'>fig-2-5</a>. The recurrent neuron in (a) is \'unrolled' across time steps in (b), where the reset mechanism is included via $S_{\rm out}\theta$, and explicit recurrence $S_{\rm out}V$ is omitted for brevity. The unrolled computational graph is a good way to think about leaky integrate-and-fire neurons. As you will soon see in <a href='#sec-4'>sec-4</a>, this unrolled representation allows us to borrow many of the tricks developed by deep learning researchers in training networks of LIF neurons.

> <span class='font-bold text-xl'>Practical Note: Soft Reset Enables Better Performance</span>
> 
>   In our experience, neuron models that apply a variant of the soft reset to <a href='#eq-2'>eq-2</a> can lead to networks with higher performance (e.g., accuracy), shown in the expression below. That is, the reset mechanism in <a href='#eq-2'>eq-2</a> is scaled by the decay rate $\beta$. Why this improves performance is an open question.
> 
>   $$  \underbrace{\beta S\_{\rm out} \theta}\_{\rm reset}  $$

<div class="flex items-center justify-center">{{< image src="figures/fig2.5_p2.png" caption="Computational steps in solving the LIF neuron model. (a) A recurrent representation of a spiking neuron. Hidden state decay is referred to as \'implicit recurrence', and external feedback from the spike is \'explicit recurrence', where $V$ is the recurrent weight (omitted from <a href='#eq-2'>eq-2</a>)<sup>[1](#line-1088)</sup>. (b) An unrolled computational graph of the neuron where time flows from left to right. $-\theta$ represents the reset term from <a href='#eq-2'>eq-2</a>, while $\beta$ is the decay rate of $U$ over time. Explicit recurrence is omitted for clarity. Note that kernel-based neuron models replace implicit recurrence with a time-varying filter<sup>[1](#line-495)</sup> <sup>[2](#line-505)</sup> <sup>[3](#line-827)</sup>." >}}</div>

### Alternative Spiking Neuron Models
The LIF neuron is but one of many spiking neuron models. Some other models you might encounter are listed below:
*  **Integrate-and-Fire (IF):** The leakage mechanism is removed; $\beta=1$ in <a href='#eq-2'>eq-2</a>.
*  **Current-based:** Often referred to as CuBa neuron models, these incorporate synaptic conductance variation into leaky integrate and fire neurons. If the default LIF neuron is a first-order low-pass filter, then CuBa neurons are a second-order low-pass filter. The input spike train undergoes two rounds of \'smoothing’, which means the membrane potential has a finite rise time rather than experiencing discontinuous jumps in response to incoming spikes<sup>[1](#line-514)</sup> <sup>[2](#line-525)</sup> <sup>[3](#line-536)</sup>. A depiction of such a neuron with a finite rise time of membrane potential is shown in Figure~\ref{fig:2}(d).
*  **Recurrent Neurons:** The output spikes of a neuron are routed back to the input, labelled in <a href='#fig-2-5'>fig-2-5</a>(a) with explicit recurrence. Rather than an alternative model, recurrence is a topology that can be applied to any other neuron, and can be implemented in different ways; i) one-to-one recurrence, where each neuron routes its own spike to itself, or ii) all-to-all recurrence, where the output spikes of a full layer are weighted and summed (e.g., via a dense or convolutional layer), before being fed back to the full layer<sup>[1](#line-364)</sup>.
*  **Kernel-based Models:** Also knows as the spike-response model, where a pre-defined kernel (such as the \'alpha function': see <a href='#app-c1'>app-c1</a>) is convolved with input spikes<sup>[1](#line-495)</sup> <sup>[2](#line-505)</sup> <sup>[3](#line-827)</sup>. Having the option to define the kernel to be any shape offers significant flexibility.
*  **Deep learning inspired spiking neurons:** Rather than drawing upon neuroscience, it is just as possible to start with primitives from deep learning and apply spiking thresholds. This helps with extending the short-term capacity of basic recurrent neurons. A couple of examples include spiking LSTMs<sup>[1](#line-178)</sup>, and Legendre Memory Units<sup>[1](#line-1779)</sup>. More recently, transformers have been used to further improve long-range memory dependencies in data. In a similar manner, SpikeGPT approximated self-attention into a recurrent model, providing the first demonstration of natural language generation with SNNs<sup>[1](#line-1847)</sup>.
*  **Higher-complexity neuroscience-inspired models:** A large variety of more detailed neuron models are out there. These account for biophysical realism and/or morphological details that are not represented in simple leaky integrators. The most renowned models include the Hodgkin-Huxley model<sup>[1](#line-484)</sup>, and the Izhikevich (or Resonator) model<sup>[1](#line-1795)</sup>, which can reproduce electrophysiological results with better accuracy.

The main takeaway is: use the neuron model that suits your task. Power efficient deep learning will call for LIF models. Improving performance may call for using recurrent SNNs. Driving performance even further (often at the expense of efficiency) may demand methods derived from deep learning, such as spiking LSTMs, and recurrent spiking transformers<sup>[1](#line-1847)</sup> <sup>[2](#line-1824)</sup>. Or perhaps deep learning is not your goal. If you are aiming to construct a brain model, or are tasked with an exploration of linking low-level dynamics (ionic, conductance-driven, or otherwise) with higher-order brain function, then perhaps more detailed, biophysically accurate models will be your friend.
The following code-snippets show how some of these neurons can be instantiated in snnTorch.

```python
import snntorch as snn

# all thresholds default to threshold=1
lif = snn.Leaky(beta=0.9) # vanilla leaky integrate-and-fire neuron
int_fire = snn.Leaky(beta=1.0) # integrate-and-fire neuron
cuba = snn.Synaptic(beta=0.9, alpha=0.8) # current-based neuron
rlif_1 = snn.RLeaky(beta=0.9, all_to_all=True) # all-to-all recurrent lif neuron
rlif_2 = snn.RLeaky(beta=0.9, all_to_all=False) # one-to-one recurrent lif neuron
slstm = snn.SLSTM(input_size=10, hidden_size=1000) # spiking LSTM: 10 inputs, 1000 outputs
```

With the neurons instantiated, it is just a matter of passing in two arguments: i) input data, and ii) their hidden state(s). The hidden states will be updated recursively.

```python
import torch

X = torch.rand(10) # vector of 10 random inputs
U = torch.zeros(10) # initialize hidden states of 10 neurons to 0 V

infinite_loop = True
while infinite_loop:
    S, U = lif(X, U) # forward-pass of leaky integrate-and-fire neuron
```
    
Having formulated a spiking neuron in a discrete-time, recursive form, we can now \'borrow' the developments in training RNNs and sequence-based models. This recursion is illustrated using an \'implicit' recurrent connection for the decay of the membrane potential, and is distinguished from \'explicit' recurrence where the output spikes $S_{\rm out}$ are fed back to the input as in recurrent SNNs (<a href='#fig-2-5'>fig-2-5</a>). 

While there are plenty more physiologically accurate neuron models<sup>[1](#line-484)</sup>, the leaky integrate and fire model is the most prevalent in gradient-based learning due to its computational efficiency and ease of training. Before moving onto training SNNs in <a href='#sec-4'>sec-4</a>, let us gain some insight to what spikes actually mean, and how they might represent information in the next section.

> <span class='font-bold text-xl'>Practical Note: A Comparison of Various Neuron Models</span>
> 
>   With all of these neuron variants, what is the \'correct' approach? This ultimately depends on your goals, and an actively researched question. In our experience:
>   *  **LIF** neurons are the most commonly used in the deep learning context. They sit in the sweet spot between biological plausibility and practicality. It is relatively straightforward to adopt techniques used in training recurrent neural networks (RNNs) to SNNs, as will be explained in detail in <a href='#sec-4'>sec-4</a>.
> *  **IF** models are commonly used in low-power neuromorphic hardware (e.g., SynSense's Speck and Xylo systems; BrainChip's Akida). It removes the \'multiply' step by $\beta$ when updating the membrane potential. This simplification is at the cost of treating all historical data in the same way. I.e., an event that occurred 10 seconds in the past will be weighted equally as an event that occurred 1 second in the past.
> *  **CuBa** neuron models add additional complexity without improving learning capacity. They tend not to be less common as a result. On the plus side, by smoothing out the membrane potential evolution (see <a href='#fig-2'>fig-2</a>(d)), the spike time becomes differentiable with respect to the membrane potential. More on this in <a href='#sec-4'>sec-4</a>.
> *  **Recurrent spiking neurons** have shown to improve learning convergence when training SNNs on time-varying tasks when using all-to-all connections<sup>[1](#line-1787)</sup>. One-to-one connections may not appear to help on the face of it, but by applying a fixed, negative recurrent weight, it can be used as an alternative way to model an adaptive leaky integrate-and-fire neuron. For each output spike, rather than updating the threshold, the output spike can be used to inhibit the membrane potential instead.
> *  **Kernel-based Models** are, in theory, equally performant as all other first-order neuron models. They also demand more memory, as solving the state of the neuron at each time step depends on knowledge of the full history of spikes. In contrast, the formulation in <a href='#eq-2'>eq-2</a> only requires information from the previous time step. SLAYER<sup>[1](#line-505)</sup> popularized their use in multi-layer deep learning, and its implementation was parallelized to improve training time in EXODUS<sup>[1](#line-1806)</sup>.
> *  **Deep learning inspired neurons** deviate from biology and adopt models from deep learning instead. For example, LSTMs are known to have better memory capacity than basic neurons with recurrent connections. Adding a firing threshold to the state of the LSTM can reduce inter-layer spike traffic. However, some of these neurons may introduce higher-dimensional states which can be more expensive to compute. Where leaky integrate-and-fire neurons and recurrent SNNs are insufficient, deep learning-derived models may be a good alternative.
> *  **Higher-complexity neuroscience-inspired neurons** are less often used in deep learning as they involve solving highly stiff ordinary differential equations. I.e., a tiny perturbation may lead to negligible influence on the membrane potential, but the very same perturbation may skyrocket into an action potential. Harnessing gradients from such an unstable signal is not a pleasant experience. As a glimmer of hope, the neuromorphic folk at Intel Labs have been aiming to bridge the gap between low-level neuronal detail in Resonator neurons and higher-level functionality. They have recently discovered emergent properties of such models that allow for efficient signal processing (e.g., spectral decomposition) and factorization of high-dimensional vectors<sup>[1](#line-1813)</sup>.
## The Neural Code 

Light is what we see when the retina converts photons into spikes. Odors are what we smell when the nose processes volatilised molecules into spikes. Tactile perceptions are what we feel when our nerve endings turn pressure into spikes. The brain trades in the global currency of the _spike_. If all spikes are treated identically, then how do they carry meaning? With respect to spike encoding, there are two parts of a neural network that must be treated separately (<a href='#fig-3'>fig-3</a>):

1. **Input encoding:** Conversion of input data into spikes which is then passed to a neural network
1. **Output decoding:** Train the output of a network to spike in a way that is meaningful and informative

<div class="flex items-center justify-center">{{< image src="figures/encode-decode.jpg" caption="Input data to an SNN may be converted into a firing rate, firing time, or the data can be delta modulated. Alternatively, the input to the network can also be passed in without conversion which experimentally represents a direct or variable current source applied to the input layer of neurons. The network itself may be trained to enable the correct class to have the highest firing rate or to fire first, amongst many other encoding strategies." >}}</div>


### Input encoding
Input data to an SNN does not necessarily have to be encoded into spikes. It is acceptable to pass continuous values as input, much like how the perception of light starts with a continuous number of photons impinging upon our photoreceptor cells.

Static data, such as an image, can be treated as a direct current (DC) input with the same features passed to the input layer of the SNN at every time step. But this does not exploit the way SNNs extract meaning from temporal data. In general, three encoding mechanisms have been popularised with respect to input data:

1. **Rate coding** converts input intensity into a **firing rate** or **spike count**
1. **Latency (or temporal) coding** converts input intensity to a spike **time**
1. **Delta modulation** converts a temporal **change** of input intensity into spikes, and otherwise remains silent

This is a non-exhaustive list, and these codes are not necessarily independent of each other.

#### Rate Coded Inputs
How does the sensory periphery encode information about the world into spikes? When bright light is incident upon our photoreceptor cells, the retina triggers a spike train to the visual cortex. Hubel and Wiesel's Nobel prize-winning research on visual processing indicates that a brighter input or a favourable orientation of light corresponds to a higher firing rate<sup>[1](#line-639)</sup>. As a rudimentary example, a bright pixel is encoded into a high firing rate, whereas a dark pixel would result in low-frequency firing. Measuring the firing rate of a neuron can become quite nuanced. The simplest approach is to apply an input stimulus to a neuron, count up the total number of action potentials it generates, and divide that by the duration of the trial. Although straightforward, the problem here is that the dynamics of a neuron vary across time. There is no guarantee the firing rate at the start of the trial is anything near the rate at the end. 

An alternative method counts the spikes over a very short time interval $\Delta t$. For a small enough $\Delta t$, the spike count can be constrained to either 0 or 1, limiting the total number of possible outcomes to only two. By repeating this experiment multiple times, the average number of spikes (over trials) occurring within $\Delta t$ can be found. This average must be equal to or less than 1, interpreted as the observed probability that a neuron will fire within the brief time interval. To convert it into a _time-dependent_ firing rate, the trial average is divided by the duration of the interval. This probabilistic interpretation of the rate code can be distributed across multiple neurons, where counting up the spikes from a collection of neurons advocates for a population code<sup>[1](#line-745)</sup>.
This representation is quite convenient for sequential neural networks. Each discrete time step in an RNN can be thought of as lasting for a brief duration $\Delta t$ in which a spike either occurs or does not occur. A formal example of how this takes place is provided in <a href='#app-a2'>app-a2</a>.
Data can be rate-coded using the _spikegen_ module within snnTorch:

```python
from snntorch import spikegen
import torch

steps = 100 # number of time steps

X = torch.rand(10) # vector of 10 random inputs
S = spikegen.rate(X, num_steps=steps) 

print(X.size())
>> torch.Size([10])
print(S.size())
>> torch.Size([100, 10])
```

#### Latency Coded Inputs
A latency, or temporal, code is concerned with the timing of a spike. The total number of spikes is no longer consequential. Rather, _when_ the spike occurs is what matters. For example, a time-to-first-spike mechanism encodes a bright pixel as an early spike, whereas a dark input will spike last, or simply never spike at all. When compared to the rate code, latency-encoding mechanisms assign much more meaning to each individual spike.

Neurons can respond to sensory stimuli over an enormous dynamic range. In the retina, neurons can detect individual photons to an influx of millions of photons<sup>[1](#line-651)</sup> <sup>[2](#line-662)</sup> <sup>[3](#line-673)</sup> <sup>[4](#line-2149)</sup> <sup>[5](#line-588)</sup>. To handle such widely varying stimuli, sensory transduction systems likely compress stimulus intensity with a logarithmic dependency. For this reason, a logarithmic relation between spike times and input feature intensity is ubiquitous in the literature (<a href='#app-a3'>app-a3</a>)<sup>[1](#line-685)</sup> <sup>[2](#line-2160)</sup>.

Although sensory pathways appear to transmit rate coded spike trains to our brains, it is likely that temporal codes dominate the actual processing that goes on within the brain. More on this in <a href='#rvl'>rvl</a>. 

```python
from snntorch import spikegen
import torch

steps = 100 # number of time steps

X = torch.rand(10) # vector of 10 random inputs
S = spikegen.latency(X, num_steps=steps) 

print(X.size())
>> torch.Size([10])
print(S.size())
>> torch.Size([100, 10])
```

#### Delta Modulated Inputs

Delta modulation is based on the notion that neurons thrive on change, which underpins the operation of the silicon retina camera that only generates an input when there has been a sufficient change of input intensity over time. If there is no change in your field of view, then your photoreceptor cells are much less prone to firing. Computationally, this would take a time-series input and feed a thresholded matrix difference to the network. 
While the precise implementation may vary, a common approach requires the difference to be both _positive_ and _greater_ than some pre-defined threshold for a spike to be generated. This encoding technique is also referred to as \'threshold crossing'. Alternatively, changes in intensity can be tracked over multiple time steps, and other approaches account for negative changes. For an illustration, see <a href='#fig-event'>fig-event</a>, where the \'background' is not captured over time. Only the moving blocks are recorded, as it is those pixels that are changing.

Assuming the variable $X$ stores a batch of videos, say with 100 frames in each sample, delta modulation can be applied using the spikegen module:

```python
from snntorch import spikegen
import torch

print(X.size())
>> torch.Size([100, 128, 1, 28, 28]) # time X batch-size X channel X x-dim X y-dim

S = spikegen.delta(X, num_steps=steps) # convert X to delta modulated spikes in S

print(S.size())
>> torch.Size([100, 128, 1, 28, 28]) # no change to the size; only to the elements
```

The previous techniques tend to \'convert' data into spikes. But it is more efficient to natively capture data in \'pre-encoded', spiking form. Each pixel in a DVS camera and channel in a silicon cochlear uses delta modulation to record changes in the visual or audio scene. Some examples of neuromorphic benchmark datasets are described in Table~\ref{tab:datasets}. A comprehensive series of neuromorphic-relevant datasets are accounted for in NeuroBench<sup>[1](#line-1831)</sup>\footnote{https://neurobench.ai/}.

\begin{table}[htb]
    \caption{Examples of neuromorphic datasets recorded with event-based cameras and cochlear models.}
    \resizebox{1.\columnwidth}{!}{
    \begin{tabular}{ll}
    **Vision datasets** & \\ \midrule
    ASL-DVS<sup>[1](#line-2271)</sup> & 100,800 samples of American sign language recorded with DAVIS. \\
    DAVIS Dataset<sup>[1](#line-2210)</sup> & Includes spikes, frames and inertial measurement unit recordings of interior and outdoor scenes.\\
    DVS Gestures<sup>[1](#line-706)</sup> & 11 different hand gestures recorded under 3 different lighting conditions. \\
    DVS Benchmark<sup>[1](#line-725)</sup> & DVS benchmark datasets for object tracking, action recognition, and object recognition. \\
    MVSEC<sup>[1](#line-2221)</sup> & Spikes, frames and optical flow from stereo cameras for indoor and outdoor scenarios. \\
    N-MNIST<sup>[1](#line-696)</sup> & Spiking version of the classic MNIST dataset by converting digits from a screen using saccadic motion. \\
    POKER DVS<sup>[1](#line-2232)</sup> & 4 classes of playing cards flipped in rapid succession in front of a DVS.
    \\
    DSEC<sup>[1](#line-2260)</sup> & A stereo event camera dataset for driving scenarios.\\
    \\
    **Audio datasets** & \\ \midrule
    N-TIDIGITS<sup>[1](#line-2250)</sup>  & Speech recordings from the TIDIGITS dataset converted to spikes with a silicon cochlear. \\
    SHD<sup>[1](#line-2242)</sup>  & Spiking version of the Heidelberg Digits dataset converted using a simulated cochlear model.\\
    SSC<sup>[1](#line-2242)</sup> & Spiking version of the _Speech Commands_ dataset converted using a simulated cochlear model. \\
    \end{tabular}
    }
    
\end{table}

> <span class='font-bold text-xl'>Practical Note: Input Encoding</span>
> 
> What if you start off with a non-spiking dataset? Applying these input encoding mechanisms will almost always lead to accuracy/performance degradation. Information loss is guaranteed. It is often wiser to apply the pre-processing techniques that are prevalent in the literature; e.g., if you have EEG data, a Fourier transform is often appropriate. Alternatively, SpikeGPT introduced binarized embeddings that \'learn' the optimal spike-based encoding of a sequence of input tokens<sup>[1](#line-1847)</sup>. 
> If you _must_ encode data into spikes, we have found that rate codes do less harm to accuracy/loss minimization than latency codes. In the ideal scenario, your sensor would naturally capture data as spikes rather than having to go through conversion and compression steps.

### Output Decoding
Encoding input data into spikes can be thought of as how the sensory periphery transmits signals to the brain. On the other side of the same coin, decoding these spikes provides insight on how the brain handles these encoded signals. In the context of training an SNN, the encoding mechanism does not constrain the decoding mechanism. Shifting our attention from the input of an SNN, how might we interpret the firing behavior of output neurons?

1. **Rate coding** chooses the output neuron with the highest **firing rate**, or **spike count**, as the predicted class
1. **Latency (or temporal) coding** chooses the output neuron that fires **first** as the predicted class
1. **Population coding** applies the above coding schemes (typically a rate code) with **multiple neurons** per class

#### Rate Coded Outputs
Consider a multi-class classification problem, where $N_C$ is the number of classes. A non-spiking neural network would select the neuron with the largest output activation as the predicted class. For a rate-coded spiking network, the neuron that fires with the highest frequency is used. As each neuron is simulated for the same number of time steps, simply choose the neuron with the highest spike count (<a href='#app-a4'>app-a4</a>).

#### Latency Coded Outputs
There are numerous ways a neuron might encode data in the timing of a spike. As in the case with latency-coded inputs, it could be that a neuron representing the correct class fires first. 
This addresses the energy burden that arises from the multiple spikes needed in rate codes. In hardware, the need for fewer spikes reduces the frequency of memory accesses which is another computational burden in deep learning accelerators. 

Biologically, does it make sense for neurons to operate on a time to first spike principle? How might we define \'first' if our brains are not constantly resetting to some initial, default state? This is quite easy to address conceptually. The idea of a latency or temporal code is motivated by our response to a sudden input stimulus. For example, when viewing a static, unchanging visual scene, the retina undergoes rapid, yet subtle, saccadic motion. The scene projected onto the retina changes every few hundreds of milliseconds. It could very well be the case that the first spike must occur with respect to the reference signal generated by this saccade. 

#### Rate vs. Latency Code 
Whether neurons encode information as a rate, as latency, or as something wholly different, is a topic of much controversy. We do not seek to crack the neural code here, but instead aim to provide intuition on when SNNs might benefit from one code over the other.

**Advantages of Rate Codes**
*  **Error tolerance:** if a neuron fails to fire, there are ideally many more spikes to reduce the burden of this error.
*  **More spiking promotes more learning:** additional spikes provide a stronger gradient signal for learning via error backpropagation. As will be described in <a href='#sec-4'>sec-4</a>, the absence of spiking can impede learning convergence (more commonly referred to as the \'dead neuron problem').

**Advantages of Latency Codes**
*  **Power consumption:** generating and communicating fewer spikes means less dynamic power dissipation in tailored hardware. It also reduces memory access frequency due to sparsity, as a vector-matrix product for an all-zero input vector returns a zero output.
*  **Speed:** the reaction time of a human is roughly in the ballpark of 250~ms. If the average firing rate of a neuron in the human brain is on the order of 10~Hz (which is likely an overestimation<sup>[1](#line-735)</sup>), then one can only process about 2-3 spikes in this reaction time window. In contrast, latency codes rely on a single spike to represent information. This issue with rate codes may be addressed by coupling it with a population code: if a single neuron is limited in its spike count within a brief time window, then just use more neurons<sup>[1](#line-745)</sup>. This comes at the expense of further exacerbating the power consumption problem of rate codes.

The power consumption benefit of latency codes is also supported by observations in biology, where nature optimises for efficiency. Olshausen and Field's work in \'What is the other 85\% of V1 doing?' methodically demonstrates that rate-coding can only explain, at most, the activity of 15\% of neurons in the primary visual cortex (V1)<sup>[1](#line-735)</sup>. If our neurons indiscriminately defaulted to a rate code, this would consume an order of magnitude more energy than a temporal code. The mean firing rate of our cortical neurons must necessarily be rather low, which is supported by temporal codes.

Lesser explored encoding mechanisms in gradient-based SNNs include using spikes to represent a prediction or reconstruction error<sup>[1](#line-1663)</sup>. The brain may be perceived as an anticipatory machine that takes action based on its predictions. When these predictions do not match reality, spikes are triggered to update the system. 
Some assert the true code must lie between rate and temporal codes<sup>[1](#line-2053)</sup>, while others argue that the two may co-exist and only differ based on the timescale of observation: rates are observed for long timescales, latency for short timescales<sup>[1](#line-2105)</sup>. Some reject rate codes entirely<sup>[1](#line-2095)</sup>. This is one of those instances where a deep learning practitioner might be less concerned with what the brain does, and prefers to focus on what is most useful. 

### Objective Functions
While it is unlikely that our brains use something as explicit as a cross-entropy loss function, it is fair to say that humans and animals have baseline objectives<sup>[1](#line-1242)</sup>. Biological variables, such as dopamine release, have been meaningfully related to objective functions from reinforcement learning<sup>[1](#line-1253)</sup>. Predictive coding models often aim to minimise the information entropy of sensory encodings, such that the brain can actively predict incoming signals and inhibit what it already expects<sup>[1](#line-1264)</sup>. The multi-faceted nature of the brain's function likely calls for the existence of multiple objectives<sup>[1](#line-1275)</sup>. How the brain can be optimised using these objectives remains a mystery, though we might be able to gain insight from multi-objective optimisation<sup>[1](#line-2064)</sup>.
A variety of loss functions can be used to encourage the output layer of a network to fire as a rate or temporal code. The optimal choice is largely unsettled, and tends to be a function of the network hyperparameters and complexity of the task at hand. All objective functions described below have successfully trained networks to competitive results on a variety of datasets, though come with their own trade-offs.

#### Spike Rate Objective Functions 
A summary of approaches commonly adopted in supervised learning classification tasks with SNNs to promote the correct neuron class to fire with the highest frequency is provided in <a href='#tab-rateobj'>tab-rateobj</a>. In general, either the cross-entropy loss or mean square error is applied to the spike count or the membrane potential of the output layer of neurons.

\begin{table*}[!ht] 
\centering \small
    \caption{Rate-coded objectives}
    
    \begin{tabular}{  p{1.5cm}  p{6.85cm}  p{6.85cm} }
        \toprule
& **Cross-Entropy Loss**   
& **Mean Square Error** \\\midrule
**Spike Count**
& **Cross-Entropy Spike Rate:** The total number of spikes for each neuron in the output layer are accumulated over time into a spike count $\vec{c}\in \mathbb{N}^{N_C}$ (<a href='#beq-5'>beq-5</a> in <a href='#app-a4'>app-a4</a>), for $N_C$ classes. A multi-class categorical probability distribution is obtained by treating the spike counts as logits in the softmax function. Cross entropy minimisation is used to increase the spike count of the correct class, while suppressing the count of the incorrect classes<sup>[1](#line-706)</sup> <sup>[2](#line-785)</sup> (<a href='#app-a5'>app-a5</a>).      
& **Mean Square Spike Rate:** The spike counts of both correct and incorrect classes are specified as targets. The mean square errors between the actual and target spike counts for all output classes are summed together. In practice, the target is typically represented as a proportion of the total number of time steps: e.g., the correct class should fire at 80\% of all time steps, while incorrect classes should fire 20\% of the time<sup>[1](#line-505)</sup> <sup>[2](#line-796)</sup> <sup>[3](#line-806)</sup> <sup>[4](#line-817)</sup> (<a href='#app-a6'>app-a6</a>). \\\hline \rule{0pt}{2.5ex}**Membrane Potential**      
& **Maximum Membrane:** The logits are obtained by taking the maximum value of the membrane potential over time, which are then applied to a softmax cross entropy function. By encouraging the membrane potential of the correct class to increase, it is expected to encourage more regular spiking<sup>[1](#line-767)</sup> <sup>[2](#line-774)</sup> <sup>[3](#line-756)</sup>. A variant is to simply sum the membrane potential across all time steps to obtain the logits<sup>[1](#line-756)</sup> (<a href='#app-a7'>app-a7</a>).                       
& **Mean Square Membrane:** Each output neuron has a target membrane potential specified for each time step, and the losses are summed across both time and outputs. To implement a rate code, a superthreshold target should be assigned to the correct class across time steps (<a href='#app-a11'>app-a11</a>). \\ 

        \bottomrule
    \end{tabular}
\end{table*}

With a sufficient number of time steps, passing the spike count the objective function is more widely adopted as it operates directly on spikes. Membrane potential acts as a proxy for increasing the spike count, and is also not considered an observable variable which may partially offset the computational benefits of using spikes.

Cross-entropy approaches aim to suppress the spikes from incorrect classes, which may drive weights in a network to zero. This could cause neurons to go quiet in absence of additional regularisation. By using the mean square spike rate, which specifies a target number of spikes for each class, output neurons can be placed on the cusp of firing. Therefore, the network is expected to adapt to changing inputs with a faster response time than neurons that have their firing completely suppressed.

In networks that simulate a constrained number of time steps, a small change in weights is unlikely to cause a change in the spike count of the output. 
It might be preferable to apply the loss function directly to a more \'continuous' signal, such as the membrane potential instead. This comes at the expense of operating on a full precision hidden state, rather than on spikes. 
Alternatively, using population coding can distribute the cost burden over multiple neurons to increase the probability that a weight update will alter the spiking behavior of the output layer. It also increases the number of pathways through which error backpropagation may take place, and improve the chance that a weight update will generate a change in the global loss.

All of these losses can be constructed in a single line each using the _functional_ module within snnTorch.

```python
from snntorch import functional as SF

loss_1 = SF.ce_rate_loss() # cross-entropy spike rate
loss_2 = SF.mse_rate_loss() # mean square spike rate
loss_3 = SF.ce_max_membrane_loss() # maximum membrane
loss_4 = SF.mse_membrane_loss() # mean square membrane
```

#### Spike Time Objectives 
Loss functions that implement spike timing objectives are less commonly used than rate-coded objectives. Two possible reasons may explain why: (1) error rates are typically perceived to be the most important metric in deep learning literature, and rate codes are more tolerant to noise, and (2) temporal codes are considerably more difficult to implement. A summary of approaches is provided in <a href='#tab-latencyobj'>tab-latencyobj</a>, with their snnTorch implementation below.

\begin{table*}[!ht] 
\centering \small
    \caption{Latency-coded objectives}
    
    \begin{tabular}{  p{1.5cm}  p{6.85cm}  p{6.85cm} }
        \toprule
& **Cross-Entropy Loss**   
& **Mean Square Error** \\\midrule
**Spike Time**
& **Cross-Entropy Spike Time:** The timing of the first spike of each neuron in the output layer is taken $\vec{f}\in\mathbb{R}^{N_C}$. As cross entropy minimisation involves maximising the likelihood of the correct class, a monotonically decreasing function must be applied to $\vec{f}$ such that early spike times are converted to large numerical values, while late spikes become comparatively smaller. These \'inverted' values are then used as logits in the softmax function<sup>[1](#line-827)</sup> (<a href='#app-a8'>app-a8</a>). 

& **Mean Square Spike Time:** The spike time of all neurons are specified as targets. The mean square errors between the actual and target spike times of all output classes are summed together. This can be generalised to multiple spikes as well<sup>[1](#line-965)</sup> <sup>[2](#line-505)</sup> (<a href='#app-a9'>app-a9</a>). \rule{6.765cm}{0.5pt} 
\rule{0pt}{2ex}**Mean Square Relative Spike Time:** A similar approach to above, but rather than specifying the precise time of each spike, only the relative time of the correct class must be specified. If the correct neuron fires a specified number of time steps earlier than incorrect neurons, the loss is fixed at zero<sup>[1](#line-872)</sup> (<a href='#app-a10'>app-a10</a>).

\\\hline \rule{0pt}{2.5ex}**Membrane Potential**  

& Unreported in the literature.                       
& **Mean Square Membrane:** Analogous to the rate-coded case, each output neuron has a target membrane potential specified for each time step, and the losses are summed across both time and outputs. To implement a temporal code, the correct class should specify a target membrane greater than the threshold of the neuron at an early time (<a href='#app-a11'>app-a11</a>). \\ 

        \bottomrule
    \end{tabular}
\end{table*}

```python
from snntorch import functional as SF

loss_1 = SF.ce_temporal_loss() # cross-entropy spike time
loss_2 = SF.mse_temporal_loss() # mean square spike time
loss_3 = SF.mse_membrane_loss() # mean square membrane - target must be latency-coded
```

The use cases of these objectives are analogous to the spike rate objectives. 
A subtle challenge with using spike times is that the default implementation assumes each neuron spikes at least once, which is not necessarily the case. This can be handled by forcing a spike at the final time step in the event a neuron does not fire<sup>[1](#line-872)</sup>.

> <span class='font-bold text-xl'>Practical Note: Output Decoding with a Read-Out Layer</span>
> 
>   Several state-of-the-art models wholly abandon spiking neurons at the output and train their models using a \'read-out layer'. This often consists of an integrate-and-fire layer with infinitely high thresholds (i.e., they will never fire), or with typical artificial neurons that use standard activation functions (ReLU, sigmoid, softmax, etc.). While this often improves accuracy, this may not qualify as a fully spiking network. Does this actually matter? If one can still achieve power efficiency, then engineers will be happy and that's often all that matters.
### Learning Rules 

#### Spatial and Temporal Credit Assignment
Once a loss has been determined, it must somehow be used to update the network parameters with the hope that the network will iteratively improve at the trained task. Each weight takes some blame for its contribution to the total loss, and this is known as \'credit assignment'. This can be split into the _spatial_ and _temporal_ credit assignment problems. Spatial credit assignment aims to find the spatial location of the weight contributing to the error, while the temporal credit assignment problem aims to find the time at which the weight contributes to the error. Backpropagation has proven to be an extremely robust way to address credit assignment, but the brain is far more constrained in developing solutions to these challenges.

Backpropagation solves spatial credit assignment by applying a distinct backward pass after a forward pass during the learning process<sup>[1](#line-1295)</sup>. The backward pass mirrors the forward pass, such that the computational pathway of the forward pass must be recalled. In contrast, action potential propagation along an axon is considered to be unidirectional which may reject the plausibility of backprop taking place in the brain. Spatial credit assignment is not only concerned with calculating the weight's contribution to an error, but also assigning the error back to the weight. Even if the brain could somehow calculate the gradient (or an approximation), a major challenge would be projecting that gradient back to the synapse, and knowing which gradient belongs to which synapse.

This constraint of neurons acting as directed edges is increasingly being relaxed, which could be a mechanism by which errors are assigned to synapses<sup>[1](#line-1396)</sup>. Numerous bi-directional, non-linear phenomena occur within individual neurons which may contribute towards helping errors find their way to the right synapse. 
For example, feedback connections are observed in most places where there are feedforward connections<sup>[1](#line-2084)</sup>. 

#### Biologically Motivated Learning Rules
With a plethora of neuronal dynamics that might embed variants of backpropagation, what options are there for modifying backprop to relax some of the challenges associated with biologically plausible spatial credit assignment? In general, the more broadly adopted approaches rely on either trading parts of the gradient calculation for stochasticity, or otherwise swapping a global error signal for localised errors (<a href='#fig-bio_obj'>fig-bio_obj</a>). Conjuring alternative methods to credit assignment that a real-time machine such as the brain can implement is not only useful for developing insight to biological learning<sup>[1](#line-1338)</sup>, but also reduces the cost of data communication in hardware<sup>[1](#line-1705)</sup>. For example, using local errors can reduce the length a signal must travel across a chip. Stochastic approaches can trade computation with naturally arising circuit noise<sup>[1](#line-2073)</sup> <sup>[2](#line-2200)</sup> <sup>[3](#line-2189)</sup>. A brief summary of several common approaches to ameliorating the spatial credit assignment problem are provided below:

*  **Perturbation Learning:** A random perturbation of network weights is used to measure the change in error. If the error is reduced, the change is accepted. Otherwise, it is rejected<sup>[1](#line-1645)</sup> <sup>[2](#line-1652)</sup> <sup>[3](#line-1316)</sup>. The difficulty of learning scales with the number of weights, where the effect of a single weight change is dominated by the noise from all other weight changes. In practice, it may take a huge number of trials to average this noise away<sup>[1](#line-1327)</sup>.
*  **Random Feedback:** Backpropagation requires sequentially transporting the error signal through multiple layers, scaled by the forward weights of each layer. Random feedback replaces the forward weight matrices with random matrices, reducing the dependence of each weight update on distributed components of the network. While this does not fully solve the spatial credit assignment problem, it quells the _weight transport problem_<sup>[1](#line-1349)</sup>, which is specifically concerned with a weight update in one layer depending upon the weights of far-away layers. Forward and backward-propagating data are scaled by symmetric weight matrices, a mechanism that is absent in the brain. Random feedback has shown similar performance to backpropagation on simple networks and tasks, which gives hope that a precise gradient may not be necessary for good performance<sup>[1](#line-1349)</sup>. Random feedback has struggled with more complex tasks, though variants have been proposed that reduce the gap<sup>[1](#line-1356)</sup> <sup>[2](#line-1363)</sup> <sup>[3](#line-1371)</sup> <sup>[4](#line-1406)</sup>. Nonetheless, the mere fact that such a core piece of the backpropagation algorithm can be replaced with random noise and yet somehow still work is a marvel. It is indicative that we still have much left to understand about gradient backpropagation.
*  **Local Losses:** It could be that the six layers of the cortex are each supplied with their own cost function, rather than a global signal that governs a unified goal for the brain<sup>[1](#line-1275)</sup>. Early visual regions may try to minimise the prediction error in constituent visual features, such as orientations, while higher areas use cost functions that target abstractions and concepts. For example, a baby learns how to interpret receptive fields before consolidating them into facial recognition. In deep learning, greedy layer-wise training assigns a cost function to each layer independently<sup>[1](#line-1388)</sup>. Each layer is sequentially assigned a cost function so as to ensure a shallow network is only ever trained. Target propagation is similarly motivated, by assigning a reconstruction criterion to each layer<sup>[1](#line-1663)</sup>. Such approaches exploit the fact that training a shallow network is easier than training a deep one, and aim to address spatial credit assignment by ensuring the error signal does not need to propagate too far<sup>[1](#line-1415)</sup> <sup>[2](#line-1396)</sup>.
*  **Forward-Forward Error Propagation:** The backward pass of a model is replaced with a second forward-pass where the input signal is altered based on error, or some related metric. Initially proposed by Dellaferrera _et al._<sup>[1](#line-1838)</sup>, Hinton's Forward-Forward learning algorithm generated more traction soon after<sup>[1](#line-1871)</sup>. These have not been ported to SNNs at the time of writing, though someone is bound to step up to the mantle soon.

<div class="flex items-center justify-center">{{< image src="figures/fig_bio_objreg.png" caption="A variety of learning rules can be used to train a network. (a) Objective Functions. **Gradient backpropagation:** an unbiased gradient estimator of the loss is derived with respect to each weight. **Perturbation learning:** weights are randomly perturbed by $\delta W$, with the change accepted if the output error is reduced. **Random feedback:** all backward references to weights $W$ are replaced with random feedback $B$. **Local losses:** each layer is provided with an objective function avoiding error backpropagation through multiple layers. (b) Activity Regularisation. **Neuron level regularisation:** aims to set a baseline spike count per neuron. **Population level regularisation:** aims to set an upper limit on the total number of spikes emitted from all neurons." >}}</div>


These approaches to learning are illustrated in <a href='#fig-bio_obj'>fig-bio_obj</a>(a). While they are described in the context of supervised learning, many theories of learning place emphasis on self-organisation and unsupervised approaches. Hebbian plasticity is a prominent example<sup>[1](#line-996)</sup>. But an intersection may exist in self-supervised learning, where the target of the network is a direct function of the data itself. Some types of neurons may be representative of facts, features, or concepts, only firing when exposed to the right type of stimuli. Other neurons may fire with the purpose of reducing a reconstruction error<sup>[1](#line-1425)</sup> <sup>[2](#line-1432)</sup> <sup>[3](#line-167)</sup>. By accounting for spatial and temporal correlations that naturally exist around us, such neurons may fire with the intent to predict what happens next. A more rigorous treatment of biological plausibility in objective functions can be found in<sup>[1](#line-1275)</sup>.

> <span class='font-bold text-xl'>Practical Note: The Effectiveness of Credit Assignment Solutions</span>
> 
>   Gradient-based error backpropagation reigns supreme where final accuracy/performance is the key metric. Perturbation learning is effective with an infinitely large number of trials which is not practical, and the other methods struggle to scale to deep layers. At the same time, the brain is not considered \'deep', so perhaps the focus should not be on how to make these algorithms scale to deep models, but rather, how shallow networks can perform to the same effectiveness as deeper models. This may call for evolutionary algorithms, where it has been shown that smaller networks can be optimized using a fitness function to outperform larger networks<sup>[1](#line-1854)</sup> <sup>[2](#line-1863)</sup>.

### Activity Regularisation
A huge motivator behind using SNNs comes from the power efficiency when processed on appropriately tailored hardware. This benefit is not only from single-bit inter-layer communication via spikes, but also the sparse occurrence of spikes. Some of the loss functions above, in particular those that promote rate codes, will indiscriminately increase the membrane potential and/or firing frequency without an upper bound, if left unchecked. Regularisation of the loss can be used to penalise excessive spiking (or alternatively, penalise insufficient spiking which is great for discouraging dead neurons). Conventionally, regularisation is used to constrain the solution space of loss minimisation, thus leading to a reduction in variance at the cost of increasing bias. Care must be taken, as too much activity regularisation can lead to excessively high bias. Activity regularisation can be applied to alter the behavior of individual neurons or populations of neurons, as depicted in <a href='#fig-bio_obj'>fig-bio_obj</a>(b).

*  **Population level regularisation:** this is useful when the metric to optimise is a function of aggregate behavior. For example, the metric may be power efficiency which is strongly linked to the total number of spikes from an entire network. L1-regularisation can be applied to the total number of spikes emitted at the output layer to penalise excessive firing, which encourages sparse activity at the output<sup>[1](#line-841)</sup>. Alternatively, for more fine-grain control over the network, an upper-activity threshold can be applied. If the total number of spikes for _all_ neurons in a layer exceeds the threshold, only then does the regularisation penalty kick in<sup>[1](#line-756)</sup> <sup>[2](#line-817)</sup> (<a href='#app-regpop'>app-regpop</a>).
*  **Neuron level regularisation:** If neurons completely cease to fire, then learning may become significantly more difficult. Regularisation may also be applied at the individual neuron level by adding a penalty for each neuron. A lower-activity threshold specifies the lower permissible limit of firing for _each_ neuron before the regularisation penalty is applied (<a href='#app-regneu'>app-regneu</a>).
Recent experiments have shown that rate-coded networks (at the output) are robust to sparsity-promoting regularisation terms<sup>[1](#line-756)</sup> <sup>[2](#line-817)</sup> <sup>[3](#line-767)</sup>. However, networks that rely on time-to-first-spike schemes have had less success, which is unsurprising given that temporal outputs are already sparse.

Encouraging each neuron to have a baseline spike count helps with the backpropagation of errors through pathways that would otherwise be inactive. Together, the upper and lower-limit regularisation terms can be used to find the sweet spot of firing activity at each layer. As explained in detail in<sup>[1](#line-847)</sup>, the variance of activations should be as close as possible to \'1' to avoid vanishing and exploding gradients. While modern deep learning practices rely on appropriate parameter initialization to achieve this, these approaches were not designed for non-differentiable activation functions, such as spikes. By monitoring and appropriately compensating for neuron activity, this may turn out to be a key ingredient to successfully training deep SNNs.

> <span class='font-bold text-xl'>Practical Note: Avoiding Dead Neurons by Varying Thresholds</span>
> 
>   One of the most common reasons your network will not train is that neurons are not firing. Probing the spiking activity to identify the layer at which activity dies out is important, and can be used to guide how to regularise your objective function. An easier approach is to simply reduce the threshold of the at-risk layers. We do this threshold hack all the time!

## Training Spiking Neural Networks
The rich temporal dynamics of SNNs give rise to a variety of ways in which a neuron's firing pattern can be interpreted. Naturally, this means there are several methods for training SNNs. They can generally be classified into the following methods:

*  **Shadow training:** A non-spiking ANN is trained and converted into an SNN by interpreting the activations as a firing rate or spike time
*  **Backpropagation using spikes:** The SNN is natively trained using error backpropagation, typically through time as is done with sequential models
*  **Local learning rules:** Weight updates are a function of signals that are spatially and temporally local to the weight, rather than from a global signal as in error backpropagation

Each approach has a time and place where it outshines the others. We will focus on approaches that apply backprop directly to an SNN, but useful insights can be attained by exploring shadow training and various local learning rules.

The goal of the backpropagation algorithm is loss minimisation. To achieve this, the gradient of the loss is computed with respect to each learnable parameter by applying the chain rule from the final layer back to each weight<sup>[1](#line-937)</sup> <sup>[2](#line-948)</sup> <sup>[3](#line-956)</sup>. The gradient is then used to update the weights such that the error is ideally always decreased. If this gradient is \'0', there is no weight update. This has been one of the main road blocks to training SNNs using error backpropagation due to the non-differentiability of spikes. This is also known as the dreaded \'dead neuron' problem. There is a subtle, but important, difference between \'vanishing gradients' and \'dead neurons' which will be explained in <a href='#sec-bps'>sec-bps</a>.

To gain deeper insight behind the non-differentiability of spikes, recall the discretised solution of the membrane potential of the leaky integrate and fire neuron from <a href='#eq-2'>eq-2</a>: $U[t] = \beta U[t-1] + WX[t]$, where the first term represents the decay of the membrane potential $U$, and the second term is the weighted input $WX$. The reset term and subscripts have been omitted for simplicity. Now imagine a weight update $\Delta W$ is applied to the weight $W$ (<a href='#eq-2'>eq-2</a>). This update causes the membrane potential to change by $\Delta U$, but this change in potential fails to precipitate a further change to the spiking presence of the neuron (<a href='#eq-3'>eq-3</a>). That is to say, $dS/dU=0$ for all $U$, other than the threshold $\theta$, where $dS/dU\rightarrow\infty$. This drives the term we are actually interested in, $d\mathcal{L}/dW$, or the gradient of the loss in weight space, to either \'0' or \'$\infty$'. In either case, there is no adequate learning signal when backpropagating through a spiking neuron (<a href='#fig-5'>fig-5</a>(a)).

<div class="flex items-center justify-center">{{< image src="figures/training-snns.png" caption="Addressing the dead neuron problem. Only one time step is shown, where temporal connections and subscripts from <a href='#fig-2-5'>fig-2-5</a> have been omitted for simplicity. (a) The dead neuron problem: the analytical solution of $\partial S/\partial U \in \{0, \infty\}$ results in a gradient that does not enable learning. (b) Shadow training: a non-spiking network is first trained and subsequently converted into an SNN. (c) Spike-time gradient: the gradient of spike time $f$ is taken instead of the gradient of the spike generation mechanism, which is a continuous function as long as a spike necessarily occurs<sup>[1](#line-965)</sup>. (d) Surrogate gradients: the spike generation function is approximated to a continuous function during the backward pass<sup>[1](#line-756)</sup>. The left arrow ($\leftarrow$) indicates function substitution. This is the most broadly adopted solution to the dead neuron problem." >}}</div>


### Shadow Training 
The dead neuron problem can be completely circumvented by instead training on a shadow ANN and converting it into an SNN (<a href='#fig-5'>fig-5</a>(b)). The high precision activation function of each neuron is converted into either a spike rate<sup>[1](#line-714)</sup> <sup>[2](#line-1004)</sup> <sup>[3](#line-1011)</sup> <sup>[4](#line-1020)</sup> <sup>[5](#line-1027)</sup> or a latency code<sup>[1](#line-1037)</sup>. One of the most compelling reasons to use shadow training is that advances in conventional deep learning can be directly applied to SNNs. For this reason, ANN-to-SNN conversion currently takes the crown for static image classification tasks on complex datasets, such as CIFAR-10 and ImageNet. Where inference efficiency is more important than training efficiency, and if input data is not time-varying, then shadow training could be the optimal way to go.

In addition to the inefficient training process, there are several drawbacks. Firstly, the types of tasks that are most commonly benchmarked do not make use of the temporal dynamics of SNNs, and the conversion of sequential neural networks to SNNs is an under-explored area<sup>[1](#line-1011)</sup>. Secondly, converting high-precision activations into spikes typically requires a long number of simulation time steps which may offset the power/latency benefits initially sought from SNNs. But what really motivates doing away with ANNs is that the conversion process is necessarily an approximation. Therefore, a shadow-trained SNN is very unlikely to reach the performance of the original network.

The issue of long time sequences can be partially addressed by using a hybrid approach: start with a shadow-trained SNN, and then perform backpropagation on the converted SNN<sup>[1](#line-1048)</sup>. Although this appears to degrade accuracy (reported on CIFAR-10 and ImageNet), it is possible to reduce the required number of steps by an order of magnitude. A more rigorous treatment of shadow training techniques and challenges can be found in<sup>[1](#line-1067)</sup>.

### Backpropagation Using Spike Times 
An alternative method to side step the dead neuron problem is to instead take the derivative at spike times. In fact, this was the first proposed method to training multi-layer SNNs using backpropagation<sup>[1](#line-965)</sup>. The original approach in _SpikeProp_ observes that while spikes may be discontinuous, time is continuous. Therefore, taking the derivative of spike _timing_ with respect to the weights achieves functional results. A thorough description is provided in <a href='#app-c1'>app-c1</a>.

> <span class='font-bold text-xl'>Practical Note: Gradients at Spike Times</span>
> 
> This approach continues to be widely researched, but has taken a back seat to backpropagation through time using surrogate gradient descent, as it does not perform as well at optimizing a loss function. Why is this? Our best guess is the lower performance occurs because there are fewer edges to backpropagate errors through, making credit assignment more challenging. More details on surrogate gradient descent in the following section.

Intuitively, SpikeProp calculates the gradient of the error with respect to the spike time. A change to  the weight by $\Delta W$ causes a change of the membrane potential by $\Delta U$, which ultimately results in a change of spike timing by $\Delta f$, where $f$ is the firing time of the neuron. In essence, the non-differentiable term $\partial S/ \partial U$ has been traded with $\partial f/\partial U$. This also means that each neuron _must_ emit a spike for a gradient to be calculable. This approach is illustrated in <a href='#fig-5'>fig-5</a>(c). Extensions of SpikeProp have made it compatible with multiple spikes<sup>[1](#line-1077)</sup>, which are highly performant on data-driven tasks some of which have surpassed human level performance on MNIST and N-MNIST<sup>[1](#line-827)</sup> <sup>[2](#line-1520)</sup> <sup>[3](#line-1133)</sup> <sup>[4](#line-1530)</sup>.

Several drawbacks arise. Once neurons become inactive, their weights become frozen. In most instances, no closed-form solutions exist to solving for the gradient if there is no spiking<sup>[1](#line-1670)</sup>. SpikeProp tackles this by modifying parameter initialization (i.e., increasing weights until a spike is triggered). But since the inception of SpikeProp in 2002, the deep learning community's understanding of weight initialization has gradually matured. We now know initialization aims to set a constant activation variance between layers, the absence of which can lead to vanishing and exploding gradients through space and time<sup>[1](#line-847)</sup> <sup>[2](#line-976)</sup>. Modifying weights to promote spiking may detract from this. Instead, a more effective way to overcome the lack of firing is to lower the firing thresholds of the neurons. One may consider applying activity regularization to encourage firing in hidden layers, though this has degraded classification accuracy when taking the derivative at spike times. This result is unsurprising, as regularization can only be applied at the spike time rather than when the neuron is quiet. 

Another challenge is that it enforces stringent priors upon the network (e.g., each neuron must fire only once) that are incompatible with dynamically changing input data. This may be addressed by using periodic temporal codes that refresh at given intervals, in a similar manner to how visual saccades may set a reference time. But it is the only approach that enables the calculation of an unbiased gradient without any approximations in multi-layer SNNs. Whether this precision is necessary is a matter of further exploration on a broader range of tasks. 
### Backpropagation Using Spikes

<div class="flex items-center justify-center">{{< image src="figures/fig_bptt3.png" caption="Backpropagation through time. (a) The present time application of $W$ is referred to as the immediate influence, with historical application of $W$ described as the prior influence. Reset dynamics and explicit recurrence have been omitted for brevity. The error pathways through $\mathcal{L}[0]$ and $\mathcal{L}[1]$ are also hidden but follow the same idea as that of $\mathcal{L}[2]$. (b) The hybrid approach defaults to a non-zero gradient only at spike times. For present time $t=0$, the derivative of each application of $W[s]$ with respect to the loss decays exponentially moving back in time. The magnitude of the weight update $\Delta W$ for prior influences of $W[s]$ follows a relationship qualitatively resembling that of STDP learning curves, where the strength of the synaptic update is dependent on the order and firing time of a pair of connected neurons<sup>[1](#line-441)</sup>. " >}}</div>


Instead of computing the gradient with respect to spike times, the most commonly adopted approach over the past several years is to apply the generalised backpropagation algorithm to the unrolled computational graph (<a href='#fig-2-5'>fig-2-5</a>(b))<sup>[1](#line-1004)</sup> <sup>[2](#line-505)</sup> <sup>[3](#line-1503)</sup> <sup>[4](#line-785)</sup> <sup>[5](#line-1444)</sup>, i.e., backpropagation through time (BPTT). Working backwards from the final output of the network, the gradient flows from the loss to all descendants. In this way, computing the gradient through an SNN is mostly the same as that of an RNN by iterative application of the chain rule. <a href='#fig-bptt'>fig-bptt</a>(a) depicts the various pathways of the gradient $\partial \mathcal{L}/\partial W$ from the parent ($\mathcal{L}$) to its leaf nodes ($W$). In contrast, backprop using spike times only follows the gradient pathway whenever a neuron fires, whereas this approach takes every pathway regardless of the neuron firing. The final loss is the sum of instantaneous losses $\sum_t \mathcal{L}[t]$, though the loss calculation can take a variety of other forms as described in <a href='#sec-obj'>sec-obj</a>.

Finding the derivative of the total loss with respect to the parameters allows the use of gradient descent to train the network, so the goal is to find $\partial\mathcal{L}/\partial W$. The parameter $W$ is applied at every time step, and the application of the weight at a particular step is denoted $W[s]$. Assume an instantaneous loss $\mathcal{L}[t]$ can be calculated at each time step (taking caution that some objective functions, such as the mean square spike rate loss (<a href='#sec-3sro'>sec-3sro</a>), must wait until the end of the sequence to accumulate all spikes and generate a loss). As the forward pass requires moving data through a directed acyclic graph, each application of the weight will only affect present and future losses. The influence of $W[s]$ on $\mathcal{L}[t]$ at $s=t$ is labelled the _immediate influence_ in <a href='#fig-bptt'>fig-bptt</a>(a). For $s<t$, we refer to the impact of $W[s]$ on $L[t]$ as the _prior influence_. The influence of all parameter applications on present and future losses are summed together to define the global gradient:

$$   \frac{\partial \mathcal{L}}{\partial W} = \sum\_t \frac{\partial \mathcal{L}[t]}{\partial W} = \sum\_t \sum\_{s\leq t}\frac{\partial \mathcal{L}[t]}{\partial W[s]} \frac{\partial W[s]}{\partial W}  $$

A recurrent system will constrain the weight to be shared across all steps: $W[0]=W[1]=\cdots=W$. Therefore, a change in $W[s]$ will have an equivalent effect on all other values of $W$, which suggests that $\partial W[s]/\partial W=1$, and <a href='#eq-bptt'>eq-bptt</a> simplifies to:

$$  \frac{\partial \mathcal{L}}{\partial W} = \sum\_t \sum\_{s\leq t}\frac{\partial \mathcal{L}[t]}{\partial W[s]}  $$

> <span class='font-bold text-xl'>Practical Note: Do I need to remember all of this to use SNNs?</span>
> 
>   Thankfully, gradients rarely need to be calculated by hand as most deep learning packages come with an automatic differentiation engine. Using SNNs does not require an intricate knowledge of the internals. But advancing SNN research most certainly does!

Isolating the immediate influence at a single time step as in <a href='#fig-5'>fig-5</a>(d) makes it clear that we run into the spike non-differentiability problem in the term $\partial S/\partial U \in \{0, \infty\}$. The act of thresholding the membrane potential is functionally equivalent to applying a shifted Heaviside operator, which is non-differentiable.

The solution is actually quite simple. During the forward pass, as per usual, apply the Heaviside operator to $U[t]$ in order to determine whether the neuron spikes. But during the backward pass, substitute the Heaviside operator with a continuous function, $\tilde{S}$ (e.g., sigmoid). The derivative of the continuous function is used as a \textbf{}substitute $\partial S/\partial U \leftarrow \partial \tilde{S}/\partial U$, and is known as the surrogate gradient approach (<a href='#fig-5'>fig-5</a>(d)). 

#### Surrogate Gradients

A major advantage of surrogate gradients is they help with overcoming the dead neuron problem. To make the dead neuron problem more concrete, consider a neuron with a threshold of $\theta$, and one of the following cases occurs:

1. The membrane potential is below the threshold: $U < \theta$
1. The membrane potential is above the threshold: $U > \theta$
1. The membrane potential is exactly at the threshold: $U = \theta$

In Case 1, no spike is elicited, and the derivative would be $\partial S/\partial U_{U<\theta}=0$. In Case 2, a spike would fire, but the derivative remains $\partial S/\partial U_{U>\theta}=0$. Applying either of these to the chain of equations in <a href='#fig-5'>fig-5</a>(a) will null $\partial\mathcal{L}/\partial W=0$. In the improbable event of Case 3, $\partial S/\partial U_{U=\theta}=\infty$, which swamps out any meaningful gradient when applied to the chain rule\footnote{Whether or not a spike occurs in Case 3 depends on your code implementation.}. But approximating the gradient, $\partial \tilde{S}/\partial U$, solves this.

One example is to replace the non-differentiable term with the threshold-shifted sigmoid function, but only during the backward pass. This is illustrated in <a href='#fig-5'>fig-5</a>(d). More formally:

$$  \sigma (\cdot) = \frac{1}{1+e^{\theta-U}},  $$

and therefore,

$$  \frac{\partial S}{\partial U} \leftarrow \frac{\partial \tilde{S}}{\partial U} =  \sigma '(\cdot) = \frac{e^{\theta - U}}{(e^{\theta-U}+1)^2}.  $$

This means learning only takes place if there is spiking activity. Consider a synaptic weight attached to the input of a spiking neuron, $W_{\rm in}$ and another weight at the output of the same neuron, $W_{\rm out}$. Say the following sequence of events occurs:

<div class="flex items-center justify-center">{{< image src="figures/forward-pass.png" caption="Sequence of steps during the forward pass." >}}</div>
 

1. An input spike, $S_{\rm in}$ is scaled by $W_{\rm in}$
1. The weighted spike is added as an input current injection to the spiking neuron (<a href='#eq-2'>eq-2</a>)
1. This may cause the neuron to trigger a spike, $S_{\rm out}$
1. The output spike is weighted by the output weight $W_{\rm out}$
1. This weighted output spike varies some arbitrary loss function, $\mathcal{L}$

Let the loss function be the Manhattan distance between a target value $y$ and the weighted spike:

$$  \mathcal{L} = | W\_{\rm out} S\_{\rm out} - y|,  $$

where updating $W_{\rm out}$ requires:

$$  \frac{\partial \mathcal{L}}{\partial W\_{\rm out}} = S\_{\rm out}  $$

More generally: **a spike must be triggered for a weight to be updated.** The surrogate gradient does not change this.

Now consider the case for updating $W_{\rm in}$, where the following derivative must be calculated:

$$  \frac{\partial \mathcal{L}}{\partial W\_{\rm in}} = \underbrace{\frac{\partial \mathcal{L}}{\partial S\_{\rm out}}}\_{A} \underbrace{\frac{\partial S\_{\rm out}}{\partial U\_{}}}\_{B} \underbrace{\frac{\partial U}{\partial W\_{\rm in}}}\_{C}  $$

*  **Term A** is simply $W_{\rm out}$ based on the above equation for $\mathcal{L}$
*  **Term B** would almost always be 0, unless substituted for a surrogate gradient
*  **Term C** is $S_{\rm in}$ (see <a href='#eq-2'>eq-2</a> where $X=S_{\rm in}$)

To summarize: the surrogate gradient enables errors to propagate to earlier layers, regardless of spiking. **But spiking is still needed to trigger a weight update.**

> <span class='font-bold text-xl'>Practical Note: The \'Best' Surrogate Gradient?</span>
> 
> Various work empirically explore different surrogate gradients. These include triangular functions, fast sigmoid and sigmoid functions, straight-through estimators, and various other weird shapes. Is there a best surrogate gradient? In our experience, we have found the following function to be the best starting point:
> 
> $$  \frac{\partial\tilde{S}}{\partial U} = \frac{1}{\pi} \frac{1}{1+(\pi U)^2}  $$
> 
> You might see this referred to as the \'arctan' surrogate gradient, first proposed in Ref.<sup>[1](#line-863)</sup>. This is because the integral of this function is:
> 
> $$  \tilde{S} = \frac{1}{\pi}{\rm arctan}(\pi U)  $$
> 
> As of 2023, this is the default surrogate gradient in snnTorch. We have no idea why it works so well.

To reiterate, surrogate gradients will not enable learning in the absence of spiking. This provokes an important distinction between the dead neuron problem and the vanishing gradient problem. A dead neuron is one that does not fire, and therefore does not contribute to the loss. This means the weights attached to that neuron have no \'credit' in the credit assignment problem. The relevant gradient terms during the training process will remain at zero. Therefore, the neuron cannot learn to fire later on and so is stuck _forever_, not contributing to learning.

On the other hand, vanishing gradients can arise in ANNs as well as SNNs. For deep networks, the gradients of the loss function can become vanishingly small as they are successively scaled by values less than \'1' when using several common activation functions (e.g., a sigmoid unit). In much the same way, RNNs are highly susceptible to vanishing gradients because they introduce an additional layer to the unrolled computational graph at each time step. Each layer adds another multiplicative factor in calculating the gradient, which makes it susceptible to vanishing if the factor is less than \'1', or exploding if greater than \'1'. The ReLU activation became broadly adopted to reduce the impact of vanishing gradients, but remains underutilised in surrogate gradient implementations<sup>[1](#line-847)</sup>.

Surrogate gradients do not need to be explicitly defined in snnTorch as the arctan surrogate is applied by default. But the following code snippet shows how you might use an alternative with a leaky integrate-and-fire neuron:

```python
import snntorch as snn
from snntorch import surrogate

lif_1 = snn.Leaky(beta=0.9, spike_grad=surrogate.fast_sigmoid())
lif_2 = snn.Leaky(beta=0.9, spike_grad=surrogate.sigmoid())
lif_3 = snn.Leaky(beta=0.9, spike_grad=surrogate.straight_through_estimator())
lif_4 = snn.Leaky(beta=0.9, spike_grad=surrogate.triangular())
```

Surrogate gradients have been used in most state-of-the-art experiments that natively train an SNN<sup>[1](#line-1004)</sup> <sup>[2](#line-505)</sup> <sup>[3](#line-1503)</sup> <sup>[4](#line-785)</sup> <sup>[5](#line-1444)</sup>. A variety of surrogate gradient functions have been used to varying degrees of success, and the choice of function can be treated as a hyperparameter. 
While several studies have explored the impact of various surrogates on the learning process<sup>[1](#line-756)</sup> <sup>[2](#line-1451)</sup>, our understanding tends to be limited to what is known about biased gradient estimators. There is a lot left unanswered here. For example, if we can get away with approximating gradients, then perhaps surrogate gradients can be used in tandem with random feedback alignment. This involves replacing weights with random matrices during the backward pass. Rather than pure randomness, perhaps local approximations can be made that follow the same spirit of a surrogate gradient.

In summary, taking the gradient only at spike times provides an unbiased estimator of the gradient, at the expense of losing the ability to train dead neurons. Surrogate gradient descent flips this around, enabling dead neurons to backpropagate error signals by introducing a biased estimator of the gradient. There is a tug-of-war between bringing dead neurons back to life and introducing bias. Given how prevalent surrogate gradients have become, we will linger a little longer on the topic in describing their relation to model quantization. Understanding how approximations in gradient descent impacts learning will very likely lead to a deeper understanding of why surrogate gradients are so effective, how they might be improved, and how backpropagation can be simplified by making approximations that reduce the cost of training without harming an objective.

#### The Link Between Surrogate Gradients and Quantized Neural Networks
Surrogate gradients have been around under a few disguises for over a decade now. Hinton overcame the challenge of thresholding activations and weights in binarized neural networks by simply ignoring them during the backward pass<sup>[1](#line-1161)</sup>. He coined the term, \'straight-through-estimator', as the gradient passes \'straight through' the non-differentiable operator. Equivalently, this is like setting the surrogate gradient to be $\partial \tilde{S}/\partial U=1$. The exact same methodology is applied when training quantized neural networks<sup>[1](#line-1168)</sup> <sup>[2](#line-1177)</sup>.

> <span class='font-bold text-xl'>A Brief History of Surrogate Gradients</span>
> 
> A couple of years after Hinton introduced the straight-through-estimator, Hunsberger and Eliasmith used \'softened' functions for the firing rate of a leaky integrator neuron, making them amenable to backpropagation. Lee, Delbruck and Pfeiffer subsequently provided the first demonstration of approximating the backward path of spike signals in 2016<sup>[1](#line-1232)</sup>. This is akin to what we presently do today. But Shrestha and Orchard were the first to release code that was compatible PyTorch with SLAYER in 2018, where a fast sigmoid gradient was used on the backward pass<sup>[1](#line-505)</sup>. 2019 is when the term \'surrogate gradient' was coined by Zenke, Mostafa and Neftci<sup>[1](#line-1451)</sup>, and Zenke's codebase _SpyTorch_ showed how features in PyTorch could be used to implement gradient approximations very easily<sup>[1](#line-841)</sup>. This spawned a proliferation of various applications, projects and libraries, including snnTorch, that continue to extend these techniques.

Training quantized neural networks involves adjusting the weights and activations to use lower-precision fixed-point representations while maintaining acceptable performance and accuracy<sup>[1](#line-1188)</sup> <sup>[2](#line-1198)</sup>. Quantized-fixed point arithmetic requires fewer computational resources and lower memory storage compared to floating-point arithmetic, and commonly used in accelerators, both neuromorphic and otherwise, as a result. Several methods have been proposed to construct quantized neural networks, and they can be broadly categorized into the following approaches:

1. **Post-training quantization:** A neural network is first trained using standard floating-point arithmetic. Once training is complete, the weights and activations are quantized to lower-precision fixed-point representations.
1. raining quantization is simple to implement and computationally efficient, but it may result in a significant loss of accuracy for certain models or tasks.
1. **Quantization-aware training:** This method involves training the neural network with quantization built into the forward pass during the training process. The quantization process is non-differentiable, and is thus ignored during the gradient calculation step by applying Hinton's straight-through-estimator. The weight update is applied to the full precision weight, which is quantized only during the forward-pass. This allows the model to learn how to compensate for the quantization errors during training, leading to better performance and accuracy compared to post-training quantization. However, quantization-aware training is more computationally intensive and may require modifications to the training algorithm<sup>[1](#line-1209)</sup>.
1. **Mixed-precision training:** Different parts of the neural network use different levels of numerical precision. For example, the forward pass may use lower-precision fixed-point arithmetic, while the backward pass and weight updates use higher-precision floating-point arithmetic. This approach can help maintain the benefits of reduced computational complexity and memory requirements while minimizing the impact on model accuracy<sup>[1](#line-1216)</sup>.
1. **Binary and ternary neural networks:** These are extreme cases of quantized neural networks, where the weights and activations are quantized to binary or ternary values, typically {-1, 0, 1} for ternary networks and {-1, 1} for binary networks. Training such networks often involves learning a real-valued scaling factor alongside the binary or ternary weights to improve the model's expressive power. These ultra-low precision networks can significantly reduce computational requirements and power consumption, but they may suffer from reduced accuracy or increased model complexity.

Several studies have shown that SNNs are extremely robust to quantization when quantization-aware training is used. In the extreme case, binarized weights appeared to have a far weaker impact on a range of classification problems than an equivalent non-spiking neural network. Our working theory is because approximations and truncation errors are likely to be absorbed in the sub-threshold dynamics of the neuron<sup>[1](#line-1168)</sup> <sup>[2](#line-1177)</sup>.

The following code sample shows the use of the Python library, _Brevitas_, in constructing quantized SNNs. Brevitas already accounts for the straight-through-estimator gradient during training so the developer does not need to make any modifications during the backward-pass<sup>[1](#line-1223)</sup>. It should be noted that this approach models a reduced precision network, but does not represent variables in a reduced precision format.
```python
import snntorch as snn
import torch.nn as nn
import brevitas.nn as qnn

# full precision model
net = nn.Sequential(nn.Linear(784, 10),
                    snn.Leaky(beta=0.9, init_hidden=True))

# quantized model
num_bits = 8
quant_net = nn.Sequential(qnn.QuantLinear(784, 10, weight_bit_width=num_bits),
                          snn.Leaky(beta=0.9, init_hidden=True))
```

The above code snippets quantize weights and activations. The membrane potential and hidden states are often neglected, and post-quantized outside of the training process. State-based quantization aware training is also possible, where the membrane potential is discretized during the forward-pass. This is straightforward to account for in snnTorch by passing an argument to a neuron model, which triggers quantization of the membrane potential during the forward pass:

```python
from snntorch.functional import quant

# set the quantization parameters
q_lif = quant.state_quant(num_bits=4)

# state-quantized model
quant_net = nn.Sequential(qnn.QuantLinear(784, 10, weight_bit_width=num_bits),
                          snn.Leaky(beta=0.9, init_hidden=True, state_quant=q_lif))
```

> <span class='font-bold text-xl'>Practical Note: Quantization Ranges</span>
> 
> Say you have $N$ bits available to represent weights and states. How do you determine the range these $N$ bits should span? Weights will use the minimum and maximum full precision weight values as the range. States are a lesser explored in how they should best be represented, but our early experimental results indicate that for a normalized resting potential of $0$~V, negative values can be safely clipped. This provides positive states a finer resolution rather than wasting them on ranges that do not trigger spikes. Naturally, this does not hold true where inhibitory spikes can be triggered from negative thresholds.

#### A Bag of Tricks in BPTT with SNNs
Many advances in deep learning stem from a series of incremental techniques that bolster the learning capacity of models. These techniques are applied in conjunction to boost model performance. For example, He _et al._'s work in \'_Bag of tricks for image classification with convolutional neural networks_' not only captures the honest state of deep learning in the title alone, but also performs an ablation study of \'hacks' that can be combined to improve optimization during training<sup>[1](#line-1153)</sup>. Some of these techniques can be ported straight from deep learning to SNNs, while others are SNN specific. A non-exhaustive list of these techniques are provided in this section. These techniques are quite empirical and each bullet would have its own \'Practical Note' text box, but then this paper would just turn into a bunch of boxes.

*  **The reset mechanism** in <a href='#eq-2'>eq-2</a> is a function of the spike, and is also non-differentiable. It is important to ensure the surrogate gradient is not cloned into the reset function as it has been empirically shown to degrade network performance<sup>[1](#line-756)</sup>. Quite simply, we ignore it during the backward pass. snnTorch does this automatically by detaching the reset term in <a href='#eq-2'>eq-2</a> from the computational graph by calling the \'_.detach()_' function.
*  **Residual connections** work remarkably well for non-spiking nets and spiking models alike. Direct paths between layers are created by allowing the output of an earlier layer to be added to the output of a later layer, effectively skipping one or more layers in between. They are used to address the vanishing gradient problem and improve the flow of information during both forward and backward propagation, which enabled the neural network community to construct far deeper architectures, starting with the ResNet family of models and now commonly used in Transformers<sup>[1](#line-855)</sup>. Unsurprisingly, they work extremely well for SNNs, too<sup>[1](#line-863)</sup>.
*  **Learnable decay:** Rather than treating the decay rates of neurons as hyperparameters, it is also common practice to make them learnable parameters. This makes SNNs resemble conventional RNNs much more closely. Doing so has shown to improve testing performance on datasets with time-varying features<sup>[1](#line-103)</sup>.
*  **Graded Spikes:** Passive dendritic properties can attenuate action potentials, as can the cable-like properties of the axon. This feature can be coarsely accounted for as graded spikes. Each neuron has an additional learnable parameter that determines how to scale an output spike. Neuronal activations are no longer constrained to {1, 0}. Can this still be thought of as a SNN? From an engineering standpoint, if a spike must be broadcast to a variety of downstream neurons with a 8 or 16-bit destination address, then adding another several bits to the payload can be worth it. The 2nd generation Loihi chip from Intel Labs incorporates graded spikes in such a way that sparsity is preserved. Furthermore, the vector of learnt values scales linearly with the number of neurons in a network, rather than quadratically with weights. It therefore contributes a minor cost in comparison to other components of an SNN.
*  **Learnable Thresholds** have _not_ been shown to help the training process. This is likely due to the discrete nature of thresholds, giving rise to non-differentiable operators in a computational graph. On the other hand, normalizing the values that are passed into a threshold significantly helps. Adopting batch-normalization in convolutional networks helps boost performance, and learnable normalization approaches may act as an effective surrogate for learnable thresholds<sup>[1](#line-125)</sup> <sup>[2](#line-134)</sup> <sup>[3](#line-158)</sup>.
*  **Pooling** is effective for downsampling large spatial dimensions in convolutional networks, and achieving translational invariance. If max-pooling is applied to a sparse, spiking tensor, then tie-breaking between 1's and 0's does not make much sense. One might expect we can borrow ideas from training binarized neural networks, were pooling is applied to the activations _before_ they are thresholded to binarized quantities. This corresponds to applying pooling to the membrane potential, in a manner that resembles a form of \'local lateral inhibition'. But this does not necessarily lead to optimal performance in SNNs. Interestingly, Yu _et al._ applied pooling to the spikes instead. Where multiple spikes occurred in a pooling window, a tie-break would occur randomly among them<sup>[1](#line-863)</sup>. While no reason was given for doing this, it nonetheless achieved state-of-the-art (at the time) performance on a series of computer vision problems. Our best guess is that this randomness acted as a type of regularization. Whether max-pooling or average-pooling is used can be treated as a hyperparameter. As an alternative, SynSense's neuromorphic hardware adopts sum-pooling, where spatial dimensions are reduced by re-routing the spikes in a receptive field to a common post-synaptic neuron.
*  **Optimizer:** Most SNNs default to the Adam optimizer as they have classically been shown to be robust when used with sequential models<sup>[1](#line-143)</sup>. As SNNs become deeper, stochastic gradient descent with momentum seems to increase in prevalence over the Adam optimizer. The reader is referred to Godbole _et al._'s Deep Learning Tuning Playbook for a systematic approach to hyperparameter optimization that applies generally<sup>[1](#line-150)</sup>.
#### The Intersection Between Backprop and Local Learning  
An interesting result arises when comparing backpropagation pathways that traverse varying durations of time. The derivative of the hidden state over time is $\partial U[t]/\partial U[t-1]=\beta$ as per <a href='#eq-2'>eq-2</a>. A gradient that backpropagates through $n$ time steps is scaled by $\beta^n$. For a leaky neuron we get $\beta < 1$, which causes the magnitude of a weight update to exponentially diminish with time between a pair of spikes. This proportionality is illustrated in <a href='#fig-bptt'>fig-bptt</a>(b). This result shows how the strength of a synaptic update is exponentially proportional to the spike time difference between a pre- and post-synaptic neuron. In other words, weight updates from BPTT closely resemble weight updates from spike-timing dependent plasticity (STDP) learning curves (<a href='#app-bpus'>app-bpus</a>)<sup>[1](#line-441)</sup>.

Is this link just a coincidence? BPTT was derived from function optimization. STDP is a model of a biological observation. Despite being developed via completely independent means, they converge upon an identical result. This could have immediately practical implications, where hardware accelerators that train models can excise a chunk of BPTT and replace it with the significantly cheaper and local STDP rule. Adopting such an approach might be thought of as an online variant of BPTT, or as a gradient-modulated form of STDP.
### Long-Term Temporal Dependencies
Neural and synaptic time constants span timescales typically on the order of 1-100s of milliseconds. With such time scales, it is difficult to solve problems that require long-range associations that are larger than the slowest neuron or synaptic time constant. 
Such problems are common in natural language processing and reinforcement learning, and are key to understanding behavior and decision making in humans.
This challenge is a a huge burden on the learning process, where vanishing gradients drastically slow the convergence of the neural network.
LSTMs<sup>[1](#line-1462)</sup> and, later, GRUs<sup>[1](#line-1473)</sup> introduced slow dynamics designed to overcome memory and vanishing gradient problems in RNNs.
Thus, a natural solution for networks of spiking neurons is to complement the fast timescales of neural dynamics with a variety of slower dynamics.
Mixing discrete and continuous dynamics may enable SNNs to learn features that occur on a vast range of timescales. Examples of slower dynamics include:
*  **Adaptive thresholds:** After a neuron fires, it enters a refractory period during which it is more difficult to elicit further spikes from the neuron. This can be modeled by increasing the firing threshold of the neuron $\theta$ every time the neuron emits a spike. After a sufficient time in which the neuron has spiked, the threshold relaxes back to a steady-state value.
* Homeostatic thresholds are known to promote neuronal stability in correlated learning rules, such as STDP which favours long term potentiation at high frequencies regardless of spike timing<sup>[1](#line-1482)</sup> <sup>[2](#line-1492)</sup>. More recently, it has been found to benefit gradient-based learning in SNNs as well<sup>[1](#line-1503)</sup> (<a href='#app-c2'>app-c2</a>).
*  **Recurrent attention:** Hugely popularized from natural language generation, self-attention finds correlations between tokens of vast sequence lengths by feeding a model with all sequential inputs at once. This representation of data is not quite how the brain processes data. Several approaches have approximated self-attention into a sequence of recurrent operations, where SpikeGPT is the first application in the spiking domain and successfully achieved language generation<sup>[1](#line-1847)</sup>. In addition to more complex state-based computation, SpikeGPT additionally employs dynamical weights that vary over time.
*  **Axonal delays:** The wide variety of axon lengths means there is a wide range of spike propagation delays. Some neurons have axons as short as 1~mm, whereas those in the sciatic nerve can extend up to a meter in length. The axonal delay can be a learned parameter spanning multiple time steps<sup>[1](#line-505)</sup> <sup>[2](#line-1510)</sup> <sup>[3](#line-1541)</sup>. A lesser explored approach accounts for the varying delays in not only axons, but also across the dendritic tree of a neuron. Coupling axonal and dendritic delays together allows for a fixed delay per synapse.
*  **Membrane Dynamics:**
* We already know how the membrane potential can trigger spiking, but how does spiking impact the membrane? Rapid changes in voltage cause an electric field build-up that leads to temperature changes in cells. Joule heating scales quadratically with voltage changes, which affects the geometric structure of neurons and cascades into a change in membrane capacitance (and thus, time constants). Decay rate modulation as a function of spike emission can act as a second-order mechanism to generate neuron-specific refractory dynamics.
*  **Multistable Neural Activity:**
* Strong recurrent connections in biological neural networks can support multistable dynamics<sup>[1](#line-1679)</sup>, which facilitates stable information storage over time. Such dynamics, often called attractor neural networks<sup>[1](#line-1698)</sup>, are believed to underpin working memory in the brain<sup>[1](#line-1687)</sup> <sup>[2](#line-1725)</sup>, and is often attributed to the prefrontal cortex. The training of such networks using gradient descent is challenging, and has not been attempted using SNNs as of yet<sup>[1](#line-1719)</sup>.

Several rudimentary slow timescale dynamics have been tested in gradient-based approaches to training SNNs with a good deal of success<sup>[1](#line-505)</sup> <sup>[2](#line-1503)</sup>, but there are several neuronal dynamics that are yet to be explored. LSTMs showed us the importance of temporal regulation of information, and effectively cured the short-term memory problem that plagued RNNs. Translating more nuanced neuronal features into gradient-based learning frameworks can undoubtedly strengthen the ability of SNNs to represent dynamical data in an efficient manner.

## Online Learning
### Temporal Locality
As incredible as our brains are, sadly, they are not time machines. It is highly unlikely our neurons are breaching the space-time continuum to explicitly reference historical states to run the BPTT algorithm.
As with all computers, brains operate on a physical substrate which dictates the operations it can handle and where memory is located. While conventional computers operate on an abstraction layer, memory is delocalised and communicated on demand, thus paying a considerable price in latency and energy. 
Brains are believed to operate on local information, which means the best performing approaches in temporal deep learning, namely BPTT, are biologically implausible. 
This is because BPTT requires the storage of the past inputs and states in memory. As a result, the required memory scales with time, a property which limits BPTT to small temporal dependencies.
To solve this problem, BPTT assumes a finite sequence length before making an update, while truncating the gradients in time. 
This, however, severely restricts the temporal dependencies that can be learned.

The constraint imposed on brain-inspired learning algorithms is that the calculation of a gradient should, much like the forward pass, be temporally local, \emph{i.e.} that they only depend on values available at either present time $t$ or $t-1$. To address this, we turn to online algorithms that adhere to _temporal locality_. Real-time recurrent learning (RTRL) proposed back in 1989 is one prominent example. 

### Real-Time Recurrent Learning
RTRL estimates the same gradients as BPTT, but relies on a set of different computations that make it temporally, but not spatially, local<sup>[1](#line-1552)</sup>. 
Since RTRL's memory requirement does not grow with time, then why is it not used in favour of BPTT? BPTT's memory usage scales with the product of time and the number of neurons; it is $\mathcal{O}(nT)$. For RTRL, an additional set of computations must be introduced to enable the network to keep track of a gradient that evolves with time. These additional computations result in a $\mathcal{O}(n^3)$ memory requirement, which often exceeds the demands of BPTT. But the push for continuously-learning systems that can run indefinitely long has cast a spotlight back on RTRL (and variants<sup>[1](#line-1563)</sup> <sup>[2](#line-1570)</sup> <sup>[3](#line-1579)</sup> <sup>[4](#line-1586)</sup> <sup>[5](#line-1596)</sup>), with a focus on improving computational and memory efficiency.

Let us derive what new information needs to be propagated forward to enable real-time gradient calculation for an SNN. As in <a href='#eq-bptt2'>eq-bptt2</a>, let $t$ denote real time in the calculation of $\partial\mathcal{L}/\partial W$, and let the instantaneous loss $\mathcal{L}[t]$ be a measure of how well the instantaneously predicted output $\hat{Y}[t]$ matches the target output $Y[t]$. Depending on the type of loss function in use, $\hat{Y}[t]$ might simply be the spike output of the final layer $S_{\rm out}[t]$ or the membrane potential $U[t]$.
In either case, $\partial\mathcal{L}[t]/U[t]$ does not depend on any values that are not present at $t$, so it is natural to calculate this term in an online manner. The key problem is deriving $\partial U[t]/\partial W$ such that it only relies on values presently available at $t-1$ and $t$.

First we define the influence of parameter $W$ on the membrane potential $U[t]$ as $m[t]$, which serves to track the derivative of the present-time membrane potential with respect to the weight. We then unpack it by one time step: 

$$   m[t] = \frac{\partial U[t]}{\partial W} = \sum\_{s\leq t}\frac{\partial U[t]}{\partial W[s]} = \underbrace{\sum\_{s\leq t-1}\frac{\partial U[t]}{\partial W[s]}}\_{\text{\rm prior}} + \underbrace{\frac{\partial U[t]}{\partial W[t]}}\_{\text{\rm immediate}}  $$

The immediate and prior influence components are graphically illustrated in <a href='#fig-bptt'>fig-bptt</a>(a). The immediate influence is also natural to calculate online, and evaluates to the unweighted input to the neuron $X[t]$. The prior influence relies on historical components of the network:

$$  \sum\_{s\leq t-1}\frac{\partial U[t]}{\partial W[s]} = \sum\_{s\leq t-1}\underbrace{\frac{\partial U[t]}{\partial U[t-1]}}\_{\text{\rm temporal}}\frac{\partial U[t-1]}{\partial W[s]}  $$

Based on <a href='#eq-2'>eq-2</a>, in the absence of explicitly recurrent connections, the temporal term evaluates to $\beta$. From <a href='#eq-inf'>eq-inf</a>, the second term is the influence of parameters on $U[t-1]$, which is by definition $m[t-1]$. Substituting these back into <a href='#eq-inf'>eq-inf</a> gives:

$$  m[t] = \beta m[t-1] + x[t]  $$

This recursive formula is updated by passing the unweighted input directly to $m[t]$, and recursively decaying the influence term by the membrane potential decay rate $\beta$. The gradient that is ultimately used with the optimizer can be derived with the chain rule:

$$  \frac{\partial\mathcal{L}[t]}{\partial W} = \frac{\partial \mathcal{L}[t]}{\partial U[t]}\frac{\partial U[t]}{\partial W} \equiv \bar{c}[t] m[t]  $$

where $\bar{c}[t]=\partial \mathcal{L}[t]/\partial U[t]$ is the immediate credit assignment value obtained by backpropagating the instantaneous loss to the hidden state of the neuron, for example, by using a surrogate gradient approach. The calculation of $m[t]$ only ever depends on present time inputs and the influence at $t-1$, thus enabling the loss to be calculated in an online manner. The input spike now plays a role in not only modulating the membrane potential of the neuron, but also the influence $m[t]$. The general flow of gradients is depicted in <a href='#fig-rtrl'>fig-rtrl</a>.

An intuitive, though incomplete, way to think about RTRL is as follows. By reference to <a href='#fig-rtrl'>fig-rtrl</a>, at each time step, a backward-pass that does not account for the history of weight updates is applied: $\partial \mathcal{L}[0]/\partial W[0]$ (the immediate influence). Rather than directing gradients backwards through time, the partial derivative $\partial U[0]/\partial W[0]$ is \'pushed' forward in time. In doing so, it is scaled by the temporal term, $X[0]\beta$. This term modulates the immediate influence at the next time step. This can be thought of as a gradient term that \'snowballs' forward in time as a result of modulating and accumulating with the immediate influence term, but also loses a bit of \'momentum' every time the temporal term $\beta$ decays it.

<div class="flex items-center justify-center">{{< image src="figures/rtrl.png" caption="Real-time recurrent learning gradient pathways. The node for synaptic current, $I$, has been removed as it does not alter the result here." >}}</div>


In the example above, the RTRL approach to training SNNs was only derived for a single neuron and a single parameter. A full scale neural network replaces the influence value with an influence matrix $\boldsymbol{M}[t]\in\mathbb{R}^{n\times P}$, where $n$ is the number of neurons and $P$ is the number of parameters (approximately $\mathcal{O}(n^2$) memory). Therefore, the memory requirements of the influence matrix scales with $\mathcal{O}(n^3)$.

Recent focus in online learning aims to reduce the memory and computational demands of RTRL. This is generally achieved by decomposing the influence matrix into simpler parts, approximating the calculation of $\boldsymbol{M}[t]$ by either completely removing terms or trading them for stochastic noise instead<sup>[1](#line-1563)</sup> <sup>[2](#line-1570)</sup> <sup>[3](#line-1579)</sup> <sup>[4](#line-1586)</sup>. Marschall~_et al._ provides a systematic treatment of approximations to RTRL in RNNs in<sup>[1](#line-1596)</sup>, and variations of online learning have been applied specifically to SNNs in<sup>[1](#line-817)</sup> <sup>[2](#line-806)</sup> <sup>[3](#line-1603)</sup>.

#### RTRL Variants in SNNs
Since 2020, a flurry of forward-mode learning algorithms have been tailored to SNNs. All such works either modify, re-derive, or approximate RTRL:

*  **e-prop (_Bellec et al., 2020**<sup>[1](#line-806)</sup>_): RTRL is combined with surrogate gradient descent. Recurrent spiking neurons are used where output spikes are linearly transformed and then fed back to the input of the same neurons. The computational graph is detached at the explicit recurrent operation, but retained for implicit recurrence (i.e., where membrane potential evolves over time). Projecting output spikes into a higher-dimensional recurrent space acts like a reservoir, though leads to biased gradient estimators that underperforms compared to BPTT.
*  **decolle (_Kaiser et al., 2020**<sup>[1](#line-817)</sup>_): \'Deep continuous online learning' also combines RTRL with surrogate gradient descent. This time, greedy local losses are applied at **every** layer<sup>[1](#line-1388)</sup>. As such, errors only need to be propagated back to a single layer at a time. This means that errors do not need to traverse through a huge network, which reduces the burden of the spatial credit assignment problem. This brings about two challenges: 1) not many problems can be cast into a form with definable local losses, and 2) greedy local learning prioritizes immediate gains without considering an overall objective.
*  **OSTL (_Bonhstingl et al., 2022**<sup>[1](#line-44)</sup>_): \'Online spatio-temporal learning' re-derives RTRL. The spatial components of backpropation and temporal components are factored into two separate terms; e.g., one that tracks the \'immediate' influence, and one that tracks the \'prior influence' from <a href='#eq-inf'>eq-inf</a>.
*  **ETLP (_Quintana et al., 2023**<sup>[1](#line-70)</sup>_): \'Event-based Three-Factor Local Plasticity' combines e-prop with direct random target projection (DRTP: Frenkel and Lefebvre, 2019,<sup>[1](#line-1406)</sup>). In other words, the weights in the final layer are updated based on an approximation of RTRL. Earlier layers are updated based on partial derivatives that do not rely on a global loss, and are spatially \'local' to the layer. Instead, the target output is used to modulate these gradients. This addresses spatial credit assignment by using signals from a target, rather than backpropagating gradients in the immediate influence term of <a href='#eq-inf'>eq-inf</a>. The cost is that it both inherits drawbacks from e-prop and DRTP. DRTP prioritizes immediate gains without considering an overall objective, similar to greedy local learning.
*  **OSTTP (_Ortner and Pes, et al., 2023**<sup>[1](#line-78)</sup>_): \'Online Spatiotemporal Learning with Target Projection' combines OSTL (functionally equivalent to RTRL) with DRTP. It inherits the drawbacks of DRTP, while addressing the spatial credit assignment problem.
*  **FPTT (_Kag, et al., 2021**<sup>[1](#line-85)</sup>_): \'Forward Propagation Through Time' considers RTRL for sequence-to-sequence models with time varying losses. A regularization term is applied to the loss at each step to ensure stability during the training process. _Yin et al._ subsequently applied FPTT to SNNs with more complex neuron models with richer dynamics<sup>[1](#line-94)</sup>.

This is a non-exhaustive list of RTRL alternatives, and can appear quite daunting at first. But all approaches effectively stem from RTRL. The dominant trends include:
1. Approximating RTRL to test how much of an approximation the training procedure can tolerate without completely failing<sup>[1](#line-806)</sup>
1. Replacing the immediate influence with global-modulation of a loss or target to address spatial credit assignment<sup>[1](#line-817)</sup> <sup>[2](#line-70)</sup> <sup>[3](#line-78)</sup>
1. Modifying the objective to promote stable training dynamics<sup>[1](#line-85)</sup>
1. Identifying similarities to biology by factorizing RTRL into eligibility traces and/or three-factor learning rules<sup>[1](#line-806)</sup> <sup>[2](#line-94)</sup> <sup>[3](#line-70)</sup>

Several RTRL-variants claim to outperform BPTT in terms of loss minimization, though we take caution with such claims as the two effectively become identical to BPTT for the case where weight updates are deferred to the end of a sequence. We also note caution with claims that suggest improvements over RTRL, as RTRL can be thought of as the most general case of forward-model learning applied to any generic architecture. Most reductions in computational complexity arise because they are narrowly considered for specific architectures, or otherwise introduce approximations into their models. In contrast, Tallec and Ollivier developed an \'unbiased online recurrent optimization' scheme where stochastic noise is used and ultimately cancelled out, leading to quadratic (rather than cubic) computational complexity with network size<sup>[1](#line-1563)</sup>.

#### Practical Considerations with RTRL

Several practical considerations should be accounted for when implementing online learning algorithms. For an approach that closely resembles BPTT, the gradient accumulated at the end of the sequence can be used to update the network, which is referred to as a \'deferred' update. Alternatively, it is possible to update the network more regularly as a gradient is consistently available. While this latter option is a more accurate reflection of  biological learning (i.e., training and inference are not decoupled processes), there are two issues that must be treated with care. Firstly, adaptive optimizers such as Adam naturally reduce the learning rate as parameters approach optimal values<sup>[1](#line-143)</sup>. When applying frequent updates on a given batch of data, future batches will have less influence on weight updates. The result is a learning procedure that assigns a higher weighting to early data than to later data. If the sampled data does not satisfy the i.i.d assumption, which is the case when a system experiences data in an online fashion, learning may not perform well. Secondly, the reverse problem is catastrophic forgetting where new information causes the network to forget what it has previously learnt<sup>[1](#line-1611)</sup>. This is especially problematic in real-time systems because a `\'real-world batch size is equal to 1''. Several approaches to overcome catastrophic forgetting in continual learning have been proposed, including using higher dimensional synapses<sup>[1](#line-1941)</sup>, ensembles of networks<sup>[1](#line-2024)</sup>, pseudo-replay<sup>[1](#line-1712)</sup>, and penalizing weights that change excessively fast<sup>[1](#line-2031)</sup>.

### Spatial Locality
While temporal locality relies on a learning rule that depends only on the present state of the network, spatial locality requires each update to be derived from a node immediately adjacent to the parameter. The biologically motivated learning rules described in <a href='#sec-bml'>sec-bml</a> address the spatial credit assignment problem by either replacing the global error signal with local errors, or replacing analytical/numerical derivatives with random noise<sup>[1](#line-1349)</sup>.

The more \'natural' approach to online learning is perceived to be via unsupervised learning with synaptic plasticity rules, such as STDP<sup>[1](#line-441)</sup> <sup>[2](#line-884)</sup> and variants of STDP (<a href='#app-bpus'>app-bpus</a>)<sup>[1](#line-894)</sup> <sup>[2](#line-905)</sup> <sup>[3](#line-916)</sup> <sup>[4](#line-926)</sup>. These approaches are directly inspired by experimental relationships between spike times and changes to synaptic conductance. Input data is fed to a network, and weights are updated based on the order and firing times of each pair of connected neurons (<a href='#fig-bptt'>fig-bptt</a>(b)). The interpretation is that if a neuron causes another neuron to fire, then their synaptic strength should be increased. If a pair of neurons appear uncorrelated, their synaptic strength should be decreased. It follows the Hebbian mantra of _\'neurons that fire together wire together'_<sup>[1](#line-996)</sup>.
There is a common misconception that backprop and STDP-like learning rules are at odds with one other, competing to be the long-term solution for training connectionist networks. On the one hand, it is thought that STDP deserves more attention as it scales with less complexity than backprop. STDP adheres to temporal and spatial locality, as each synaptic update only relies on information from immediately adjacent nodes. However, this relationship necessarily arises as STDP was reported using data from \'immediately adjacent' neurons. On the other hand, STDP fails to compete with backprop on remotely challenging datasets. But backprop was designed with function optimization in mind, while STDP emerged as a physiological observation. The mere fact that STDP is capable at all of obtaining competitive results on tasks originally intended for supervised learning (such as classifying the MNIST dataset), no matter how simple, is quite a wonder. Rather than focusing on what divides backprop and STDP, the pursuit of more effective learning rules will more likely benefit by understanding how the two intersect.

We demonstrated in <a href='#sec-hybrid'>sec-hybrid</a> how surrogate gradient descent via BPTT subsumes the effect of STDP. Spike time differences result in exponentially decaying weight update magnitudes, such that half of the learning window of STDP is already accounted for within the BPTT algorithm (<a href='#fig-bptt'>fig-bptt</a>(b)). Bengio _et al._ previously made the case that STDP resembles stochastic gradient descent, provided that STDP is supplemented with gradient feedback<sup>[1](#line-1628)</sup> <sup>[2](#line-1621)</sup>. This specifically relates to the case where a neuron's firing rate is interpreted as its activation. Here, we have demonstrated that no modification needs to be made to the BPTT algorithm for it to account for STDP-like effects, and is not limited to any specific neural code, such as the firing rate. The common theme is that STDP may benefit from integrating error-triggered plasticity to provide meaningful feedback to training a network<sup>[1](#line-2042)</sup>.
## Outlook
Designing a neural network was once thought to be strictly an engineering problem whereas mapping the brain was a scientific curiosity<sup>[1](#line-1635)</sup>. With the intersection between deep learning and neuroscience broadening, and brains being able to solve complex problems much more efficiently, this view is poised to change. 
From the scientist's view, deep learning and brain activity have shown many correlates, which lead us to believe that there is much untapped insight that ANNs can offer in the ambitious quest of understanding biological learning. For example, the activity across layers of a neural network have repeatedly shown similarities to experimental activity in the brain. This includes links between convolutional neural networks and measured activity from the visual cortex<sup>[1](#line-1900)</sup> <sup>[2](#line-1911)</sup> <sup>[3](#line-1922)</sup>, and auditory processing regions<sup>[1](#line-1930)</sup>. Activity levels across populations of neurons have been quantified in many studies, but SNNs might inform us of the specific nature of such activity. 

From the engineer's perspective, neuron models derived from experimental results have allowed us to design extremely energy-efficient networks when running on hardware tailored to SNNs<sup>[1](#line-1735)</sup> <sup>[2](#line-1746)</sup> <sup>[3](#line-1757)</sup> <sup>[4](#line-1768)</sup> <sup>[5](#line-1950)</sup> <sup>[6](#line-1056)</sup> <sup>[7](#line-2178)</sup>. Improvements in energy consumption of up to 2--3 orders of magnitude have been reported when compared to conventional ANN acceleration on embedded hardware, which provides empirical validation of the benefits available from the three S's: spikes, sparsity and static data suppression (or event-driven processing)<sup>[1](#line-335)</sup> <sup>[2](#line-579)</sup> <sup>[3](#line-364)</sup> <sup>[4](#line-1878)</sup> <sup>[5](#line-1889)</sup>. These energy and latency benefits are derived from simply applying neuron models to connectionist networks, but there is so much more left to explore.

It is safe to say the energy benefits afforded by spikes are uncontroversial. But a more challenging question to address is: are spikes actually good for computation? It could be that years of evolution determined spikes solved the long-range signal transmission problem in living organisms, and everything else had to adapt to fit this constraint. If this were true, then spike-based computation would be pareto optimal with a proclivity towards energy efficiency and latency. But until we amass more evidence of a spike's purpose, we have some intuition as to where spikes shine in computation:

*  **Hybrid Dynamical Systems:** SNNs can model a broad class of dynamical systems by coupling discrete and continuous time dynamics into one system. Discontinuities are present in many physical systems, and spiking neuron models are a natural fit to model such dynamics.
*  **Discrete Function Approximators:** Neural networks are universal function approximators, where discrete functions are considered to be modelled sufficiently well by continuous approximations. Spikes are capable of precisely defining discrete functions without approximation.
*  **Multiplexing:** Spikes can encode different information in spike rate, times, or burst counts. Re-purposing the same spikes offers a sensible way to condense the amount of computation required by a system.
*  **Message Packets:** By compressing the representation of information, spikes can be thought of as packets of messages that are unlikely to collide as they travel across a network. In contrast, a digital system requires a synchronous clock to signal that a communication channel is available for a message to pass through (even when modelling asynchronous systems).
*  **Coincidence Detection:** Neural information can be encoded based on spatially disparate but temporally proximate input spikes on a target neuron. It may be the case that isolated input spikes are insufficient to elicit a spike from the output neuron. But if two incident spikes occur on a timescale faster than the target neuron membrane potential decay rate, this could push the potential beyond the threshold and trigger an output spike. In such a case, associative learning is taking place across neurons that are not directly connected. Although coincidence detection can be programmed in a continuous-time system without spikes, a theoretical analysis has shown that the processing rate of a coincidence detector neuron is faster than the rate at which information is passed to a neuron<sup>[1](#line-1961)</sup> <sup>[2](#line-1972)</sup>.
*  **Noise Robustness:** While analog signals are highly susceptible to noise, digital signals are far more robust in long-range communication. Neurons seem to have figured this out by performing analog computation via integration at the soma, and digital communication along the axon. It is possible that any noise incident during analog computation at the soma is subsumed into the subthreshold dynamics of the neuron, and therefore eliminated. In terms of neural coding, a similar analogy can be made to spike rates and spike times. Pathways that are susceptible to adversarial attacks or timing perturbations could learn to be represented as a rate, which otherwise mitigates timing disturbances in temporal codes.
*  **Modality normalisation:** A unified representation of sensory input (e.g., vision, auditory) as spikes is nature's way of normalising data. While this benefit is not exclusive to spikes (i.e., continuous data streams in non-spiking networks may also be normalised), early empirical evidence has shown instances where multi-modal SNNs outperform convolutional neural networks on equivalent tasks<sup>[1](#line-579)</sup> <sup>[2](#line-335)</sup>.
*  **Mixed-mode differentiation:**
* While most modern deep learning frameworks rely on reverse-mode autodifferentiation<sup>[1](#line-1983)</sup>, it is in stark contrast to how the spatial credit assignment problem is treated in biological organisms.
* If we are to draw parallels between backpropagation and the brain, it is far more likely that approximations of forward-mode autodifferentation are being used instead. <a href='#eq-online'>eq-online</a> in <a href='#sec-ol'>sec-ol</a> describes how to propagate gradient-related terms forward in time to implement online learning, where such
* terms could be approximated by eligibility traces that keep track of pre-synaptic neuron activity in the form of calcium ions, and fades over time<sup>[1](#line-1992)</sup> <sup>[2](#line-806)</sup>. SNNs offer a natural way to use mixed-mode differentiation by projecting temporal terms in the gradient calculation from <a href='#eq-temp'>eq-temp</a> into the future via forward-mode differentation, while taking advantage of the computational complexity of reverse-mode autodifferentation for spatial terms<sup>[1](#line-817)</sup> <sup>[2](#line-1088)</sup>.

A better understanding of the types of problems spikes are best suited for, beyond addressing just energy efficiency, will be important in directing SNNs to meaningful tasks. The above list is a non-exhaustive start to intuit where that might be. Thus far, we have primarily viewed the benefits of SNNs by examining individual spikes. For example, the advantages derived from sparsity and single-bit communication arise at the level of an individual spiking neuron: how a spike promotes sparsity, how it contributes to a neural encoding strategy, and how it can be used in conjuction with modern deep learning, backprop, and gradient descent. Despite the advances yielded by this spike-centric view, it is important not to develop tunnel vision. New advances are likely to come from a deeper understanding of spikes acting collectively, much like the progression from atoms to waves in physics.

Designing learning rules that operate with brain-like performance is far less trivial than substituting a set of artificial neurons with spiking neurons. It would be incredibly elegant if a unified principle governed how the brain learns. But the diversity of neurons, functions, and brain regions imply that a heterogeneous system rich in objectives and synaptic update rules is more likely, and might require us to use all of the weapons in our arsenal of machine learning tools. It is likely that a better understanding of biological learning will be amassed by observing the behavior of a collection of spikes distributed across brain regions. Ongoing advances in procuring large-scale electrophysiological recordings at the neuron-level can give us a window into observing how populations of spikes are orchestrated to handle credit assignment so efficiently, and at the very least, give us a more refined toolkit to developing theories that may advance deep learning<sup>[1](#line-2127)</sup> <sup>[2](#line-2138)</sup>. After all, it was not a single atom that led to the silicon revolution, but rather, a mass of particles, and their collective fields. A stronger understanding of the computational benefits of spikes may require us to think at a larger scale, in terms of the \'fields' of spikes.

As the known benefits of SNNs manifest in the physical quantities of energy and latency, it will take more than just a machine learning mind to navigate the tangled highways of 100 trillion synapses. It will take a concerted effort between machine learning engineers, neuroscientists, and circuit designers to put spikes in the front seat of deep learning. 

## Acknowledgements
We would like to thank Sumit Bam Shrestha, Garrick Orchard, Albert Albesa Gonz\'alez and Ruijie Zhu for their insightful discussions over the course of putting together this paper, and iDataMap Corporation for their support.

## Additional Materials
A series of interactive tutorials complementary to this paper are available in the documentation for our Python package designed for gradient-based learning using spiking neural networks, _snnTorch_<sup>[1](#line-2017)</sup>, at the following link: <a href="https://snntorch.readthedocs.io/en/latest/tutorials/index.html">https://snntorch.readthedocs.io/en/latest/tutorials/index.html</a>.
\renewcommand\thefigure{S.\arabic{figure}}    
\setcounter{figure}{0}

## Appendix A: From Artificial to Spiking Neural Networks 
### Forward Euler Method to Solving Spiking Neuron Models
The time derivative $dU(t)/dt$ is substituted into <a href='#eq-1'>eq-1</a> without taking the limit $\Delta t \rightarrow 0$:

$$  \tau \frac{U(t+\Delta t) - U(t)}{\Delta t} = -U(t) + I\_{\rm in}(t)R  $$

For small enough values of $\Delta t$, this provides a sufficient approximation of continuous-time integration. Isolating the membrane potential at the next time step on the left side of the equation gives:

$$  U(t+\Delta t) = (1-\frac{\Delta t}{\tau})U(t) + \frac{\Delta t}{\tau}I\_{\rm in}(t)R  $$

To single out the leaky membrane potential dynamics, assume there is no input current $I_{\rm in}(t) = 0 A$:

$$   U(t+\Delta t) = (1-\frac{\Delta t}{\tau})U(t)  $$

Let the ratio of subsequent values of $U$, i.e., $U(t+\Delta t)/U(t)$ be the decay rate of the membrane potential, also known as the inverse time constant. From <a href='#aeq-2'>aeq-2</a>, this implies that $\beta = (1-\Delta t/\tau$). 

Assume $t$ is discretised into sequential time-steps, such that $\Delta t=1$. To further reduce the number of hyperparameters from <a href='#aeq-2'>aeq-2</a>, assume $R=1 \Omega$. This leads to the result in <a href='#eq-euler'>eq-euler</a>, where the following representation is shifted by one time step:

$$   \beta = (1-\frac{1}{\tau}) \implies U[t+1] = \beta U[t] + (1-\beta)I\_{\rm in}[t+1]  $$

The input current is weighted by $(1-\beta)$ and time-shifted by one step such that it can instantaneously contribute to membrane potential. While this is not a physiologically precise assumption, it casts the neuron model into a form that better resembles an RNN. $\beta$ can be solved using the continuous-time solution from <a href='#eq-generalsolution'>eq-generalsolution</a>. In absence of current injection:

$$  U(t) = U\_0e^{-t/\tau}  $$

where $U_0$ is the initial membrane potential at $t=0$. Assuming <a href='#aeq-init'>aeq-init</a> is computed at discrete steps of $t$, $(t+\Delta t)$, $(t+2\Delta t) ...$, then the ratio of membrane potential across two subsequent steps can be calculated using:

$$  \begin{split} \beta = &\frac{U\_0e^{-(t+\Delta t)/\tau}}{U\_0e^{-t/\tau}} = \frac{U\_0e^{-(t+2\Delta t)/\tau}}{U\_0e^{-(t+\Delta t)/\tau}} = ... \\\\ \implies & \beta = e^{-\Delta t/\tau} \end{split}  $$

It is preferable to calculate $\beta$ using <a href='#aeq-beta'>aeq-beta</a> rather than $\beta = (1-\Delta t/\tau$), as the latter is only precise for $\Delta t << \tau$. This result for $\beta$ can then be used in <a href='#aeq-2-2'>aeq-2-2</a>.

A second non-physiological assumption is made, where the effect of $(1-\beta)$ is absorbed by a learnable weight $W$:

$$   WX[t] = I\_{\rm in}[t]  $$

This can be interpreted the following way. $X[t]$ is an input voltage, spike, or unweighted current, and is scaled by the synaptic conductance $W$ to generate a current injection to the neuron. This leads to the following result:

$$  U[t+1] = \beta U[t] + WX[t+1]  $$

where the effects of $W$ and $\beta$ are decoupled, thus favouring simplicity over biological precision. 

To arrive at <a href='#eq-2'>eq-2</a>, a reset function is appended which activates every time an output spike is triggered. The reset mechanism can be implemented by either subtracting the threshold at the onset of a spike as in <a href='#eq-2'>eq-2</a>, or by forcing the membrane potential to zero:

$$  U[t+1] =\underbrace{\beta U[t]}\_{\text{\rm decay}} + \underbrace{WX[t]}\_{\text{\rm input}} - \underbrace{S\_{\rm out}(\beta U[t] + WX[t])}\_{\text{\rm reset-to-zero}}  $$

In general, reset-by-subtraction is thought to be better for performance as it retains residual superthreshold information, while reset-to-zero is more efficient as $U[t]$ will always be forced to zero when a spike is triggered. This has been formally demonstrated in ANN-SNN conversion approaches (<a href='#sec-shadow'>sec-shadow</a>), though has not yet been characterised for natively trained SNNs. The two approaches will converge for a small enough time window where $U[t]$ is assumed to increase in a finite period of time:

<div class="flex items-center justify-center">{{< image src="figures/supp/a1.png" caption="Reset by subtraction vs reset-to-zero. Threshold set to $\theta = 0.5$." >}}</div>


## Appendix B: Spike Encoding
The following spike encoding mechanisms and loss functions are described with respect to a single sample of data. They can be generalised to multiple samples as is common practice in deep learning to process data in batches. 

### Rate Coded Input Conversion 
An example of conversion of an input sample to a rate coded spike train follows. Let $\boldsymbol{X} \in \mathbb{R}^{m \times n}$, be a sample from the MNIST dataset, where $m=n=28$. We wish to convert $\boldsymbol{X}$ to a rate-coded 3-D tensor $\mathbf{R} \in \mathbb{R}^{m \times n \times t}$, where $t$ is the number of time steps. Each feature of the original sample $X_{ij}$ is encoded separately, where the normalised pixel intensity (between 0 and 1) is the probability a spike occurs at any given time step. This can be treated as a Bernoulli trial, a special case of the binomial distribution $R_{ijk}\sim B(n, p)$ where the number of trials is $n=1$, and the probability of success (spiking) is $p=X_{ij}$. Explicitly, the probability a spike occurs is:

$$  {\rm P}(R\_{ijk}=1) = X\_{ij} = 1 - {\rm P}(R\_{ijk}=0)  $$

Sampling from the Bernoulli distribution for every feature at each time step will populate the 3-D tensor $\mathbf{R}$ with 1's and 0's. For an MNIST image, a pure white pixel $X_{ij}=1$ corresponds to a 100\% probability of spiking. A pure black pixel $X_{ij}=0$ will never generate a spike. A gray pixel of value $X_{ij}=0.5$ will have an equal probability of sampling either a \'1' or a \'0'. As the number of time steps $t \rightarrow \infty$, the proportion of spikes is expected to approach 0.5. 

<div class="flex items-center justify-center">{{< image src="figures/supp/b1.png" caption="Rate coded input pixel. An input pixel of greater intensity corresponds to a higher firing rate." >}}</div>


### Latency Coded Input Conversion 
The logarithmic dependence between input feature intensity and spiking timing can be derived using an RC circuit model. Starting with the general solution of the membrane potential with respect to the input current in <a href='#eq-generalsolution'>eq-generalsolution</a> and nulling out the initial conditions $U_0=0$, we obtain:

$$  U(t) = I\_{\rm in}R(1 - e^{-t/\tau})  $$

For a constant current injection, $U(t)$ will exponentially relax towards a steady-state value of $I_{\rm in}R$. Say a spike is emitted when $U(t)$ reaches a threshold $\theta$. We solve for the time $U(t)=\theta$:

$$  t=\tau\Big[{\rm ln}\Big(\frac{I\_{\rm in}R}{I\_{\rm in}R-\theta}\Big)\Big]  $$

The larger the input current, the faster $U(t)$ charges up to $\theta$, and the faster a spike occurs. The steady-state potential, $I_{\rm in}R$ is set to the input feature $x$:

$$  t(x) = \begin{cases} \tau\Big[{\rm ln}\Big(\frac{x}{x-\theta}\Big)\Big], & x > \theta\\\\ \infty, & \text{otherwise} \\\\ \end{cases}    $$

<div class="flex items-center justify-center">{{< image src="figures/supp/b2.png" caption="Latency coded input pixel. An input pixel of greater intensity corresponds to an earlier spike time." >}}</div>


### Rate Coded Outputs 
A vectorised implementation of determining the predicted class from rate-coded output spike trains is described. Let $\vec{S}[t] \in \mathbb{R}^{N_C}$ be a time-varying vector that represents the spikes emitted from each output neuron across time, where $N_C$ is the number of output classes. Let $\vec{c}\in \mathbb{R}^{N_C}$ be the spike count from each output neuron, which can be obtained by summing $\vec{S[t]}$ over $T$ time steps:

$$  \vec{c} = \sum\_{j=0}^T\vec{S}[t]  $$

The index of $\vec{c}$ with the maximum count corresponds to the predicted class:

$$  \hat{y} = \arg\,max\_ic\_i  $$

<div class="flex items-center justify-center">{{< image src="figures/supp/b3.png" caption="Rate coded outputs. $\vec{c} \in \mathbb{R}^{N_C}$ is the spike count from each output neuron, where the example above shows the first neuron firing a total of 8 times. $\hat{y}$ represents the index of the predicted output neuron, where it indicates the first neuron is the correct class." >}}</div>


### Cross Entropy Spike Rate 
The spike count of the output layer $\vec{c}\in \mathbb{R}^{N_C}$ is obtained as in <a href='#beq-5'>beq-5</a>. $c_i$ is the $i^{th}$ element of $\vec{c}$, treated as the logits in the softmax function:
    
$$  p\_i=\frac{e^{c\_i}}{\sum\_{i=1}^{N\_C}e^{c\_i}}  $$

The cross entropy between $p_i$ and the target $y_i \in \{0,1\}^{N_C}$, which is a one-hot target vector, is obtained using:

$$  \mathcal{L}\_{CE} = \sum\_{i=0}^{N\_C}y\_i{\rm log}(p\_i)  $$

<div class="flex items-center justify-center">{{< image src="figures/supp/b4.png" caption="Cross Entropy Spike Rate. The target vector $\vec{y}$ specifies the correct class as a one-hot encoded vector." >}}</div>


 
### Mean Square Spike Rate
As in <a href='#beq-5'>beq-5</a>, the spike count of the output layer $\vec{c}\in \mathbb{R}^{N_C}$ is obtained. $c_i$ is the $i^{th}$ element of $\vec{c}$, and let $y_i\in \mathbb{R}$ be the target spike count over a period of time $T$ for the $i^{th}$ output neuron. The target for the correct class should be greater than that of incorrect classes:

$$  \mathcal{L}\_{MSE} = \sum\_i^{N\_C}(y\_i - c\_i)^2  $$

<div class="flex items-center justify-center">{{< image src="figures/supp/b5.png" caption="Mean Square Spike Rate. The target vector $\vec{y}$ specifies the total desired number of spikes for each class." >}}</div>


### Maximum Membrane
The logits $\vec{m}\in \mathbb{R}^{N_C}$ are obtained by taking the maximum value of the membrane potential of the output layer $\vec{U}[t]\in \mathbb{R}^{N_C}$ over time:

$$  \vec{m} = {\rm max}\_t\vec{U}[t]  $$
The elements of $\vec{m}$ replace $c_i$ in the softmax function from <a href='#beq-7'>beq-7</a>, with the cross entropy of the result measured with respect to the target label.

<div class="flex items-center justify-center">{{< image src="figures/supp/b6.png" caption="Maximum Membrane. The peak membrane potential for each neuron is used in the cross entropy loss function. This encourages the peak of the correct class to grow, while that of the incorrect class is suppressed. The effect of this is to promote more firing from the correct class and less from the incorrect class." >}}</div>


Alternatively, the membrane potential is summed over time to obtain the logits:

$$  \vec{m} = \sum\_t^T\vec{U}[t]  $$

### Mean Square Membrane
Let $y_{i}[t]$ be a time-varying value that specifies the target membrane potential of the $i^{th}$ neuron at each time step. The total mean square error is calculated by summing the loss for all $T$ time steps and for all $N_C$ output layer neurons:

$$  \mathcal{L}\_{MSE} = \sum\_i^{N\_C}\sum\_t^T(y\_i[t]-U[t])^2  $$

Alternatively, the time-varying target $y_{i}[t]$ can be replaced with a time-static target to drive the membrane potential of all neurons to a constant value. This can be an efficient implementation for a rate code, where the correct class target exceeds the threshold and all other targets are subthreshold values.

<div class="flex items-center justify-center">{{< image src="figures/supp/b10.png" caption="Mean Square Membrane. The membrane potential at each time step is applied to the mean square error loss function. This allows a defined membrane target. The example above sets the target at all time steps at the firing threshold for the correct class, and to zero for incorrect classes." >}}</div>


### Cross Entropy Latency Code
Let $\vec{f}\in\mathbb{R}^{N_C}$ be a vector containing the first spike time of each neuron in the output layer. Cross entropy minimisation aims to maximise the logit of the correct class and reduce the logits of the incorrect classes. However, we wish for the correct class to spike first, which corresponds to a smaller value. Therefore, a monotonically decreasing function must be applied to $\vec{f}$. A limitless number of options are available. The work in<sup>[1](#line-827)</sup> simply negates the spike times:

$$  \vec{f}:=-\vec{f}  $$

Taking the inverse of each element $f_i$ of $\vec{f}$ is also a valid option:
$$  f\_i := \frac{1}{f\_i}  $$

The new values of $f_i$ then replace $c_i$ in the softmax function from <a href='#beq-7'>beq-7</a>. <a href='#beq-12'>beq-12</a> must be treated with care, as it precludes spikes from occurring at $t=0$, otherwise $f_i \rightarrow \infty$.

<div class="flex items-center justify-center">{{< image src="figures/supp/b7.png" caption="Cross Entropy Latency Code. Applying the inverse (or negated) spike time to the cross entropy loss pushes the correct class to fire first, and incorrect classes to fire later." >}}</div>


### Mean Square Spike Time
The spike time(s) of all neurons are specified as targets. In the case where only the first spike matters, $\vec{f}\in\mathbb{R}^{N_C}$ contains the first spike time of each neuron in the output layer, $y_i\in \mathbb{R}$ is the target spike time for the $i^{th}$ output neuron. The mean square errors between the actual and target spike times of all output classes are summed together:

$$  \mathcal{L}\_{MSE} = \sum\_i^{N\_C}(y\_i - f\_i)^2  $$

This can be generalised to account for multiple spikes<sup>[1](#line-505)</sup>. In this case, $\vec{f_i}$ becomes a list of emitted spike times and $\vec{y_i}$ becomes a vector desired spike times for the $i^{th}$ neuron, respectively. The $k^{th}$ spike is sequentially taken from $\vec{f_i}$ and $\vec{y_i}$, and the mean square error between the two is calculated. This process is repeated $n$ times, where $n$ is the number of spike times that have been specified and the errors are summed together across spikes and classes:

$$  \mathcal{L}\_{MSE} = \sum\_k^{n}\sum\_i^{N\_C}(y\_{i,k} - f\_{i,k})^2  $$

<div class="flex items-center justify-center">{{< image src="figures/supp/b8.png" caption="Mean Square Spike Time. The timing of all spikes are iterated over, and sequentially applied to the mean square error loss function. This enables the timing for multiple spikes to be precisely defined." >}}</div>


### Mean Square Relative Spike Time 
The difference between the spike time of correct and incorrect neurons is specified as a target. As in <a href='#app-a9'>app-a9</a>, $y_i$ is the desired spike time for the $i^{th}$ neuron and $f_i$ is the actual emitted spike time. The key difference is that $y_i$ can change throughout the training process.

Let the minimum possible spike time be $f_0 \in \mathbb{R}$. This sets the target firing time of the correct class. The target firing time of incorrect neuron classes $y_i$ is set to:

$$  y\_i = \begin{cases} f\_0 + \gamma, & \text{\rm if $f\_i<f\_0+\gamma$}\\\\ f\_i, & \text{\rm if $f\_i \geq f\_0+\gamma$} \\\\ \end{cases}  $$

where $\gamma$ is a pre-defined latency, treated as a hyperparameter. In the first case, if an incorrect neuron fires at some time before the latency period $\gamma$ then a penalty will be applied. In the second case, where the incorrect neuron fires at $\gamma$ steps after the correct neuron, then the target is simply set to the actual spike time. These zero each other out during the loss calculation. This target $y_i$ is then applied to the mean square error loss (<a href='#beq-14'>beq-14</a>). 

<div class="flex items-center justify-center">{{< image src="figures/supp/b9.png" caption="Mean Square Relative Spike Time. The relative timing between all spikes are applied to the mean square error loss function, enabling a defined time window $\gamma$ to occur between the correct class firing and incorrect classes firing." >}}</div>


### Population Level Regularisation
L1-regularisation can be applied to the total number of spikes emitted at the output layer to penalise excessive firing<sup>[1](#line-841)</sup>, thus encouraging sparse activity at the output: 

$$  \mathcal{L}\_{L1} = \lambda\_1\sum\_t^T\sum\_i^{N\_C}S\_{i}[t]  $$

where $\lambda_1$ is a hyperparameter controlling the influence of the regularisation term, and $S_{i}[t]$ is the spike of the $i^{th}$ class at time $t$. 

Alternatively, an upper-activity threshold $\theta_U$ can be applied where if the total number of spikes for _all_ neurons in layer $l$ exceeds this threshold, only then does the regularisation penalty apply:

$$  \mathcal{L}\_{U} = \lambda\_U\Big(\Big[\sum\_i^{N}c\_{i}^{(l)} - \theta\_U\Big]\_+\Big)^L  $$

where $c_{i}$ is the total spike count over time for the $i^{th}$ neuron in layer $l$, and $N$ is the total number of neurons in layer $l$. $\lambda_U$ is a hyperparameter influencing the strength of the upper-activity regularisation, and $[\cdot]_+$ is a linear rectification: if the total number of spikes from the layer is less than $\theta_U$, the rectifier clips the negative result to zero such that a penalty is not added. $L$ is typically chosen to be either 1 or 2<sup>[1](#line-756)</sup>. It is possible to swap out the spike count for a time-averaged membrane potential as well, if using hidden-state variables is permissible<sup>[1](#line-817)</sup>.

### Neuron Level Regularisation
A lower-activity threshold $\theta_L$ that specifies the lower permissible limit of firing for _each_ neuron before the regularisation penalty is applied:

$$  \mathcal{L}\_{L} = \frac{\lambda\_L}{N}\sum\_i^N\Big(\Big[\theta\_L - c\_i^{(l)}\Big]\_+\Big)^2  $$

The rectification $[\cdot]_+$ now falls within the summation, and is applied to the firing activity of each individual neuron, rather than a population of neurons, where $\lambda_L$ is a hyperparameter that influences the strength of lower-activity regularisation<sup>[1](#line-756)</sup>. As with population-level regularisation, the spike count can also be substituted for a time-averaged membrane potential<sup>[1](#line-817)</sup>.

## Appendix C: Training Spiking Neural Networks
### Backpropagation Using Spike Times
In the original description of SpikeProp from<sup>[1](#line-965)</sup>, a spike response model is used:

$$   U\_j(t) = \sum\_{i,k} W\_{i,j}I\_i^{(k)}(t),\nonumber  $$
$$   I\_i^{(k)}(t)=\epsilon(t-f\_i^{(k)}),  $$

where $W_{i,j}$ is the weight between the $i^{th}$ presynaptic and $j^{th}$ postsynaptic neurons, $f_i^{(k)}$ is the firing time of the $k^{th}$ spike from the $i^{th}$ presynaptic neuron, and $U_j(t)$ is the membrane potential of the $j^{th}$ neuron. 
For simplicity, the \'alpha function' defined below is frequently used for the kernel:

$$   \epsilon(t) = \frac{t}{\tau}e^{1-\frac{t}{\tau}}\Theta\left(t\right),  $$

where $\tau$ and $\Theta$ are the time constant of the kernel and Heaviside step function, respectively. 

Consider an SNN where each target specifies the timing of the output spike emitted from the $j^{th}$ output neuron ($y_j$). This is used in the mean square spike time loss (<a href='#beq-13'>beq-13</a>, <a href='#app-a9'>app-a9</a>), where $f_j$ is the actual spike time. Rather than backpropagating in time through the entire history of the simulation, only the gradient pathway through the spike time of each neuron is taken. The gradient of the loss in weight space is then:

$$   \frac{\partial \mathcal{L}}{\partial W\_{i,j}} = \frac{\partial \mathcal{L}}{\partial f\_j}\frac{\partial f\_j}{\partial U\_j}\frac{\partial U\_j}{\partial W\_{i,j}}\Bigr|\_{t=f\_j}.  $$

The first term on the right side evaluates to:

$$  \frac{\partial \mathcal{L}}{\partial f\_j} = 2(y\_j - f\_j).  $$

The third term can be derived from <a href='#ceq-srm_mem'>ceq-srm_mem</a>:

$$  \frac{\partial U\_{j}}{\partial W\_{i,j}}\Bigr|\_{t=f\_j} = \sum\_{k}I\_i^{(k)}(f\_j) = \sum\_k\epsilon(f\_j-f\_i^{(k)}).  $$

The second term in <a href='#eq-spikeprop'>eq-spikeprop</a> can be calculated by calculating $-\partial U_j/\partial f_j\Bigr|_{t=f_j}$ instead, and then taking the inverse. In<sup>[1](#line-965)</sup>, the evolution of $U_j(t)$ 
can be analytically solved using <a href='#ceq-srm_mem,ceq-ker'>ceq-srm_mem,ceq-ker</a>:

$$   \frac{\partial f\_j}{\partial U\_j} \leftarrow -\left(\frac{\partial U\_j}{\partial t}\Bigr|\_{t=f\_j}\right)^{-1} = -\left(\sum\_{i,k} W\_{i,j}\frac{\partial I\_i^{(k)}}{\partial t}\Bigr|\_{t=f\_j}\right)^{-1} =  \Bigg(\sum\_{i,k}W\_{i,j}\frac{f\_j-f\_i^{(k)}-\tau}{\tau^2}\bigg(e^{\frac{f\_j-f\_i^{(k)}}{\tau}-1}\bigg)\Bigg)^{-1}.  $$ 

<div class="flex items-center justify-center">{{< image src="figures/supp/c1.png" caption="Calculation of derivative of membrane potential with respect to spike time. The superscripts $^{(A)}$ and $^{(B)}$ denote the separate contributions from each application of the kernel." >}}</div>


Note, the input current is triggered at the onset of the pre-synaptic spike $t=f_i$, but is evaluated at the time of the post-synaptic spike $t=f_j$. The results can be combined to give:

$$  \frac{\partial\mathcal{L}}{\partial W\_{i,j}} = -\frac{2(y\_j-f\_j)\sum\_k I\_i^{(k)}(f\_j)}{\sum\_{i,k}W\_{i,j}(\partial I\_j^{(k)}/\partial t)\Bigr|\_{t=f\_j}}  $$

This approach can be generalized to handle deeper layers, and the original formulation also includes delayed response kernels that are not included above for simplicity. 

### Backpropagation Using Spikes
**Spike Timing Dependent Plasticity**

The connection between a pair of neurons can be altered by the spikes emitted by both neurons. Several experiments have shown the relative timing of spikes between pre- and post-synaptic neurons can be used to define a learning rule for updating the synaptic weight<sup>[1](#line-441)</sup>. Let $t_{\rm pre}$ and $t_{\rm post}$ represent the timing of the pre- and post-synaptic spikes, respectively. The difference in spike time is:

$$  \Delta t = t\_{\rm pre} - t\_{\rm post}  $$

When the pre-synaptic neuron emits a spike before the post-synaptic neuron, such that the pre-synaptic spike may have caused the post-synaptic spike, then the synaptic strength is expected to increase (\'potentiation'). When reversed, i.e., the post-synaptic neuron spikes before the pre-synaptic neuron, the synaptic strength decreases (\'depression'). This rule is known as spike timing dependent plasticity (STDP), and has been shown to exist in various brain regions including the visual cortex, somatosensory cortex and the hippocampus. Fitting curves to experimental measurements take the following form<sup>[1](#line-441)</sup>:

$$   \Delta W = \begin{cases} A\_+e^{\Delta t/\tau\_+},  & \text{\rm if $t\_{\rm post} > t\_{\rm pre}$} \\\\  A\_-e^{-\Delta t/\tau\_-},  & \text{\rm if $t\_{\rm post} < t\_{\rm pre}$} \end{cases}    $$

where $\Delta W$ is the change in synaptic weight, $A_+$ and $A_-$ represent the maximum amount of synaptic modulation that takes place as the difference between spike times approaches zero, $\tau_+$ and $\tau_-$ are the time constants that determine the strength of the update over a given interspike interval. This mechanism is illustrated in <a href='#fig-stdp'>fig-stdp</a>.

<div class="flex items-center justify-center">{{< image src="figures/supp/stdp.png" caption="STDP Learning Window. If the pre-synaptic neuron spikes before the post-synaptic neuron, $\Delta t < 0 \implies \Delta W > 0$ and the synaptic strength between the two neurons is increased. If the pre-synaptic neuron spikes after the post-synaptic neuron, $\Delta t > 0 \implies \Delta W < 0$ and the synaptic strength is decreased." >}}</div>


For a strong, excitatory synaptic connection, a pre-synaptic spike will trigger a large post-synaptic potential (refer to $U$ in <a href='#eq-2'>eq-2</a>). As membrane potential approaches the threshold of neuronal firing, such an excitatory case suggests that a post-synaptic spike will likely follow a pre-synaptic spike. This will lead to a positive change of the synaptic weight, thus increasing the chance that a post-synaptic spike will follow a pre-synaptic spike in future. This is a form of causal spiking, and STDP reinforces causal spiking by continuing to increase the strength of the synaptic connection.

Input sensory data is typically correlated in both space and time, so a network's response to a correlated spike train will be to increase the weights much faster than uncorrelated spike trains. This is a direct result of causal spiking. Intuitively, a group of correlated spikes from multiple pre-synaptic neurons will arrive at a post-synaptic neuron within a close time interval, causing stronger depolarization of the neuron membrane potential, and a higher probability of a post-synaptic spike being triggered.

However, without an upper bound, this will lead to unstable and indefinitely large growth of the synaptic weight. In practice, an upper limit should be applied to constrain potentiation. Alternatively, homeostatic mechanisms can also be used to offset this unbounded growth, such as an adaptive threshold that increases each time a spike is triggered from the neuron (<a href='#app-c2'>app-c2</a>).

### Long-Term Temporal Dependencies 
One of the simplest implementations of an adaptive threshold is to choose a steady-state threshold $\theta_0$ and a decay rate $\alpha$:

$$  \theta[t] = \theta\_0 + b[t]  $$
$$  b[t+1] = \alpha b[t] + (1-\alpha)S\_{\rm out}[t]  $$

Each time a spike is triggered from the neuron, $S_{\rm out}[t]=1$, the threshold jumps by $(1-\alpha)$. This is added to the threshold through an intermediary state variable, $b[t]$. This jump decays at a rate of $\alpha$ at each subsequent step, causing the threshold to tend back to $\theta_0$ in absence of further spikes. The above form is loosely based on<sup>[1](#line-1503)</sup>, though the decay rate $\alpha$ and threshold jump factor $(1-\alpha)$ can be decoupled from each other. $\alpha$ can be treated as either a hyperparameter or a learnable parameter.

  
  

## Bibliography
<div id="biblio">{{< highlight bibtex "linenos=inline,anchorlinenos=true,lineanchors=line" >}}
@article{krizhevsky2012imagenet,
  title={Imagenet classification with deep convolutional neural networks},
  author={Krizhevsky, Alex and Sutskever, Ilya and Hinton, Geoffrey E},
  journal={Adv. in Neural Inf. Process. Syst.},
  volume={25},
  pages={1097--1105},
  year={2012}
}

@article{girshick2014rich,
  title={Rich feature hierarchies for accurate object detection and semantic segmentation},
  author={Girshick, Ross and Donahue, Jeff and Darrell, Trevor and Malik, Jitendra},
  journal={Proc. of the IEEE Conf. on Comput. Vision and Pattern Recognit.},
  pages={580--587},
  year={2014}
}


@inproceedings{girshick2015fast,
  title={Fast {R-CNN}},
  author={Girshick, Ross},
  booktitle={Proc. of the IEEE Conf. on Comput. Vision and Pattern Recognit.},
  pages={1440--1448},
  year={2015}
}

@article{ren2015faster,
  title={Faster {R-CNN}: Towards real-time object detection with region proposal networks},
  author={Ren, Shaoqing and He, Kaiming and Girshick, Ross and Sun, Jian},
  journal={Adv. in Neural Inf. Process. Syst.},
  volume={28},
  pages={91--99},
  year={2015}
}

@inproceedings{redmon2016you,
  title={You only look once: Unified, real-time object detection},
  author={Redmon, Joseph and Divvala, Santosh and Girshick, Ross and Farhadi, Ali},
  booktitle={Proc. of the IEEE Conf. on Comput. Vision and Pattern Recognit.},
  pages={779--788},
  year={2016}
}

@article{bohnstingl2022online,
  title={Online spatio-temporal learning in deep neural networks},
  author={Bohnstingl, Thomas and Wo{\'z}niak, Stanis{\l}aw and Pantazi, Angeliki and Eleftheriou, Evangelos},
  journal={IEEE Transactions on Neural Networks and Learning Systems},
  year={2022},
  publisher={IEEE}
}

@inproceedings{graves2014towards,
  title={Towards end-to-end speech recognition with recurrent neural networks},
  author={Graves, Alex and Jaitly, Navdeep},
  booktitle={Int. Conf. on Mach. Learn.},
  pages={1764--1772},
  year={2014},
  organization={PMLR}
}

@inproceedings{zhang2017very,
  title={Very deep convolutional networks for end-to-end speech recognition},
  author={Zhang, Yu and Chan, William and Jaitly, Navdeep},
  booktitle={2017 IEEE Int. Conf. on Acoust., Speech and Signal Process. (ICASSP)},
  pages={4845--4849},
  year={2017},
  organization={IEEE}
}

@article{quintana2023etlp,
  title={ETLP: Event-based Three-factor Local Plasticity for online learning with neuromorphic hardware},
  author={Quintana, Fernando M and Perez-Pe{\~n}a, Fernando and Galindo, Pedro L and Netfci, Emre O and Chicca, Elisabetta and Khacef, Lyes},
  journal={arXiv preprint arXiv:2301.08281},
  year={2023}
}


@article{ortner2023online,
  title={Online Spatio-Temporal Learning with Target Projection},
  author={Ortner, Thomas and Pes, Lorenzo and Gentinetta, Joris and Frenkel, Charlotte and Pantazi, Angeliki},
  journal={arXiv preprint arXiv:2304.05124},
  year={2023}
}

@inproceedings{kag2021training,
  title={Training recurrent neural networks via forward propagation through time},
  author={Kag, Anil and Saligrama, Venkatesh},
  booktitle={International Conference on Machine Learning},
  pages={5189--5200},
  year={2021},
  organization={PMLR}
}

@article{yin2023accurate,
  title={Accurate online training of dynamical spiking neural networks through forward propagation through time},
  author={Yin, Bojian and Corradi, Federico and Bohte, Sander M},
  journal={Nature Machine Intelligence},
  pages={1--10},
  year={2023},
  publisher={Nature Publishing Group UK London}
}

@article{perez2021neural,
  title={Neural heterogeneity promotes robust learning},
  author={Perez-Nieves, Nicolas and Leung, Vincent CH and Dragotti, Pier Luigi and Goodman, Dan FM},
  journal={Nature Communications},
  volume={12},
  number={1},
  pages={1--9},
  year={2021},
  publisher={Nature Publishing Group}
}

@article{luboeinski2021memory,
  title={Memory consolidation and improvement by synaptic tagging and capture in recurrent neural networks},
  author={Luboeinski, Jannik and Tetzlaff, Christian},
  journal={Communications Biology},
  volume={4},
  number={1},
  pages={1--17},
  year={2021},
  publisher={Nature Publishing Group}
}

@inproceedings{ioffe2015batch,
  title={Batch normalization: Accelerating deep network training by reducing internal covariate shift},
  author={Ioffe, Sergey and Szegedy, Christian},
  booktitle={International conference on machine learning},
  pages={448--456},
  year={2015},
  organization={pmlr}
}

@article{kim2021revisiting,
  title={Revisiting batch normalization for training low-latency deep spiking neural networks from scratch},
  author={Kim, Youngeun and Panda, Priyadarshini},
  journal={Frontiers in Neuroscience},
  pages={1638},
  year={2021},
  publisher={Frontiers}
}

@article{kingma2014adam,
  title={Adam: A method for stochastic optimization},
  author={Kingma, Diederik P and Ba, Jimmy},
  journal={arXiv preprint arXiv:1412.6980},
  year={2014}
}

@misc{tuningplaybookgithub,
  author = {Varun Godbole and George E. Dahl and Justin Gilmer and Christopher J. Shallue and Zachary Nado},
  title = {Deep Learning Tuning Playbook},
  url = {http://github.com/google-research/tuning_playbook},
  year = {2023},
  note = {Version 1.0}
}

@article{duan2022temporal,
  title={Temporal effective batch normalization in spiking neural networks},
  author={Duan, Chaoteng and Ding, Jianhao and Chen, Shiyan and Yu, Zhaofei and Huang, Tiejun},
  journal={Advances in Neural Information Processing Systems},
  volume={35},
  pages={34377--34390},
  year={2022}
}

@article{yang2022weak,
  title={Weak self-supervised learning for seizure forecasting: a feasibility study},
  author={Yang, Yikai and Truong, Nhan Duy and Eshraghian, Jason K and Nikpour, Armin and Kavehei, Omid},
  journal={Royal Society Open Science},
  volume={9},
  number={8},
  pages={220374},
  year={2022},
  publisher={The Royal Society}
}

@article{yang2023neuromorphic,
  title={Neuromorphic deep spiking neural networks for seizure detection},
  author={Yang, Yikai and Eshraghian, Jason K and Truong, Nhan Duy and Nikpour, Armin and Kavehei, Omid},
  journal={Neuromorphic Computing and Engineering},
  volume={3},
  number={1},
  pages={014010},
  year={2023},
  publisher={IOP Publishing}
}

@article{he2022implantable,
  title={An Implantable Neuromorphic Sensing System Featuring Near-Sensor Computation and Send-on-Delta Transmission for Wireless Neural Sensing of Peripheral Nerves},
  author={He, Yuming and Corradi, Federico and Shi, Chengyao and van der Ven, Stan and Timmermans, Martijn and Stuijt, Jan and Detterer, Paul and Harpe, Pieter and Lindeboom, Lucas and Hermeling, Evelien and others},
  journal={IEEE Journal of Solid-State Circuits},
  volume={57},
  number={10},
  pages={3058--3070},
  year={2022},
  publisher={IEEE}
}

@article{hussaini2022spiking,
  title={Spiking Neural Networks for Visual Place Recognition via Weighted Neuronal Assignments},
  author={Hussaini, Somayeh and Milford, Michael and Fischer, Tobias},
  journal={IEEE Robotics and Automation Letters},
  volume={7},
  number={2},
  pages={4094--4101},
  year={2022},
  publisher={IEEE}
}

@inproceedings{chan2016listen,
  title={Listen, attend and spell: A neural network for large vocabulary conversational speech recognition},
  author={Chan, William and Jaitly, Navdeep and Le, Quoc and Vinyals, Oriol},
  booktitle={2016 IEEE Int. Conf. on Acoust., Speech and Signal Process. (ICASSP)},
  pages={4960--4964},
  year={2016},
  organization={IEEE}
}

@article{thompson2020computational,
  title={The computational limits of deep learning},
  author={Thompson, Neil C and Greenewald, Kristjan and Lee, Keeheon and Manso, Gabriel F},
  journal={arXiv preprint arXiv:2007.05558},
  year={2020}
}

@article{qian2011neural,
  title={Neural network computation with {DNA} strand displacement cascades},
  author={Qian, Lulu and Winfree, Erik and Bruck, Jehoshua},
  journal={Nature},
  volume={475},
  number={7356},
  pages={368--372},
  year={2011},
  publisher={Nature Publishing Group}
}

@inproceedings{mikolov2013distributed,
  title={Distributed representations of words and phrases and their compositionality},
  author={Mikolov, Tomas and Sutskever, Ilya and Chen, Kai and Corrado, Greg S and Dean, Jeff},
  booktitle={Adv. in Neural Inf. Process. Syst.},
  pages={3111--3119},
  year={2013}
}

@inproceedings{collobert2008unified,
  title={A unified architecture for natural language processing: Deep neural networks with multitask learning},
  author={Collobert, Ronan and Weston, Jason},
  booktitle={Proc. of the 25th Int. Conf. on Mach. Learn.},
  pages={160--167},
  year={2008}
}

@article{luong2015effective,
  title={Effective approaches to attention-based neural machine translation},
  author={Luong, Minh-Thang and Pham, Hieu and Manning, Christopher D},
  journal={arXiv preprint arXiv:1508.04025},
  year={2015}
}

@inproceedings{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, {\L}ukasz and Polosukhin, Illia},
  booktitle={Adv. in Neural Inf. Process. Syst.},
  pages={5998--6008},
  year={2017}
}

@inproceedings{mikolov2010recurrent,
  title={Recurrent neural network based language model},
  author={Mikolov, Tom{\'a}{\v{s}} and Karafi{\'a}t, Martin and Burget, Luk{\'a}{\v{s}} and {\v{C}}ernock{\`y}, Jan and Khudanpur, Sanjeev},
  booktitle={11th Annu. Conf. of the Int. Speech Commun. Assoc.},
  year={2010}
}

@article{silver2016mastering,
  title={Mastering the game of {Go} with deep neural networks and tree search},
  author={Silver, David and Huang, Aja and Maddison, Chris J and Guez, Arthur and Sifre, Laurent and Van Den Driessche, George and Schrittwieser, Julian and Antonoglou, Ioannis and Panneershelvam, Veda and Lanctot, Marc and others},
  journal={Nature},
  volume={529},
  number={7587},
  pages={484--489},
  year={2016},
  publisher={Nature Publishing Group}
}

@article{vinyals2019grandmaster,
  title={Grandmaster level in {StarCraft II} using multi-agent reinforcement learning},
  author={Vinyals, Oriol and Babuschkin, Igor and Czarnecki, Wojciech M and Mathieu, Micha{\"e}l and Dudzik, Andrew and Chung, Junyoung and Choi, David H and Powell, Richard and Ewalds, Timo and Georgiev, Petko and others},
  journal={Nature},
  volume={575},
  number={7782},
  pages={350--354},
  year={2019},
  publisher={Nature Publishing Group}
}

@article{mckinney2020international,
  title={Int. evaluation of an {AI} system for breast cancer screening},
  author={McKinney, Scott Mayer and Sieniek, Marcin and Godbole, Varun and Godwin, Jonathan and Antropova, Natasha and Ashrafian, Hutan and Back, Trevor and Chesus, Mary and Corrado, Greg S and Darzi, Ara and others},
  journal={Nature},
  volume={577},
  number={7788},
  pages={89--94},
  year={2020},
  publisher={Nature Publishing Group}
}

@article{hannun2019cardiologist,
  title={Cardiologist-level arrhythmia detection and classification in ambulatory electrocardiograms using a deep neural network},
  author={Hannun, Awni Y and Rajpurkar, Pranav and Haghpanahi, Masoumeh and Tison, Geoffrey H and Bourn, Codie and Turakhia, Mintu P and Ng, Andrew Y},
  journal={Nature Medicine},
  volume={25},
  number={1},
  pages={65--69},
  year={2019},
  publisher={Nature Publishing Group}
}

@article{yang2021multimodal,
  title={A multimodal {AI} system for out-of-distribution generalization of seizure detection},
  author={Yang, Yikai and Truong, Nhan Duy and Eshraghian, Jason K and Maher, Christina and Nikpour, Armin and Kavehei, Omid},
  journal={bioRxiv 2021.07.02.450974},
  year={2021},
  publisher={Cold Spring Harbor Laboratory}
}

@article{yang2021aura,
  title={Adaptive, Unlabeled and Real-time Approximate-Learning Platform ({AURA}) for Personalized Epileptic Seizure Forecasting},
  author={Yang, Yikai and Truong, Nhan Duy and Eshraghian, Jason K and Nikpour, Armin and Kavehei, Omid},
  journal={medRxiv 2021.09.30.21264287},
  year={2021}
}

@article{rahimiazghadi2020hardware,
  title={Hardware implementation of deep network accelerators towards healthcare and biomedical applications},
  author={Azghadi, Mostafa Rahimi and Lammie, Corey and Eshraghian, Jason K and Payvand, Melika and Donati, Elisa and Linares-Barranco, Bernabe and Indiveri, Giacomo},
  journal={IEEE Trans. on Biomed. Circuits and Syst.},
  volume={14},
  number={6},
  pages={1138--1159},
  year={2020},
  publisher={IEEE}
}

@article{brown2020language,
  title={Language models are few-shot learners},
  author={Brown, Tom B and Mann, Benjamin and Ryder, Nick and Subbiah, Melanie and Kaplan, Jared and Dhariwal, Prafulla and Neelakantan, Arvind and Shyam, Pranav and Sastry, Girish and Askell, Amanda and others},
  journal={arXiv preprint arXiv:2005.14165},
  year={2020}
}

@article{eshraghian2020human,
  title={Human ownership of artificial creativity},
  author={Eshraghian, Jason K},
  journal={Nature Mach. Intell.},
  volume={2},
  number={3},
  pages={157--160},
  year={2020},
  publisher={Nature Publishing Group}
}

@article{sun2022intelligence,
  title={Intelligence Processing Units Accelerate Neuromorphic Learning},
  author={Sun, Pao-Sheng Vincent and Titterton, Alexander and Gopiani, Anjlee and Santos, Tim and Basu, Arindam and Lu, Wei D and Eshraghian, Jason K},
  journal={arXiv preprint arXiv:2211.10725},
  year={2022}
}

@article{dhar2020carbon,
  title={The carbon impact of artificial intelligence},
  author={Dhar, Payal},
  journal={Nature Mach. Intell.},
  volume={2},
  pages={423--5},
  year={2020}
}


@article{perrault2019AI,
    title={{AI} and compute. {Online}: https://openai.com/blog/ai-and-compute/},
    year = {2019},
    author={Amodei, Dario and Hernandez, Danny},
    urldate = {2021-26-08}
}

@article{anthony2020carbontracker,
  title={Carbontracker: Tracking and predicting the carbon footprint of training deep learning models},
  author={Anthony, Lasse F Wolff and Kanding, Benjamin and Selvan, Raghavendra},
  journal={arXiv preprint arXiv:2007.03051},
  year={2020}
}

@electronic{luxembourg2021,
    title={{Energy consumption in Luxembourg}},
    year = 2021,
    author={WorldData.info},
    url={https://www.worlddata.info/europe/luxembourg/energy-consumption.php},
    urldate = {2021-06-08}
}

@article{levy2020computation,
  title={Computation in the human cerebral cortex uses less than 0.2 watts yet this great expense is optimal when considering communication costs},
  author={Levy, William B and Calvert, Victoria G},
  journal={bioRxiv 2020.04.23.057927},
  year={2020},
  publisher={Cold Spring Harbor Laboratory}
}

@book{paun2005dna,
  title={DNA computing: New computing paradigms},
  author={P{\u{a}}un, Gheorghe and Rozenberg, Grzegorz and Salomaa, Arto},
  year={2005},
  publisher={Springer Sci. \& Bus. Media}
}


@article{chi2016prime,
  title={Prime: A novel processing-in-memory architecture for neural network computation in {ReRAM}-based main memory},
  author={Chi, Ping and Li, Shuangchen and Xu, Cong and Zhang, Tao and Zhao, Jishen and Liu, Yongpan and Wang, Yu and Xie, Yuan},
  journal={ACM SIGARCH Comput. Architecture News},
  volume={44},
  number={3},
  pages={27--39},
  year={2016},
  publisher={ACM New York, NY, USA}
}

@article{rahimi2020complementary,
  title={Complementary Metal-Oxide Semiconductor and Memristive Hardware for Neuromorphic Computing},
  author={Rahimi Azghadi, Mostafa and Chen, Ying-Chen and Eshraghian, Jason K and Chen, Jia and Lin, Chih-Yang and Amirsoleimani, Amirali and Mehonic, Adnan and Kenyon, Anthony J and Fowler, Burt and Lee, Jack C and others},
  journal={Adv. Intell. Syst.},
  volume={2},
  number={5},
  pages={1900189},
  year={2020},
  publisher={Wiley Online Library}
}

@article{bi1998synaptic,
  title={Synaptic modifications in cultured hippocampal neurons: dependence on spike timing, synaptic strength, and postsynaptic cell type},
  author={Bi, Guoqiang and Poo, Muming},
  journal={J. of Neuroscience},
  volume={18},
  number={24},
  pages={10464--10472},
  year={1998},
  publisher={Soc Neuroscience}
}

@article{hamilton2021best,
  title={The best of both worlds},
  author={Hamilton, Tara},
  journal={Nature Mach. Intell.},
  volume={3},
  number={3},
  pages={194--195},
  year={2021},
  publisher={Nature Publishing Group}
}

@article{lapicque1907louis,
  title={Recherches quantitatives sur l'excitation electrique des nerfs traitee comme une polarization.},
  author={Lapique, Louis},
  journal={J. of Physiol. and Pathology},
  volume={9},
  pages={620--635},
  year={1907}
}


@article{brunel2007lapicque,
  title={Lapicque’s 1907 paper: From frogs to integrate-and-fire},
  author={Brunel, Nicolas and Van Rossum, Mark CW},
  journal={Biol. Cybern.},
  volume={97},
  number={5},
  pages={337--339},
  year={2007},
  publisher={Springer}
}

@article{hodgkin1952quantitative,
  title={A quantitative description of membrane current and its application to conduction and excitation in nerve},
  author={Hodgkin, Alan L and Huxley, Andrew F},
  journal={The J. of Physiol.},
  volume={117},
  number={4},
  pages={500--544},
  year={1952},
  publisher={Wiley Online Library}
}

@incollection{gerstner2001framework,
  title={A framework for spiking neuron models: The spike response model},
  author={Gerstner, Wulfram},
  booktitle={Handbook of Biol. Physics},
  volume={4},
  pages={469--516},
  year={2001},
  publisher={Elsevier}
}

@inproceedings{shrestha2018slayer,
  title={{SLAYER: Spike} layer error reassignment in time},
  author={Shrestha, Sumit Bam and Orchard, Garrick},
  booktitle={Proc. of the 32nd Int. Conf. on Neural Inf. Process. Syst.},
  pages={1419--1428},
  year={2018}
}


@article{burkitt2006review,
  title={A review of the integrate-and-fire neuron model: {I. Homogeneous} synaptic input},
  author={Burkitt, Anthony N},
  journal={Biol. Cybern.},
  volume={95},
  number={1},
  pages={1--19},
  year={2006},
  publisher={Springer}
}

@article{vogels2005signal,
  title={Signal propagation and logic gating in networks of integrate-and-fire neurons},
  author={Vogels, Tim P and Abbott, Larry F},
  journal={J. of Neuroscience},
  volume={25},
  number={46},
  pages={10786--10795},
  year={2005},
  publisher={Soc Neuroscience}
}

@book{gerstner2014neuronal,
  title={Neuronal dynamics: From single neurons to networks and models of cognition},
  author={Gerstner, Wulfram and Kistler, Werner M and Naud, Richard and Paninski, Liam},
  year={2014},
  publisher={Cambridge Univ. Press}
}

@article{gallego2019event,
  title={Event-based vision: A survey},
  author={Gallego, Guillermo and Delbruck, Tobi and Orchard, Garrick and Bartolozzi, Chiara and Taba, Brian and Censi, Andrea and Leutenegger, Stefan and Davison, Andrew and Conradt, J{\"o}rg and Daniilidis, Kostas and others},
  journal={arXiv preprint arXiv:1904.08405},
  year={2019}
}

@article{aertsen1981spectro,
  title={The spectro-temporal receptive field},
  author={Aertsen, Ad M.H.J. and Johannesma, P.I.M.},
  journal={Biol. Cybern.},
  volume={42},
  number={2},
  pages={133--143},
  year={1981},
  publisher={Springer}
}

@book{dayan2001theoretical,
  title={Theoretical neuroscience: Computational and mathematical modeling of neural systems},
  author={Dayan, Peter and Abbott, Laurence F},
  year={2001},
  publisher={Comput. Neuroscience Series}
}

@article{eshraghian2018formulation,
  title={Formulation and implementation of nonlinear integral equations to model neural dynamics within the vertebrate retina},
  author={Eshraghian, Jason K and Baek, Seungbum and Kim, Jun-Ho and Iannella, Nicolangelo and Cho, Kyoungrok and Goo, Yong Sook and Iu, Herbert HC and Kang, Sung-Mo and Eshraghian, Kamran},
  journal={Int. J. of Neural Syst.},
  volume={28},
  number={07},
  pages={1850004},
  year={2018},
  publisher={World Scientific}
}

@article{ceolini2020hand,
  title={Hand-gesture recognition based on {EMG} and event-based camera sensor fusion: A benchmark in neuromorphic computing},
  author={Ceolini, Enea and Frenkel, Charlotte and Shrestha, Sumit Bam and Taverni, Gemma and Khacef, Lyes and Payvand, Melika and Donati, Elisa},
  journal={Frontiers in Neuroscience},
  volume={14},
  year={2020},
  publisher={Frontiers Media SA}
}

@inproceedings{baek2020real,
  title={A real-time retinomorphic simulator using a conductance-based discrete neuronal network},
  author={Baek, Seungbum and Eshraghian, Jason K and Thio, Wesley and Sandamirskaya, Yulia and Iu, Herbert HC and Lu, Wei D},
  booktitle={2020 2nd IEEE Int. Conf. on Artificial Intell. Circuits and Syst. (AICAS)},
  pages={79--83},
  year={2020},
  organization={IEEE}
}

@article{ruedi2003128,
  title={A 128$\times$ 128 pixel 120-dB dynamic-range vision-sensor chip for image contrast and orientation extraction},
  author={Ruedi, P-F and Heim, Pascal and Kaess, Fran{\c{c}}ois and Grenet, Eric and Heitger, Friedrich and Burgi, P-Y and Gyger, St{\`e}ve and Nussbaum, Pascal},
  journal={IEEE J. of Solid-State Circuits},
  volume={38},
  number={12},
  pages={2325--2333},
  year={2003},
  publisher={IEEE}
}

@inproceedings{lichtsteiner2006128,
  title={A 128 x 128 120db 30mw asynchronous vision sensor that responds to relative intensity change},
  author={Lichtsteiner, Patrick and Posch, Christoph and Delbruck, Tobi},
  booktitle={2006 IEEE Int. Solid State Circuits Conf.-Digest of Tech. Papers},
  pages={2060--2069},
  year={2006},
  organization={IEEE}
}

@article{eshraghian2018neuromorphic,
  title={Neuromorphic vision hybrid {RRAM-CMOS} architecture},
  author={Eshraghian, Jason Kamran and Cho, Kyoungrok and Zheng, Ciyan and Nam, Minho and Iu, Herbert Ho-Ching and Lei, Wen and Eshraghian, Kamran},
  journal={IEEE Trans. on Very Large Scale Integration (VLSI) Syst.},
  volume={26},
  number={12},
  pages={2816--2829},
  year={2018},
  publisher={IEEE}
}

@article{brandli2014240,
  title={A 240$\times$ 180 130 db 3 $\mu$s latency global shutter spatiotemporal vision sensor},
  author={Brandli, Christian and Berner, Raphael and Yang, Minhao and Liu, Shih-Chii and Delbruck, Tobi},
  journal={IEEE J. of Solid-State Circuits},
  volume={49},
  number={10},
  pages={2333--2341},
  year={2014},
  publisher={IEEE}
}

@article{hubel1962receptive,
  title={Receptive fields, binocular interaction and functional architecture in the cat's visual cortex},
  author={Hubel, David H and Wiesel, Torsten N},
  journal={The J. of Physiol.},
  volume={160},
  number={1},
  pages={106--154},
  year={1962},
  publisher={Wiley Online Library}
}


@article{hecht1942energy,
  title={Energy, quanta, and vision},
  author={Hecht, Selig and Shlaer, Simon and Pirenne, Maurice Henri},
  journal={J. of General Physiol.},
  volume={25},
  number={6},
  pages={819--840},
  year={1942},
  publisher={The Rockefeller Univ. Press}
}

@article{van1946number,
  title={The number of quanta necessary for the perception of light of the human eye},
  author={Van Der Velden, H.A.},
  journal={Ophthalmologica},
  volume={111},
  number={6},
  pages={321--331},
  year={1946},
  publisher={Karger Publishers}
}

@article{rieke1998single,
  title={Single-photon detection by rod cells of the retina},
  author={Rieke, Foster and Baylor, Denis A},
  journal={Rev. of Modern Physics},
  volume={70},
  number={3},
  pages={1027},
  year={1998},
  publisher={APS}
}


@article{dehaene2003neural,
  title={The neural basis of the {Weber}--{Fechner} law: A logarithmic mental number line},
  author={Dehaene, Stanislas},
  journal={Trends in Cognitive Sci.},
  volume={7},
  number={4},
  pages={145--147},
  year={2003},
  publisher={Elsevier}
}

@article{orchard2015converting,
  title={Converting static image datasets to spiking neuromorphic datasets using saccades},
  author={Orchard, Garrick and Jayawant, Ajinkya and Cohen, Gregory K and Thakor, Nitish},
  journal={Frontiers in Neuroscience},
  volume={9},
  pages={437},
  year={2015},
  publisher={Frontiers}
}

@inproceedings{amir2017low,
  title={A low power, fully event-based gesture recognition system},
  author={Amir, Arnon and Taba, Brian and Berg, David and Melano, Timothy and McKinstry, Jeffrey and Di Nolfo, Carmelo and Nayak, Tapan and Andreopoulos, Alexander and Garreau, Guillaume and Mendoza, Marcela and others},
  booktitle={Proc. of the IEEE Conf. on Comput. Vision and Pattern Recognit.},
  pages={7243--7252},
  year={2017}
}

@article{perez2013mapping,
  title={Mapping from frame-driven to frame-free event-driven vision systems by low-rate rate coding and coincidence processing--application to feedforward {ConvNets}},
  author={P{\'e}rez-Carrasco, Jos{\'e} Antonio and Zhao, Bo and Serrano, Carmen and Acha, Begona and Serrano-Gotarredona, Teresa and Chen, Shouchun and Linares-Barranco, Bernabe},
  journal={IEEE Trans. on Pattern Anal. and Mach. Intell.},
  volume={35},
  number={11},
  pages={2706--2719},
  year={2013},
  publisher={IEEE}
}

@article{hu2016dvs,
  title={{DVS} benchmark datasets for object tracking, action recognition, and object recognition},
  author={Hu, Yuhuang and Liu, Hongjie and Pfeiffer, Michael and Delbruck, Tobi},
  journal={Frontiers in Neuroscience},
  volume={10},
  pages={405},
  year={2016},
  publisher={Frontiers}
}

@article{olshausen2006other,
  title={What is the other 85 percent of {V1} doing?},
  author={Olshausen, Bruno A and Field, David J},
  journal={L. van Hemmen, \& T. Sejnowski (Eds.)},
  volume={23},
  pages={182--211},
  year={2006}
}


@article{mello2015scalable,
  title={A scalable population code for time in the striatum},
  author={Mello, Gustavo BM and Soares, Sofia and Paton, Joseph J},
  journal={Current Biol.},
  volume={25},
  number={9},
  pages={1113--1122},
  year={2015},
  publisher={Elsevier}
}

@article{zenke2021remarkable,
  title={The remarkable robustness of surrogate gradient learning for instilling complex function in spiking neural networks},
  author={Zenke, Friedemann and Vogels, Tim P},
  journal={Neural Comput.},
  volume={33},
  number={4},
  pages={899--925},
  year={2021},
  publisher={MIT Press One Rogers Street, Cambridge, MA 02142-1209, USA journals-info~…}
}

@article{perez2021sparse,
  title={Sparse Spiking Gradient Descent},
  author={Perez-Nieves, Nicolas and Goodman, Dan FM},
  journal={arXiv preprint arXiv:2105.08810},
  year={2021}
}

@article{gutig2006tempotron,
  title={The tempotron: {A} neuron that learns spike timing--based decisions},
  author={G{\"u}tig, Robert and Sompolinsky, Haim},
  journal={Nature Neuroscience},
  volume={9},
  number={3},
  pages={420--428},
  year={2006},
  publisher={Nature Publishing Group}
}

@article{esser2016convolutional,
  title={Convolutional networks for fast, energy-efficient neuromorphic computing},
  author={Esser, Steven K and Merolla, Paul A and Arthur, John V and Cassidy, Andrew S and Appuswamy, Rathinakumar and Andreopoulos, Alexander and Berg, David J and McKinstry, Jeffrey L and Melano, Timothy and Barch, Davis R and others},
  journal={Proc. of the Nat. Acad. of Sci.},
  volume={113},
  number={41},
  pages={11441--11446},
  year={2016},
  publisher={Nat. Acad. of Sci.}
}

@article{wu2018spatio,
  title={Spatio-temporal backpropagation for training high-performance spiking neural networks},
  author={Wu, Yujie and Deng, Lei and Li, Guoqi and Zhu, Jun and Shi, Luping},
  journal={Frontiers in Neuroscience},
  volume={12},
  pages={331},
  year={2018},
  publisher={Frontiers}
}

@article{bellec2020solution,
  title={A solution to the learning dilemma for recurrent networks of spiking neurons},
  author={Bellec, Guillaume and Scherr, Franz and Subramoney, Anand and Hajek, Elias and Salaj, Darjan and Legenstein, Robert and Maass, Wolfgang},
  journal={Nature Commun.},
  volume={11},
  number={1},
  pages={1--15},
  year={2020},
  publisher={Nature Publishing Group}
}

@article{kaiser2020synaptic,
  title={Synaptic plasticity dynamics for deep continuous local learning (DECOLLE)},
  author={Kaiser, Jacques and Mostafa, Hesham and Neftci, Emre},
  journal={Frontiers in Neuroscience},
  volume={14},
  pages={424},
  year={2020},
  publisher={Frontiers}
}

@article{zhang2020spike,
  title={Spike-timing-dependent back propagation in deep spiking neural networks},
  author={Zhang, Malu and Wang, Jiadong and Zhang, Zhixuan and Belatreche, Ammar and Wu, Jibin and Chua, Yansong and Qu, Hong and Li, Haizhou},
  journal={arXiv preprint arXiv:2003.11837},
  year={2020}
}

@article{eshraghian2021spike,
  title={Spike-Op: Operational Gradients in Spiking Neural Networks},
  author={Eshraghian, Jason K. and Wang, Xinxin and Sun, Vincent Pao Sheng and Ward, Max and Neftci, Emre and Dwivedi, Girish and Bennamoun, Mohammed and Jeong, Doo Seok and Lu, Wei. D},
  journal={arXiv preprint},
  year={2021}
}

@article{zenke2019spytorch,
    title={SpyTorch. {Online}: https://github.com/fzenke/spytorch},
    year = 2019,
    author={Zenke, Friedemann},
}

@inproceedings{he2015delving,
  title={Delving deep into rectifiers: Surpassing human-level performance on imagenet classification},
  author={He, Kaiming and Zhang, Xiangyu and Ren, Shaoqing and Sun, Jian},
  booktitle={Proc. of the IEEE Int. Conf. on Comput. Vision},
  pages={1026--1034},
  year={2015}
}

@inproceedings{he2016deep,
  title={Deep residual learning for image recognition},
  author={He, Kaiming and Zhang, Xiangyu and Ren, Shaoqing and Sun, Jian},
  booktitle={Proceedings of the IEEE conference on computer vision and pattern recognition},
  pages={770--778},
  year={2016}
}

@article{fang2021deep,
  title={Deep residual learning in spiking neural networks},
  author={Fang, Wei and Yu, Zhaofei and Chen, Yanqi and Huang, Tiejun and Masquelier, Timoth{\'e}e and Tian, Yonghong},
  journal={Advances in Neural Information Processing Systems},
  volume={34},
  pages={21056--21069},
  year={2021}
}

@article{kheradpisheh2020temporal,
  title={Temporal backpropagation for spiking neural networks with one spike per neuron},
  author={Kheradpisheh, Saeed Reza and Masquelier, Timoth{\'e}e},
  journal={Int. J. of Neural Syst.},
  volume={30},
  number={06},
  pages={2050027},
  year={2020},
  publisher={World Scientific}
}


@article{diehl2015unsupervised,
  title={Unsupervised learning of digit recognition using spike-timing-dependent plasticity},
  author={Diehl, Peter U and Cook, Matthew},
  journal={Frontiers in Comput. Neuroscience},
  volume={9},
  pages={99},
  year={2015},
  publisher={Frontiers}
}

@article{brader2007learning,
  title={Learning real-world stimuli in a neural network with spike-driven synaptic dynamics},
  author={Brader, Joseph M and Senn, Walter and Fusi, Stefano},
  journal={Neural Comput.},
  volume={19},
  number={11},
  pages={2881--2912},
  year={2007},
  publisher={MIT Press}
}

@article{zhao2014feedforward,
  title={Feedforward categorization on {AER} motion events using cortex-like features in a spiking neural network},
  author={Zhao, Bo and Ding, Ruoxi and Chen, Shoushun and Linares-Barranco, Bernabe and Tang, Huajin},
  journal={IEEE Trans. on Neural Netw. and Learn. Syst.},
  volume={26},
  number={9},
  pages={1963--1978},
  year={2014},
  publisher={IEEE}
}

@article{beyeler2013categorization,
  title={Categorization and decision-making in a neurobiologically plausible spiking network using a {STDP}-like learning rule},
  author={Beyeler, Michael and Dutt, Nikil D and Krichmar, Jeffrey L},
  journal={Neural Netw.},
  volume={48},
  pages={109--124},
  year={2013},
  publisher={Elsevier}
}

@article{querlioz2013immunity,
  title={Immunity to device variations in a spiking neural network with memristive nanodevices},
  author={Querlioz, Damien and Bichler, Olivier and Dollfus, Philippe and Gamrat, Christian},
  journal={IEEE Trans. on Nanotechnol.},
  volume={12},
  number={3},
  pages={288--295},
  year={2013},
  publisher={IEEE}
}

@article{rumelhart1986learning,
  title={Learning representations by back-propagating errors},
  author={Rumelhart, David E and Hinton, Geoffrey E and Williams, Ronald J},
  journal={Nature},
  volume={323},
  number={6088},
  pages={533--536},
  year={1986},
  publisher={Nature Publishing Group}
}

@article{linnainmaa1970representation,
  title={The representation of the cumulative rounding error of an algorithm as a {Taylor} expansion of the local rounding errors},
  author={Linnainmaa, Seppo},
  journal={Master's Thesis (in Finnish), Univ. of Helsinki},
  pages={6--7},
  year={1970}
}

@incollection{werbos1982applications,
  title={Applications of advances in nonlinear sensitivity analysis},
  author={Werbos, Paul J},
  booktitle={Syst. Model. and Optim.},
  pages={762--770},
  year={1982},
  publisher={Springer}
}

@article{bohte2002error,
  title={Error-backpropagation in temporally encoded networks of spiking neurons},
  author={Bohte, Sander M and Kok, Joost N and La Poutre, Han},
  journal={Neurocomputing},
  volume={48},
  number={1-4},
  pages={17--37},
  year={2002},
  publisher={Elsevier}
}

@inproceedings{glorot2010understanding,
  title={Understanding the difficulty of training deep feedforward neural networks},
  author={Glorot, Xavier and Bengio, Yoshua},
  booktitle={Proc. of the 13th Int. Conf. on Artificial Intell. and Statistics},
  pages={249--256},
  year={2010},
  organization={JMLR Workshop and Conf. Proc.}
}

@article{azghadi2014spike,
  title={Spike-based synaptic plasticity in silicon: Design, implementation, application, and challenges},
  author={Azghadi, Mostafa Rahimi and Iannella, Nicolangelo and Al-Sarawi, Said F and Indiveri, Giacomo and Abbott, Derek},
  journal={Proc. of the IEEE},
  volume={102},
  number={5},
  pages={717--737},
  year={2014},
  publisher={IEEE}
}

@book{hebb1949organisation,
  title={The organisation of behaviour: A neuropsychological theory},
  author={Hebb, Donald Olding},
  year={1949},
  publisher={Sci. Editions New York}
}


@article{hunsberger2015spiking,
  title={Spiking deep networks with {LIF} neurons},
  author={Hunsberger, Eric and Eliasmith, Chris},
  journal={arXiv preprint arXiv:1510.08829},
  year={2015}
}

@inproceedings{diehl2016conversion,
  title={Conversion of artificial recurrent neural networks to spiking neural networks for low-power neuromorphic hardware},
  author={Diehl, Peter U and Zarrella, Guido and Cassidy, Andrew and Pedroni, Bruno U and Neftci, Emre},
  booktitle={2016 IEEE Int. Conf. on Rebooting Comput. (ICRC)},
  pages={1--8},
  year={2016},
  organization={IEEE}
}

@article{hu2018spiking,
  title={Spiking deep residual network},
  author={Hu, Yangfan and Tang, Huajin and Pan, Gang},
  journal={arXiv preprint arXiv:1805.01352},
  year={2018}
}

@article{rueckauer2017conversion,
  title={Conversion of continuous-valued deep networks to efficient event-driven networks for image classification},
  author={Rueckauer, Bodo and Lungu, Iulia-Alexandra and Hu, Yuhuang and Pfeiffer, Michael and Liu, Shih-Chii},
  journal={Frontiers in Neuroscience},
  volume={11},
  pages={682},
  year={2017},
  publisher={Frontiers}
}

@article{stockl2021optimized,
  title={Optimized spiking neurons can classify images with high accuracy through temporal coding with two spikes},
  author={St{\"o}ckl, Christoph and Maass, Wolfgang},
  journal={Nature Mach. Intell.},
  volume={3},
  number={3},
  pages={230--238},
  year={2021},
  publisher={Nature Publishing Group}
}

@inproceedings{rathi2019enabling,
  title={Enabling Deep Spiking Neural Networks with Hybrid Conversion and Spike Timing Dependent Backpropagation},
  author={Rathi, Nitin and Srinivasan, Gopalakrishnan and Panda, Priyadarshini and Roy, Kaushik},
  booktitle={Int. Conf. on Learn. Representations},
  year={2019}
}


@article{roy2019towards,
  title={Towards spike-based machine intelligence with neuromorphic computing},
  author={Roy, Kaushik and Jaiswal, Akhilesh and Panda, Priyadarshini},
  journal={Nature},
  volume={575},
  number={7784},
  pages={607--617},
  year={2019},
  publisher={Nature Publishing Group}
}

@article{pfeiffer2018deep,
  title={Deep learning with spiking neurons: Opportunities and challenges},
  author={Pfeiffer, Michael and Pfeil, Thomas},
  journal={Frontiers in Neuroscience},
  volume={12},
  pages={774},
  year={2018},
  publisher={Frontiers}
}

@article{booij2005gradient,
  title={A gradient descent rule for spiking neurons emitting multiple spikes},
  author={Booij, Olaf and tat Nguyen, Hieu},
  journal={Inf. Process. Lett.},
  volume={95},
  number={6},
  pages={552--558},
  year={2005},
  publisher={Elsevier}
}

@article{zenke2021brain,
  title={Brain-inspired learning on neuromorphic substrates},
  author={Zenke, Friedemann and Neftci, Emre O},
  journal={Proc. of the IEEE},
  volume={109},
  number={5},
  pages={935--950},
  year={2021},
  publisher={IEEE}
}

@article{benucci2013adaptation,
  title={Adaptation maintains population homeostasis in primary visual cortex},
  author={Benucci, Andrea and Saleem, Aman B and Carandini, Matteo},
  journal={Nature Neuroscience},
  volume={16},
  number={6},
  pages={724--729},
  year={2013},
  publisher={Nature Publishing Group}
}

@article{wark2007sensory,
  title={Sensory adaptation},
  author={Wark, Barry and Lundstrom, Brian Nils and Fairhall, Adrienne},
  journal={Current Opinion in Neurobiology},
  volume={17},
  number={4},
  pages={423--429},
  year={2007},
  publisher={Elsevier}
}

@article{tavanaei2019bp,
  title={{BP-STDP}: Approximating backpropagation using spike timing dependent plasticity},
  author={Tavanaei, Amirhossein and Maida, Anthony},
  journal={Neurocomputing},
  volume={330},
  pages={39--47},
  year={2019},
  publisher={Elsevier}
}



@article{jin2023bplc+,
  title={BPLC+ NOSO: backpropagation of errors based on latency code with neurons that only spike once at most},
  author={Jin, Seong Min and Kim, Dohun and Yoo, Dong Hyung and Eshraghian, Jason and Jeong, Doo Seok},
  journal={Complex \& Intelligent Systems},
  pages={1--18},
  year={2023},
  publisher={Springer}
}

@article{kosters2023benchmarking,
  title={Benchmarking energy consumption and latency for neuromorphic computing in condensed matter and particle physics},
  author={K{\"o}sters, Dominique J and Kortman, Bryan A and Boybat, Irem and Ferro, Elena and Dolas, Sagar and Ruiz de Austri, Roberto and Kwisthout, Johan and Hilgenkamp, Hans and Rasing, Theo and Riel, Heike and others},
  journal={APL Machine Learning},
  volume={1},
  number={1},
  pages={016101},
  year={2023},
  publisher={AIP Publishing LLC}
}

@inproceedings{he2019bag,
  title={Bag of tricks for image classification with convolutional neural networks},
  author={He, Tong and Zhang, Zhi and Zhang, Hang and Zhang, Zhongyue and Xie, Junyuan and Li, Mu},
  booktitle={Proceedings of the IEEE/CVF conference on computer vision and pattern recognition},
  pages={558--567},
  year={2019}
}

@article{hinton2012,
  title={Neural networks for machine learning},
  author={Hinton, Geoffrey},
  journal={Coursera, video lectures},
  year={2012}
}

@inproceedings{eshraghian2022navigating,
  title={Navigating Local Minima in Quantized Spiking Neural Networks},
  author={Eshraghian, Jason K and Lammie, Corey and Azghadi, Mostafa Rahimi and Lu, Wei D},
  booktitle={2022 IEEE 4th International Conference on Artificial Intelligence Circuits and Systems (AICAS)},
  pages={352--355},
  year={2022},
  organization={IEEE}
}

@article{eshraghian2022memristor,
  title={Memristor-based binarized spiking neural networks: Challenges and applications},
  author={Eshraghian, Jason K and Wang, Xinxin and Lu, Wei D},
  journal={IEEE Nanotechnology Magazine},
  volume={16},
  number={2},
  pages={14--23},
  year={2022},
  publisher={IEEE}
}

@inproceedings{fiesler1990weight,
  title={Weight discretization paradigm for optical neural networks},
  author={Fiesler, Emile and Choudry, Amar and Caulfield, H John},
  booktitle={Optical interconnections and networks},
  volume={1281},
  pages={164--173},
  year={1990},
  organization={SPIE}
}

@article{balzer1991weight,
  title={Weight quantization in Boltzmann machines},
  author={Balzer, Wolfgang and Takahashi, Masanobu and Ohta, Jun and Kyuma, Kazuo},
  journal={Neural Networks},
  volume={4},
  number={3},
  pages={405--409},
  year={1991},
  publisher={Elsevier}
}

@article{hou2018loss,
  title={Loss-aware weight quantization of deep networks},
  author={Hou, Lu and Kwok, James T},
  journal={arXiv preprint arXiv:1802.08635},
  year={2018}
}

@article{micikevicius2017mixed,
  title={Mixed precision training},
  author={Micikevicius, Paulius and Narang, Sharan and Alben, Jonah and Diamos, Gregory and Elsen, Erich and Garcia, David and Ginsburg, Boris and Houston, Michael and Kuchaiev, Oleksii and Venkatesh, Ganesh and others},
  journal={arXiv preprint arXiv:1710.03740},
  year={2017}
}

@software{brevitas,
  author       = {Alessandro Pappalardo},
  title        = {Xilinx/brevitas},
  year         = {2022},
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.3333552},
  url          = {https://doi.org/10.5281/zenodo.3333552}
}

@article{lee2016training,
  title={Training deep spiking neural networks using backpropagation},
  author={Lee, Jun Haeng and Delbruck, Tobi and Pfeiffer, Michael},
  journal={Frontiers in neuroscience},
  volume={10},
  pages={508},
  year={2016},
  publisher={Frontiers Media SA}
}

@article{richards2019deep,
  title={A deep learning framework for neuroscience},
  author={Richards, Blake A and Lillicrap, Timothy P and Beaudoin, Philippe and Bengio, Yoshua and Bogacz, Rafal and Christensen, Amelia and Clopath, Claudia and Costa, Rui Ponte and de Berker, Archy and Ganguli, Surya and others},
  journal={Nature Neuroscience},
  volume={22},
  number={11},
  pages={1761--1770},
  year={2019},
  publisher={Nature Publishing Group}
}

@article{schultz1997neural,
  title={A neural substrate of prediction and reward},
  author={Schultz, Wolfram and Dayan, Peter and Montague, P Read},
  journal={Sci.},
  volume={275},
  number={5306},
  pages={1593--1599},
  year={1997},
  publisher={American Assoc. for the Advancement of Sci.}
}

@article{huang2011predictive,
  title={Predictive coding},
  author={Huang, Yanping and Rao, Rajesh PN},
  journal={Wiley Interdisciplinary Rev.: Cognitive Sci.},
  volume={2},
  number={5},
  pages={580--593},
  year={2011},
  publisher={Wiley Online Library}
}

@article{marblestone2016toward,
  title={Toward an integration of deep learning and neuroscience},
  author={Marblestone, Adam H and Wayne, Greg and Kording, Konrad P},
  journal={Frontiers in Comput. Neuroscience},
  volume={10},
  pages={94},
  year={2016},
  publisher={Frontiers}
}

@article{baldi2016theory,
  title={A theory of local learning, the learning channel, and the optimality of backpropagation},
  author={Baldi, Pierre and Sadowski, Peter},
  journal={Neural Netw.},
  volume={83},
  pages={51--74},
  year={2016},
  publisher={Elsevier}
}

@article{guerguiev2017towards,
  title={Towards deep learning with segregated dendrites},
  author={Guerguiev, Jordan and Lillicrap, Timothy P and Richards, Blake A},
  journal={Elife},
  volume={6},
  pages={e22901},
  year={2017},
  publisher={eLife Sci. Publications Limited}
}

@article{stuart1997action,
  title={Action potential initiation and backpropagation in neurons of the mammalian CNS},
  author={Stuart, Greg and Spruston, Nelson and Sakmann, Bert and H{\"a}usser, Michael},
  journal={Trends in neurosciences},
  volume={20},
  number={3},
  pages={125--131},
  year={1997},
  publisher={Elsevier}
}

@article{werfel2005learning,
  title={Learning curves for stochastic gradient descent in linear feedforward networks},
  author={Werfel, Justin and Xie, Xiaohui and Seung, H Sebastian},
  journal={Neural Comput.},
  volume={17},
  number={12},
  pages={2699--2718},
  year={2005},
  publisher={MIT Press One Rogers Street, Cambridge, MA 02142-1209, USA journals-info~…}
}

@article{seung2003learning,
  title={Learning in spiking neural networks by reinforcement of stochastic synaptic transmission},
  author={Seung, Hyunjune Sebastian},
  journal={Neuron},
  volume={40},
  number={6},
  pages={1063--1073},
  year={2003},
  publisher={Elsevier}
}

@article{lillicrap2020backpropagation,
  title={Backpropagation and the brain},
  author={Lillicrap, Timothy P and Santoro, Adam and Marris, Luke and Akerman, Colin J and Hinton, Geoffrey},
  journal={Nature Rev. Neuroscience},
  volume={21},
  number={6},
  pages={335--346},
  year={2020},
  publisher={Nature Publishing Group}
}

@article{lillicrap2014random,
  title={Random feedback weights support learning in deep neural networks},
  author={Lillicrap, Timothy P and Cownden, Daniel and Tweed, Douglas B and Akerman, Colin J},
  journal={arXiv preprint arXiv:1411.0247},
  year={2014}
}

@article{moskovitz2018feedback,
  title={Feedback alignment in deep convolutional networks},
  author={Moskovitz, Theodore H and Litwin-Kumar, Ashok and Abbott, LF},
  journal={arXiv preprint arXiv:1812.06488},
  year={2018}
}

@inproceedings{bartunov2018assessing,
  title={Assessing the scalability of biologically-motivated deep learning algorithms and architectures},
  author={Bartunov, Sergey and Santoro, Adam and Richards, Blake A and Marris, Luke and Hinton, Geoffrey E and Lillicrap, Timothy P},
  booktitle={Proc. of the 32nd Int. Conf. on Neural Inf. Process. Syst.},
  pages={9390--9400},
  year={2018}
}

@article{xiao2018biologically,
  title={Biologically-plausible learning algorithms can scale to large datasets},
  author={Xiao, Will and Chen, Honglin and Liao, Qianli and Poggio, Tomaso},
  journal={arXiv preprint arXiv:1811.03567},
  year={2018}
}

@article{london2005dendritic,
  title={Dendritic computation},
  author={London, Michael and H{\"a}usser, Michael},
  journal={Annu. Rev. Neurosci.},
  volume={28},
  pages={503--532},
  year={2005},
  publisher={Annu. Rev.}
}

@inproceedings{bengio2007greedy,
  title={Greedy layer-wise training of deep networks},
  author={Bengio, Yoshua and Lamblin, Pascal and Popovici, Dan and Larochelle, Hugo},
  booktitle={Adv. in Neural Inf. Process. Syst.},
  pages={153--160},
  year={2007}
}

@article{neftci2017event,
  title={Event-driven random back-propagation: Enabling neuromorphic deep learning machines},
  author={Neftci, Emre O and Augustine, Charles and Paul, Somnath and Detorakis, Georgios},
  journal={Frontiers in Neuroscience},
  volume={11},
  pages={324},
  year={2017},
  publisher={Frontiers}
}

@article{frenkel2021learning,
  title={Learning without feedback: Fixed random learning signals allow for feedforward training of deep neural networks},
  author={Frenkel, Charlotte and Lefebvre, Martin and Bol, David},
  journal={Frontiers in Neuroscience},
  volume={15},
  year={2021},
  publisher={Frontiers Media SA}
}

@article{mostafa2018deep,
  title={Deep supervised learning using local errors},
  author={Mostafa, Hesham and Ramesh, Vishwajith and Cauwenberghs, Gert},
  journal={Frontiers in Neuroscience},
  volume={12},
  pages={608},
  year={2018},
  publisher={Frontiers}
}

@article{kushnir2019learning,
  title={Learning temporal structure of the input with a network of integrate-and-fire neurons},
  author={Kushnir, Lyudmila and Den{\`e}ve, Sophie},
  journal={arXiv preprint arXiv:1912.10262},
  year={2019}
}

@article{deneve2017brain,
  title={The brain as an efficient and robust adaptive learner},
  author={Den{\`e}ve, Sophie and Alemi, Alireza and Bourdoukan, Ralph},
  journal={Neuron},
  volume={94},
  number={5},
  pages={969--977},
  year={2017},
  publisher={Elsevier}
}


@article{huh2017gradient,
  title={Gradient descent for spiking neural networks},
  author={Huh, Dongsung and Sejnowski, Terrence J},
  journal={arXiv preprint arXiv:1706.04698},
  year={2017}
}

@article{neftci2019surrogate,
  title={Surrogate gradient learning in spiking neural networks: Bringing the power of gradient-based optimization to spiking neural networks},
  author={Neftci, Emre O and Mostafa, Hesham and Zenke, Friedemann},
  journal={IEEE Signal Process. Mag.},
  volume={36},
  number={6},
  pages={51--63},
  year={2019},
  publisher={IEEE}
}

@article{hochreiter1997long,
  title={Long short-term memory},
  author={Hochreiter, Sepp and Schmidhuber, J{\"u}rgen},
  journal={Neural Comput.},
  volume={9},
  number={8},
  pages={1735--1780},
  year={1997},
  publisher={MIT Press}
}

@inproceedings{cho2014learning,
  title={Learning Phrase Representations using {RNN} Encoder--Decoder for Statistical Machine Translation},
  author={Cho, Kyunghyun and van Merri{\"e}nboer, Bart and Gulcehre, Caglar and Bahdanau, Dzmitry and Bougares, Fethi and Schwenk, Holger and Bengio, Yoshua},
  booktitle={Proc. of the 2014 Conf. on Empirical Methods in Natural Lang. Process. (EMNLP)},
  pages={1724--1734},
  year={2014}
}


@article{watt2010homeostatic,
  title={Homeostatic plasticity and {STDP}: Keeping a neuron's cool in a fluctuating world},
  author={Watt, Alanna J and Desai, Niraj S},
  journal={Frontiers in Synaptic Neuroscience},
  volume={2},
  pages={5},
  year={2010},
  publisher={Frontiers}
}

@article{sjostrom2001rate,
  title={Rate, timing, and cooperativity jointly determine cortical synaptic plasticity},
  author={Sj{\"o}str{\"o}m, Per Jesper and Turrigiano, Gina G and Nelson, Sacha B},
  journal={Neuron},
  volume={32},
  number={6},
  pages={1149--1164},
  year={2001},
  publisher={Elsevier}
}

@article{bellec2018long,
  title={Long short-term memory and learning-to-learn in networks of spiking neurons},
  author={Bellec, Guillaume and Salaj, Darjan and Subramoney, Anand and Legenstein, Robert and Maass, Wolfgang},
  journal={arXiv preprint arXiv:1803.09574},
  year={2018}
}

@inproceedings{schrauwen2004extending,
  title={Extending {Spikeprop}},
  author={Schrauwen, Benjamin and Van Campenhout, Jan},
  booktitle={2004 IEEE Int. Joint Conf. on Neural Netw.},
  volume={1},
  pages={471--475},
  year={2004},
  organization={IEEE}
}

@article{xu2013supervised,
  title={A supervised multi-spike learning algorithm based on gradient descent for spiking neural networks},
  author={Xu, Yan and Zeng, Xiaoqin and Han, Lixin and Yang, Jing},
  journal={Neural Netw.},
  volume={43},
  pages={99--113},
  year={2013},
  publisher={Elsevier}
}

@article{wunderlich2021event,
  title={Event-based backpropagation can compute exact gradients for spiking neural networks},
  author={Wunderlich, Timo C and Pehle, Christian},
  journal={Scientific Rep.},
  volume={11},
  number={1},
  pages={1--17},
  year={2021},
  publisher={Nature Publishing Group}
}

@article{taherkhani2015dl,
  title={{DL-ReSuMe:} A delay learning-based remote supervised method for spiking neurons},
  author={Taherkhani, Aboozar and Belatreche, Ammar and Li, Yuhua and Maguire, Liam P},
  journal={IEEE Trans. on Neural Netw. and Learn. Syst.},
  volume={26},
  number={12},
  pages={3137--3149},
  year={2015},
  publisher={IEEE}
}

@article{williams1989learning,
  title={A learning algorithm for continually running fully recurrent neural networks},
  author={Williams, Ronald J and Zipser, David},
  journal={Neural Comput.},
  volume={1},
  number={2},
  pages={270--280},
  year={1989},
  publisher={MIT Press One Rogers Street, Cambridge, MA 02142-1209, USA journals-info~…}
}

@inproceedings{tallec2017unbiased,
  title={Unbiased Online Recurrent Optimization},
  author={Tallec, Corentin and Ollivier, Yann},
  booktitle={Int. Conf. on Learn. Representations},
  year={2018}
}

@inproceedings{mujika2018approximating,
  title={Approximating real-time recurrent learning with random {Kronecker} factors},
  author={Mujika, Asier and Meier, Florian and Steger, Angelika},
  booktitle={Proc. of the 32nd Int. Conf. on Neural Inf. Process. Syst.},
  pages={6594--6603},
  year={2018}
}


@inproceedings{roth2018kernel,
  title={Kernel {RNN} learning (ke{RNl})},
  author={Roth, Christopher and Kanitscheider, Ingmar and Fiete, Ila},
  booktitle={Int. Conf. on Learn. Representations},
  year={2018}
}

@article{murray2019local,
  title={Local online learning in recurrent networks with random feedback},
  author={Murray, James M},
  journal={ELife},
  volume={8},
  pages={e43299},
  year={2019},
  publisher={eLife Sci. Publications Limited}
}

@article{marschall2020unified,
  title={A unified framework of online learning algorithms for training recurrent neural networks},
  author={Marschall, Owen and Cho, Kyunghyun and Savin, Cristina},
  journal={J. of Mach. Learn. Res.},
  year={2020}
}

@article{bohnstingl2020online,
  title={Online spatio-temporal learning in deep neural networks},
  author={Bohnstingl, Thomas and Wo{\'z}niak, Stanis{\l}aw and Maass, Wolfgang and Pantazi, Angeliki and Eleftheriou, Evangelos},
  journal={arXiv preprint arXiv:2007.12723},
  year={2020}
}


@incollection{mccloskey1989catastrophic,
  title={Catastrophic interference in connectionist networks: The sequential learning problem},
  author={McCloskey, Michael and Cohen, Neal J},
  booktitle={Psychol. of Learn. and Motivation},
  volume={24},
  pages={109--165},
  year={1989},
  publisher={Elsevier}
}

@inproceedings{hinton2016can,
  title={Can the brain do back-propagation?},
  author={Hinton, Geoffrey and others},
  booktitle={Invited talk at Stanford Univ. Colloq. on Comput. Syst.},
  year={2016}
}

@article{bengio2015towards,
  title={Towards biologically plausible deep learning},
  author={Bengio, Yoshua and Lee, Dong-Hyun and Bornschein, Jorg and Mesnard, Thomas and Lin, Zhouhan},
  journal={arXiv preprint arXiv:1502.04156},
  year={2015}
}

@article{crick1989recent,
  title={The recent excitement about neural networks.},
  author={Crick, Francis},
  journal={Nature},
  volume={337},
  number={6203},
  pages={129--132},
  year={1989}
}

@article{williams1988toward,
  title={Toward a theory of reinforcement-learning connectionist systems},
  author={Williams, Ronald J},
  journal={Tech. Rep. NU-CCS-88-3, Northeastern Univ.},
  year={1988}
}

@article{williams1992simple,
  title={Simple statistical gradient-following algorithms for connectionist reinforcement learning},
  author={Williams, Ronald J.},
  journal={Mach. Learn.},
  volume={8},
  number={3},
  pages={229--256},
  year={1992},
  publisher={Springer}
}

@article{bengio2014auto,
  title={How auto-encoders could provide credit assignment in deep networks via target propagation},
  author={Bengio, Yoshua},
  journal={arXiv preprint arXiv:1407.7906},
  year={2014}
  }

@inproceedings{comsa2020temporal,
  title={Temporal coding in spiking neural networks with alpha synaptic function},
  author={Comsa, Iulia M and Potempa, Krzysztof and Versari, Luca and Fischbacher, Thomas and Gesmundo, Andrea and Alakuijala, Jyrki},
  booktitle={ICASSP 2020-2020 IEEE Int. Conf. on Acoust., Speech and Signal Process. (ICASSP)},
  pages={8529--8533},
  year={2020},
  organization={IEEE}
}

@article{renart2004mean,
  title={Mean-field theory of irregularly spiking neuronal populations and working memory in recurrent cortical networks},
  author={Renart, Alfonso and Brunel, Nicolas and Wang, Xiao-Jing},
  journal={Comput. Neuroscience: A Comprehensive Approach},
  pages={431--490},
  year={2004}
}

@article{renart2003robust,
  title={Robust spatial working memory through homeostatic synaptic scaling in heterogeneous cortical networks},
  author={Renart, Alfonso and Song, Pengcheng and Wang, Xiao-Jing},
  journal={Neuron},
  volume={38},
  number={3},
  pages={473--485},
  year={2003},
  publisher={Elsevier}
}

@book{amit1992modeling,
  title={Modeling brain function: The world of attractor neural networks},
  author={Amit, Daniel J},
  year={1992},
  publisher={Cambridge Univ. Press}
}

@article{laskin2020parallel,
  title={Parallel training of deep networks with local updates},
  author={Laskin, Michael and Metz, Luke and Nabarrao, Seth and Saroufim, Mark and Noune, Badreddine and Luschi, Carlo and Sohl-Dickstein, Jascha and Abbeel, Pieter},
  journal={arXiv preprint arXiv:2012.03837},
  year={2020}
}

@article{shin2017continual,
  title={Continual learning with deep generative replay},
  author={Shin, Hanul and Lee, Jung Kwon and Kim, Jaehong and Kim, Jiwon},
  journal={arXiv preprint arXiv:1705.08690},
  year={2017}
}

@InProc.{miller2019stable,
title		= {Stable Recurrent Models},
author		= {John Miller and Moritz Hardt},
booktitle	= {Int. Conf. on Learn. Representations},
year		= {2019},}

@article{rigotti2010internal,
  title={Internal representation of task rules by recurrent dynamics: The importance of the diversity of neural responses},
  author={Rigotti, Mattia and Ben Dayan Rubin, Daniel D and Wang, Xiao-Jing and Fusi, Stefano},
  journal={Frontiers in Comput. Neuroscience},
  volume={4},
  pages={24},
  year={2010},
  publisher={Frontiers}
}

@article{davies2018loihi,
  title={Loihi: A neuromorphic manycore processor with on-chip learning},
  author={Davies, Mike and Srinivasa, Narayan and Lin, Tsung-Han and Chinya, Gautham and Cao, Yongqiang and Choday, Sri Harsha and Dimou, Georgios and Joshi, Prasad and Imam, Nabil and Jain, Shweta and others},
  journal={IEEE Micro},
  volume={38},
  number={1},
  pages={82--99},
  year={2018},
  publisher={IEEE}
}

@article{merolla2014million,
  title={A million spiking-neuron integrated circuit with a scalable communication network and interface},
  author={Merolla, Paul A and Arthur, John V and Alvarez-Icaza, Rodrigo and Cassidy, Andrew S and Sawada, Jun and Akopyan, Filipp and Jackson, Bryan L and Imam, Nabil and Guo, Chen and Nakamura, Yutaka and others},
  journal={Sci.},
  volume={345},
  number={6197},
  pages={668--673},
  year={2014},
  publisher={American Assoc. for the Advancement of Sci.}
}

@article{furber2014spinnaker,
  title={The {SpiNNaker} project},
  author={Furber, Steve B and Galluppi, Francesco and Temple, Steve and Plana, Luis A},
  journal={Proc. of the IEEE},
  volume={102},
  number={5},
  pages={652--665},
  year={2014},
  publisher={IEEE}
}

@article{neckar2018braindrop,
  title={Braindrop: A mixed-signal neuromorphic architecture with a dynamical systems-based programming model},
  author={Neckar, Alexander and Fok, Sam and Benjamin, Ben V and Stewart, Terrence C and Oza, Nick N and Voelker, Aaron R and Eliasmith, Chris and Manohar, Rajit and Boahen, Kwabena},
  journal={Proc. of the IEEE},
  volume={107},
  number={1},
  pages={144--164},
  year={2018},
  publisher={IEEE}
}

@article{voelker2019legendre,
  title={Legendre memory units: Continuous-time representation in recurrent neural networks},
  author={Voelker, Aaron and Kaji{\'c}, Ivana and Eliasmith, Chris},
  journal={Advances in neural information processing systems},
  volume={32},
  year={2019}
}

@inproceedings{knight2023easy,
  title={Easy and efficient spike-based Machine Learning with mlGeNN},
  author={Knight, James C and Nowotny, Thomas},
  booktitle={Neuro-Inspired Computational Elements Conference},
  pages={115--120},
  year={2023}
}

@article{izhikevich2003simple,
  title={Simple model of spiking neurons},
  author={Izhikevich, Eugene M},
  journal={IEEE Transactions on neural networks},
  volume={14},
  number={6},
  pages={1569--1572},
  year={2003},
  publisher={IEEE}
}

@article{bauer2022exodus,
  title={EXODUS: Stable and efficient training of spiking neural networks},
  author={Bauer, Felix Christian and Lenz, Gregor and Haghighatshoar, Saeid and Sheik, Sadique},
  journal={arXiv preprint arXiv:2205.10242},
  year={2022}
}

@article{frady2022efficient,
  title={Efficient Neuromorphic Signal Processing with Resonator Neurons},
  author={Frady, E Paxon and Sanborn, Sophia and Shrestha, Sumit Bam and Rubin, Daniel Ben Dayan and Orchard, Garrick and Sommer, Friedrich T and Davies, Mike},
  journal={Journal of Signal Processing Systems},
  volume={94},
  number={10},
  pages={917--927},
  year={2022},
  publisher={Springer}
}

@article{leroux2023online,
  title={Online Transformers with Spiking Neurons for Fast Prosthetic Hand Control},
  author={Leroux, Nathan and Finkbeiner, Jan and Neftci, Emre},
  journal={arXiv preprint arXiv:2303.11860},
  year={2023}
}

@article{yik2023neurobench,
  title={NeuroBench: Advancing Neuromorphic Computing through Collaborative, Fair and Representative Benchmarking},
  author={Yik, Jason and Ahmed, Soikat Hasan and Ahmed, Zergham and Anderson, Brian and Andreou, Andreas G and Bartolozzi, Chiara and Basu, Arindam and Blanken, Douwe den and Bogdan, Petrut and Bohte, Sander and others},
  journal={arXiv preprint arXiv:2304.04640},
  year={2023}
}

@inproceedings{dellaferrera2022error,
  title={Error-driven input modulation: solving the credit assignment problem without a backward pass},
  author={Dellaferrera, Giorgia and Kreiman, Gabriel},
  booktitle={International Conference on Machine Learning},
  pages={4937--4955},
  year={2022},
  organization={PMLR}
}

@article{zhu2023spikegpt,
  title={SpikeGPT: Generative Pre-trained Language Model with Spiking Neural Networks},
  author={Zhu, Rui-Jie and Zhao, Qihang and Eshraghian, Jason K},
  journal={arXiv preprint arXiv:2302.13939},
  year={2023}
}

@inproceedings{parsa2021multi,
  title={Multi-Objective Hyperparameter Optimization for Spiking Neural Network Neuroevolution},
  author={Parsa, Maryam and Kulkarni, Shruti R and Coletti, Mark and Bassett, Jeffrey and Mitchell, J Parker and Schuman, Catherine D},
  booktitle={2021 IEEE Congress on Evolutionary Computation (CEC)},
  pages={1225--1232},
  year={2021},
  organization={IEEE}
}

@inproceedings{schuman2020evolutionary,
  title={Evolutionary optimization for neuromorphic systems},
  author={Schuman, Catherine D and Mitchell, J Parker and Patton, Robert M and Potok, Thomas E and Plank, James S},
  booktitle={Proceedings of the Neuro-inspired Computational Elements Workshop},
  pages={1--9},
  year={2020}
}

@article{hinton2022forward,
  title={The forward-forward algorithm: Some preliminary investigations},
  author={Hinton, Geoffrey},
  journal={arXiv preprint arXiv:2212.13345},
  year={2022}
}

@article{davies2021advancing,
  title={Advancing neuromorphic computing with {Loihi}: A survey of results and outlook},
  author={Davies, Mike and Wild, Andreas and Orchard, Garrick and Sandamirskaya, Yulia and Guerra, Gabriel A Fonseca and Joshi, Prasad and Plank, Philipp and Risbud, Sumedh R},
  journal={Proc. of the IEEE},
  volume={109},
  number={5},
  pages={911--934},
  year={2021},
  publisher={IEEE}
}

@article{sharifshazileh2021electronic,
  title={An electronic neuromorphic system for real-time detection of high frequency oscillations {(HFO)} in intracranial EEG},
  author={Sharifshazileh, Mohammadali and Burelo, Karla and Sarnthein, Johannes and Indiveri, Giacomo},
  journal={Nature Commun.},
  volume={12},
  number={1},
  pages={1--14},
  year={2021},
  publisher={Nature Publishing Group}
}

@article{cichy2016comparison,
  title={Comparison of deep neural networks to spatio-temporal cortical dynamics of human visual object recognition reveals hierarchical correspondence},
  author={Cichy, Radoslaw Martin and Khosla, Aditya and Pantazis, Dimitrios and Torralba, Antonio and Oliva, Aude},
  journal={Scientific Rep.},
  volume={6},
  number={1},
  pages={1--13},
  year={2016},
  publisher={Nature Publishing Group}
}

@article{rajalingham2018large,
  title={Large-scale, high-resolution comparison of the core visual object recognition behavior of humans, monkeys, and state-of-the-art deep artificial neural networks},
  author={Rajalingham, Rishi and Issa, Elias B and Bashivan, Pouya and Kar, Kohitij and Schmidt, Kailyn and DiCarlo, James J},
  journal={J. of Neuroscience},
  volume={38},
  number={33},
  pages={7255--7269},
  year={2018},
  publisher={Soc Neuroscience}
}

@article{schrimpf2020brain,
  title={Brain-score: Which artificial neural network for object recognition is most brain-like?},
  author={Schrimpf, Martin and Kubilius, Jonas and Hong, Ha and Majaj, Najib J and Rajalingham, Rishi and Issa, Elias B and Kar, Kohitij and Bashivan, Pouya and Prescott-Roy, Jonathan and Geiger, Franziska and others},
  journal={bioRxiv 407007},
  year={2020},
  publisher={Cold Spring Harbor Laboratory}
}

@article{kell2018task,
  title={A task-optimized neural network replicates human auditory behavior, predicts brain responses, and reveals a cortical processing hierarchy},
  author={Kell, Alexander JE and Yamins, Daniel LK and Shook, Erica N and Norman-Haignere, Sam V and McDermott, Josh H},
  journal={Neuron},
  volume={98},
  number={3},
  pages={630--644},
  year={2018},
  publisher={Elsevier}
}

@inproceedings{zenke2017continual,
  title={Continual learning through synaptic intelligence},
  author={Zenke, Friedemann and Poole, Ben and Ganguli, Surya},
  booktitle={Int. Conf. on Mach. Learn.},
  pages={3987--3995},
  year={2017},
  organization={PMLR}
}

@article{pei2019towards,
  title={Towards artificial general intelligence with hybrid {Tianjic} chip architecture},
  author={Pei, Jing and Deng, Lei and Song, Sen and Zhao, Mingguo and Zhang, Youhui and Wu, Shuang and Wang, Guanrui and Zou, Zhe and Wu, Zhenzhi and He, Wei and others},
  journal={Nature},
  volume={572},
  number={7767},
  pages={106--111},
  year={2019},
  publisher={Nature Publishing Group}
}

@article{krips2009stochastic,
  title={Stochastic properties of coincidence-detector neural cells},
  author={Krips, Ram and Furst, Miriam},
  journal={Neural Comput.},
  volume={21},
  number={9},
  pages={2524--2553},
  year={2009},
  publisher={MIT Press}
}

@article{brette2012computing,
  title={Computing with neural synchrony},
  author={Brette, Romain},
  journal={PLoS Comput. Biol.},
  volume={8},
  number={6},
  pages={e1002561},
  year={2012},
  publisher={Public Library of Sci. San Francisco, USA}
}

@article{paszke2017automatic,
  title={Automatic differentiation in {PyTorch}},
  author={Paszke, Adam and Gross, Sam and Chintala, Soumith and Chanan, Gregory and Yang, Edward and DeVito, Zachary and Lin, Zeming and Desmaison, Alban and Antiga, Luca and Lerer, Adam},
  journal={Proc. of the 31st Int. Conf. on Neural Inf. Process. Syst.: Workshop Autodiff Submission},
  year={2017}
}



@article{sanhueza2013camkii,
  title={The {CaMKII/NMDAR} complex as a molecular memory},
  author={Sanhueza, Magdalena and Lisman, John},
  journal={Molecular Brain},
  volume={6},
  number={1},
  pages={1--8},
  year={2013},
  publisher={BioMed Central}
}

@article{frostig2018compiling,
  title={Compiling machine learning programs via high-level tracing},
  author={Frostig, Roy and Johnson, Matthew James and Leary, Chris},
  journal={Syst. for Mach. Learn.},
  year={2018}
}

@misc{kaggle,
  author = {~},
  year = {2010},
  howpublished = {\url{{https://www.kaggle.com}}},
  title = {{Kaggle}}
}

@article{snntorch2021,
  author = {Eshraghian, Jason K and Ward, Max and Nefci, Emre O and Wang, Xinxin and Lenz, Gregor and Jeong, Doo Seok and Lu, Wei D},
  year = {2021},
  url = {https://github.com/jeshraghian/snntorch},
  title = {{snnTorch}}
}

@article{rusu2016progressive,
  title={Progressive neural networks},
  author={Rusu, Andrei A and Rabinowitz, Neil C and Desjardins, Guillaume and Soyer, Hubert and Kirkpatrick, James and Kavukcuoglu, Koray and Pascanu, Razvan and Hadsell, Raia},
  journal={arXiv preprint arXiv:1606.04671},
  year={2016}
}

@article{kirkpatrick2017overcoming,
  title={Overcoming catastrophic forgetting in neural networks},
  author={Kirkpatrick, James and Pascanu, Razvan and Rabinowitz, Neil and Veness, Joel and Desjardins, Guillaume and Rusu, Andrei A and Milan, Kieran and Quan, John and Ramalho, Tiago and Grabska-Barwinska, Agnieszka and others},
  journal={Proc. of the Nat. Acad. of Sci.},
  volume={114},
  number={13},
  pages={3521--3526},
  year={2017},
  publisher={Nat. Acad Sci.}
}

@article{payvand2020chip,
  title={On-chip error-triggered learning of multi-layer memristive spiking neural networks},
  author={Payvand, Melika and Fouda, Mohammed E and Kurdahi, Fadi and Eltawil, Ahmed M and Neftci, Emre O},
  journal={IEEE J. on Emerg. and Sel. Topics in Circuits and Syst.},
  volume={10},
  number={4},
  pages={522--535},
  year={2020},
  publisher={IEEE}
}

@article{shinomoto2007solution,
  title={A solution to the controversy between rate and temporal coding},
  author={Shinomoto, Shigeru and Koyama, Shinsuke},
  journal={Statistics in Medicine},
  volume={26},
  number={21},
  pages={4032--4038},
  year={2007},
  publisher={Wiley Online Library}
}

@incollection{deb2014multi,
  title={Multi-objective optimization},
  author={Deb, Kalyanmoy},
  booktitle={Search Methodologies},
  pages={403--449},
  year={2014},
  publisher={Springer}
}

@article{lammie2021memristive,
  title={Memristive Stochastic Computing for Deep Learning Parameter Optimization},
  author={Lammie, Corey and Eshraghian, Jason K and Lu, Wei D and Azghadi, Mostafa Rahimi},
  journal={IEEE Trans. on Circuits and Syst. II: Express Briefs},
  volume={68},
  number={5},
  pages={1650--1654},
  year={2021},
  publisher={IEEE}
}

@article{callaway2004feedforward,
  title={Feedforward, feedback and inhibitory connections in primate visual cortex},
  author={Callaway, Edward M},
  journal={Neural Netw.},
  volume={17},
  number={5-6},
  pages={625--632},
  year={2004},
  publisher={Elsevier}
}

@article{brette2015philosophy,
  title={Philosophy of the spike: {Rate}-based vs. spike-based theories of the brain},
  author={Brette, Romain},
  journal={Frontiers in Syst. Neuroscience},
  volume={9},
  pages={151},
  year={2015},
  publisher={Frontiers}
}

@article{mehta2002role,
  title={Role of experience and oscillations in transforming a rate code into a temporal code},
  author={Mehta, MR and Lee, AK and Wilson, MA},
  journal={Nature},
  volume={417},
  number={6890},
  pages={741--746},
  year={2002},
  publisher={Nature Publishing Group}
}

@article{rosenblatt1958perceptron,
  title={The perceptron: {A} probabilistic model for information storage and organization in the brain.},
  author={Rosenblatt, Frank},
  journal={Psychological Rev.},
  volume={65},
  number={6},
  pages={386},
  year={1958},
  publisher={American Psychological Assoc.}
}

@article{jun2017fully,
  title={Fully integrated silicon probes for high-density recording of neural activity},
  author={Jun, James J and Steinmetz, Nicholas A and Siegle, Joshua H and Denman, Daniel J and Bauza, Marius and Barbarits, Brian and Lee, Albert K and Anastassiou, Costas A and Andrei, Alexandru and Ayd{\i}n, {\c{C}}a{\u{g}}atay and others},
  journal={Nature},
  volume={551},
  number={7679},
  pages={232--236},
  year={2017},
  publisher={Nature Publishing Group}
}

@article{steinmetz2021neuropixels,
  title={Neuropixels 2.0: A miniaturized high-density probe for stable, long-term brain recordings},
  author={Steinmetz, Nicholas A and Aydin, Cagatay and Lebedeva, Anna and Okun, Michael and Pachitariu, Marius and Bauza, Marius and Beau, Maxime and Bhagat, Jai and B{\"o}hm, Claudia and Broux, Martijn and others},
  journal={Sci.},
  volume={372},
  number={6539},
  year={2021},
  publisher={American Assoc. for the Advancement of Sci.}
}


@article{eshraghian2020nonlinear,
  title={Nonlinear retinal response modeling for future neuromorphic instrumentation},
  author={Eshraghian, Jason K and Baek, Seungbum and Levi, Timoth{\'e}e and Kohno, Takashi and Al-Sarawi, Said and Leong, Philip HW and Cho, Kyoungrok and Abbott, Derek and Kavehei, Omid},
  journal={IEEE Instrum. \& Meas. Mag.},
  volume={23},
  number={1},
  pages={21--29},
  year={2020},
  publisher={IEEE}
}

@inproceedings{arrow2021prosthesis,
  title={Prosthesis Control Using Spike Rate Coding in the Retina Photoreceptor Cells},
  author={Arrow, Coen and Wu, Hancong and Baek, Seungbum and Iu, Herbert HC and Nazarpour, Kia and Eshraghian, Jason K},
  booktitle={2021 IEEE Int. Symp. on Circuits and Syst. (ISCAS)},
  pages={1--5},
  year={2021},
  organization={IEEE}
}

@inproceedings{robey2021naturalizing,
  title={Naturalizing Neuromorphic Vision Event Streams Using Generative Adversarial Networks},
  author={Robey, Dennis E and Thio, Wesley and Iu, Herbert HC and Eshraghian, Jason K},
  booktitle={2021 IEEE Int. Symp. on Circuits and Syst. (ISCAS)},
  pages={1--5},
  year={2021},
  organization={IEEE}
}

@article{kornijcuk2019recent,
  title={Recent Progress in Real-Time Adaptable Digital Neuromorphic Hardware},
  author={Kornijcuk, Vladimir and Jeong, Doo Seok},
  journal={Adv. Intell. Syst.},
  volume={1},
  number={6},
  pages={1900030},
  year={2019},
  publisher={Wiley Online Library}
}

@article{cai2020power,
  title={Power-efficient combinatorial optimization using intrinsic noise in memristor {Hopfield} neural networks},
  author={Cai, Fuxi and Kumar, Suhas and Van Vaerenbergh, Thomas and Sheng, Xia and Liu, Rui and Li, Can and Liu, Zhan and Foltin, Martin and Yu, Shimeng and Xia, Qiangfei and others},
  journal={Nature Electron.},
  volume={3},
  number={7},
  pages={409--418},
  year={2020},
  publisher={Nature Publishing Group}
}

@inproceedings{gaba2014memristive,
  title={Memristive devices for stochastic computing},
  author={Gaba, Siddharth and Knag, Phil and Zhang, Zhengya and Lu, Wei},
  booktitle={2014 IEEE Int. Symp. on Circuits and Syst. (ISCAS)},
  pages={2592--2595},
  year={2014},
  organization={IEEE}
}


@article{mueggler2017event,
  title={The event-camera dataset and simulator: Event-based data for pose estimation, visual odometry, and SLAM},
  author={Mueggler, Elias and Rebecq, Henri and Gallego, Guillermo and Delbruck, Tobi and Scaramuzza, Davide},
  journal={The Int. J. of Robot. Res.},
  volume={36},
  number={2},
  pages={142--149},
  year={2017},
  publisher={SAGE Publications Sage UK: London, England}
}

@article{zihao2018multi,
  title={The multivehicle stereo event camera dataset: An event camera dataset for {3D} perception},
  author={Zhu, Alex Zihao and Thakur, Dinesh and {\"O}zaslan, Tolga and Pfrommer, Bernd and Kumar, Vijay and Daniilidis, Kostas},
  journal={IEEE Robot. and Automat. Lett.},
  volume={3},
  number={3},
  pages={2032--2039},
  year={2018},
  publisher={IEEE}
}

@article{serrano2015poker,
  title={{Poker-DVS and MNIST-DVS}. {Their} history, how they were made, and other details},
  author={Serrano-Gotarredona, Teresa and Linares-Barranco, Bernabe},
  journal={Frontiers in Neuroscience},
  volume={9},
  pages={481},
  year={2015},
  publisher={Frontiers}
}

@article{cramer2020heidelberg,
  title={The {Heidelberg} spiking data sets for the systematic evaluation of spiking neural networks},
  author={Cramer, Benjamin and Stradmann, Yannik and Schemmel, Johannes and Zenke, Friedemann},
  journal={IEEE Trans. on Neural Netw. and Learn. Syst.},
  year={2020},
  publisher={IEEE}
}

@article{anumula2018feature,
  title={Feature representations for neuromorphic audio spike streams},
  author={Anumula, Jithendar and Neil, Daniel and Delbruck, Tobi and Liu, Shih-Chii},
  journal={Frontiers in Neuroscience},
  volume={12},
  pages={23},
  year={2018},
  publisher={Frontiers}
}

@article{gehrig2021dsec,
  title={Dsec: A stereo event camera dataset for driving scenarios},
  author={Gehrig, Mathias and Aarents, Willem and Gehrig, Daniel and Scaramuzza, Davide},
  journal={IEEE Robot. and Automat. Lett.},
  volume={6},
  number={3},
  pages={4947--4954},
  year={2021},
  publisher={IEEE}
}

@inproceedings{bi2019graph,
    title={Graph-based Object Classification for Neuromorphic Vision Sensing},
    author={Bi, Y and Chadha, A and Abbas, A and and Bourtsoulatze, E and Andreopoulos, Y},
    booktitle={2019 IEEE Int. Conf. on Comput. Vision (ICCV)},
    year={2019},
    organization={IEEE}
}

@software{lenz_gregor_2021_5079802,
  author       = {Lenz, Gregor and
                  Chaney, Kenneth and
                  Shrestha, Sumit Bam and
                  Oubari, Omar and
                  Picaud, Serge and
                  Zarrella, Guido},
  title        = {Tonic: event-based datasets and transformations.},
  month        = jul,
  year         = 2021,
  note         = {{Documentation available under 
                   https://tonic.readthedocs.io}},
  publisher    = {Zenodo},
  version      = {0.4.0},
  doi          = {10.5281/zenodo.5079802},
  url          = {https://doi.org/10.5281/zenodo.5079802}
}
@incollection{thorpe1998rank,
  title={Rank order coding},
  author={Thorpe, Simon and Gautrais, Jacques},
  booktitle={Computational neuroscience},
  pages={113--118},
  year={1998},
  publisher={Springer}
}
@article{mostafa2018learning,
  title={A learning framework for winner-take-all networks with stochastic synapses},
  author={Mostafa, Hesham and Cauwenberghs, Gert},
  journal={Neural computation},
  volume={30},
  number={6},
  pages={1542--1572},
  year={2018},
  publisher={MIT Press One Rogers Street, Cambridge, MA 02142-1209, USA journals-info~…}
}
@article{neftci2016stochastic,
  title={Stochastic synapses enable efficient brain-inspired learning machines},
  author={Neftci, Emre O and Pedroni, Bruno U and Joshi, Siddharth and Al-Shedivat, Maruan and Cauwenberghs, Gert},
  journal={Frontiers in neuroscience},
  volume={10},
  pages={241},
  year={2016},
  publisher={Frontiers Media SA}
}
@article{cohen2019event,
  title={Event-based sensing for space situational awareness},
  author={Cohen, Gregory and Afshar, Saeed and Morreale, Brittany and Bessell, Travis and Wabnitz, Andrew and Rutten, Mark and van Schaik, Andr{\'e}},
  journal={The Journal of the Astronautical Sciences},
  volume={66},
  number={2},
  pages={125--141},
  year={2019},
  publisher={Springer}
}
@article{afshar2020event,
  title={Event-based object detection and tracking for space situational awareness},
  author={Afshar, Saeed and Nicholson, Andrew Peter and van Schaik, Andre and Cohen, Gregory},
  journal={IEEE Sensors Journal},
  volume={20},
  number={24},
  pages={15117--15132},
  year={2020},
  publisher={IEEE}
}
@article{bauer2019real,
  title={Real-time ultra-low power ECG anomaly detection using an event-driven neuromorphic processor},
  author={Bauer, Felix Christian and Muir, Dylan Richard and Indiveri, Giacomo},
  journal={IEEE transactions on biomedical circuits and systems},
  volume={13},
  number={6},
  pages={1575--1582},
  year={2019},
  publisher={IEEE}
}
@article{yan2021energy,
  title={Energy efficient ECG classification with spiking neural network},
  author={Yan, Zhanglu and Zhou, Jun and Wong, Weng-Fai},
  journal={Biomedical Signal Processing and Control},
  volume={63},
  pages={102170},
  year={2021},
  publisher={Elsevier}
}
@article{gallego2020event,
  title={Event-based vision: A survey},
  author={Gallego, Guillermo and Delbr{\"u}ck, Tobi and Orchard, Garrick and Bartolozzi, Chiara and Taba, Brian and Censi, Andrea and Leutenegger, Stefan and Davison, Andrew J and Conradt, J{\"o}rg and Daniilidis, Kostas and others},
  journal={IEEE transactions on pattern analysis and machine intelligence},
  volume={44},
  number={1},
  pages={154--180},
  year={2020},
  publisher={IEEE}
}
@article{boi2016bidirectional,
  title={A bidirectional brain-machine interface featuring a neuromorphic hardware decoder},
  author={Boi, Fabio and Moraitis, Timoleon and De Feo, Vito and Diotalevi, Francesco and Bartolozzi, Chiara and Indiveri, Giacomo and Vato, Alessandro},
  journal={Frontiers in neuroscience},
  volume={10},
  pages={563},
  year={2016},
  publisher={Frontiers Media SA}
}
@inproceedings{liu2016clockless,
  title={Clockless continuous-time neural spike sorting: Method, implementation and evaluation},
  author={Liu, Yan and Pereira, Jo{\~a}o L and Constandinou, Timothy G},
  booktitle={2016 IEEE International Symposium on Circuits and Systems (ISCAS)},
  pages={538--541},
  year={2016},
  organization={IEEE}
}
@inproceedings{haessig2020mixed,
  title={A mixed-signal spatio-temporal signal classifier for on-sensor spike sorting},
  author={Haessig, Germain and Lesta, Daniel Garcia and Lenz, Gregor and Benosman, Ryad and Dudek, Piotr},
  booktitle={2020 IEEE International Symposium on Circuits and Systems (ISCAS)},
  pages={1--5},
  year={2020},
  organization={IEEE}
}
@article{corradi2015neuromorphic,
  title={A neuromorphic event-based neural recording system for smart brain-machine-interfaces},
  author={Corradi, Federico and Indiveri, Giacomo},
  journal={IEEE transactions on biomedical circuits and systems},
  volume={9},
  number={5},
  pages={699--709},
  year={2015},
  publisher={IEEE}
}
@article{sandamirskaya2022neuromorphic,
  title={Neuromorphic computing hardware and neural architectures for robotics},
  author={Sandamirskaya, Yulia and Kaboli, Mohsen and Conradt, Jorg and Celikel, Tansu},
  journal={Science Robotics},
  volume={7},
  number={67},
  pages={eabl8419},
  year={2022},
  publisher={American Association for the Advancement of Science}
}
@article{bartolozzi2022embodied,
  title={Embodied neuromorphic intelligence},
  author={Bartolozzi, Chiara and Indiveri, Giacomo and Donati, Elisa},
  journal={Nature communications},
  volume={13},
  number={1},
  pages={1--14},
  year={2022},
  publisher={Nature Publishing Group}
}
@inproceedings{frady2020neuromorphic,
  title={Neuromorphic nearest neighbor search using intel's pohoiki springs},
  author={Frady, E Paxon and Orchard, Garrick and Florey, David and Imam, Nabil and Liu, Ruokun and Mishra, Joyesh and Tse, Jonathan and Wild, Andreas and Sommer, Friedrich T and Davies, Mike},
  booktitle={Proceedings of the neuro-inspired computational elements workshop},
  pages={1--10},
  year={2020}
}
@inproceedings{yakopcic2020solving,
  title={Solving constraint satisfaction problems using the loihi spiking neuromorphic processor},
  author={Yakopcic, Chris and Rahman, Nayim and Atahary, Tanvir and Taha, Tarek M and Douglass, Scott},
  booktitle={2020 Design, Automation \& Test in Europe Conference \& Exhibition (DATE)},
  pages={1079--1084},
  year={2020},
  organization={IEEE}
}
@inproceedings{dupeyroux2021neuromorphic,
  title={Neuromorphic control for optic-flow-based landing of MAVs using the Loihi processor},
  author={Dupeyroux, Julien and Hagenaars, Jesse J and Paredes-Vall{\'e}s, Federico and de Croon, Guido CHE},
  booktitle={2021 IEEE International Conference on Robotics and Automation (ICRA)},
  pages={96--102},
  year={2021},
  organization={IEEE}
}

@article{henkes2022spiking,
  title={Spiking neural network for nonlinear regression},
  author={Henkes, Alexander and Eshraghian, Jason K and Wessels, Henning},
  journal={arXiv preprint arXiv:2210.03515},
  year={2022}
}

@article{wei2021wind,
  title={Wind speed forecasting system based on gated recurrent units and convolutional spiking neural networks},
  author={Wei, Danxiang and Wang, Jianzhou and Niu, Xinsong and Li, Zhiwu},
  journal={Applied Energy},
  volume={292},
  pages={116842},
  year={2021},
  publisher={Elsevier}
}

@article{tully2014synaptic,
  title={Synaptic and nonsynaptic plasticity approximating probabilistic inference},
  author={Tully, Philip J and Hennig, Matthias H and Lansner, Anders},
  journal={Frontiers in synaptic neuroscience},
  volume={6},
  pages={8},
  year={2014},
  publisher={Frontiers Media SA}
}

@article{furber2016brain,
  title={Brain-inspired computing},
  author={Furber, Steve B},
  journal={IET Computers \& Digital Techniques},
  volume={10},
  number={6},
  pages={299--305},
  year={2016},
  publisher={Wiley Online Library}
}

@article{cohen2022gooaall,
  title={Gooaall!!!: Why we Built a Neuromorphic Robot to Play Foosball},
  author={Cohen, Gregory},
  journal={IEEE Spectrum},
  volume={59},
  number={3},
  pages={44--50},
  year={2022},
  publisher={IEEE}
}

@article{furber2004sparse,
  title={Sparse distributed memory using {N-of-M} codes},
  author={Furber, Steve B and Bainbridge, W John and Cumpstey, J Mike and Temple, Steve},
  journal={Neural Networks},
  volume={17},
  number={10},
  pages={1437--1451},
  year={2004},
  publisher={Elsevier}
}

@article{bos2023sub,
  title={Sub-mW Neuromorphic SNN audio processing applications with Rockpool and Xylo},
  author={Bos, Hannah and Muir, Dylan},
  journal={Embedded Artificial Intelligence: Devices, Embedded Systems, and Industrial Applications},
  pages={69},
  year={2023},
  publisher={CRC Press}
}

{{< / highlight >}}</div>