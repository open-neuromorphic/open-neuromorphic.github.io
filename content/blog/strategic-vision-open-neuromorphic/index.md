---
title: "Strategic Vision for Open Neuromorphic"
description: "Why 'open' matters and where we want to take the Open Neuromorphic community"
image: stars.jpg
image_attribution:
  text: "Photo by"
  author: "Casey Horner"
  url: "https://unsplash.com/photos/fireworks-pXZxuXmpsNo"
draft: false
date: 2025-06-11
showTableOfContents: true
author:
  - Jens E. Pedersen
  - Danny Rosen
  - Justin Riddiough
show_author_bios: true
---

**TL;DR** We are reorganizing the Open Neuromorphic community around our vision for an **open and accessible neuromorphic ecosystem**.

This post presents a **vision for Open Neuromorphic** towards more open, reproducible, and competitive neuromorphics.

The post will be the first in a series that lays out the **Open Neuromorphic Strategic Initiative** where we later discuss **Neuromorphic UX** and **new initiatives** that will be kickstarted by the [newly elected Executive Committee](/blog/open-neuromorphic-evolves-charter-first-executive-committee-election/).

Join the discussion [on Discord](https://discord.gg/C9bzWgNmqk), star us [on GitHub](https://github.com/open-neuromorphic/), follow us [on LinkedIn](https://www.linkedin.com/company/98345683/), and give us a watch [on YouTube](https://www.youtube.com/@openneuromorphic).

## What now, Open Neuromorphic?

Open Neuromorphic is almost 4 years old.

We set out to make the field of neuromorphic engineering more transparent, open, and accessible to newcomers. It's been a tremendous success: Open Neuromorphic is the biggest online neuromorphic community *in the world*, our videos are seen by thousands of researchers, our material is reaching even further, and the 2000+ academics and students on our Discord server are actively and happily collaborating to further the scientific vision of neuromorphic engineering.

But, let's face it: we still have a long way to go.

Neuromorphic engineering is a niche field that's occupied by a frustratingly wide variety of disciplines (that sometimes don't relate to each other), and the tooling is nowhere near as accessible as the deep learning ecosystem.

The good news is that we can change this, and we are going to do that.

With the amount of leverage in the Open Neuromorphic community, this is exactly the right place to start. This post explains the grand vision, our hopes for where Open Neuromorphic will be in 5 years from now.

## Why does *open* software and *open* science matter?

> The Open Neuromorphic Principles:  
> 🔬 Science = Shareable + Testable + Modifiable  
> ⚡ Software = Digital embodiment of scientific models  
> 🌐 Open Source = Scientific method applied to code  
> 🧠 Neuromorphics = Perfect testbed for open computational science

When presenting the efforts at Open Neuromorphic, we have often been met with scepticism.

Why does "open software" matter?

Software is, people say, not science. It’s a time sink, something to rush past in the pursuit of what really matters: results (and papers if you’re in academia). I.e. publish or perish.

Well. We think software matters; and we are not alone.

