---
title:  "Autumn Leaves"
tags: [ keebs, engram ]
cover_html: <img src='images/autumn-leaves.webp'/>
publish_date: 2023-10-30
---

It's not unimaginable to hypothesize that for many people, the number of hours
spent typing is the largest percentage of time spent moving a part of their
body. When put this way, it's surprising that we don't have typing networks
where we watch people type as spectators like soccer or rugby. Maybe this is the
true joy of gaming tournaments. As a middle-aged person, I will spend, on the
low end, another 41,600 hours of my life typing should I live an average
lifespan.

Earlier this year, I wrote a little bit about a keyboard layout I had decided to
try called Engram. Engram is still pretty new to the world—it only turned three
in September. It doesn't have the popularity of Colemak or Workman or Miryoku,
but I was attracted by Engram's methodological design process, and it's
bio-anatomical emphasis. I'm just over six months into living with it now, and I
wanted to write a follow up post about my thoughts and discoveries along the
way.

> Engram brings a stillness

Engram has a stillness about it. It took a while for me to get used to not
having my hands flap around so much. Even a couple of months in, I would
sometimes catch myself sort of giggling my hands expecting that I would soon
need to move them when I really didn't. Slowly, that nervous, uncertain
relationship with my keyboard is dissipating as the reality sets further and
further, and deeper and deeper, in that everything is right under my fingers on
the home row where I need it: my most used keys, my modifiers, and my navigation
cluster.

## Absorbing Change

The pandemic forced many people more onto their computers: I was definitely one
of them. I found myself typing much more than I had previously. My arms and
hands were achy and uncomfortable, especially my left hand, arm, and shoulder.
It felt like it was being twisted.

As I began to think about addressing the discomfort, I initially started looking
at ergo keyboards. I ended up making a revxlp for myself and it felt great. But
somewhere along the way I found Engram and wondered if I could get bonus points
by saving my hands some movement at a level of the relationship between the
keys. And, even though I was enjoying my revxlp, I still had a lot of time
typing on my laptop, whether traveling or just on the sofa.

> _I stopped being afraid of change._

