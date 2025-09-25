---
title: "No User Serviceable Keys Inside: How to Void Your Warranty One Cap at a Time"
tags: [ keebs ]
publish_date: 2025-9-25
cover_html: <img src='images/Z1CY000KSLLA.webp'/>
---

I've been using [Kanata](https://github.com/jtroo/kanata) for a few months now... I switched to it from [KMonad](https://github.com/kmonad/kmonad) when I changed computers earlier this year. I expected the two packages to be fairly similar, which has been largely the case, until this morning, when I finally read some documentation and worked through a more complete implementation of my keymap. That, and of course Kanata is way cooler since it's written in Rust. 🦀

## Installing

Installing Kanata proved to be much easier—it's packaged in [homebrew](https://brew.sh) and can be installed with a simple `brew install kanata`. I had been forced to build kmonad and don't work in Haskell, so prebuilt binaries was a welcome change. 

After installation, I created the following `lanuchctl` job:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>KeepAlive</key>
	<false/>
	<key>Label</key>
	<string>org.custom.kanata</string>
	<key>ProgramArguments</key>
	<array>
		<string>/opt/homebrew/bin/kanata</string>
		<string>--cfg</string>
		<string>/Users/me/Library/Application Support/kanata/kanata.kbd</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
</dict>
</plist>
```

Because I'm lazy and have a bad memory for `launchctl` commands, I added an alias to my `.zshrc` to make cycling the task easier (I don't have to jump back and forth between my editor and [LaunchControl](https://www.soma-zone.com/LaunchControl/)):

```sh
alias kanata-restart='sudo launchctl kickstart -k system/org.custom.kanata'
```

I probably had to do a security-authorizy thing somewhere along the way... A procedure which will need to be repeated if `homebrew` upgrades your `kanata` installation...

## Initial Configuration

I started out with Kanata's [home-row-mod-advanced.kbd](https://github.com/jtroo/kanata/blob/9c5ccb762fb37106305ca2f3702daa0f3267fcb1/cfg_samples/home-row-mod-advanced.kbd#L22) example. It did a great job of getting me going with home row mods that felt pretty good. 

Unfortunately, I didn't understand that the `tap-hold-release-keys` key list needed to be a list of unmodified keys. Correcting that helped a bunch. I also needed a few/50 extra milliseconds on my timings.

I didn't want Kanata to modify input from my mech board, so I filtered the devices to only modify the internal keyboard:

```lisp
  macos-dev-names-include (
    "Apple Internal Keyboard / Trackpad"
  )
  ```

  I anticipate reworking my internal board before I got my laptop, so I opted for the ISO keyboard model to have a better feeling left pinky key. I wasn't able to find an ISO defsrc example keyboard with the key named, however, after some searching, I was able to find [a thread](https://github.com/jtroo/kanata/discussions/1066) which refers to the 102nd key as `lsgt`, or just `102d`.

## Combos

I was delighted to discover Kanata's support for combos. I implemented them quickly upon discovery—so much so that I overlooked that they were implemented in two versions and just went with the first one in the documentation. 

`chordsv1` involve making a lot of extra aliases and then configuring them in groups. I used them for several months and they weren't awful, but there was no `require-prior-idle` concept for them, so they only worked well on non-bigram combos.

> The more you know...

This morning, I decided to look further into the issue and discovered `chordsv2` which implements an rpi for all combos. This opened up the combo positions considerably, and has allowed me to achieve parity with my mech board. 

## A Working Caster Config

Here's today's version of the [Caster Layout](https://cyanophage.github.io/magic?layout=bfdlq-pouyjcstrzxnaihkvgmw%5C%2F.%2C%27%3B%3De&mode=ergo&lan=english) (Befuddle Variant) implemented in Kanata.

```lisp
;; Home row mods QWERTY example with more complexity.
;; Some of the changes from the basic example:
;; - when a home row mod activates tap, the home row mods are disabled
;;   while continuing to type rapidly
;; - tap-hold-release helps make the hold action more responsive
;; - pressing another key on the same half of the keyboard
;;   as the home row mod will activate an early tap action

(defcfg
  process-unmapped-keys yes
  macos-dev-names-include (
    "Apple Internal Keyboard / Trackpad"
  )
    concurrent-tap-hold yes
    chords-v2-min-idle 20
)
(defsrc
  1 2 3 4 5 6 7 8 9 0 - = 
  q w e r t y u i o p [ ]
  caps a s d f g h j k l ; ' \
  lsft ` z x c v b n m , . / rsft
    lmet spc rmet ralt
)
(defvar
  ;; Note: consider using different time values for your different fingers.
  ;; For example, your pinkies might be slower to release keys and index
  ;; fingers faster.
  tap-time 250
  hold-time 200
  short-chord 25
  long-chord 50

  left-hand-keys (
    1 2 3 4 5 6
    q w e r t y
    a s d f g
    lsgt z x c v b
    lmet spc 
  )
  right-hand-keys (
    7 8 9 0 - =
    u i o p [ ]
    h j k l ; ' \
    n m , . / rsft
    rmet ralt 
  )
)

