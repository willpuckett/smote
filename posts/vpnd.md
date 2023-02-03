---
title:  "Café Work"
tags: [ mobile, office ]
cover_html: <img src='images/posts/2019/VPN.webp'/>
publish_date: 2019-04-25
snippet: "Having given so much attention to getting my Mac Mini running well in the closet, I realized I'd like to have periodic access to it while out of the house."
---

Having given so much attention to
[getting my Mac Mini running well in the closet](/luna), I realized I'd like to
have periodic access to it while out of the house.

I first sought [MacOS Server](https://www.apple.com/macos/server/), but, as of
version 5.7.1, VPN has been removed from MacOS Server (which has interestingly
[been pared down to only three services](https://support.apple.com/en-us/HT208312):
Profile Manager, Open Directory, and Xsan).

The Apple Support site suggests trying [OpenVPN](http://openvpn.net/),
[SoftEtherVPN](http://www.softether.org/), or
[WireGuard](https://www.wireguard.com/). I couldn't find an easy configuration
for OpenVPN, and didn't have success with WireGuard as a server either. I wanted
something easy. I gave [Macserve iVPN](https://macserve.org.uk/) a shot. It
worked, but for some reason I wasn't happy with it either and deleted it.

I found the by far easiest option to be
[VPN Enabler](https://cutedgesystems.com/software/VPNEnablerForMojave/). Most of
the setup time it required was the download, which cannot be done via home brew
as it is out of date. Straight outta the 📦, all you have to do is open a couple
of ports for it and you're off to the races. This is the one. Now I can access
my over priced DVD ripper from anywhere.

UPDATE: VPN Enabler hadn't updated for Catalina (although at this point they
have released an unsupported Catalina version), so I stopped using my VPN
altogether and route everything through SSH tunnels. I'm happier and it's more
[secure](https://www.zdnet.com/article/iranian-hackers-have-been-hacking-vpn-servers-to-plant-backdoors-in-companies-around-the-world/),
and I don't have to turn it on every time I want to use it which is so 1994.
