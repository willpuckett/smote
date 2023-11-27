---
title:  "Printing with Radxa Zero 2 Pro"
tags: [ 3dp, sbc ]
publish_date: 2023-11-27
cover_html: <img src="/images/can-map.webp" />
---

The week before last, I won the sbc lottery. I happened onto the allnet website
during the brief moment when the Radxa Zero 2 Pro was available. I ordered 2.
They arrived in record time, exceeding their estimated delivery by half a week.

I was uncertain whether I would even be able to find an os to install. The Radxa
isn't officially supported, so it doesn't show up when you try to browse the
Armbian site and look at the Radxa category. But when I googled "armbian radxa
zero 2," I found [this page](https://www.armbian.com/radxa-zero2/), scrolled
down to "other supported variants," and used the Armbian Bookworm cli image.
It's been running marvelously now for over a week, and to my surprise, the leds
even work properly, even better than the "official" image for the Radxa Zero.

## sbc-bench Results

I couldn't be happier with these little demons. They held up very well running
sbc bench:

| Device / details |  Clockspeed   | Kernel |            Distro             | 7-zip multi | 7-zip single |     AES | memcpy | memset |  kH/s |
| ---------------- | :-----------: | :----: | :---------------------------: | ----------: | -----------: | ------: | -----: | -----: | ----: |
| Radxa Zero 2     | 2208/1800 MHz |  6.1   | Armbian 23.8.3 bookworm arm64 |        8980 |         2225 | 1256260 |   5070 |   9330 | 12.28 |

Those results were obtained without running any cooling, but the Zero 2 never
throttled during the tests, so it's doubtful the speeds would have improved any.

The results were only marginally lower than the Pi5. Given the better form
factor and the presence of usb c, I cancelled my Pi5 order.

## eMMC Testing

The eMMC didn't perform quite as well as its predecessor, and the results never
showed up on pibenchmarks even after I published them (a problem I experienced
with the Radxa Zero as well) so here they are:

| Category |       Test       |         Result         |
| :------: | :--------------: | :--------------------: |
|  HDParm  |    Disk Read     |      148.64 MB/s       |
|  HDParm  | Cached Disk Read |      130.76 MB/s       |
|    DD    |    Disk Write    |       62.9 MB/s        |
|   FIO    |  4k random read  | 7834 IOPS (31338 KB/s) |
|   FIO    | 4k random write  | 7705 IOPS (30820 KB/s) |
|  IOZone  |     4k read      |       40577 KB/s       |
|  IOZone  |     4k write     |       29701 KB/s       |
|  IOZone  |  4k random read  |       30032 KB/s       |
|  IOZone  | 4k random write  |       28437 KB/s       |
|  Score   |       6475       |                        |

## Cooling, Wifi

When I opened the box, I was delighted to find that the Zero 2 came with a
substantial heatsink. It covers the entire upper side of the board, and has the
most adorable tiny baby fan embedded in it. The fan plugs into a little tiny
port on the side exposed at the edge of the heatsink.

I was able to locate the fan using `gpioinfo`. It was on `gpiochip1 11`. I was
able to turn it on with `sudo gpioset gpiochip1 11=1`, and off again with
`sudo gpioset gpiochip1 11=0`. Notably, the fan struggled to pull the
temperature of the board down, but it was able to sort of hold it steady under
load. Given how tiny cute it was, its performance seemed reasonable enough.

The wifi seemed to perform ok while I was setting up the Radxas at home. But I
started having some problems when embedding them in my printer chassis. My
terminals were dropping connections, and I couldn't complete a file transfer in
Fluidd. I looked at the connection strength on my gateway and it was awful. I
was surprised, given that the Radxa Zero 2 touts having Wifi 5.

So, I removed the heatsink (and sadly the cute tiny fan) and performance was
great again. I really wanted to be able to use the heatsink: it's something I
would never have opted to purchase on my own, but I thought it was a nice
inclusion from Radxa. I have the boards positioned directly in front of much
larger fans in my printers so it's not a functional loss for me, but I wish
Radxa had left a cutout in the heatsink over the wifi module, which I think
would have been enough to improve performance and cooling simultaneously. Radxa
did include a wifi antenna, but I don't really like using them since they flop
around and can make installation and removal difficult when they're stuck to
things.

I was excited to use the tiny little fan with Klipper. I tend to leave my
printers on a lot and it would be nice to have something just on the sbc so I
don't have to spin up the main fan for admin tasks. Not that I'm manually doing
it but it would just be quieter. So I'll probably saw off the cute baby fan and
reinstall it sans heatsink at some point.

![](/images/can-topo.webp)

## OTG

One of the goals of switching to the Radxa Zero 2 for me was to simplify some of
my chassis wiring in my printers. I wanted to be able to use a single usb c
cable from my mainboard to the sbc. It admittedly isn't rocket science, but it
did take some doing. I had to short diode 16 and remove a fuse on my btt pico
board to get power out on the usb c port.

