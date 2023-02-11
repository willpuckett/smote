---
title:  "Waking Up with Apple Shortcuts"
tags: [ iot, apps, ios ]
publish_date: 2019-12-04
cover_html: <img src="https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/0d/eb/8b/0deb8bb8-3a97-94c9-88ee-56bddfe77325/source/512x512bb.jpg" />

---

I'm not really an auditory alarm kind of guy. I'll use them on the road when I
_have_ to, but I've realized I'm much more responsive to light in the mornings
than sound. I have a bunch of Hue lights in my bedroom. I prefer to have Hue
manage turning on the lights in the morning because it does such a good job
ramping the intensity change, but I wanted to augment that with one of my
ambient forest apps from my AppleTV.

Apple Shortcuts (some of you may remember it in it's previous incarnation,
_Workflow_) has been growing substantially over the past few years. Shortcuts
now boasts the ability to run ssh commands, interact with AppleTV, and
orchestrate a host of other apps. Shortcuts can be trigged from the home screen,
from the share sheet, and via time or sensor cues, somewhat. The sensor and time
cued shortcuts are called _automations_, but they're not automated. A
notification will appear on your home screen when the shortcut is trigged, but
you have to interact with the notification to actually run the automation, which
is, well, basically useless for unattended automations (which is, in my opinion,
pretty much the idea behind automation in general).

This was a little off putting (and broke my hopes of having my AppleTV come on
as an alarm), but even with such failures, the Shortcuts app has become
invaluable to me.

## Run Script Over SSH

Of course my favorite shortcut is really just a launching pad for anything else
you need to do in the world ever. You can easily tailor _Run Script Over SSH
(RSOS hereforward)_ to do anything your heart and stashed Mac Mini desire.

I use mine to process and re-encode video, grab file lists, move content in and
out of Apple Notes, and publish EPUBs.

This can feel so elegant because it lets you create an iOS widget button for
what can be an extremely complex command, and it displays the cutest little ✅
when it finishes. It feels great.

You may run into some process management issues when you start using RSOS.
Ideally, the script will launch then detach from your process if it's more than
a couple of milliseconds in execution time. (Long running commands shouldn't
hang the share sheet or widget.)

If you need to release the command but keep it running on the remote machine,
I've found the following to be successful:

```bash
screen -S whatever
{ your command here } < /dev/null > /dev/null 2>&1 &
screen -d whatever
exit
```

This basically gives the command something to chew on so it doesn't think it's
been abandoned, and then routes anything it has to say about anything to the
abyss. It keeps persnickety commands (ffmpeg) happy. Notably, the **screen**
command wasn't working properly in an earlier MacOS version, but does as of late
last summer (ish).
