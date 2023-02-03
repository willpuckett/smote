---
title:  "Waking Up with Apple Shortcuts"
tags: [ iot, apps, ios ]
publish_date: 2019-12-04
cover_html: <img src="https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/0d/eb/8b/0deb8bb8-3a97-94c9-88ee-56bddfe77325/source/512x512bb.jpg" />
snippet: "I'm not really an auditory alarm kind of guy. I'll use them on the road when I have to, but I've realized I'm much more responsive to light in the mornings than sound. I have a bunch of Hue lights in my bedroom."
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

## The Shortcuts Widget

You can display your favorite shortcuts in the widget on your home screen. This
makes repetitive things super accessible, and can help you get things that don't
have good widgets (Hue) more accessible. I have shortcuts for several of my
favorite light scenes in my Shortcuts Widget that allow me to quickly change
them without having to talk with Siri or deal with getting into the Hue app and
waiting for it to connect to the bridge and load.

## Things That Don't Need to Be Apps

I don't want every function to have a button on my home screen. As a matter of
fact, I try to keep the home screen as [uncluttered](/clean-screen) as possible.
Being able to add image processing quick and dirties is pretty grand. One of my
favorites is [Invert Image](https://routinehub.co/shortcut/1629) by @keveridge.
I use this a lot in my illustration image pipeline.

## Expense Reports

I try to not make a habit of picking up paper. I've found through the years it
keeps me from ending up with little crumpled tidbits that occupy my dressing
area and come out of the laundry in tidbits in my pocket. To that end, I also
routinely archive any images I want to keep out of my photo stream and into
iCloud albums. That way, my photo stream becomes more of an image inbox.

When I have expensable receipts, I simply photograph them and toss them. Using
the
[Send Receipt Shortcut](https://www.icloud.com/shortcuts/8714cb63986340e285dd79135dae116a),
I can quickly assemble them into an email an downstream for processing by the
rest of the team. I make it a point to finish my expense reports before I get
off the train coming home. _Send Receipts_ makes that goal possible.

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

## Smiling Faces

There's a lot more you can do with Shortcuts. We'll get into a few nuttier,
glitter examples next week but until then have fun exploring and making
exceptionally useful things!
