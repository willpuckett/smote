---
title:  "Re-Homing Home Assistant, Again"
tags: [ iot, sbc ]
publish_date: 2024-5-29
---

It has been 7 months since my last re-homing Home Assistant article. In the time since, I've re-homed it twice more, and it seemed worth making a few notes. At this point, it's fair to say my Home Assistant install is more of a vagabond, constantly searching for warm (but not too warm!) hardware to inhabit in the night...

## HomeAssistant Green

After my melt down last fall trying to get Matter working with Docker, I ultimately acquiesced to running HomeAssistant OS. It seems the HomeAssistant team has been utilizing a bunch of kernel hacks to make Matter work, and I couldn't keep up with getting everything passed through Docker.

I tried installing on a CM4 I had, but configuring my trusty RaspbeeII was impossible without a desktop Linux machine, which I didn't have. So I sprang for the HomeAssistant Green, and a SkyConnect dongle. It was sad to say by to the RaspbeeII. I had been using it for years, and it had been a great little device, despite constant poor reviews from others.

The Green worked pretty well. It was cohesive, and straightforward.

## Bye Tasmota: Finally Joining the ESPHome Cult

I had been using Tasmota for years. I built my blinds around it and it all seemed pretty straightforward. I used it for ESPCam with the Xiao. I had done custom builds. I wanted to use Tasmota's Matter integration so I could ditch MQTT, but I was never able to get it to work with HomeAssistant for long. 

Somewhere early in the year, I ran across a TMC2209 driver for ESPHome, and I finally did my first config. It took a minute to get used to the sprawling yaml files, but I really fell in love. The build system kinda kept everything unified, and the networking was light years beyond Tasmota. I was able to start rolling custom devices like a controller for our old wall dial heater, and do a lot of work exploring StallGuard on smaller motors.

Once I did, though, the Green really started to show its weaknesses. The RK3566 just couldn't do the builds very quickly.
And given how badger-y HomeAssistant is about updates, it was annoying to have to wait for the Green to roll through several ESPHome devices, especially since "Update All" stops working if my browser window goes to sleep.

## Enter the Optiplex 5050

So, when I decided to take advantage of the sale AtHom was having on their older devices earlier this year, I needed something I could do faster builds on. I finally got one of the older Dell SFF (Small Form Factor) machines. It was around 80 bucks on eBay, only marginally more than the Radxa Zero 2 Pro, but included a 512 gig NVME drive, 8 gigs RAM, and an enclosure and fan. 

I used it for HomeAssistant for a month or two, but ended up reallocating it as multi-instance Klipper host, for which it worked exceptionally well. I was still running HA on the Green at home, and I finally decided to virtualize HA and run everything on the Optiplex, ridding myself of all the ARM SBSs I had been using.

## The Installation

I wasn't really sure how to do a VM on Debian. I don't have a gui setup, the Optiplex just runs headless in the closet.

I scrolled over to the [HomeAssistant Linux Installation Instructions](https://www.home-assistant.io/installation/linux/) and found the instructions for VirtualBox, Unraid, KVM(virt-manager), and KVM(virt-install). VirtualBox and KVM(virt-manager) seemed like GUI installs, and Unraid looked like it was for an appliance. I decided to go with KVM(virt-install).

### Passing Through the SkyConnect

The instructions were a start, but the networking wasn't right for me, and I wanted to assign the SkyConnect Dongle to a something I could use regardless of where or when it was plugged in. 

I also wanted to run virsh as a user, not root. But that didn't work great and it seemed like using the --connect option just escalated to root anyway. I ended up using sudo, but I did write the following udev rule in `/etc/udev/rules.d/z51_usb_passthrough.rules`:

```udev
ATTRS{manufacturer}=="Nabu Casa", GROUP="kvm"
```

I ended up deleting the SUBSYSTEM directive because it wasn't working, but maybe that will be problematic in the future. This allowed me to run `virsh` as a user, and I could see the SkyConnect dongle in the list of devices when I ran it with `--hostdev 001.004` to indicate the usb bus and device. Later, I discovered that the `--hostdev` option could also reference the `vendor_id` and `product_id` of the device, which was a little more stable, so I used that instead: `--hostdev 10c4:ea60`.

### Networking

The networking was a little more complicated. I tried just starting with the standard HomeAssistant recommended command (with my hostdev addition, and more vcpus):

```bash
sudo virt-install --name hass --description "Home Assistant OS" --os-variant=generic --ram=2048 --vcpus=6 --disk /home/me/ha/haos_ova-12.3.qcow2,bus=sata --import --graphics none --boot uefi --hostdev 10c4:ea60
```

But I couldn't access my host via the default NAT networking. I knew the host would be happier on the same network, so I wanted to add a bridge, but most instructions I could find indicated that the bridge would need a second interface. 

I finally found this [reddit post](https://www.reddit.com/r/debian/comments/115f64u/debian_12_bookworm_network_bridging_for_kvm_vm/) which had a solution that worked for me with Debian Bookworm:

```bash 
# /etc/network/interfaces

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto enp3s0
iface enp3s0 inet manual

#Configure bridge
auto br0
iface br0 inet dhcp
bridge_ports enp3s0
bridge_hw <MAC>
```

Where `<MAC>` is the MAC address of the host interface (`ip addr show enp3s0`).

I Restart.

I then needed to add the bridge to virsh, which I was able to do by adapting [these instructions](https://linuxconfig.org/how-to-use-bridged-networking-with-libvirt-and-kvm). I felt like I wouldn't need the default NAT network again, so I removed it and set the bridge as the default network:

```bash
sudo virsh net-destroy default

echo -e '<network>
    <name>default</name>
    <forward mode="bridge" />
    <bridge name="br0" />
</network>' > /tmp/bridge.xml

sudo virsh net-define /tmp/bridge.xml

sudo virsh net-start default

sudo virsh net-autostart default

sudo virsh net-list --all
```

Since I made the bridge the default network, I didn't need to include it in my `virt-install` command, which meant I didn't need to restart the VM to get the network working.

### Autostart 

I wanted the VM to start on boot, so I ran:

```bash
sudo virsh autostart hass
```

### Git

I use a git repo to hold the HomeAssistant configs. I set it up in the VSCode add-on, but I always kinda forget how to provision a new machine.

I create the following `.gitignore` file in the root of the HomeAssistant config directory:

```gitignore
# Example .gitignore file for your config dir.
# An * ensures that everything will be ignored.
*
# You can whitelist files/folders with !, these will not be ignored.
!*.yaml
!.gitignore
!*.md
!esphome

# Ignore folders.
.storage
.cloud
.google.token
.esphome

# Ensure these YAML files are ignored, otherwise your secret data/credentials will leak.
ip_bans.yaml
secrets.yaml
known_devices.yaml
```

Credit goes to someone else for that file, but I failed to document who. Anyway, once that's in place, I init the repo, then add my remote and push the blank new config up, then pull it down on the VM, and switch branches to my config, then delete the new branch I just pushed, and copy in my secrets in esphome/secrets.yaml.


## Better than Ever

And here we are. I was able to access the HomeAssistant instance on the same network as the host, and the SkyConnect dongle was passed through and available to the VM, and update all my ESPHome devices in a fraction of the time it took on the Green. 

Stay tuned for the next eminent re-homing, inevitably just around the corner...
