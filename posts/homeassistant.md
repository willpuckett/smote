---
title:  "Re-Homing Home Assistant"
tags: [ iot, sbc ]
publish_date: 2023-10-29
cover_html: <img src="/images/ha.webp" />
---

This summer, I overhauled my blinds, upgrading the nodemcus to Xiao esp32c3s so
I could run the more modern version of Tasmota on them, and start testing out
matter. It worked really well (I think I had procrastinated upgrading because of
the costs of esp32, but it's gotten so much cheaper now than it was a couple of
years ago). Which got me thinking: could I install a zigbee chip on one of my
blinds and use zigbee2tasmota to expose them over matter, thus eliminating
HomeAssistant? I installed z2t and was surprised at how well it worked with my
lights, but the berry scripts to expose zigbee endpoints aren't done yet. (It is
on the road map so I'll definitely keep an eye on it as the project develops.)

Of course as this whole process drew on, I was living in intermittent service of
my lighting, sometimes having to switch them on and off by hand, and, even
worse, starting my day without them coming on automatically. Horror of horrors!
😱

## A Long Shot

While this time elapsed, I was busy working with NVMe storage and the CM4 and
its alternative on my printers. I had run across the Radxa Zero, but the onboard
storage seemed slow, and I was hesitant to step outside the rpi forest. I hadn't
tried Armbian, and if the Radxa was was at all like my unsuccessful experiences
with the CM4 alternatives I had tried, I was afraid it was just going to be a
still more disappointing waste of money.

Luckily, I woke up one day and threw caution to the wind and ordered the 4gig
ram/16gig emmc variant from aliexpress.

I had been in storage speed testing for a couple of months by the time it
arrived, so I naturally rushed to run pibenchmark on it. It scored a 1,074 on SD
(no surprise), a 8,845 on emmc, and a whopping 11,066 on uasp USB, exceeding the
pi4b by more than 20% despite having a slower processor. Unfortunately, none of
my benchmarks ever showed up pibenchmarks. The Radxa Zero pretty drastically
exceeded my expectations for storage speed (the highest score on pibenchmarks
presently is a paltry 5,409), which was one of the reasons I was hesitant about
buying it in the first place. I won't say the emmc felt fast, but it measured
well.

In terms of setup, I don't love the emmc. It's pretty painful to mount on my
laptop. Holding the boot button is tiny and my finger tends to slip off it while
I'm plugging it in. Navigating which `.bin` to run to mount the thing was a
little confusing as well, but once I had done it a few times it wasn't daunting.
I used the `radxa-zero-erase-emmc.bin` when I needed to erase the whole disk,
and the`rz-udisk-loader.bin` once I got a running setup I wanted to backup.
Coming from the world of NVMe disks, this was a pretty big pain point. The
mounted emmc ran very slow comparatively, and I had to try a lot of different
images as I was getting to know a new platform and ultimately, a new distro.

The emmc seems to come at pretty high cost/gig, but I priced a few out on
digikey and even the bare part doesn't come cheap. I would hope that Radxa gets
a good deal on them, but I feel like they're not charging that significant of a
markup. I'd like the price to be a little lower overall, but it all seems to add
up quickly.

## Software

![Eye](/images/bamboo.webp)

This was one place where I was really nervous about the Zero. I tried the Radxa
supplied images and wasn't really happy with any of them. Most of them were over
a year old and in general, I found them to not run well—spotty WiFi, unstable,
etc.

So I tried Armbian. And I broke Armbian. And I tried Armbian again.

Over the course of several days, I finally realized that Armbian is awesome and
I don't know why I've avoided it for so long. I was having two main problems:

1. I was installing zram via the foundobjects script I've been using for years.
   Had I bothered looking at the Armbian system beforehand, I would have noticed
   it was already setup, and my installer was breaking it, which was causing it
   to be unstable. There really wasn't an excuse for me to not figure this out
   sooner: I was rerunning the script a second time when it failed the first,
   but old habits die hard.

2. I had been using a RaspbeeII for years and I couldn't get serial working.
   Setting up the serial port for it took a lot of trial and error. I eventually
   resorted to adding `@reboot sudo systemctl stop serial-getty@ttyAML0.service`
   to my crontab to kill the login terminal service on the port. When I tried to
   disable the service, it would just get reenabled by the console args on the
   next startup, and trying to add a console=none option to the boot scripts
   resulted in the system not booting.

Once I got everything running nicely (you can follow the install steps
[here](https://community.home-assistant.io/t/raspberry-pi-zero-2-w/351137/39?u=willpuckett),
substituting an appropriate Armbian image and skipping the zram/swap and serial
portions of the instructions), I was able to setup some lights. I had been
clinging to zigbee2mqtt for years, but along the way, I gave ZHA a run since I
hadn't used it in a long long time. It's come far and is now my preferred way to
interface with zigbee in home assistant (although I still appreciate
zigbee2mqtt).

## Overall Impressions

![Radxa Zero](/images/radxa.webp)

My on ramp with Armbian was frankly overdue, and I probably owe it an apology
for not having gotten to know it earlier. Although I'm no power user, I have
been using linux for a while now, and I really like the spirit of Armbian. It's
wonderful to see a young distro of enthusiasts hacking together support for a
broad range of hardware. I'm excited to experiment with it on more hardware and
I think the distro can grow to be really strong in this space, and I hope it's
able to bleed off a lot of momentum from the official raspbian distro by
supporting rpis as well. It seems to me that a common software platform will be
really valuable to the arm boards.

> Armbian is punk rock.

If I were an AI analyzing my purchasing habits and what I'm actually happy with,
I'd buy the smallest form factor for me with some on board storage. Raw
benchmarks are important, but I tend to really like it when things are more
contained. Two weeks in to the Radxa Zero, I can say it hits the sweet spot.
It's small enough and light enough to plug into the USB C port on the back of my
router with just a 1" USB C coupler. HomeAssistant runs just fine: my lights are
snappy and responsive, and I'm not experiencing any problems running over wifi.
I'd like for the price to be a little lower, but I do think, given the costs of
the components, it's reasonable.

One thing that I noticed: the footprint of a 2242 m.2 drive would fit readily on
the back of the zero. I'm looking forward to a day when there's no SD card slot
and I can snap an $10 drive on the back. I also really appreciate that the Zero
has made the step into USB C, although I'd be willing to give up USB 3 if it
meant having an m.2 slot.

All that said, the Radxa runs great. It seems to sit at about 40°C with no
cooling. Of all the arm boards I've worked with, it may be my favorite... I just
wish I had taken the plunge sooner.
