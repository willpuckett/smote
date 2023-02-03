---
title:  "Remote Access with SSH Tunnels"
tags: [ apps, ios, mobile ]
cover_html: <img src='images/posts/2019/tunnel.webp'/>
publish_date: 2019-11-05
snippet: "There's a great trend going on in a couple of iOS apps presently. Apps are providing SSH access to a remote machine via their iOS UI. I'm always obsessing over remote access, and this has allowed me to ditch my VPN altogether."
---

There's a great trend going on in a couple of iOS apps presently. Apps are
providing _SSH access_ to a remote machine via their iOS UI. I'm always
obsessing over remote access, and this has allowed me to ditch my VPN
altogether. _Good riddance._

> SSH tunnels win on **both** accounts.

It wasn't that I hated the VPN, but the SSH access is so tight. There's a single
port open on your router, which reduces attach surface. Keys are easy to manage,
and it's just super fast. I would get _so annoyed_ with having to go into
**Settings.app** _every time_ I wanted to initiate or terminate the VPN, and it
always took a second to initiate the connection. Not that big of a deal sitting
at a desk all day, but I tend to move around and change connections frequently.
The app based SSH tunnels are so snappy and responsive without me having to get
lost initiating them. I love faster _and_ better, and SSH tunnels win on
**both** accounts.

Let's step through setting it up, and walk through some example apps.

### Turn on _sshd_

![Cranking Up sshd](/images/posts/2019/sharing.webp) You've probably already
done this, but...

_**sshd**_ is the _daemon_ (the background running process) that handles
incoming SSH requests. It's really easy to initiate in MacOS. Open **Apple Menu

> Settings > Sharing**. On the left you'll see a list of possible shares. Click
> the check box next to **Remote Login** and, congratulations, sshd is running.
> (While you're here it's not a bad idea to restrict access to a small handful
> of users, depending on your needs. The fewer the better.)

### Configure Your Router

Not bothering to include screenshots here as they're all so different, but go
into the **port forwarding** section on your router and forward the ssh port
(usually 22, you can use something different if you're worried about security,
but we'll talk about defending against brute force attacks in a little while and
I'm not a _security through obscurity_ guy. I'm also just afraid I would forget
what port I used if I went with a non-standard one.)

