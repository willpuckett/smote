---
title:  "TMCeiver"
tags: [ 3dp, can ]
cover_html: <img src='images/tmceiver.png'/>
publish_date: 2024-07-21
---

I think I may be the only person who likes using toolboards with delta printers, but I find it really convenient to change between different tools, and for media that is less physically stable (clay), it just seems like the right kinematic system. I had been using a QQ-S Pro for many years, but when I started working with clay more last year, I wanted something with a stiffer frame. When I found the SR on mega sale over the last winter holiday, I snapped up a couple. 

I initally installed it with a BTT U2C as the transceiver for the main Robin Nano v3 board and as a canbus bridge. It worked well, but I didn't like the bulk and I was unhappy with the additonal cabling and unnecssary additional power draw, and the costs of the U2C. I had been picking up PD0/PD1 for canbus from the SPI jumpers under an unused stepper driver slot.

A few weeks ago, it occurred to me that it might be nice to design a pcb that would sit in a stepper slot and house a CAN transceiver, so I could ditch the U2C's. I did a little layout and sent it off to JLCPCB. I thought I would need to use a level shifted transceiver, but I did a little digging and realized PD0/PD1 are 5v tolerant pins, which simplified the design even more and really helped me squeeze everything onboard.

To use the board, the steppers need to be supplied with 5v, and PD0/PD1 need to be jumpered to the SCK and MISO pins, then the mcu needs to be flashed with Klipper in CANbus bridge mode configured to PD0/PD1. Obviously, it won't work if you're using SPI steppers. (I use TMC2209 in UART which works great).

It's not much of a breakthrough or anything over using an off board transciever, but I like avoiding the wiring both to reduce possible sources of EMI/retransmits and because I don't have to crimp additional cables, which I spend way to much time doing anyway.

I used MCP2542FD SOP in my first revision, but there weren't a ton of them in stock on lcsc and I wanted to use a smaller package, so I switched to a Texas Instruments TCAN transceiver in a SON package which had the additional benefit of also being slightly cheaper [download schematic](/static/Schematic_TMCeiver.pdf).

The TMCeiver is CAN FD capable, in the event that Klipper adds CAN FD support at some point in the future. 

Testing has gone well. I've been running  

```
grep 'retransmit=' printer_data/logs/klippy.log* | grep -v 'retransmit=0 '
```

to search for lines in klippy.log that have CAN retransmits. So far, I haven't had a single one with the TMCeiver in place. 

I had to do a minimum order for the transceiver boards and I have a few extras. Reach out if you'd like one to test. If there's interest, I can improve the silkscreen a little and order a larger batch, which would help get the cost down. It would be interesting to make versions for other boards if they have CAN capable pins somewhere on the steppers. Adding a toolboard often means freeing up a stepper slot on the primary mcu, so I think this might be a pretty convenient way to handle CAN upgrades for older machines, especially if I can generalize the board so it can use any pins available to it.
