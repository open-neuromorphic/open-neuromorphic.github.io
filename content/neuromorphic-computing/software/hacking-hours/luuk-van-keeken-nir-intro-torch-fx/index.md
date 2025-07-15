---
title: "Luuk van Keeken: NIR Introduction and Graph Tracing with torch.fx"
author:
  - "Luuk van Keeken"
  - "Jens E. Pedersen"
date: 2024-12-02
description: "Luuk van Keeken introduces the Neuromorphic Intermediate Representation (NIR) and demonstrates graph tracing using torch.fx."
upcoming: false
video: "FIqxexNQX4k"
speaker_photo: "images/speakers/luuk-van-keeken-placeholder.png"
image: "luuk-van-keeken-nir-intro-torch-fx.jpg"
type: "hacking-hours"
speaker_bio: "Luuk van Keeken is a researcher/PhD student at KTH Royal Institute of Technology, focusing on neuromorphic computing, specifically related to the Neuromorphic Intermediate Representation (NIR) and its applications with frameworks like PyTorch."
software_tags: ["snntorch", "norse"]
---

Join Jens E. Pedersen for a Hacking Hour session with Luuk van Keeken. Luuk provides an insightful introduction to the Neuromorphic Intermediate Representation (NIR), discussing its goals and how it facilitates interoperability in the neuromorphic field. The session includes a practical demonstration of graph tracing techniques using `torch.fx` for PyTorch models.

## Key Themes Discussed

*   **Lowering the Barrier to Entry for Neuromorphic Computing:** A primary motivation behind NIR is to make accessing and working with neuromorphic hardware and software frameworks (like Spinnaker, Loihi) easier for researchers and developers. Existing tools can be technically challenging and require overcoming legal hurdles (e.g., NDAs).
*   **The Need for a Unified Representation:** Different neuromorphic and spiking neural network (SNN) frameworks have their own ways of defining and implementing operations. A common intermediate representation like NIR allows for a more standardized way to represent models, facilitating translation between frameworks and hardware platforms.
*   **Streamlining PyTorch Model Conversion to NIR:** A significant challenge is taking models built in popular frameworks like PyTorch and converting them into the NIR format. This involves understanding the computational graph of the PyTorch model and mapping its components to equivalent NIR primitives.
*   **The Importance of Graph Tracing:** To convert a PyTorch model to NIR, it's necessary to trace the model's execution flow and identify the individual operations and their dependencies. This process is crucial for constructing the NIR graph.
*   **Leveraging `torch.fx` for Improved Tracing:** The discussion highlights `torch.fx` as a more robust and efficient toolkit for tracing PyTorch graphs compared to previous manual methods. It provides a structured representation of the graph, including function calls and their inputs/outputs.
*   **`nir.torch` as a Conversion Tool:** `nir.torch` is presented as a specific package within the NIR ecosystem designed to handle the translation of PyTorch models to NIR. It aims to be a reusable tool that different PyTorch-based neuromorphic frameworks can leverage.

## Most Important Ideas and Facts

*   **NIR's Goal:** "to like we talked about lower the barrier of Entry" to neuromorphic computing.
*   **Challenges with Existing Frameworks:** Accessing platforms like Spinnaker and Loihi is difficult due to technical complexity and requirements like NDAs.
*   **Previous Tracing Method Issues:** The older, manual method of tracing involved replacing activation functions and manually tracking graph progression. This was "a bit of a mess" and struggled with PyTorch primitives like addition or division that weren't explicitly covered in custom modules.
*   **`torch.fx` as a Solution:** `torch.fx` is an "amazing" toolkit for tracing that addresses the limitations of previous methods by providing a structured graph representation and handling non-module operations.
*   **The Purpose of `nir.torch`:** It's a "helping hand" for translating Python/PyTorch models into NIR. It provides a way to extract the NIR graph from a PyTorch model.
*   **How `nir.torch` Works:** It relies on a mapping function provided by the specific framework (e.g., SNNTorch, Norse) that tells `nir.torch` how to translate that framework's modules into NIR modules. This involves defining "what do the different modules mean" in terms of NIR primitives.
*   **The Complexity of Mapping:** Even with a unified representation, mapping between frameworks is not trivial.
    > "because the parameterization is different you have to do this magic to get the parameters to to line up".
*   **Benefits of a Unified Representation:** It provides a "unified understanding of what you mean by a leaky integrated in fire" and avoids the "all to all" problem of needing to create separate translators for every pair of frameworks.
*   **Enabling Benchmarking and Comparison:** A common representation allows for comparing models across different hardware platforms, helping to determine which hardware is more efficient for a given task.
    > "imagine if you can make like a similar model and then try it in different devices or you can actually compare your results".
*   **`torch.fx` Captures Functions, Not Just Modules:** A key advantage of `torch.fx` is its ability to trace function calls (like addition) in addition to module calls. This is important because non-module operations are fundamental parts of a computational graph.
*   **Handling Non-Module Operations with `torch.fx`:** The tracer can identify function calls like addition, which in NIR can often be represented by merging input arrows into a subsequent node, simplifying the graph.
    > "whenever you add like whenever you have two different arrows into a module you essentially add them together so this is pretty much the same thing which means in near I will then scratch this operation entirely and just merge the arrows into whatever output this desent to perfect".
*   **`torch.fx` Provides Graph Structure:** The tracer provides a representation of the graph with nodes and their dependencies, making it easier to construct the NIR graph.
    > "the node now knows what is than the next oh oop what is in the next node this is perfect".
*   **Comparison to Previous Tracing (Manual Method):** The previous method involved replacing the `forward` function of modules and manually tracking outputs and edges, which was an "absolute mess" because it couldn't easily handle non-module function calls.
*   **`torch.fx` is a More Robust Solution:** Moving to `torch.fx` is described as "way easier than what we did before" and a preferable approach.

## Key Takeaways and Implications

*   NIR is a crucial development for advancing neuromorphic computing by providing a necessary intermediate representation.
*   Converting existing models from popular frameworks like PyTorch is a significant hurdle that `nir.torch` aims to address.
*   `torch.fx` offers a powerful and effective way to trace PyTorch graphs, which is essential for this conversion process.
*   While `nir.torch` and `torch.fx` streamline the process, the mapping between framework-specific modules and NIR primitives still requires framework-specific knowledge and implementation.
*   The ability to trace both module and function calls with `torch.fx` simplifies the conversion of the computational graph.
*   This work opens up possibilities for easier benchmarking, hardware exploration, and ultimately, wider adoption of neuromorphic technologies.