;; (deflayer contains-no-ops
  ;; XX ✗ ∅ •)

(deflayer base
  • 1 2 3 4 5 • 6 7 8 9 0 
  • b f d l • • p o u y •
  @cw @c @s @t @r • • •  @n @a @i @h •
  @ss v g m w • • • • . , ' @ss
    @bfun @snn e ret
)

(deflayer nomods
  • 1 2 3 4 5 • 6 7 8 9 0 
  • b f d l • • p o u y •
  @cw c s t r • • •  n  a  i  h •
  @ss v g m w • • • • . , ' @ss
    bspc spc e ret
)

(deflayer nn
  • • • • • • • • • • • •
  • kprt kp7 kp8 kp9 • • vold mute volu • •
  • kp0 kp4 kp5 kp6 • • • left down up right •
  • kp. kp1 kp2 kp3 • • • • home pgdn pgup end
    bspc • • •
)

(deflayer fun
  • • • • • • • • • • • •
  • f12 f7 f8 f9 • • • • • • •
  • f11 f4 f5 f6 • • • • • • • •
  • f10 f1 f2 f3 • • • • • • • •
    • • • •
)

(deffakekeys
  to-base (layer-switch base)
)
(defalias
  tap (multi
    (layer-switch nomods)
    (on-idle-fakekey to-base tap 20)
  )

  ss (one-shot 2000 lsft)
  cw (caps-word-toggle 5000)

  snn (tap-hold $tap-time $hold-time spc (layer-while-held nn)) ;; tap: space hold: numbers layer
  bfun (tap-hold $tap-time $hold-time bspc (layer-while-held fun)) ;; tap: bspc hold: function layer

  c (tap-hold-release-keys $tap-time $hold-time (multi c @tap) lctl $left-hand-keys)
  s (tap-hold-release-keys $tap-time $hold-time (multi s @tap) lalt $left-hand-keys)
  t (tap-hold-release-keys $tap-time $hold-time (multi t @tap) lmet $left-hand-keys)
  r (tap-hold-release-keys $tap-time $hold-time (multi r @tap) lsft $left-hand-keys)
  n (tap-hold-release-keys $tap-time $hold-time (multi n @tap) rsft $right-hand-keys)
  a (tap-hold-release-keys $tap-time $hold-time (multi a @tap) rmet $right-hand-keys)
  i (tap-hold-release-keys $tap-time $hold-time (multi i @tap) ralt $right-hand-keys)
  h (tap-hold-release-keys $tap-time $hold-time (multi h @tap) rctl $right-hand-keys)
)

(defchordsv2
  ;; v2 chords are defined wit defsrc key positions
  ;; 1 2 3 4 5 6 7 8 9 0 - = 
  ;; q w e r t y u i o p [ ]
  ;; caps a s d f g h j k l ; ' \
  ;; lsft ` z x c v b n m , . / rsft
  ;;   lmet spc rmet ralt
    (f k     ) caps $short-chord all-released (nn fun)

    (w e     ) lsgt $short-chord all-released (nn fun)
    (  e r   ) x $short-chord all-released (nn fun)
    (    r t ) = $short-chord all-released (nn fun)
    (  e r t ) esc $short-chord all-released (nn fun)

    (a s     ) tab $short-chord all-released (nn fun)

    (; '     ) ; $short-chord all-released (nn fun)

    (` z     ) q $short-chord all-released (nn fun)
    (  z x   ) j $short-chord all-released (nn fun)
    (    x c ) - $short-chord all-released (nn fun)
    (`      c) z $short-chord all-released (nn fun)

    (i o     ) \ $short-chord all-released (nn fun)
    (    p [ ) k $short-chord all-released (nn fun)
    (  o p   ) [ $short-chord all-released (nn fun)
    (i     [ ) ] $short-chord all-released (nn fun)
    (i   p   ) S-0 $short-chord all-released (nn fun)
    ( o    [ ) S-9 $short-chord all-released (nn fun)
    ;; (i o p [ ) (macro = S-.) $short-chord all-released (nn fun)

    (, .     ) / $short-chord all-released (nn fun)
    (  . /   ) S-[ $short-chord all-released (nn fun)
    (,   rsft) S-] $short-chord all-released (nn fun)
    (, /     ) S-. $short-chord all-released (nn fun)
    ( .  rsft) S-, $short-chord all-released (nn fun)
    (. , / rsft) (macro = S-.) $short-chord all-released (nn fun)


    (a `) M-z $long-chord all-released (nn fun)
    (z s) M-x $long-chord all-released (nn fun)
    (x d) M-c $long-chord all-released (nn fun)
    (c f) M-v $long-chord all-released (nn fun)
)
```

## Outro

I ran into a couple of snags along the way. I tried to implement several 4 key combos (`chordsv2` in Kanata parlance). The larger combos work surprisingly well in some positions—and not at all in others. I don't think this is Kanata's fault; I would assume it's a keymatrix thing? Although I'm not even sure how this board is implemented. 

The vertical combos are not pressable for me with a single finger, but I still appreciate having them match my mech.

Until our robot overlords type for us!