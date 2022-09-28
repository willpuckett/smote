---
title:  "Computational Notebooks with Jupyter"
tags: [ apps, datascience ]
featured_image_thumbnail: https://github.com/jupyter.png?size=200
cover_html: <img src='images/posts/2019/compnotebook.webp'/>
publish_date: 2019-02-15
---

*To program*. It can mean many things to many people. In the 1980's, industrious young programmers focused on things like setting the VCR clock, or, more ambitiously, having it *record* a pre-determined channel at a pre-determined time. Genetics *program* biology. There are large code repositories that define the functions we collectively refer to as our operation systems. 

Most of these types of programs are predetermined. They are designed to be compiled by developers and executed by end users. However, many times we want to program experimentally, *heuristically*: in an iterative dialog where the output of our programs serves as antistrophe to our hypotheses. 

> Computational notebooks are an ideal jumping off point.


It doesn't take too much volume, or much of a significant time away from a code block for it to fade into the past of our memories. Documentation (explaining *what* and *why*) is as much a part of coding as the coding itself. *Computational Notebooks*, such as [Jupyter Notebooks](https://jupyter.org), provide an environment for documentation of complex code explorations by intermixing *Markdown*, *LaTeX*, and a multitude of code environments, often executed on large clusters. Although they have the raw power necessary for a mature mad scientist's lab, computational notebooks are also an *ideal* jumping off point for people just wetting their toes in code because they provide an essential element of the learning process: a note-taking feed back loop, making it easy to review and assimilate explorations.

![nbviewer](https://github.com/jupyter.png?size=200#left) 

### nbviewer

Getting started viewing Jupyter notebooks (**.ipynb** files) is pretty painless. Point your browser at <https://nbviewer.jupyter.org>. There, you can enter the URL, or Github username/repo of a notebook file to see it rendered in browser. This provides a static view of the notebook, that is, you won't be able to edit the code, only read it and see the results. [Here's a pandas cookbook](https://nbviewer.jupyter.org/github/Jvns/pandas-cookbook/tree/master/cookbook/) in nbviewer. 

<iframe width="120%" height="450" scrolling="yes" frameborder="yes" src="https://nbviewer.jupyter.org/github/Jvns/pandas-cookbook/tree/master/cookbook/"></iframe>

![Binder](https://avatars2.githubusercontent.com/u/30417857?s=280&v=4#right) 

### Binder

Once you feel comfortable with the format of a notebook and want to start exploring altering code, head over to <https://mybinder.org>. There, you'll be able to enter a Github repo to load (or gist or independently hosted git repository). The notebook will launch a container to run your notebook and load the notebook in your browser window. There, you can alter, adjust, and otherwise experiment to your heart's content. Here's the same pandas cookbook in binder: [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Jvns/pandas-cookbook/master).

## Incredible Versatility

This approach is getting more and more traction across the board. It's effective for students, but, as [Michelle Ufford](http://hadoopsie.com) notes, can also help [close the gap between Engineering and Business teams in industry](https://www.oreilly.com/ideas/beyond-interactive-scaling-impact-with-notebooks-at-netflix). And for scientific teams working on petabytes-large data sets, remote computation is a must. Data-driven driving anybody? This is how it happens.



Featured image by: [Javier Quesada](https://unsplash.com/@quesada179?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge)
