---
title: Alfred
tags: [ apps, luna, office ]
publish_date: 2019-03-08
cover_html: <img src="https://is4-ssl.mzstatic.com/image/thumb/Purple/v4/50/d4/97/50d49791-0fdc-7ab6-7d34-50f68d659547/source/512x512bb.png" />
---

Using your desktop remotely can get a lot easier with a good application launcher. Although it is possible to capture mouse clicks to program things, most things operate a lot more reliably when we learn to execute them by typing. And it's just plain faster. We like faster a lot, because when work gets done faster we have more time to stand around at the coffee machine.

> *Stop clicking, start typing.*

One easy way to get started withdrawing from clicking is by using *Spotlight* on OS X. You can usually just hit **⌘ + space** and start typing what you want, but I've found remapping spotlight to **option + space** to work better in Luna, so **⌘ + space** still works for iOS. For instance, **option + space** followed by typing **safa** will usually bring up Safari, which you can action (open) by pressing **return**. **option + space** follwed by typing **ter** will usually bring up Apple's Terminal installation. Spotlight can really expedite your life, but you will eventually wish it could do more. When that day comes, use [this link](https://www.alfredapp.com/) to get the installer for Alfred. It's truly indespensible.[^1]

Getting to know Alfred can involve some memorization, but there's a lot of mnemonic cues to help you along your way. I've included my cheatsheet below to help get your imagination churning. Not all the functionality below is included with Alfred, but you can easy install Alfred packages using Packal, the Alfred package manager.

## Alfred Cheat Sheet


### Administer

+ ####  **Calendar**
    + `cal` Live displays the month's calendar days
    + `cal [event] [at [time][am|pm]] [on [date]] [every [date]] in [location] @[calendar name] alarm [X min|hour|day|month|year]`
+ #### **Maps**
    + `route contactA contactB` or `map location1 to location2`
    + `maps {search term}`
+ ####  **Google Hangouts**[^2]
    + `call {contact}` dials contact in google hangouts
    + `dial {number}` dials number in google hangouts
    + `sms {contact}` sets up SMS hangout with contact

+ **co** searches contacts for string
+ **resize image** file action, can also  invoke by (presently unset) hotkey
+ **screen** screen recording
+ ####  **AlfredTwitter** ( use ⌘+⮐ )
    + __tweet__ `tweet {mytweet}`
    + **tweets** Live displays timeline in AlfredTwitter
    + __search__ live displays tweets matching search string

### Web Tools

+ **amazon** `a {query}` Live displays results matching {query}
+ **conv** `conv $quantity $unit1 $unit2` convert quantity from unit1 to unit2. includes currencies (and cryptocurrencies)
+ ####  **Google**
    + **d** search googledrive
    + **Google Similar Images** show similar images in file search
    + **g** *(Google Suggest)* `searchterm` + ⮐ for "I'm feeling lucky" results, `searchterm` ⌘ + ⮐ for all results
    + **gt** `translate {from>to OR to<from OR to} {searchword}`
+ **gr** golden ratio calculator
+ **hn** hacker news headlines
+ **.so** search stack overflow
+ **url** copies current url and places in current text document as title, h ref, or Markdown
+ **w** search Wolfram alpha

### Media
+ **fan** search fandango
+ **ib** search ibooks store
+ **mr** IMDb movie ratings



### Utilities

+ **8ball** magic 8 ball
+ **about** Live display of *About this Mac* info
+ **cfp**[^3] Copies Finder path
+ **dc** lists and controls docker containers
+ **eth** ethernet network info
+ **faker** makes fake user data
+ **pt** python interpreter
+ **router** opens gateway config page in browser
+ **speedtest** runs speedtest
+ **top** process control list
+ **vi** shows vi cheat Sheet
+ **wifi** wifi network info

### Package Managers

+ **brew/cask** brew/brew cask functions. executes in background, opens terminal on error
+ **mas** search mac app store
+ **masu** update mac app store
+ #### Packal
    + **fixum** repairs python workflows
    + **packal workflows** search for workflows on packal
    + **packal** update workflows

Hope these help expedite your computing experience!


[^1]: Windows sports *Cortana*, which works very similarly. Simply type **window key + s** and you can then type application names to open them, or use the arrows to scroll to other options depending on the context of your search. Many windows users prefer to install *wox*. It is similar to *Cortana*, but a little more fully featured. The *wox* installer can be downloaded [here](https://github.com/Wox-launcher/Wox/releases/download/v1.3.424/Wox-1.3.424.exe). *Wox* is the truly indespensible counterpart to Alfred for the Windows OS.

[^2]: Google Hangouts functions available via my [Hangouts plugin](http://www.packal.org/workflow/hangouts).

[^3]: Availble via my [Copy Finder Path plugin](http://www.packal.org/workflow/copy-finder-path).
