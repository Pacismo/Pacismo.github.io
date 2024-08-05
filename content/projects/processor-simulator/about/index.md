+++
title = 'Processor Simulator'
layout = 'about'
date = 2024-07-30T15:36:54-05:00
location = '..'
+++

This is a project I developed for a graduate-level course I took at UMass Amherst: CS535 - Computer Architecture. It involved the design of a CPU instruction set and the development of a simulator that can run code written for that instruction set, roughly simulating what would happen at every stage of execution.

The goal of the project was to create a simulation of what happens in a processor as it executed code in a given configuration. We had the choice of using real-world instruction sets, like MIPS or RISC-V, or to create a clean-sheet design, like what I have done here.

This webapp includes both the simulation and the assembler, which allows you to assemble and run assembly code. The assembler emits detailed error messages whenever there are syntax errors in the source files, which will appear as a popup warning. I strongly recommend using this on a laptop or desktop computer, as it would offer better performance and more screen space for the interface. The application provides an interface for downloading the bytecode as well if you want to inspect the binary output. Most of the logic is handled in the WebAssembly script, as the codebase for the project is predominantly Rust.

I have provided some documentation on the project and an exchange sort (and C equivalent) with a randomized dataset of 100 elements as an example program you can run on the site.

{{< flex-region >}}
{{< file path="exchange-sort.asm" >}}
{{< file path="exchange-sort.c" >}}
{{< /flex-region >}}

{{< file path="whitepaper.pdf" preview=true >}}
