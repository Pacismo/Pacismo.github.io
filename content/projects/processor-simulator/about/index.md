+++
title = 'Processor Simulator'
layout = 'about'
date = 2024-07-30T15:36:54-05:00
location = '..'
+++

This is a project I developed for a graduate-level course I took at UMass Amherst: CS535 - Computer Architecture. It involved the design of a CPU instruction set and the development of a simulator that can run code written for that instruction set, roughly simulating what would happen at every stage of execution.

The goal of the project was to create a simulation of what happens in a processor as it executed code in a given configuration. We had the choice of using real-world instruction sets, like MIPS or RISC-V, or to create a clean-sheet design, like what I have done here.

The codebase is about 25,000 lines (>21,000 lines of code), predominantly Rust code, across a handful of library and executable codebases that enabled me to create a number of programs allowing me to create, assemble, and run benchmarks. This webapp includes both the simulation and the assembler, which allows you to assemble and run assembly code. The assembler emits detailed error messages whenever there are syntax errors in the source files, which will appear as a popup warning.

I have provided some documentation and an exchange sort with a randomized dataset of 100 elements as an example program you can run on the site. The application provides an interface for downloading the bytecode as well if you want to inspect the binary output.

{{< file path="sample.asm" >}}

{{< file path="whitepaper.pdf" preview=true >}}
