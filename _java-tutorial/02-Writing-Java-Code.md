---
title: Writing Java Code
excerpt: Let's write your first "Hello World!" program in Java!
type: java-tutorial
tags:
    - Getting Started
    - Hello World
slug: writing-java-code
date: '2021-12-21T18:05:41.709Z'
lastmod: '2021-12-21T21:05:02.712Z'
draft: false
---
Now that we've configured your first project, let's work on your first program!

## Your First *Hello World!* Program

The first thing you should notice in your directory tree is the *source* directory, `src`. Open the file at **src/main/*your*/*package*/*name*/App.java**. It should look something like this:

```java
package com.franciscosp.tutorial;

/**
 * Hello world!
 *
 */
public class App {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

Notice at the top, there is the `package com.franciscosp.tutorial`: this is the namespace you'll find this class in. It's used for when you're importing other classes from this library and prevents name clashing. Also notice the class, `public class App`. This is important because the file it is contained in is called `App.java`. In Java, all classes *must* be named after the file they're contained in. This is not mere convention, but a requirement of the language.

Also notice the public static method called `main`. This method is defined as `public`, an ***access specifier*** that means that the method can be accessed from outside anything defined in the class, and `static`, a **specifier** that means that this method doesn't need to be accessed with an instance of an object of type `App`. `void` is the return type of `main`. `void` is special in Java becuase it means it has *no return type* and, as such, returns *no value*. Finally, notice the `String[] args` in parentheses next to `main`. This means that the method, `main`, takes an argument of type `String[]` (which is an array of `String`).

A method in Java is essentially a series of instructions that is run in sequence and is called using the name it is provided, followed by parentheses containing the arguments. For instance, if you were to have a static method called `example` that takes no arguments, returns an integer, and can be accessed publicly, you would define it as such (in the `App` class):

```java
class App {
    // --snip--
    public static int example() {
        // Code goes here...
        return 0; // We'll return 0 for now.
    }
}
```

You don't need to write this now, since this is merely an example. Note the `--snip--` in the code. This is a single-line comment, denoted by the leading `//`. This is text that won't be evaluated by the compiler and is generally used to document code. Multi-line comments, like that found before the `main` method, are started with a `/*` and terminated with a `*/`, but do not stack. The extra `*`s that lead each line is stylistic.

The `--snip--` simply denotes that code has been omitted from the example. This will be used extensively to allow me to show important details and omit details that have already been shown/aren't necessary. The end result will always be shown at the end of the post.

It's a requirement that, in Java, methods that return a type other than `void` return *something*, so I decided to return `0` for the example.

This method would have to be called like this outside the `App` class:

```java
App.example();
```

But could be called like this *inside* the `App` class:

```java
example();
```

Of course, it's worth noting that code in Java must always be encapsulated inside a method, so you would have to call `example` in `main`, for example. It's also important to note that any code that could be run as a program must contain a public static `main` method. This method is *the very first thing that runs* when your code is being executed.

I'll start off teaching you to write the code in Java as static methods inside the same class, and move on to showing you how to write non-static methods which work with an instance of a class.

In general, methods provide a means of making your code *more readable* and *much simpler*, as they allow you to make certain tasks repeatable by simply calling the method. It provides a means of abstraction and reduces code duplication. The entire `Math` class in Java provides methods for performing common mathematical tasks without having to implement your own functions for those purposes, such as `Math.pow` for exponents.

At the end of the 8th line, you'll notice an open brace (`{`), and at the end of the 10th line, you'll notice a closed brace (`}`). That's a code block, and is the body of the `main` method. Code blocks are defined this way in Java. You'll also notice that this is the same way for the `App` class: the contents of this class are always defined within the braces. As such, indentation is optional, but it's still a good idea to keep different blocks at different levels of indentation.

The `main` method has a single line of code: `System.out.println("Hello World!");`. First thing to note is that the line ends with a semicolon. You end each line of code with a semicolon, unless it's a brace, in Java. Second, `System` is a class in Java that contains a lot of the things you would use to interface with the system, such as the member variable, `out`. `out` is the standard output for Java, which writes data to the terminal. It has a method called `println`, which takes a parameter of type `String`. This string is printed to the terminal.

Now that that's out of the way, let's run this code!

## Running the Code

If you press `F5` on your keyboard, Visual Studio will instantly start to compile your code, search for a `main` method to run (it may find several, but will always run the one in the file you have open), and launch the code. You will see your terminal open in the bottom, spew some random text (that's the command being run to launch your code with your configured JVM), and the words "Hello World!" should pop up in the terminal before the application exits. The important thing is that "Hello World!" was printed to your terminal, which means your code works and your Java development environment was properly configured!

If your code is *not* running, you'll recieve a notification telling you why that may be. It's fairly likely you've forgotten to configure your Java development environment, so you should be able to do so by running `Java: Configure Java Runtime` in the command palette.

The command displayed by the system will vary depending on what shell you're using. Regardless, the output should be the same: "Hello, World!"

## Modifying the Code

Now that we've established you could run code, let's write some!

### Variables

The first -- and most important -- thing to cover is *variables*. A variable stores data: from numbers to strings and even contacts, they allow you to store information for later use and to manipulate this information when necessary. A variable in Java must be declared before it can be used. There are two ways a variable can be declared:

- Standard declaration
- Parameter declaration

The former kind of declaration looks something like this:

```java
int variable = 0;
```

Notice that there are two important bits to look at: `int` and `variable`. `int` declares that the variable named `variable` will only store numerical values. In Java, you cannot change the type of a variable, no matter what, so `variable` will forever be an `int` in the method it is defined in. There are exceptions where two variables would conflict and only one will be used without any errors, but we will get to that in the section about classes. This variable will also exist until it is out of scope. We will get into scope later.

This variable is also initialized with a `0`, so that we know that this variable contains a `0`. This is required to prevent undefined behavior when using an uninitialized variable.

The latter kind of declaration would look something like this:

```java
public static void function(int parameter) // --snip--
```

The function `function` has a parameter called `parameter` that is of type `int`. This is the same way of defining variables as the standard declaration, but this variable will exist until the function exits. Note that `parameter` doesn't have a value -- this is because `parameter` is given a value when `function` gets called by other code.

Let's do something interesting with the variable by printing it to the console!

Modify your `main` method to look like this:

```java
// --snip--
public static void main(String[] args) {
    int number = 0;
    System.out.println("number has a value of " + number);

    System.out.println("Hello World!");
}
// --snip--
```

It may be worth noting that strings can be added to with other values. You could concatenate strings with numbers, just as you could do so with other strings. "Concatenation" just means you add to the string.
