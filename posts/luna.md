---
title:  "Connecting to the DVD Ripper with Luna, or, the Headless Source Man"
tags: [ luna, ios ]
cover_html: <img src='images/posts/2019/luna.webp'/>
publish_date: 2019-03-07
snippet: "Last week, I walked into my home office and realized it needed an overhaul. When I first occupied the space, I created a long desk (large enough for two to three people or several projects spread out) with 3 large monitors along it. I was using my desktop to drive it all and had several video capture projects over the winter for which I really appreciated the space."
---

Last week, I walked into my home office and realized it needed an overhaul. When I first occupied the space, I created a long desk (large enough for two to three people or several projects spread out) with 3 large monitors along it. I was using my desktop to drive it all and had several video capture projects over the winter for which I really appreciated the space. Now though, my approach has changed so much and I found the weight of it all, well, annoying. I wanted to be able to move more and bring a lighter focus to the room (I was intent making space to work on my [back flips](https://youtu.be/XcWUtDIeAUI) and the desk was in the way). So, I attacked. Taking apart my desk wasn't so much a reversal as an acknowledgment: it had been assembled for a purpose and *achieved* that purpose. Now it was simply time for a *new* purpose. 

>Now it was simply time for a new purpose.


It was time to disassemble the over-priced DVD ripper. I wanted to still be able to have infrequent and periodic access to it, but I really didn't need to feature it prime time. I was ready to go headless. 

### Remote Screen Apps

I had been toying with several remote screen apps (as well as [Blink.sh](/its-terminal), my favorite iOS terminal) to access the Mac Mini, but I was never really happy with how it ran and getting it all running smoothly took a good afternoon. The on going tediousness of it only demonstrated further why I needed to relegate it to a less prominent position in my life. [Screens.app](https://itunes.apple.com/us/app/screens/id655890150?mt=8) seemed by far to be the most consistent, but it felt a little laggy to me and I didn't like the way it displayed on my iPad screen. The scrolling and navigation didn't feel very natural either. 

>I was ready to go headless.


Last fall I purchased a [Luna Display](https://lunadisplay.com/), and was super excited about it, especially after seeing [this video](https://lunadisplay.com/pages/using-luna-with-mac-mini) but I had a lot of problems with it. My connection was really inconsistent, not due to network connectivity, but every time I polled AirPlay/AppleTV devices, it would disconnect. This was really annoying because I kept the AppleTV icon in my menu bar and every time I got near the thing the connection would drop, and then drop again when I clicked off the menu after it reconnected. 

So, newly inspired to get the Mini running smoothly headless, I set about to turn off the mirroring list. Going to **System Preferences > Displays** and unchecking __Show mirroring options in the menu bar when available__ helped a lot with the Luna Display. 

Luna Display also only runs once a user has logged in (Screens will work once the system starts up), so I tried to enable automatic login, but couldn't with FileVault turned on. 

### FileVault Woes

I also had some issues with FileVault's FDE (Full Disk Encryption). FDE requires you to sign in at the machine before the system will boot, which means neither Screens.app nor Luna Display.app could connect to the machine. Using **sudo fdesetup authrestart** was useful for reboots initiated by me, but wouldn't cover me in the event of a power outage when I was out of the house. The only way to overcome this was to buy a safe and bolt it into the wall next to my router. After doing that, I disencrypted the Mac Mini (**System Preferences > Security & Privacy > FileVault > Turn Off FileVault**) and am now relying on physical disk security sans encryption. 

>I had already installed the safe in the closet.


Having already pulled the monitors off my desk and torn the thing apart, I had the Mac Mini hooked up to the TV while finishing configuration. I considered just leaving it plugged into the TV, but I wanted it to be plugged directly into my router, and besides, I had already installed the safe in the closet. I was still unable to connect when putting it in the closet without a monitor and keyboard though, and had to change a few more settings plugged into the TV before my headless was running smooth. 

### Headless Configuration

I found a [great article](https://www.jtbullitt.com/tech/mac/mac-standalone.html) that really helped me fine tune a couple more settings.

##### System Preferences

###### Notifications

I found it helpful to try and minimize these as much as possible, mainly because they're annoying to manage and distracting every time I log in to try and do something else.

###### Energy Saver

1. Set the display to *Never* Sleep.
2. Make sure **Prevent computer from sleeping automatically when display is off**, **wake for network access**, and **startup automatically after a power failure** are all *checked*.
3. *Uncheck* **Put hard disks to sleep when possible**, and **enable power nap**.


![Energy Saver Settings](/images/posts/2019/energy-saver.webp) These were all pretty essential to keeping the machine on and responding to connections

###### Bluetooth

Open **Bluetooth > Advanced** and *uncheck* **Open Bluetooth Setup Assistant at startup if no keyboard is detected** and *uncheck* **Open Bluetooth Setup Assistant at startup if no mouse or trackpad is detected**.

I do not own a wired mouse or keyboard and these settings had caused me **a lot of difficulties** in the past when I was first trying to setup the Mini (and the Mini before it), but with FDE disabled and remote screens enabled, it was time to make the plunge. 

![Bluetooth Settings](/images/posts/2019/bluetooth.webp) It was scary to change these! No going back!!

###### Sharing

If you haven't already give your computer a name. Then make sure to turn on either **Screen Sharing** or **Remote Management** for remote screen access, and **Remote Login** to get in with a terminal. 

![Sharing Settings](/images/posts/2019/sharing.webp) So much to share

###### Users & Groups
Turn **On** automatic login for your user. I would generally not do this, but with the computer locked in a safe, *what could go wrong?*

### Do the Hokie Pokie

There's an old Convention of Mac I had to invoke several times while going back and forth between the closet: **⌘ + option + P + R**. Essentially, holding this combo down immediately upon boot until the computer chimes, and then continuing to hold down till it does it a total of about 4 times (some say 2 times now but 4 was the old school), clears the computer's NVRAM that holds settings related to boot. Can't remember exactly when I had to do this but I did it several times in the process and it seemed to help.

With all these issues resolved, I was able to get the machine reliably booting from inside the closet with no keyboard, mouse, or monitor, and connect to it via both Screens.app and Luna Display.app seamlessly (you may have to periodically log in via Screens.app to dismiss alerts when Luna auto updates). Although Luna Display will still disconnect and reconnect when I switch AirPlay speakers within iTunes, it's easy enough to avoid it, especially now that my office speakers aren't plugged directly into the thing (here's a [list of AirPlay2 speakers](https://appleinsider.com/articles/18/06/14/here-are-all-the-receivers-and-speakers-that-are-getting-airplay-2) that helped me get all my audio moved away from the desktop side of things--AirPlay2 is a **huge** improvement). Turning hiding on the dock off was essential as the app switcher shortcut doesn't map through. I also rely on [Alfred](/alfred), a spotlight alternative, to stay efficient. Luna Display still really annoys me in that it flashes up it's multi-monitor display config screen every time you log in and every time you quit an app, even if you only have one monitor (I wrote them an email about this and the response was pretty dismissive), and there's no setting to disable it. But overall, the hardware acceleration makes it a compelling choice against its alternatives once you get it all configured and are willing to give up some functionality. 

And, I have room to work on my backflips now. 