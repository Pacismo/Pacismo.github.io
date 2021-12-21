---
title: "Getting Started"
excerpt: "Getting started with writing code in Java: getting your IDE."

type: java-tutorial

tags:
 - Getting started
 - Quickstart
---
## What is an IDE?

IDE stands for "Integrated Development Environment". It is called such because it contains all the tools you'll need to write your software efficiently and painlessly. There are various IDEs you could get for any language you'll ever write code in. For Java, there are several options you could choose from:

- Microsoft Visual Studio Code (or just "VS Code") with Microsoft's Java Tools bundle
- JetBrains' IntelliJ Idea
- Oracle's NetBeans IDE

Of course there's also jGRASP, a pedagogic tool used by the university that lacks many of the bells and whistles of the IDEs I listed above. I suggest going with VS Code: it is a text editor with extensible features and baked-in Git support, which is useful for tracking the changes you make to your code. VS Code also one of the most popular Java IDEs available. It can be installed on most Linux distributions, MacOS, and Microsoft Windows.

If you want to try something else, you could always do research on the other options. For now, however, I will show you how to set up VS Code as your development environment for Java. If you wish to use a different language, VS Code could be set up for that language in a similar way.

## Setting Up Visual Studio Code for Writing Code in Java

To start, you need to install the application. If you use Linux, you could run `sudo apt install code` or similar to install it. On MacOS and Windows, it's likely that you don't have a package manager, so you need to [download the installer for your platform for Visual Studio Code from Microsoft's website](https://code.visualstudio.com/) and follow the instructions from there.

VS Code will show you what you could install to start writing code in the language you want. Among those in the list is the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which contains the majority of the extensions you'll need to properly write Java applications and libraries, including Maven, a project manager.

You will also need to install a Java Runtime Environment (JRE) and a Java Development Kit (JDK) to properly utilize these tools. The JRE will allow you to test and run your code, while the JDK will provide you with tools such as a Java Language Server (which provides syntax highlighting and autocomplete), a Java Linter (which "lints", or cleans, your code), a Java compiler, and Java's standard library. When you try to start your Java project, VS Code will tell you that you need to install these tools. I suggest installing JDK 17, the latest version available, from [the Open JDK project](https://openjdk.java.net/) or from [Oracle](https://www.oracle.com/).  
When you finish with this set-up, you'll have yourself a fully-functional IDE for writing your Java code!

### Customizing Your VS Code Experience

Visual Studio Code also comes with a number of customization options, including color themes, file icons, and product icons.

The color themes will change how the IDE looks. If you click on `Manage` (the icon on the bottom of your sidebar, which may be on either the left or the right of the screen) and `Color Theme`, you will be shown a list of options, including one to browse for new color themes. Go take a look and pick one you like! I suggest the dark version of the [C/C++ Theme](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes). *Note that you don't need to have the C/C++ tools installed to use this theme.*

The file icons and product icons can be selected in similar ways.

You could also browse the settings for the actual IDE and customize its behavior. I suggest turning on auto-save for "dirty" files (ones you've written to without saving) when the editor is not in focus.

There's so much more you could do to make the IDE yours, so I recommend you take the time to do so whenever you feel like it!
