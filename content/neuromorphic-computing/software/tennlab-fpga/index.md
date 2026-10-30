---
title: "TENNLab FPGA"
type: "neuromorphic-software"
category: "fpga-implementation"
description: "Spiking neural network processors implemented in HDL for FPGAs by the UTK TENNLab group, with a Python package to build, load, and run networks on FPGA boards."
logo: ""
website: ""
dependencies: "TENNLab Neuromorphic Framework, Edalize, an EDA toolchain for the target board (e.g. AMD/Xilinx Vivado for Basys3)"
field_of_application: "FPGA"
source_code: "https://github.com/TENNLab-UTK/fpga"
pypi_id: ""
license: "MPL-2.0 (software), CERN-OHL-W-2.0 (HDL)"
supports_hardware: true
supports_NIR:
language: "Python, SystemVerilog, Verilog"
maintainer:
  - "Keegan Dent"
  - "Bryson Gullett"
draft: true
url: /neuromorphic-computing/software/fpga-implementations/tennlab-fpga/
---

## Overview

TENNLab FPGA (repository name `fpga`, Python package `neuro_fpga`) is an FPGA implementation of the neuromorphic networks and processors defined by the TENNLab research group at the University of Tennessee, Knoxville (UTK). The repository contains SystemVerilog/Verilog sources for the neuroprocessor and a Python package that builds networks into HDL and communicates with the FPGA.

The project is designed for FPGAs from the ground up rather than adapting TENNLab's ASIC-oriented neuroprocessors. Networks are mapped onto the FPGA through the EDA toolchain, so the README notes that hardware-in-the-loop training is not a recommended use, and that switching networks requires either a new bitstream or hosting several networks in the fabric at once. It supports "directive" and "stream" spike processing, which trade off communication bandwidth differently.

### Key features
- Python API modeled on the TENNLab Framework API: load a network, apply spikes, run, and read outputs.
- Command-line tools for generating HDL from a network (`nethdl`), testing UART communication with a board (`uart-loop`), and visualizing processor packets (`packet-vis`).
- Board targets defined in a configuration file; the repository includes targets such as the Digilent Basys3.
- HDL testbenches run with cocotb and Verilator.

### Getting started
The project requires Linux on x86-64 (tested on Ubuntu 22.04), the open TENNLab Neuromorphic Framework ([framework-open](https://github.com/TENNLab-UTK/framework-open)), and an EDA toolchain for the target board. It is installed from source with `pip install -e .` and is not published on PyPI.

### License
Software in the repository is licensed under MPL-2.0. The hardware description sources in `fpga/rtl/` are licensed under CERN-OHL-W-2.0.