I wanted to spend a while getting to know the new layout, and I spent a lot of
my relaxing time just typing while I watched tv. I really enjoyed using
[MonkeyType](https://monkeytype.com) to help get more familiar with everything.
As I went deeper, I found [levelType](https://github.com/christoofar/leveltype)
useful for drilling and strengthening my connection with rolls and word patterns
I hadn't found at my normal prose typing speed. This of course improved my prose
typing speed. I started to find a lilting quality in the layout, where I kind of
rolled back and forth from one side of the keyboard to the other, like a boat on
the ocean. The vowel concentration in particular I think contributes to this
lilting quality, especially for words with dipthongs.

After a few months trying to type at least a couple of times a day, I was
beginning to internalize the layout more, starting to think in it, like dreaming
in another language. The film 'Arrival' came to mind, as my assumptions and
connection with the 'language' of my layout began to carve away at the detritus
of QWERTY. Where before I might have 'chipped' away at the detritus, I was
coming to the keyboard with more of an expectation of fluidity, which is a very
strong quality of the layout.

## Turning Inward

Not that it was all roses, or, to employ cliche, that this rose was without
thorns. I traveled throughout April, May, June, July, and August, and still
found very much an achy sensation in my left hand. Having fallen in love with
home row mods in ZMK on my revxlp, I searched desperately for a way to fully
implement them on my laptop. I wanted to achieve as much parity as possible as I
went back and forth. I had managed to partially implement them by the end of
June, and I felt close. Even though I still needed the modifier keys
occasionally (mainly for multiple modifier key combos), I had a few that were
starting to open up and be pretty much available for other keys. I liked using
karabiner.ts. It helped me stew down a lot of repetition when I used the spread
operator with the `withMapper` function:

```ts
import {
  FromKeyParam,
  LayerKeyParam,
  map,
  ModifierParam,
  rule,
  simlayer,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabinerts'
import { engram, engram_left, engram_right } from './engram.ts'

const qhr: FromKeyParam[] = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
const mods = ['‹⌃', '‹⌥', '‹⌘', '‹⇧', '›⇧', '›⌘', '›⌥', '›⌃']

writeToProfile('karabiner.ts', [
  ...(qhr.map((key, i) =>
    simlayer(key as LayerKeyParam, mods[i])
      .manipulators([
        withMapper(i < 4 ? engram_right : engram_left)((k) =>
          map(k.from).to(k.to, mods[i] as ModifierParam)
        ),
      ])
  )),

  // Engram base layer
  rule('engram').manipulators([
    withModifier('optionalAny')([
      withMapper(engram)((k) => map(k.from).to(k.to)),
    ]),
  ]),
], {
  'simlayer.threshold_milliseconds': 500,
  'basic.to_if_alone_timeout_milliseconds': 199,
  'basic.to_delayed_action_delay_milliseconds': 200,
  'basic.to_if_held_down_threshold_milliseconds': 200,
})
```

I moved return and backspace to the command keys, so I didn't have to reach out
to them. It created more of a turning in feeling as I typed, creating more
inward rolling in my rhythm, queueing me to return to my midline. I noticed my
right hand and shoulder feeling much better after making the transition, but my
left side still gave me hints of battery acid.

At some point in all of this, I looked down at my hands and I just kind of saw
it: my left wrist was being sheared in toward the center as my pinkie reached in
to get to the g key. With my mediocre home row mods, I wasn't really using the
shift keys, so I just gave it a go and moved my left bottom row—g, x, j, k—over
a key. I thought I'd give myself a week or two to see if it would become
natural, but I didn't need that much time at all. Within the hour I had fully
accepted the placement as the new normal. My speed improved instantaneously as
well. I wasn't having to shear to type night and thought. When I watched myself
typing, I could see how having gxjk too far toward the center was throwing off
my byou as well. My hand was in a twisted position when it came to the bottom
left row and my options for getting to the top row were either to twist more in
the ulnar direction (the source of my discomfort), or to fumble while
repositioning my left hand. As I continued to contemplate this and over process
it even more, I realized I was twisting much further than just my shoulder: I
had learned to base this movement from my lumbar spine, turning sideways to
accomodate the reversed curvature of the key layout.

A week or two later, still thinking about the matter, I spent some time
surveying touch typing charts. It seemed like a solid 90% of them (I'm
estimating via a Google image search for 'keyboard finger placment chart') did
assign the key to the right of left shift to the pinkie. Only a small handful
assigned it to the ring finger. I tried to remember how I had previously typed
it when I was on QWERTY, but I really couldn't remember. Apparently, I'm in the
minority and it's just an unusual hand anatomy that makes it so uncomfortable
for me.

## Engrammer

[![Engrammer Layout](https://raw.githubusercontent.com/sunaku/engrammer/main/layout.png)](https://github.com/sunaku/engrammer)

And another thorn: I love symmetry. I was very attracted to Engram's pairing of
the parenthesis on the center column. I thought they would be convenient there
and I loved the visual closure. Unfortunately, it didn't work out well for me.
Writing JavaScript requires a lot of parenthesis, often with nothing in them
(they indicate that an arrow function has no arguments). Typing them on the
center column in rapid succession with home row mods meant that I had to
displace both hands from the home row.

I also struggled with a few command shortcuts, in particular zoom in/out. Typing
eqauls was also uncomfortable for me, again, something I use quite a bit with
arrow functions. I started making a few swaps on my own, but I happened on
@sunaku's [Engrammer](https://github.com/sunaku/engrammer) variant. Getting
brackets side by side let me roll them as well, which felt much better.
Engrammer answered most of the punctuation issues I was experiencing and also
dramatically simplified creating keymaps, which allowed me to experiment more
with getting home row mods right on my laptop. While simplifying implementation
alone isn't a worthwile reason to choose a layout, it was a great benefit of
something that worked better for my hands and corpus (both of text and being).

## Home Row Mods Done Right

A couple of weeks ago, I was still feeling limited with my home row mods. I had
stewed down a bunch of simlayers in karabiner.ts at the end of June, but the
mods didn't work in tandem, only one at a time. I had thought I would be able to
find a way to write some more layers in, but it never quite worked out. So, I
did some searching around and somehow came across
[KMonad](https://github.com/kmonad/kmonad). Querying my browser history, I had
looked at it before—as recently as June—but it had been unmaintained and wasn't
working with more modern versions of MacOS. Or I had passed it over for some
other reason, I really can't remember. However it happened, I was reviewing the
classic
[A guide to home row mods](https://precondition.github.io/home-row-mods#using-home-row-mods-with-kmonad)
and the KMonad section seemed so straight forward and I decided to give it
another go via
[@amirorin's gist](https://gist.github.com/amiorin/4c74f63fe599a1dcbd0933628df1aac9).

It worked.

```lisp
(defcfg
  input (iokit-name "Apple Internal Keyboard / Trackpad")
  output (kext)
  fallthrough true
  allow-cmd false
  )

(defsrc
  grv  1    2    3    4    5    6    7    8    9    0    -    =    bspc
  tab  q    w    e    r    t    y    u    i    o    p    [    ]    \
  caps a    s    d    f    g    h    j    k    l    ;    '    ret
  lsft z    x    c    v    b    n    m    ,    .    /    rsft up
  fn   lctl lalt lmet           spc            rmet ralt left down rght
)

(defalias
    cc (tap-hold-next-release 200 c lctl)
    ai (tap-hold-next-release 200 i lalt)
    me (tap-hold-next-release 200 e lmet)
    sa (tap-hold-next-release 200 a lsft)
    sh (tap-hold-next-release 200 h rsft)
    mt (tap-hold-next-release 200 t rmet)
    as (tap-hold-next-release 200 s lalt)
    cn (tap-hold-next-release 200 n rctl)
    nav (tap-hold 180 caps (layer-toggle navigation))
    kp (tap-hold 180 g (layer-toggle keypad))
    nnc (multi-tap 300 (layer-toggle keypad) 300 caps (layer-toggle navigation))
    af #(spc \( \) spc = > spc )
    ht #(h t t p s : / /)
    moi #(Y o u r spc N a m e )
)

(deflayer engram_homerow_mods
  grv  1    2    3    4    5    6    7    8    9    0    [    ]   bspc
  tab  b    y    o    u    '    ;    l    d    w    v    z    =     \
  @nav  @cc  @ai  @me   @sa   ,    .   @sh  @mt  @as   @cn   q    ret
  @kp    x    j    k    -   @af  /    r    m    f     p    @ht   up
  fn  M-spc esc bspc           spc           ret   @moi left down rght
)

(deflayer navigation
  _    _    _    _    _    _    _    _    _    _    _    _    _    _
  _    _    _    _    _    _    _    home pgdn  pgup end    _    _    _
  _    _    _    _    _    _    _    left  down  up  rght    _    _
  _    _    _    _    _    _    M-S-z M-z  M-x   M-c    M-v    _    _
  _  _    _    _              _              _    _    _    _    _
)

(deflayer keypad
  _    _    _    _    _    _    _    _   kp/  kp*   kp-    _    _    _
  _    _    _    _    _    _    _   kp7  kp8  kp9   kp+    _    _    _
  _    _    _    _    _    _    _   kp4  kp5  kp6   kprt    _    _
  _    _    _    _    _    _    _   kp1  kp2  kp3   kprt    _    _
  _    _    _    _              _            kp0    kp.    _    _    _
)
```

I didn't know how bad things had been. Suddenly, there was no delay. Everything
felt natural again. I wasn't waiting, even a tiny seemingly imperceptible amount
of time, to see if each key press had registered. My accidental home row key
presses no longer registered presses I then had to delete. I started typing and
felt a wave of relaxation wash over my entire body. KMonad was also _much_
easier to configure than karabiner or any of its generators.

### 𐡸 𐡷

It's a little akward to explain, but getting things kind of fully assembled felt like a rope that I had been pulling on suddenly felt slack, *unloaded*. I felt like I didn't have to keep drilling anymore and could move on to actually typing.

Overall, I've had a lot of wins from Engram. My body feels better and my
thoughts feel more organized. Learning a new layout involves taking consious
control of a largely subconscious process, sort of like focusing on breathing.

While I don't have a specific number, my understanding is that a sizeable
portion of our brains are strongly connected to hand and finger movement. As I
thought about this more, I couldn't help but think about mudras, as they're
passed down generation to generation, like heirlooms. That perhaps the secret of
longevity they hold isn't anything metaphysical at all, but the simple
neurological practice of flossing and maintaining such a large part of our
cognitive well being. Of course, it's fun to speculate that perhaps we really
may not need to type as much as AI becomes more ingrained in our day to day
lives. But in a world designed by and for humans, I can't help but wonder if the
nuanced movement of our hands isn't something we do as a source of fulfillment
in and of itself.

Engram is really good at the _relationship_ of the letters to each other, and I
hope it can proliferate to more languages. Although I had to do some
customization with non-letter keys, I can understand how they weren't quite as
well honed: there's not a lot of data about how many times a typist has to hit
backspace or modifier keys (with the exception of shift) in a standard body of
prose. Ironing through these difficulties was well worth the while. I look
forward to absorbing the more functional home row mods of KMonad, and the next
six months of typing.
