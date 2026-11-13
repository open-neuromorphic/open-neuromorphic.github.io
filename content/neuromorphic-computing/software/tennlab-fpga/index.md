---
title: TENNLab FPGA
type: neuromorphic-software
description: >-
  FPGA implementation of UTK TENNLab RISP spiking neural networks, with a
  Python package to generate HDL, load networks, and run them on FPGA boards.
logo: null
website: 'https://github.com/TENNLab-UTK/fpga'
dependencies: 'TENNLab Neuromorphic Framework, Edalize'
field_of_application: Neuromorphic Hardware
source_code: 'https://github.com/TENNLab-UTK/fpga'
license: MPL-2.0
supports_hardware: true
supports_NIR: false
language: 'Python, SystemVerilog, Verilog'
maintainer:
  - Keegan Dent
  - Bryson Gullett
draft: false
category: fpga-implementation
url: /neuromorphic-computing/software/fpga-implementations/tennlab-fpga/
---

## Overview

TENNLab FPGA (repository `fpga`, Python package `neuro_fpga`) is a Field-Programmable Gate Array implementation of neuromorphic computing as defined by the TENNLab research group at the University of Tennessee, Knoxville (UTK). The repository contains SystemVerilog and Verilog sources for the neuroprocessor and a Python package for building networks and communicating with the FPGA.

The README explains that TENNLab's existing HDL neuroprocessors are optimized for ASIC implementation, and describes this project as a ground-up FPGA implementation. A focus of the project is "directive" versus "stream" spike processing, which lets users choose a bandwidth usage paradigm. As of 2026-11-14, the network HDL generator supports networks for TENNLab's RISP neuroprocessor; networks for other TENNLab processors are reported as not yet supported.

The README also lists drawbacks of this approach. Because networks are mapped onto the FPGA through the EDA toolchain, training is not a recommended application. Switching networks requires either writing a new bitstream or hosting several networks in the fabric at once.

### Features
- A Python API that the README describes as "extremely similar to the standard Framework API": load a network, apply spikes, run, and read outputs.
- Command-line tools: `nethdl` (network HDL generator), `uart-loop` (UART loopback test with a board), and `packet-vis` (web-based visualization of processor packets).
- FPGA targets defined in a configuration file (`fpga/config/targets.json`). The repository includes configurations for the Digilent Basys3 (AMD/Xilinx, built with Vivado) and a Terasic board with an Intel Cyclone V FPGA (built with Quartus); the README's examples use the Basys3.
- HDL testbenches built with cocotb; the README states they currently run only with Verilator.

### Getting started
The README states that only Linux on x86-64 is supported and that the project has been tested on Ubuntu 22.04 LTS. It requires the open TENNLab Neuromorphic Framework ([framework-open](https://github.com/TENNLab-UTK/framework-open)) and an EDA toolchain for the target device (for example, AMD/Xilinx Vivado for the Basys3). The package is installed from source with `pip install -e .[test]` and is not published on PyPI.

### License
Software in the repository is licensed under MPL-2.0. The hardware description sources (the processor RTL in `fpga/rtl/` and the board top-level files) are licensed under CERN-OHL-W-2.0.
