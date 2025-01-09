---
title:  "ehrbl"
tags: [ keebs ]
publish_date: 2025-01-09
cover_html: <img src="/images/ehrbl_populated.png" />
---

A few months ago, I made [_ehrbl_](https://github.com/willpuckett/ehrbl), a tiny
board to celebrate the coming of autumn (with minimal finger travel). Although
the season has come and gone, I'm finally typing comfortably on it.

I struggled with the layout on this board, both physically and in software. I
oscillated back and forth between 26 & 28 keys more times than I can count. I
needed 28 keys for the layout to work smoothly, but I was having a difficult
time reaching the top pinky keys physically, even with
[tilters](https://www.printables.com/model/197363-choc-keycap-tilter).
(Considering I just guessed at the positions when I adapted the board from
Sweep, I probably shouldn't have been surprised.)

Switching to [KLP-Lame](https://github.com/braindefender/KLP-Lame-Keycaps)
keycaps has improved matters considerably. Along the way, I also made a set of
[magnetizable testers](https://github.com/willpuckett/studyofhands) that I used
to create another board more fully tailored to my hand anatomy,
[_sessile_](https://github.com/willpuckett/sessile).

![sessile](https://raw.githubusercontent.com/willpuckett/sessile/refs/heads/main/.images/render.webp)

I hadn't anticipated moving away from [Engram](https://engram.dev) during this
process, but it wasn't fitting well, especially in the 26 key period, and I
couldn't shake the queasy feeling I was getting in my left pinky with it. I
spent a month or so with
[Nordrassil](https://github.com/empressabyss/nordrassil), which seemed
artistically the perfect fit for a keyboard shaped like a leaf, but ultimately
landed on whispy variant of
[Caster](https://cyanophage.github.io/playground.html?layout=bfdl%2F%3Bpouyjcstrx-naihqvwgm%5C%3Dk%2C.%27ze&mode=ergo&lan=english).
It's taken a while to internalize the right hand vowel cluster (which has often
left me feeling like I'm driving in London—on the wrong side of the road!), but
I'm finally moving through the upheaval and coming up to speed. Caster is
feeling good for prose but I'm finding the consonant heavy left hand even more
useful with CAD apps. I also moved my numpad to the left hand (I use it for
orthographic views) and created an upside down layer which mirrors the board,
effectively placing all characters on both hands. Combined, I'm able to draw in
Blender/KiCad/Shapr3D without having to move my hand back and forth between
trackpad and keyboard pretty much at all.

The board is combo forward—as can be expected for something of its size—but, in
order to keep prose fluid, I tried to pay as much respect as possible to
character frequency by analyzing a few of my git repos. Especially for adjacent
bigrams, I've found a higher require-prior-idle to be necessary on horizontal
combos. The switch to Caster also had the unintended effect of eliminating some
uncomfortable double-tap movements with my CAGS home row mods; where I
previously had shift on A and H, it is now on R and N, which seems to work more
smoothly. I had planned to combo SQT, but there was no place for it to go with
Caster's distribution of s,t, n, and i, so it made its way to a physical key.

I made an experimental battery choice, opting for LIR1254. I sometimes make
boards for friends and I was trying to find something slightly easier for them
to change that wouldn't require unsocketing the Xiao, but that had a smaller
footprint than CR2032. I was hopeful that a more compact smd style clip would be
sufficient, but I've since switched to a through hole version for greater
durability—a couple of the smd ones popped off the prototype under gentle
handling. The coin cell has worked fine in regular split mode, but I'm now using
a dongle to further reduce charging frequency.

I've also been starting to test out an [Embassy](https://embassy.dev) based
firmware written in Rust for the board called
[RMK](https://github.com/HaoboGu/rmk). Though much younger and not as feature
rich as ZMK, it is now running on direct splits, and I look forward to working
with it a lot more once combo support is merged.
