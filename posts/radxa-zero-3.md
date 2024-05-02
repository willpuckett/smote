---
title:  "Radxa Zero 3"
tags: [ 3dp, sbc ]
publish_date: 2024-01-07
cover_html: <img src="/images/rock-chip.webp" />
---

Nary a month on the heels of my writing about the Radxa Zero 2 Pro, I'm
delighted to report I've received the Radxa Zero 3w. Setup couldn't have been
easier—in just over a week, I managed to find and install an operating system.

Abandoning AMLogic for RockChip, The Radxa Zero 3 is a pretty big departure from
the earlier models in the line. I had been unsuccessful experimenting with the
RK3566 last year via the LuckFox Core3566 CM and I was hesitant about making
another attempt, but my love of the Zero line prevailed.

It's important to note: the price is right. For the given compute power, the
RockChip based boards seem to come in well below the competiton--so I felt like
it might be worth going through whatever hazing I needed "get it working."

## Installation

RockChips are a little strange to install. There's apparently a windows app that
is very straight forward, but the documentation for using `rkdeveloptool` on
other oses was more difficult to navigate.

It came down to four commands:

- `sudo rkdeveloptool ld`
- `sudo rkdeveloptool db rk356x_spl_loader_ddr1056_v1.10.111.bin`
- `sudo rkdeveloptool wl 0 radxa-zero3_debian_bullseye_xfce_b4.img`
- `sudo rkdeveloptool rd`

The first and the last aren't even necessary—the first just lists available
devices (to make sure you've actually got the thing connected), and the last
resets (restarts) the device.

It is worth giving a shoutout to Radxa. They're in the midst of an overhaul of
their documentation site. It still has room for some improvement I believe, but
there's a lot more information starting to show up.

## The Disk

The eMMC performs well, falling on the low side of the expected range. I
anticipate that this is more likely a software issue with the Radxa OS build
than the drive itself, and that changing to Armbian if and when a build becomes
available, will bump up the score by a little more than 10%.

I was delighted to note that my test results actually appeared on the
pibenchmarks site. I thought this might be the result of improvements, but none
of the recent commits or PRs are related, so idk.

| Category |       Test       |         Result         |
| :------: | :--------------: | :--------------------: |
|  HDParm  |    Disk Read     |     154.48 MB/sec      |
|  HDParm  | Cached Disk Read |     154.50 MB/sec      |
|    DD    |    Disk Write    |       55.1 MB/s        |
|   FIO    |  4k random read  | 9936 IOPS (39747 KB/s) |
|   FIO    | 4k random write  | 7947 IOPS (31788 KB/s) |
|  IOZone  |     4k read      |       21779 KB/s       |
|  IOZone  |     4k write     |       21189 KB/s       |
|  IOZone  |  4k random read  |       21769 KB/s       |
|  IOZone  | 4k random write  |       31344 KB/s       |
|  Score   |       6191       |                        |

You can view the results [here](https://pibenchmarks.com/board/Radxa_ZERO_3/).

## Wifi

There was a last minute wifi chip change with the Zero 3 that resulted in it
getting wifi 6 (ax). It's heaven. I had to do some work to get my region set,
but once I did, I wasn't even able to see the upload speed I was getting over
the lan in the printer gui. It was too fast to read. `speedtest-cli` results
were coming in at over 150mbps, almost 4 times that of earlier boards.

The wireless performance is where this board really shines. I have a feeling
that as I start to live with it, it may make the lackluster performance of other
sbcs stand out more.

## Can

As I was looking at various models in the RockChip family, I noticed that some
of the newer ones have canbus onboard. I currently use mcus in bridge mode,
which seems to work well, but it could potentially simplify some firmware
building processes to use can directly on an sbc. This would theoretically have
some performance benefits as well, although I wouldn't say I'm experiencing
issues at present.

Unfortunately, Radxa says the RK3566 doesn't have can onboard, although
wikipedia states that it does. I wish Radxa had used RK3568 instead on the
Zero 3.

## Thermals

I had read some internet chatter that RockChip processors tend to run hot, but I
was (thermally) relieved to find the Radxa Zero 3 ran with the same exceptional
thermal performance of its predecessors in the line. I threw on a small heatsink
and positioned it under a chassis fan for good measure, but even during cpu
intense tasks, it barely pushed over the 55º mark.

## Parting Thoughts

It will be difficult to displace the Zero 2 Pro from its position as my favorite
sbc, but the Zero 3 has a lot going for it. Especially in its applicability for
printing, the Zero 3 holds up _very_ nicely. More intensive tasks aren't quite
as snappy as its older sibling, but day to day network ops are much stronger.

I know it's only a couple of millimeters, but I also like the return to a true
pi zero form factor (the Radxa Zero 2 Pro was slightly larger).

And at less than half the price, I'll be looking to the Zero 3 for the majority
of "simple" tasks going forward.
