---
title:  "Buttons, Buttons, Who's Got the Buttons?"
tags: [ iot, apps ]
publish_date: 2021-06-01
snippet: "When I was a teenager, I thought it would be really retro to have one of the alarm clocks like the emoji: ⏰. It had the two bells, and an oscillating hammer that would strike them with a fervor appropriate to impending nuclear doom. As my life moved forward, I soon realized that (incessant ticking aside), auditory battery didn't start my day on the right foot."
---

When I was a teenager, I thought it would be really retro to have one of the
alarm clocks like the emoji: ⏰. It had the two bells, and an oscillating hammer
that would strike them with a fervor appropriate to impending nuclear doom. As
my life moved forward, I soon realized that (incessant ticking aside), even if
annihilation were imminent, why would I want to spend my final moments under
such assault?

The years ticked forward. I noticed I would systematically wake up earlier in
summer months than in winter. I learned to place my bed so the morning sun would
catch my face. My natural rhythm was oriented to waking up with light. So,
setting my Hue lights as an alarm seemed to be a natural extension of my
biorhythms. A nice 30 minute fade in helped create a smooth morning routine,
something that energized me and got me going without a hard interruption on my
sleep phase.

The Hue Bridge 2 is pretty capable on allowing other Zigbee devices to add, but
only exports Hue branded devices to HomeKit. I wanted to start using other
brands of bulbs, largely due to the even increasing costs of the Hue ecosystem.
I also didn't want to have to have a separate app (or any app really) for my
outlets and bulbs and blinds, I just wanted it to all work smoothly with Siri.
While I don't see vendor lock in as an outright conspiracy, I can understand
wanting to provide a good user experience for a company's products. Nonetheless,
much like the Little Mermaid, I wanted more.

I gave HomeBridge a spin last summer, but found it less than reliable at the
time. So, over the Christmas holiday, I started ordering a few pieces to try and
roll my own bridge. Although my gut told me life would be easier using a USB
Zigbee adapter, I wanted to avoid having something dangling out of the side of
my computer. For many years, I had developed a habit of avoiding the Raspberry
Pi, but over the past year I worked with them alongside my 3D printers and have
come to appreciate especially the newer models as very capable little machines
that are more than cost competitive with a cloud hosted service. I ended up
settling on a Raspberry Pi 4 and the DeConz RaspbeeII adapter, largely because
the CC2531s on Amazon were overpriced and the one I ordered from AliExpress
wouldn't arrive for two months. Admittedly, the Pi4 is a little bit of overkill
for a home automation bridge. But if overkill means crisp responsiveness and
fast reboots, count me in. It turned out that the RaspbeeII was a good choice as
well, since it had a stronger signal that was capable of handling more devices.

## Home Assistant

If you like buttons, you'll _love_ Home Assistant. Created roughly 8 years ago,
Home Assistant lets you build and integrate basically every IoT device in
existence. And then, when you need to make devices that don't exist, it's a
breeze to add them as well. Ish.

The flexibility is admittedly overwhelming in the beginning. It takes a while to
get your installation right, and get used to the nuances of adding and
configuring devices effectively. Plan on installing it twice: once to learn what
you're doing, and the second time to get it right. My first time around, I
planned on using the Pi solely as a home automation controller, so I started
with the Home Assistant Operating System Image. I really liked the way other
containers showed up in the Home Assistant front end, and how contained it felt.
But like my other bridge experiences, I eventually found the containment
stifling, and difficult to get down deep enough to easily configure the bridge
hardware. I didn't find a lot of containers in the Home Assistant ecosystem I
wanted to run, but did have some other containers I wanted to run on the
machine, so it turned out to be way better for me to run Home Assistant in
Docker.

## Connecting the Zigbee Bridge

Once you have Home Assistant running, you'll need to connect your Zigbee bridge
if you plan on using it was most IoT devices. There are 3 main ways to do that:

1. Phoscon deCONZ
2. Zigbee Home Assistant (ZHA)
3. Zigbee2mqtt

I first tried using deCONZ, after all, it was made by the manufacturer of my
bridge. While it did run with my lights, the interface felt slow and clunky. I
just didn't like it.

## MQTT

MQTT was designed as an oil pipeline telemetry protocol. It is unbothered by
lack of bandwidth or responsiveness. I had never worked with MQTT and was a
little intimidated by zigbee2mqtt, but installing it in Home Assistant OS was
very straight forward. I got it running with the RaspbeeII in a couple of hours,
and it worked really well...