Using `cat "/proc/device-tree$(</proc/device-tree/__symbols__/usb)/dr_mode"`, I
was able to determine that the Radxa Armbian image comes configured for otg
mode, but the btt board doesn't negotiate for peripherial mode, so I needed to
reconfigure the Radxa to force host mode. Using `sudo armbian-config`, then
selecting `System > dtc (at the bottom of the list)`, I used `ctrl + w` to
search for `otg` and changed it to `host`. It should be in a usb section after
the words `dr_mode=`. Then `ctrl + x` to exit and follow the prompts to save and
restart. (Adapted from
[these](https://forum.armbian.com/topic/16769-control-usb-otg-power-onoff-on-orange-pi-one-armbian-buster/)
instructions.)

I had read that the otg port can have poorer performance than a standard port
and I fretted that I had gone too far for nought, but I was delighted to find my
canbus adapter showing up in lsusb, and after several days it's been running
great with no ill effect.

## Bringing Up can0

![](/images/can-mcu.webp)

It seemed like everything was working well running some homing commands and
heating the hot end, but when I tried to run a print, I was getting MCU
shutdowns. I did some review of klippy.log and found that my can bus queue was
out of room. (I use the BTT Pico as a canbus bridge to the HermitCrab and
sometimes a BTT EBB42 when I’m using my rotary roller or doing resonance
measurements on the bed.)

I use a pretty standard `/etc/network/interfaces.d/can0` file. It’s straight off
the Klipper canbus page save a larger queue length:

```
allow-hotplug can0
iface can0 can static
    bitrate 1000000
    up ifconfig $IFACE txqueuelen 1024
```

So I was surprised when my prints were failing due to no room in the queue.

I tried to run ifconfig but it is not present on a default Armbian install. I
had also noticed its absence in a `/var/log/syslog` entry noting it wasn’t
present, but the can bus was working in my tests moving the toolhead and issuing
commands and monitoring thermals.

So I ran `ip -details -statistic link show can0` and to my surprise my
anticipated queue length of 1024 was being reported as just plain 10. I
ultimately did an `sudo apt install net-tools` and rebooted, and everything
worked as expected.

But... it didn't seem right. I changed `/etc/network/interfaces.d/can0` to

```
allow-hotplug can0
iface can0 can static
    bitrate 1000000
    up ip link set $IFACE txqueuelen 1024
```

and `sudo apt remove net-tools`. It's been running great, but I'm still not sure
I'm doing it correctly. I'm not sure if I should be using `/etc/network` at all,
or if this should be done in network manager. But it works for now.

## Changing Cameras

I had ordered a Xiao esp32s3 a few months ago, and this seemed like the perfect
time to put it to work. I had been happy with the camera I had been using
previously, but I wanted something lower power as I plan to transition to EBB42
boards that have smaller 5v rails. I started out with the Seeeduino
[cam tutorial](https://wiki.seeedstudio.com/xiao_esp32s3_camera_usage/#project-ii-video-streaming)
and installed the project. After attaching the floppy external antenna, it
worked well, but I wasn't able to get a stream url for Fluidd. I then mashed the
camera config from the Seeeduino tutorial together with the server from
[this tutorial](https://randomnerdtutorials.com/esp32-cam-take-photo-display-web-server/),
and got a streaming url but no still url, which seemed to leave my printer ui
unhappy....

So after a little more exploration, I realized that Tasmota supports espcam. The
[blackadder page](https://templates.blakadder.com/seeedstudio_XIAO_ESP32S3_SENSE.html)
had the template already put together. I made a few modifications to add mdns
and preconfigure wifi, and I ended up with

```
[env:tasmota32s3-xiaosense]
extends                 = env:tasmota32s3
board                   = esp32s3cdc-qio_opi
build_flags             = ${env:tasmota32_base.build_flags}
                          -UFIRMWARE_TASMOTA32
# use mdns
                          -DUSE_DISCOVERY
                          -DWEBSERVER_ADVERTISE
                          -DMDNS_ENABLED
# configure wifi
                          -DSTA_SSID1='"interweb_3"'
                          -DSTA_PASS1=‘”xxxxxxxxxx”’
# and the rest….
                          -DUSE_WEBCAM
                          -DUSE_I2C
                          -DUSE_I2S
                          -DUSE_I2S_AUDIO
                          -DUSE_I2S_MIC
                          -DMIC_PDM
                          ; -DMIC_CHANNELS=2
                          ; -DMICSRATE=32000
                          -DUSE_SHINE
                          -DI2S_BRIDGE
                          -DMP3_MIC_STREAM
                          -DMP3_STREAM_PORT=82
                          -DOTA_URL='"-"'
                          -DCODE_IMAGE_STR='"xiaosense"'
lib_extra_dirs          = lib/libesp32, lib/lib_basic, lib/lib_i2c, lib/lib_audio, lib/lib_ssl, lib/libesp32_audio
```

I had been doing my tasmota builds with
[TasmoCompiler](https://github.com/benzino77/tasmocompiler), but I switched
yesterday to platformio and it seemed much easier and maybe even faster.

After building and flashing, I used `http://cam.local:81/stream` for the stream
url, and `http://cam.local/snapshot.jpg` for the still url, and fluid seems
really happy. There's more cam configuration that can be done in tasmota console
[detailed here](https://cgomesu.com/blog/Esp32cam-tasmota-webcam-server/). I am
noticing much poor performance in artifical light/at night than with my other
cam, but the xiao is so tiny I can't help but love it. I threw a large heatsink
on the back and it seems to idle at about 30 degrees, and run a little above 50
degrees while streaming.

## Continued Downsizing

There's a lot to love about the Radxa Zero 2. It's fast, cool running, and the
size is great. Of course, I wouldn't mind if it were the size of the Xiao, but
for everything packed on board, Radxa did well on both the size and the price.
This project also allowed me to complete my transition to Armbian... So so long
rPiOS, and thanks for all the fishes.
