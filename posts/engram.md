---
title: "Exploring the Engram Keyboard Layout"
tags: [ keebs, micropost ]
publish_date: 2023-03-25

---

Exploring layouts for my new keyboard and decided to give the [Engram Layout](https://engram.dev) by Arno Klein a go. 

The Keyman App reccommended on the Engram website doesn't work with newer versions of MacOS, so I threw together a keymap for [Karabiner](https://karabiner-elements.pqrs.org). You can try it out by either opening it [directly in Karabiner](https://smote.io/install_engram.html), or viewing the JSON [here](https://smote.io/static/engram.json) ( you'll need to place the json file in `~/.config/karabiner/assets/complex_modifications/` and maybe restart Karabiner).

I'm definitely seeing my fingers moving less, and the punctuation feels very convenient for JavaScript/TypeScript. 

<h3 style="text-align: center;">⁂ ⁂ ⁂</h3>

I've been using Engram now for a couple of weeks. My typing speed has progressed from a mere few words per minute to over 30 now. Given that I've spent a lot of the past few weeks away from home and have been typing more on my phone than anything, I feel relatively happy with the progress.

This got me thinking, though, that jumping between layouts from qwerty on mobile back to Engram when I'm on desktop might be slowing my progress. 

I was able to successfully adapt Akif Heren's [akifkeyboard](https://github.com/cemheren/akifkeyboard) to work with the Engram layout, but I found it somewhat inflexible when switching between letters and punctuation/numbers. 

Ultimately, I happened on a small iOS app called [xKeyboard - Custom Keyboard](https://apps.apple.com/us/app/xkeyboard-custom-keyboard/id1440245962) by 煦 张. I was able to create layouts for both phone and tablet easily, including portrait and landscape variations. 

![Engram on iPhone](https://smote.io/images/posts/2023/engram2.webp)

![Engram on iPhone](https://smote.io/images/posts/2023/engram3.webp)

xKeyboard has a feature called "candidate keys" that allows you to press a key and get additional functionality. I'm currently using that to collapse the center punctuation column on portrait iPhone view. Things are fitting nicely on phone, and very well on iPad. It's still very much a work in progress, but I'm posting in case anyone finds it helpful. You can try it out [here](https://smote.io/static/Engram.xkeyboard). That will download a file you'll need to import into (the paid version of) xKeyboard on either iOS or iPadOS. 

![Engram on iPad](https://smote.io/images/posts/2023/engram1.webp)


I think I should be able to create an x-callback-url for the `.xkeyboard` file that will take it directly into the app, but I haven't been able to find it yet...