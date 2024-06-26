+++
title = 'Migration to Hugo'
date = 2024-06-26T09:52:01-05:00
tags = ['hugo', 'site']
draft = false
+++

A few weeks ago, I decided to invest some time into improving my website. This was a promise I made myself numerous times in the past -- without much success -- since I believed that it would be useful for me to have this as a sort of portfolio or resume for people to look at. However, due to academic workloads leading up to my recent graduation, I haven't found the time to actually do that until after my graduation. Now that I *have* graduated, I do not have an excuse to leave my domain unused as it had been for a while before. Thus, I decided to see what options I have to make my site.

Some requirements I set out for what I wanted to use were that it had to:

- Be easy to create new content for (i.e. Markdown files)
- Have a powerful templating system
- Have the features I need or be extensible with good documentation
- Not require a heavy runtime to operate

Essentially, I wanted to use a static site generator that let me do what I wanted with as little configuration as necessary.

The first resource I came accross when doing my research was a website that listed various popular website generators called [Jamstack], which listed static site generators such as [Hugo] and [Jekyll] (the static site generator I had previously been using). Both generators are great choices for making a website, but Jekyll had the disadvantage of requiring me to install extensions to add features to the website, like pagination. Such features would also require me to change the way my site is hosted -- I use [GitHub Pages] to host my site -- since the provider has a limited and fixed configuration for how sites can be hosted by default. Hugo, on the other hand, has most of these features built-in by default, while being significantly faster and requiring fewer depenencies to get started. Since I had to manually configure some Actions to get the site up and running either way, I went ahead and experimented with Hugo before keeping Jekyll as my generator, since I was already fairly familiar with Jekyll.

From the start, I noticed a lot of differences that made me more inclined to switch:

- Themes can be installed simply by putting the theme in a folder as either a submodule or as part of the project structure, rather than requiring it to be installed as a Ruby gem
- It uses Go, not Liquid, as the templating language, so it's familiar but different
- The site is divided into sections that are automatically indexed and easily paginated: this differs from Jekyll's default pagination style, which is global unless you install the paginate-v2 gem
- The build time is blazingly fast and the site can hot-reload easily

Thus, I took the time to create a theme for my site -- the very one you see now -- purely using templates and without creating Go modules. I found it was surprisingly easy to grab a resource and generate parts of a web page; the resume section in my [about] page was generated entirely using the templating language. The skeletons provided by the Hugo binary were sufficient to get started and the documentation was comparable to Jekyll's own documentation. The quick and automatic page reloading is a huge benifit as well, as it meant I could experiment with the templates quickly and easily.

Already, Hugo showed a lot of promise for what I wanted to use it for and I decided to stick with it for the forseeable future. If I need to make new features, there could potentially be a means for me to create custom Go functions to use in Hugo's templating system; however, for now, it does everything I need it to do and I plan to stick with the basics.

This is, by no means, a finished project. I will continue to improve on the visuals of this site and I will figure out what else I want to put here.

[Jamstack]: https://jamstack.org/
[Hugo]: https://gohugo.io/
[Jekyll]: https://jekyllrb.com/
[GitHub Pages]: https://github.io/
[about]: /about/
