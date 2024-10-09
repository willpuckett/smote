---
title: "IronOS: The Most Fun I've Had Since Ever"
tags: [ proto ]
publish_date: 2024-09-24
cover_html: <img src="/images/ts80p.webp" />
---

I bought a TS80P a few years ago, and it has been my trusty soldering companion
ever since. Despite my rough handling—using it for heat set inserts and even
melting bearings into PLA—the iron has held up remarkably well. However, my main
B02 tip had become so oxidized that only a tiny corner could be tinned. I feared
I might need a new tip, but after soaking it in a halved lemon for several
hours, scraping it periodically with the coarse side of my sponge, heating and
wiping it with a brass brush, and repeating the lemon treatment, it was back to
a fully tinnable state.

I was thrilled. I also rejuvenated my D25 tip, giving me two almost-new tips.
During this maintenance spree, I finally decided to install IronOS on my TS80P.
I had underestimated the improvement it would bring over the stock firmware. The
difference, especially with my newly restored tips, was astonishing.

IronOS simplifies the button controls and offers more intuitive temperature
settings. The most exciting feature is the motion sensitivity, which activates
heating when the iron is picked up, thanks to the onboard MSA301 triple-axis
accelerometer. I'm not sure if Miniware ever included motion sensing in their
firmware, but if they did, I had no idea. With motion sensing, the iron feels
incredibly smooth and natural.

IronOS also includes a "gas it, Eddy" / insane mode, which boosts the tip
temperature by a preset amount while the button is pressed. With this feature
and my freshly tinned tips, I was able to lower my working temperature by almost
100 degrees Celsius without any issues.

Installing IronOS was straightforward: hold down a button while plugging the
iron into your computer to enter boot mode, then drag the .hex file in your
preferred language to the disk. I had expected a more complicated process,
possibly due to outdated information or the overwhelming number of language
options.

The TS80P uses an STM32F103T8U6 processor, a detail I couldn't find in any data
sheets or product information during my search. I discovered this from
[teardown photos](https://github.com/Ralim/IronOS/issues/630) and wanted to
include them here for anyone else who might be curious.

![TS80P internals](https://user-images.githubusercontent.com/53649486/83252325-5245b100-a1ab-11ea-8889-4a8a0b86b5d5.jpg)
![TS80P internals](https://user-images.githubusercontent.com/53649486/83252338-5a055580-a1ab-11ea-9303-3eeba745d120.jpg)

I only find myself wishing now that I could connect the TS80P to
[Home Assistant](https://www.home-assistant.io/integrations/iron_os) like the
Pinecil v2.