I started installing the whole project New Year's Eve, and before the fireworks
finished crackling, I had all the lights and a couple of Octoprint instances all
installed in Home Assistant. Things went well for a couple of weeks as I
detailed configurations, discovered Lovelace (HA's front end), and found more
and more integrations for household items I hadn't even considered automating.
Then, an update crashed the whole thing. Like watching the ocean overcome my
sandcastle, I resolved to rebuild, and rebuild stronger. I started by putting a
fresh copy of Debian/aarch64 on the SD card, and installed
[Docker](https://phoenixnap.com/kb/docker-on-raspberry-pi).

## Raspberry Serial

One of the stickiest pieces of the RaspbeeII is getting the serial configuration
right on the Raspberry Pi. If it's wrong, you'll experience lagging or entirely
non-functional lights and devices, or devices that may randomly power on and
off.

Following the instructions on the
[phoscon website](https://phoscon.de/en/raspbee2/install) for the RTC and serial
setup is all that's needed (the RTC probably isn't even needed, but it's a good
time). Understanding serial on the Pi's can get really involved as you start to
consider various models and the differences between the primary and mini-UARTS
(see [this](https://www.raspberrypi.org/documentation/configuration/uart.md) if
you're interested). It's really easy to overthink/over research the serial
setup. At least with the Pi4, I didn't have to use any overlays, just
`sudo raspi-config > Interfacing Options > Serial > Would you like a login shell accessible over serial?: No > Would you like the serial port hardware to be enabled?: Yes`.
If you don't plan on using the Bluetooth, go ahead and
`sudo systemctl disable hciuart bluealsa bluetooth` and reboot. This will
disable all the Bluetooth stuff, and make the RaspbeeII available at /dev/ttyS0.

There may/probably is a better way to do this, but the results have worked great
for me. I don't have any devices I need to connect to my Home Assistant via
Bluetooth, so that helps. YMMV...

## Compose

After getting Docker installed and the serial setup, I just used
[this](https://github.com/willpuckett/zigbee2mqtt2ha) Docker Compose to set up
the relationship between mosquitto (the MQTT broker), zigbee2mqtt, and Home
Assistant. A simple `docker-compose up -d` launches container group, and it's
easy to customize from there.

## Printers

The
[OctoPrint-HomeAssistant](https://github.com/cmroche/OctoPrint-HomeAssistant)
plugin made getting the printers connected a breeze.

## Tasmota

Then there's all those other things around the house that you didn't even know
you could affordably automate.

As I mentioned before, I love waking up with light. But how can I open my blinds
to wake myself up without being awake? I needed cover automation. I started with
[this repo](https://github.com/willpuckett/Motorized_MQTT_Blinds). It got the
blinds moving, but using the 4988 drivers was pretty loud. I wanted to group
several blinds together (mainly because I didn't want to solder that much
hardware), but they weren't staying in sync very well. I also found that the
controllers weren't consistently staying connected to my Home Assistant install.
For a while the blinds fell by the wayside, then I discovered that
[Tasmota](https://github.com/tasmota/tasmotizer) does
[cover](https://tasmota.github.io/docs/Blinds-and-Shutters/#using-stepper-motors)!
I was able to configure a single ESP8266 with 2208 steppers I had laying around.
The connection has been rock solid ever since, and Tasmota is super easy to
configure and maintain. Want to make a smart outlet, a UV sensor, a smart LED
strip? Tasmota can reconfigure to be basically any IoT device in seconds and
plays great with MQTT. It can actually be a Zigbee bridge as well, which I might
have considered more strongly looking back as I might have been able to run my
Home Assistant container elsewhere, although I'm pretty happy with how
responsive my install turned out.

Tasmota does a better job partially because it properly implements acceleration.
The blinds have been on Tasmota for several months now operating every day
without any noticeable creep, but I still think sensing the open/close state
would be nice, perhaps by using the 2209's StallGuard feature...

## Adaptive Lighting

Home Assistant has a robust plugin ecosystem. While a few are implemented in the
release version of HA, you'll find many more in [HACS](https://hacs.xyz/), the
Home Assistant Community Store.

The most indispensable for me is probably Bas Nijholt's
[adaptive-lighting](https://github.com/basnijholt/adaptive-lighting). It does a
beautiful job tuning lights throughout days and seasons to be reflective of the
quality of outdoor light. I actually prefer it to Apple's implementation: it
just feels a lot more artful when you live in it, I think because it handles
brightness and color/temperature together, which is what happens with outdoor
light as well. It feels so natural that I cannot notice that bulbs are on in the
middle of the day, they just blend perfectly, while night time lighting feels
warm and subtle, despite this
[study](https://arstechnica.com/gadgets/2021/05/iphones-night-shift-feature-doesnt-help-you-sleep-better-study-finds/)
which calls into question the entire idea of warm night light.

## Media Player

Home Assistant is also really good at integrating with pretty much every media
player under the sun. Although I'm not reliant on it for operating the player
most of the time, it has been wonderful to implement a pause when the AppleTV is
on and someone walks out of the room... Way less searching for the remote and
rewinding!

## The Day's Close

At the end of the day, the important thing about home automation for me is that
it feels natural and (mostly) out of the way. The immense flexibility of Home
Assistant lets me target control where it's needed... And avoid it where it's
not. I want my automation to put me more in touch with the natural world around
me, so there's more room for me to stop and notice a breeze moving through the
house, or a warm ray of sun on my cheek in the morning.