Open source software is **estimated to provide [billions](https://opensourcefundingsurvey2024.com/), if not [trillions](https://www.hbs.edu/ris/Publication%20Files/24-038_51f8444f-502c-4139-8bf2-56eb4b65c58a.pdf)** of value *annually*. This is an absolutely incredible number that should be celebrated much much more. Most value is derived from programming languages (JavaScript, Go, Java, C/C++, ...), web servers (Apache, Nginx), research software (Numpy, PyTorch, ...), and hardware platforms (Arduino, 3D printing).

The value of open source is most felt in its absence.

If we look to the domain of machine learning, NVIDIA sits on a ridiculously large part of the hardware accelerator market. This kind of monopoly is known to hurt progress. If neuromorphics have any future at all, we should be eager to learn from history and work hard to avoid monopolies. Value generation is not the only reason we should care for open software.

We believe it is vital for the scientific progress.
In fact, we believe open source software *is science*.
Or, at least computational science.

Here is why - let's start by defining what we mean by "science" in a modern, computerized world.

### What is science?
If you look up "science" on Wikipedia, here's what hits you:

> Science is a systematic discipline that builds and organises knowledge in the form of testable hypotheses and predictions about the universe. - [Wikipedia](https://en.wikipedia.org/wiki/Science)

Now, [go and grab a random arXiv paper](https://jepedersen.dk/arxiv.html). It clearly contains "knowledge" of some sort. But, does the paper contribute ***predictions*** that are ***testable*** and can by ***systematically organized***?

**Can you test it?** **Can you systematize it?**

The answer is never a flat "no", but it's hard. You rarely have direct access to that knowledge.

### The good explanation - inner models
In his *excellent* book "[*The Nature of Explanation*](https://en.wikipedia.org/wiki/Kenneth_Craik#CITEREFCraik1943)", [Kenneth James Williams Craik](https://en.wikipedia.org/wiki/Kenneth_Craik) posits that we use small "simulations" of reality to explain and predict the world outside.

> If the organism carries a 'small-scale model' of external reality and of its own possible actions within its head, it is able to try out various alternatives, ... and in every way to react in a much fuller, safer, and more competent manner to the emergencies which face it.

This point seems obvious today, but it highlights the goal of pursuing science in the first place:
you, as an acting entity, improve your **inner model** to the point that you can make *better* predictions than before. The **inner model** here is critical: if the arXiv paper does not help their readers predict the world, it is not science.

This is why computational reproducibility matters--software is how we encode and share predictive models.

## What is reproducibility?
Recall that according to Wikipedia, it is *not* enough to demonstrate results alone. Results have to be (1) systematic, and they have to be (2) testable.

Can you test everything in the papers you read? Do you know how?

It is entirely possible that the given paper is too hard to understand or inaccessible to the audience for other reasons. That does not mean that there are no scientific insights to find---readers may find ways to systematize them on their second or third reading.

No, it means that *you specifically* cannot take the idea as your own, test it, and use it to improve your world model.

Reproducibility, in this context, is not only the duplication of results. It is the ability to take the scientific idea, embed it into your own inner model, adapt it, and build upon it---or discard it because it reduces predictability.

If an idea is not reproducible, the findings cannot be expanded. And are, therefore, useless.

This becomes clear if we do a quick thought-experiment where we replace "software model" with "mathematical model". Just as we wouldn't accept a physics paper that said "our equations predict X but we won't show the math", we shouldn't accept (computational) science that hides its methods.

## Why is software science?

> How many fields have been held back, and how many people have had their careers disrupted, because of a buggy program? - [Greg Wilson](https://www.nature.com/articles/467775a)

[Software is ubiquitous in modern science](https://www.nature.com/articles/s43588-024-00651-2).

Anything from CoVid models to search algorithms to lab protocols are build on software built by other people. Researchers are busy people. They don't bother to look through all software dependencies to verify correctness, understand implementation details, or check for potential errors that could invalidate results.

From that follows: **scientific results depend on the software**.

If the software is wrong, the science is wrong. (Software bugs already cause numerous retractions, such as [here](http://blogs.sciencemag.org/pipeline/archives/2007/02/27/wrong_but_still_convincing), [here](https://retractionwatch.com/2022/03/03/nasa-researchers-retract-nature-paper-on-climate-change-and-evapotranspiration/), [here](https://retractionwatch.com/2016/05/19/software-glitch-not-intentional-manipulation-sunk-immunology-paper/), and [several places here](https://www.science.org/content/article/how-avoid-stigma-retracted-paper-dont-call-it-retraction)).

And that is well and good, because at some point we *have* to trust and rely on other's work. For that to happen, software needs to be reliable.

## Why open source?
We found that software needs to be

1.  **Reproducible**, meaning executable, as well as modifiable, and
2.  **Reliable**, meaning that the results are consistently trustworthy

Modifiability is important for science for the same reason that equations are important for scientific predictions. Reliability is crucial because we want *systematic* improvement of our knowledge, not flaky and partial results that only work occasionally.

This is what open source software gives us.

We can change code and retrofit it to suit our needs (just think about [Hugging Face models](https://huggingface.co/)) and we can iterate upon it to continue to improve it. It already *[generates trillions in value](https://www.hbs.edu/faculty/Pages/item.aspx?num=65230)* and there is room for much, much more.

Of course, open source software is not a perfect cure.

There are IP and security concerns, bugs can still occur, and stability can be a problem. But at least the imperfections are on *public record*. We understand the concern: 'If I open-source my breakthrough algorithm, won't competitors just steal it?'

This misunderstands how innovation actually works. The researchers who built TensorFlow didn't lose their competitive advantage---they gained it. Open-sourcing your core contribution makes you the recognized expert, attracts top collaborators, and lets you focus on the next breakthrough while others handle maintenance. They can be amended and improved, just like our scientific understanding.

From that perspective, one can claim that open source software *is* the scientific method---just in simulation.

## A vision for future science

If we accept these premises we can ask: what would truly open (computational) science look like?

- **Every result is instantly reproducible.**
  - When you read a paper claiming that a new drug reduces symptoms by 30%, you click a link and watch the exact analysis run in your browser. The data processing, statistical tests, and visualizations execute in seconds using the same environment the authors used—preserved perfectly through reproducible containers.
- **Scientific software evolves like Wikipedia.**
  - Climate models aren't developed in isolation by single labs, but maintained by global communities. When a researcher in Kenya discovers a bug in atmospheric turbulence calculations, the fix propagates instantly to climate simulations worldwide. Models improve continuously rather than languishing in academic silos.
- **The pace of discovery accelerates.**
  - Instead of each researcher building from scratch, we stand on shoulders of giants whose work is not only readable, but runnable and modifiable. Scientific progress compounds at an unprecedented rate.
- **Trust in science strengthens.**
  - When climate models, economic forecasts, and medical recommendations are built on transparent and auditable code, public confidence grows. Science communication improves because the models themselves become part of the conversation—not just their conclusions.

This isn't a utopian fantasy. Every piece already exists---open source communities, reproducible environments, and collaborative development platforms. We just need to shape them into a coherent vision for how science should work in the digital age.

The question isn't whether this future is possible.

The question is: how quickly can we build it?

## What now?
We posit that open source software is a necessary condition if we are [to science](https://en.wiktionary.org/wiki/science#Verb) in a computerized world. Software is "executable mathematical models" that we should prioritize much higher.

We believe Open Neuromorphic is in an excellent position to push this agenda, and by rolling out our strategic initiative in the subsequent blog posts, we will reveal how. The brief headline is that we want to make neuromorphics much more accessible, transparent, and reproducible. And we can't wait to get started!

We are entering a world where science is increasingly done by machines. This is particular true in the computation sciences, where humans rarely understand every instruction executed in the process that lead to new findings.

We have a narrow window of opportunity. As neuromorphic computing moves toward commercialization, the risk of vendor lock-in grows daily. **If we don't establish open standards and tools now, we'll spend the next decade debugging proprietary black boxes instead of advancing science.**

Admittedly, there is a lot of work that needs to be done. We're already starting and here is how you can help:

- **Share and document your code**
  - Papers without code is less scientific because it is harder to build on the insights. In the ideal world any claim should be backed up by *reproducible* code. Always use and properly document code from day 1 and always share it.
- **Write stable code, use [NixOS](https://nixos.org/)**
  - Code should be reliable and work in perpetuity. That means making sure dependencies and environments are kept constant. The best way to do that is to use *reproducible environments*. NixOS is quickly becomming the biggest and best tool there is. It will guarantee that your code will run *exactly the same way*, even 100 years in the future. Docker, Conda, and similar tools are better, but NixOS gives more comprehensive guarantees.
- **Build on existing tools instead of creating your own**
  - For the common scientific knowledgebase to improve, we need cross-platform tools. This is particularly true for small fields such as neuromorphics, where [a recent Nature paper pointed out that open source software is key to scaling](https://www.nature.com/articles/s41586-024-08253-8). Go check out the [Open Neuromorphic software guide](/neuromorphic-computing/software/) and look for libraries similar to your work/approach.
- **Promote academics that work on software**
  - Given the huge importance of code, Academic promotions should value open-source software contributions

The scientific revolution succeeded because it insisted on transparency, reproducibility, and constant scrutiny. The open source movement embodies these same principles for software, but there is much more work to be done.

Will you help Open Neuromorphic make neuromorphic software scientific?
