---
title:  "Cheating with Vim"
tags: [ basics, micropost ]
cover_html: <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vimlogo.svg/256px-Vimlogo.svg.png' />
publish_date: 2020-04-12
snippet: "Last week, I decided to have an affair with the text editor of my youth: Vim. No matter how thoroughly I work to assimilate a command's syntax, I always have to refresh after some time away."
---

Last week, I decided to have an affair with the text editor of my youth:
[Vim](https://devhints.io/vim). No matter how thoroughly I work to assimilate a
command's syntax, I always have to refresh after some time away.

Luckily, Rico Sta. Cruz (the creator of
[Transit](http://ricostacruz.com/jquery.transit/) amongst
[other things](https://github.com/rstacruz)) has assembled the
[end all be all of cheat sheet collections](https://devhints.io/). You've
probably happened upon it in web searches already. Rico is amazing not only at
summarizing pertinent information, but making it visually accessible (his
summary of [bash substitutions](https://devhints.io/bash#substitution) is
invaluable). What a super star.

> His summary of bash substitutions is invaluable.

He's also made the project available on
[github](https://github.com/rstacruz/cheatsheets), meaning one could easily
assemble an ePub of the entire site for offline reference.

In case you were wondering, Vim and I are getting along better than ever (thanks
to Rico's counseling). Getting the file browser working was huge. At first I
went with [NERDTree](https://github.com/preservim/nerdtree), but it was a little
heavy handed, and ultimately the built in browser,
[netrw](https://shapeshed.com/vim-netrw/) met my needs and proved to feel better
for me as it's easier to use when I bounce around different systems and
containers in which I don't want to install additional software.

Vim has long been responsive to mouse clicks (**:set mouse=a**). What I hadn't
realized was that the [blink.sh](/its-terminal) team
[added touch controls in mid 2018](https://github.com/blinksh/blink/issues/395).
Adding the following to my .vimrc (à la
[Dain Hall](http://www.dainger.us/blog_posts/using-your-mouse-in-vim)) puts the
icing on the cake, giving me a touch responsive editor on practically _any_
system.

```vim
set mouse=a         " tell vim to recognize mouse commands in "all" modes
set ttymouse=xterm2 " tell vim you're using xterm, this isn't necessary but I believe improves performance
set ttyfast         " improve fluidity of mouse commands, this isn't necessary but I believe improves performance
set paste           " don't mess up the indenting of pasted text
```

If you're tired of running into limits with your text editor, take a minute to
rediscover the joys of _not being able to find a limit_ to your text editor, and
the wide, wide, wide wide wide world of Vim. After all, what other editor lets
you play [Killer Sheep](https://github.com/vim/killersheep) when you need a
distraction?

<iframe width="560" height="315" src="https://www.youtube.com/embed/UqvvRxqu_eg" loading="lazy" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
