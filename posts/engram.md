---
title: "Exploring the Engram Keyboard Layout"
tags: [ keebs ]
publish_date: 2023-03-25
---

Exploring layouts for my new keyboard and decided to give the
[Engram Layout](https://engram.dev) by Arno Klein a go.

## Using Karabiner

The Keyman App reccommended on the Engram website doesn't work with newer
versions of MacOS, so I threw together a keymap for
[Karabiner](https://karabiner-elements.pqrs.org). You can try it out by either
opening it
[directly in Karabiner](https://esm.sh/gh/willpuckett/engram/install/mac/karabiner/install_engram.html),
or viewing the JSON
[here](https://raw.githubusercontent.com/binarybottle/engram/master/install/mac/karabiner/engram.json)
( you'll need to place the json file in
`~/.config/karabiner/assets/complex_modifications/` and maybe restart
Karabiner).

### ⁂

I'm definitely seeing my fingers moving less, and the punctuation feels very
convenient for JavaScript/TypeScript.

## First Impressions

I've been using Engram now for a couple of weeks. My typing speed has progressed
from a mere few words per minute to over 30 now. Last week, I pulled the keycaps
on my MacBook Air and swapped them to the new layout of choice. It's not that
I'm 100% sold forever on this layout, but I want to give it a long enough,
thorough enough attempt to see if it will set in my brain and actually work
better. I was feeling a little bit of a twisting/shearing sensation especially
in my left hand for the first few days of using it, but it's dissapated now and
I would say my hand feels better now typing in general. I admittedly have a
habit of typing in bed, and an angle mod is something I considered trying out,
except the feeling has now dissipated completely.

Given that I've spent a lot of the past few weeks away from home and have been
typing more on my phone than anything, I feel relatively happy with the
progress. This got me thinking, though, that jumping between layouts from qwerty
on mobile back to Engram when I'm on desktop might be slowing my progress.

## iOS Implementation

I was able to successfully adapt Akif Heren's
[akifkeyboard](https://github.com/cemheren/akifkeyboard) to work with the Engram
layout, but I found it somewhat inflexible when switching between letters and
punctuation/numbers (the layouts had to have the same number of keys or they
wouldn't render). Ultimately, I happened on a small iOS app called
[xKeyboard - Custom Keyboard](https://apps.apple.com/us/app/xkeyboard-custom-keyboard/id1440245962)
by 煦 张. I was able to create layouts for both phone and tablet easily,
including portrait and landscape variations.

![Engram on iPhone](/images/engram2.webp)

![Engram on iPhone](/images/engram3.webp)

xKeyboard has a feature called "candidate keys" that allows you to press a key
and get additional functionality. I'm currently using that to collapse the
center punctuation column on portrait iPhone view. They don't work quite as well
as the native keyboard's flick--you kinda have to wait for the candidates to pop
up. The dictionary and auto insertion of apostrophe's is also sorely missing. So
the layout is slightly modified, but things are fitting nicely on iPhone, and
very well on iPad. It's still a work in progress, but I'm posting in case anyone
finds it helpful. You can try it out
[here](https://smote.io/static/Engram.xkeyboard). That will download a file
you'll need to import into (the paid version of) xKeyboard on either iOS or
iPadOS.

![Engram on iPad](/images/engram1.webp)

I think I should be able to create an x-callback-url for the `.xkeyboard` file
that will take it directly into the app, but I haven't been able to find it
yet...