While you're in there, go ahead and delete those pesky VPN port forwards, and
clean up anything else you left there from your BitTorrent days.... If you can,
get down to a single port and try and use SSH Tunnels for all the other services
(again, depending on what you're doing).

### Setup Some Keys

I love, honor, and cherish [blink.sh](/its-terminal). Open it (or your other
terminal app) and configure your keys.

In _blink_, type **config** to open the _Settings_ menu, then tap **Keys**. Use
the **+** to create a new key or import one from the clipboard, or select an
already installed one. I like to use different keys for each app on each device,
but that's just me.

Next, select an installed key, then, under _Key Info_, note the _Name_ of the
key.

Close the _Keys_ and _Settings_ panes, and then type **ssh-copy-id <_Key Name_>
<_remote user_>@<_remote host_>**. In practice, this might look like:
**ssh-copy-id bestkeyever wanda@ssh.foreveraccessible.com**, or, if you're doing
it inside your local network before you leave the house, **ssh-copy-id
fabulouskey catherine@headless.local**. Again, the last two examples are
anecdotal (as examples so often are). You'll type your machine login password
for this, so it's not a bad idea to do it from within your LAN when you install.

I prefer to use separate keys for each app on each device; that way if I have to
revoke one, I don't have to reconfigure every single service out there. I like
to name them with easy to understand names, preferring **ipadnameappname** to
**bestkeyever**, but it really is a matter of preference.

### Configure Your Hosts

Reopen _blink_'s config menu (type **config** at the prompt) and click on
**Hosts**. Tap the **+** to add a new host, and fill in the relevant info. You
want to use the WAN facing side of your router. You can either use its IP
address, or forward a domain or subdomain of yours too it, which can be a little
easier to keep track of.

Even if you're not paying for a static IP with a large broadband provider, the
address assignments are (knock on wood) surprisingly infrequently changed.
DynDNS is charging now and it's been such a non-issue I haven't bothered going
any deeper.

I like to use a short, easy to type entry in the top **Host** field. Then
provide the domain/subdomain/IP address in the **HostName** field under SSH.
Fill in your **User** name, and then tap **Key** and select the key you
transferred with **ssh-copy-id**.

### Tighten _sshd_

There's a ton of things you can do to the _sshd.conf_ file to close it down.
Login to your remote host and **sudo vi /etc/ssh/sshd_config** I usually start
with:

```bash
ChallengeResponseAuthentication no
PasswordAuthentication no
PermitRootLogin no
LoginGraceTime 1m
MaxAuthTries 1
```

Your mileage may vary and you may have other decisions to make in your
sshd_config file.

Make sure you've done your key transfers for all the accounts you want in your
local network if you're logging in with passwords to get it all setup, then:

```bash
sudo launchctl stop com.openssh.sshd
sudo launchctl start com.openssh.sshd
```

To restart the service.

### Finally, a Tunnel!

So far we've just made some remote logins to get crackin' with the ole' ssh, but
it's time to do a tunnel.

My two favorite apps that have integrated this are
[_Screens.app_](https://apps.apple.com/us/app/screens/id655890150) and
[_Juno Connect_](https://apps.apple.com/us/app/juno-connect-for-jupyter/id1315744137).
_Screens.app_ gives you a remote GUI login to your Mac, or pretty much any other
type of machine. It's _super_ versatile. Make sure you've configured **System
Preferences > Sharing > Remote Management** appropriately on your Mac.

_Screens_ is picky about key type and they suggest you use the following command
to make one:

```bash
ssh-keygen -N "" -m PEM -f MyKey && open .
```

Then in _Screens.app_ on your iOS device (it works on the phone as well as
iPad), click the gear icon. It has a key section that will allow you to bring in
the key you set up in _blink.sh_, or add a new one. Configure as you like, again
using **ssh-copy-id** to get any additional keys onto the Mac. Then add a new
machine with the **+** button, and toggle on _Secure Connection_. Then, under
**Advanced**, enter the SSH server info, and use the strange icon next to
**passowrd** to select your installed SSH key.

Go back a menu, click **Done**, and then tap your new icon to get logged in
remotely! Bing, Bang, Bao! You did it!

### So Now It's Off to the Park....

Not so fast, buddy. You're probably feeling pretty good right now, but there's
still some security to tighten up here. The world is full of nefarious people
who want into your ssh port.

Switch back over to _blink.sh_ and fire up a session.

> I realized I was being pummeled with login attempts.

If you want to see what's going on in your sshd logs, type:

```bash
/usr/bin/log stream --style syslog --predicate '(processImagePath contains "sshd")'
```

Take some time to stroll through the output. When I'm looking for unauthorized
entry attacks, and especially repeat unauthorized entry attacks from the same
host (brute-force attacks), I like to use:

```bash
/usr/bin/log stream --style syslog --predicate '(processImagePath contains "sshd")' | grep ssh2
```

To narrow the output a little. You can let this run a while and see what's going
on. It doesn't take long to start getting sprayed by brute force attacks for
most of us, especially once we've opened a _privileged port_ in our fire wall.

When I started looking through my logs yesterday, I realized I was being
pummeled with login attempts.

If you've hardened your SSH config to allow login only via private key, this
doesn't matter, but if you are still allowing password logins (really?) then you
might want to check out _sshguard_. _sshguard_ lets you defend against
_brute-force attacks_ by analyzing your logs, and blocking repeat offenders.
Configured with a very aggressive black list, it can zap the repeated, failed
login attempts.

Install in your MacOS terminal with **brew install sshguard**. Then follow the
two caveats (if you lost them in a scroll, you can get them again with **brew
info sshguard**), and add the service to your brew services with **sudo brew
services start sshguard**.

I also had to run **pfctl -x loud** and **pfctl -E** to get everything cranked
up. I'll look further into whether these need to be run at machine startup to be
persistent across reboots.

> "Warning: Using an IP blacklist will stop trivial attacks but it relies on an
> additional daemon and successful logging (the partition containing /var can
> become full, especially if an attacker is pounding on the server).
> Additionally, with the knowledge of your IP address, the attacker can send
> packets with a spoofed source header and get you locked out of the server. SSH
> keys provide an elegant solution to brute forcing without these problems."
> --[ArchLinux Wiki](https://wiki.archlinux.org/index.php/Sshguard)

You may want to do some adjustments to **/usr/local/etc/sshguard.conf** as well.
(The _configuration_ section
[here](https://wiki.archlinux.org/index.php/Sshguard) is helpful. Mileage may
vary.) The blacklist doesn't come on by default, so add that (make sure you
store it in a place it can access, like **/usr/local/var/log/blacklist.db** or
anywhere else you fancy). You might also tighten down the number of offenses
required to start triggering escalation across the board. _No one_ should be
trying to log in to my ssh server but me, and I have keys that work correctly
the first time, so I felt confident in being really aggressive about lockouts.
You may feel, differently, so configure appropriately.

Now, open your log view up again (or, hey! Use **Console.app** to filter the
system.log file in a Tunneled **Screens.app** session) and watch all the
nefariously motivated people get the door slammed in their face.

### Now Can I Go to the Park?

Well, your confs should be right as rain now, and you've no doubt found ssh
tunnel options in several of your favorite apps... Why not go ahead a get out to
the park. Just make sure you take your phone, and try a login while you're out
there....

Featured image by:
[Wil Stewart](https://unsplash.com/@wilstewart3?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge)
