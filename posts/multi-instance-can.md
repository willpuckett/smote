---
title:  "Multi-Instance Klipper with Canbus"
tags: [ 3dp, sbc ]
publish_date: 2024-05-02
cover_html: <img src="/images/multi-instance.webp" />
---

Last fall, I had considered setting up multiple instances of Klipper on a single
machine. I ultimately went with a dedicated SBC for each printer, though, mainly
for resilency, but also because I dreaded writing the udev rules for the can
interfaces.

A few weeks ago, an update caused the wifi on my Radxa Zero 3's to stop working,
effectively bricking them. I was tired of having to maintain so many systems, so
I decided to give the small form factor Dell I had sitting around a chance.

## General Setup

I installed Debian bookworm on the Dell. I couldn't get it plugged into my
monitor and the router at the same time, but I fished around in a drawer and
found a usb Panda Wireless wifi adapter that it auto-recognized, and then I
manually configured the ethernet port by adding

```
auto enp0s31f6
iface enp0s31f6 inet dhcp
```

to `/etc/network/interfaces`. Once I finished the install, I unplugged the
wireless adapter and connected the Dell in the closet under my router.

## Klipper Install

I went through a very normal install of Klipper using Kiauh, and selected 4
instances. Kiauh handled everything automatically for me.

## Setting Up Canbus with Udev

I couldn't find any straightforward documentation on configuring Canbus with
udev for Klipper, so I had to tease out a the following solution:

1. Plug you canbus device (probably an mcu in canbus bridge mode or a u2c) into
   an available usb port

2. Run
   `udevadm info -a -p $(udevadm info -q path -p /sys/class/net/can0)| grep serial| head -n 1`
   (if you already have other can devices plugged in, you may have to run
   `ip link show` and figure out the appropriate device to substitute)

3. The above command should print something like
   `ATTRS{serial}=="490033000F50475532323820"`

4. Open `/etc/udev/rules.d/z21_persistent-local.rules` in your editor of choice

5. Subtitiuting the serial number you found in step 3, add the following line:

```
SUBSYSTEM=="net", ACTION=="add", ATTRS{serial}=="{YOUR_SERIAL}", NAME="{YOUR_CHOSEN_CANBUS_NAME}"
```

6. Open `/etc/network/interfaces.d/{YOUR_CHOSEN_CANBUS_NAME}` in your editor of
   choice, and insert the following text, substituting the canbus name you
   created in step 5:

```
allow-hotplug {YOUR_CHOSEN_CANBUS_NAME}
iface {YOUR_CHOSEN_CANBUS_NAME} can static
    bitrate 1000000
    up ip link set $IFACE txqueuelen 128
```

7. Run
   `sudo udevadm control --reload-rules && sudo udevadm trigger --attr-match=subsystem=net`
   and then unplug and replug your can device, or reboot if you prefer

8. Run `ip link show` and you should see your device listed under the
   appropriate interface name, with the correctly configured queue length and
   bitrate.

## Klipper/ Katapult Config

Once the interface is properly configured as above, you can simply add a
`canbus_interface` line to your `[mcu]` object in your `printer.cfg` that lists
the named interface you just created.

If you use katapult, you'll also need to use the `-i {YOUR_CHOSEN_CANBUS_NAME}`
option when your run `flash_can.py` to set the appropriate interface.
