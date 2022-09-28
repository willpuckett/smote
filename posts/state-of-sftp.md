---
title:  "The State of SFTP"
tags: [ ios, apps ]
cover_html: <img src='images/posts/2019/sftp.webp'/>
publish_date: 2019-11-07
snippet: "Earlier this week, I covered what I see as an emerging SSH tunnel trend. Seeing on-demand encryption at the app level–without being pushed through anyone else's cloud–is a trend that needs to be growing exponentially right now."
---

Earlier this week, I covered what I see as an emerging [SSH tunnel trend](/ssh-tunnel-trend). Seeing *on-demand encryption* at the app level–without being pushed through anyone else's cloud–is a trend that needs to be growing exponentially right now.

This got me thinking: *why have I not tried mounting sftp shares in Files.app?*

It seemed reasonable enough at first. Distant memories of mounting WebDAV and FTP shares in MacOS (OS X at the time) stirred below the lithosphere of my mind. So I furtively began panning though apps with  the home bar at the bottom of my screen until I reached Files.app. I hit **Connect to Server** and typed in a valid **sftp://** address, but was smacked down with **The operation can't be completed because this URL is not supported.**

I believe what we sometimes see as intelligence is really relentlessness–an unwillingness to give up on a problem until it unlocks. My relentlessness grabbed the wheel. Providing solid, secure remote file access using the same protocol that's already locked down on the sever side seems like a *no-brainer*. The present reality of the situation is much more messy, however.

> For clarity, SFTP is SecureShell File Transfer Protocol, and operated by default on port 22 as a subset of SSH. It is not to be confused with FTPS, File Transfer Protocol Secure, which is FTP over SSL and works on port 990 (and sometimes 21).

### Using Good Keys

There's an entire industry of what constitutes a good key. My limited understanding seems to be that RSA keys, even those over 2048 bits, are on their way out, and that ECDSA keys may also have some legitimate issues, including concerns of a possible NSA back-door. Ed25519 keys seem to be not only the most secure, but also the most efficient. This said, different apps have varying support for key types and sizes, meaning that even when you want to implement the Ed25519, it's not *always* an option. 

Many apps fail to implement private keys as a sign in option *at all*, and *only* allow password sign ins, which I feel should be blocked from the SSH Server altogether. 

### The App Trials

Having abandoned my hopes that I could use SFTP at the OS level, I began my search for a third-party solution. I blew through tests of pretty much everything that supports SFTP in the App Store. I was trying to find something that could achieve the following goals: 

+ Fully integrate with Files.app
+ Utilize SSH keys for login, preferably Ed25519 keys
+ Absolutely NOT have a recurring monthly subscription
+ Absolutely NOT making an account with a third-party 
+ Abso abso absolutely NOT storing any of my personal data (keys) in said third-party account
+ *Preferably* open-source

It seemed like I short list. I'm happy to pay a big upfront for an app I love, even more so if it's open source (I had no issue shelling out the $20 for Blink.sh), but I think it's *ethically* wrong to demand a recurring cost for an app that doesn't provide associated web services, and I don't want my SFTP client *to* provide any web services. 

### The Contenders

Let the games begin!

##### [Pisth ($4.99)](https://apps.apple.com/us/app/pisth-ssh-client/id1331070425)

I can't figure out what the name is supposed to mean. At first I thought it was *Psith*, like short for *psithurism*, and I was super into it, but I was transposing the *i* and the *s*. *Pisth.app* is *probably* my strongest contender, although it didn't work out. 

It ultimately couldn't sign into my server/load the keys properly. I left a bug on the [github page](https://github.com/ColdGrub1384/Pisth/issues/24). 

Other than not working, Pisth.app also doesn't integrate with Files.app. But the name is great and it's open source so if I really want these problems solved I should just go make a PR.

##### [Secure Shellfish ($9.99)](https://apps.apple.com/us/app/secure-shellfish-sftp-client/id1336634154)

*Secure Shellfish.app* was pretty close to *actually working*. It was able to accept an Ed25519 key, which is a huge plus, and it integrates with Files.app nicely. It also managed to successfully log in to my server, kinda. 

![Weird Error](images/posts/2019/secureshellfish.jpg#left) After I began browsing directories, I would get weird notifications about not being able to update a directory, and then refusing to remove entries without verification. The fact that it insisted on having permission to notify me about this was even more off-putting: I don't like to be notified of anything but an occasional email of importance (hopefully a lunch invite definitely not a receipt), and my text messages. It also loaded incorrect numbers of files within folders, and just felt a little off overall when browsing the file system. 

Weird errors leave me afraid the app is going to mangle the file system, no matter how much I love shellfish (and I do). But at least this app managed *to* access the file system. 

##### [Termius ($9.99/month)](https://apps.apple.com/us/app/termius-ssh-client/id549039908)

Reading the App reviews, it will be interesting to see whether Termius.app manages to survive or weeds itself out with it's *hefty* monthly. I can't judge the app for effectiveness because I refused to make an account to sign up for the pro features which include the SFTP client. I would have considered giving them $9.99 for a month as an apple subscription, but I am *absolutely* not making an account with them, even for testing purposes. Next.

##### [FTP Manager Pro ($2.99 (I think))](https://apps.apple.com/us/app/ftpmanager-pro/id522627917)

*FTP Manager Pro* effectively accessed my SFTP share. It did it with an Ed22519 key. It didn't produce errors. It is a one-time, reasonably priced purchase. If you just need to browse and SFTP share in an app, *FTP Manager Pro* has you covered. 

Unfortunately, having access to the share in Files.app is a *major* factor for me. Probably *the* major factor. So much so that I won't even keep the downloaded app on my device. 

##### [Documents by Readdle ($0?)](https://apps.apple.com/us/app/documents-by-readdle/id364901807)

*Documents* failed to access the share with the given keys. It *does* play really nicely with Files.app, so I went through the support channel to see if they can do anything. I'll update the post if/when they get back to me.

Cost is *presumably* reasonable. It's been so long since I purchased it, I don't know what it retails for now.

##### [FE File Explorer Pro ($2.99?)](https://apps.apple.com/us/app/fe-file-explorer-pro/id499470113)

The name is a little unoriginal, but *FE File Explorer Pro* delivers on all other accounts. The app doesn't look great in and of itself, but it does an awesome job connecting to Files.app, is fast and responsive, and accepts Ed22519 keys. 

It's very reasonably priced, especially compared to more expensive poorly performing apps. 

### Parting Words

Even though I don't love *FE File Explorer Pro*, I'm marrying it. *For now*. But I'm keeping my eye open. Being able to transfer a large media files in the field and do temporary back ups for people is incredibly useful, and *FE File Explorer Pro* will let me access the wads of storage I have sitting around the house from literally anywhere. I *could* even be compelled to relocate so of my iCloud material there and downsize my plan, which I should probably do to offset the costs of all the not so functional solutions I just explored. 

I do feel like App Developers have had a lot of changes thrown at them in the past few months with iOS 13 especially in Files.app which is so young. The first time I plugged in an external hard disk to try a transfer this summer felt largely the same way: new, clunky, adolescent, and awkward. Files.app hasn't found it's stride in terms of a progress bar for copies, or a completely smooth UI when dragging elements. The copies work for now, but there's not enough of a feedback loop yet to make me trust that they're happening. 

I think App Developers are struggling with this in a lot of the same way that Apple is itself. Finding unified access to an ever increasing array of sources is a huge transformation with a lot of excitement ahead... Wedding photos to follow. 😝


Featured image by: [Iker Urteaga](https://unsplash.com/@iurte?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge)


