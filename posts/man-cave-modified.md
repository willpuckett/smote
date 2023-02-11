---
title: "Man Cave: Modified"
tags: [ iot, accessories, office]
cover_html: <img src='images/posts/2020/mancave.webp'/>
publish_date: 2017-12-23

---

Getting warm in San Francisco is almost always a challenge, and even a high rent
doesn't guarantee your apartment will include adequate heat. Buildings are old,
uninsulated, and drafty—the triple threat for those who like to be able to
comfortably walk about their apartment in our overly-valued draconian
conditions—if they even _have_ heat.

> There is no cold.

I have a small man cave. It is a small shed that got dragged across my backyard
and attached to my apartment sometime around 1920. It doesn’t have heat _at
all_. Through the years I’ve tried heating it with various space heaters, but
it’s so drafty the most that’s provided is waves of warm air interspersed with
Arctic blasts. I also can’t sleep with a fan clicking on and off through the
night—it’s _awful_. Ultimately, I’ve found that the only way to effectively heat
the room is with radiant heaters. They make all the surfaces of the room feel
warm so my body heat is no longer the primary heat source.

> There is only heat and an absence of heat.

## The Matts

About 12 years ago I stumbled onto
[FlexWatt](https://www.amazon.com/Flex-Watt-Incubator-Reptile-Heating/dp/B004XNMI6E/)
heat tape. It’s sold for heating reptiles, but my cat likes it, too. You order
the stuff by the foot, cut it to the appropriate length, then wire it up. I use
aluminum snap rivets to insert wire posts, and then seal them with silicone
(that way if my cat knocks over a glass of water, the floor won’t be
electrified). At 20 watts/lineal foot, it can take quite a bit to maintain
comfort on the coldest of nights. I have several sections under my rugs.

A couple of years ago, I realized I could apply the FlexWatt matts behind a
painting I have. The additional coverage really helped warm up that side of the
man cave so I could sit at my desk longer, and provided an attractive way to
transform everyday possessions into functional heating units.

## A Word to the Wise

The heat tape says something about not being stuffed under stuff. I have
completely disregarded that for 12 years using it primarily under rugs with no
ill affect. It runs pretty cool and hey! It’s designed to get warm after all.
Covering FlexWatt with material has been fine, but I wouldn’t recommend
double-layering the stuff. Of course this article is provided for expositional
purposes only documenting my experience and in no way should influence your
choice or activity.

## Modern Thermostat

Many older homes utilize millivolt heating systems. Especially in the Bay Area,
these are often wall heaters, although sometimes they may be in the floor
heaters as well. Getting these plugged into a modern learning thermostat isn’t
too challenging, but does involve jumping through a couple of extra hoops. There
is a great tutorial on getting these systems plugged into a
[Nest Learning Thermostat](https://store.google.com/us/magazine/compare_thermostats)
over
[here](https://medium.com/@chrisvale/controlling-an-ancient-millivolt-heater-with-a-nest-b9493bbc59da)
using an
[off-the-shelf Honeywell relay box](https://www.amazon.com/Honeywell-R8845U1003-Relay-Switch/dp/B000LDBP9Q).

Life is hard when you can’t control your heater with Siri. Your man cave will be
the laughing stock of the town and your friends will never come visit you if you
have to get up to change the temperature. Getting Siri for my heat mats was
imperative to their success.

It turns out the Nest thermostat does not like to operate without controlling
something. It will give you an alert that it is not experiencing the associated
voltage drop with the heating system when it tries to switch it on if you power
it off a 24VAC brick with no system plugged in, and eventually errors out and
gives up. When I first designed my heating matts, I designed them to operate off
two
[iDevices wall plugs](https://www.amazon.com/iHome-ISP6X-Wi-FI-Smart-Plug/dp/B01HCVG9NG/).
That way each zone could operate independently. This let me setup the painting
heater as an auxiliary source for those colder evenings. I started that way but
eventually just programmed everything to operate together. This meant that the
room stayed more evenly warm and also reduced the duty cycle on the under-rug
heaters. At this point, the only real advantage of separate iDevices plugs was
handling the total wattage and avoiding having wires snaked all over the room to
get to the painting heater.

Additionally, Nest does not currently support HomeKit. There is a
[Nest HomeKit Bridge](https://www.npmjs.com/package/homebridge-nest) in Node.js
for just such occasions, but it’s annoying to have to run yet another box to
handle functions I feel my allegedly _smart_ thermostat should already take care
of. I get easily indignant over such issues. Because of the lack of HomeKit and
the inability to operate without actually having something plugged in, I went
with a
[Honeywell Lyric Round](https://www.amazon.com/Lyric-Programmable-Thermostat-Geofencing-Amazon/dp/B01FTNDGRG/).

## Further Issues

I also encountered an occasional (although admittedly rare and pretty
unannoying) issue where my thermostat wouldn’t trigger my heater on due with the
HomeKit cues, probably due to some network or wakefulness issue with my AppleTV.
Looking back, things could have been smoother had I used a
[Honeywell Relay Box](https://www.amazon.com/Honeywell-R8845U1003-Relay-Switch/dp/B000LDBP9Q)
to control the main under-rug heat matts directly with the thermostat and used
an iDevices plug only for the auxiliary painting heater. Or, sized up the under
heater rugs to control the whole system entirely with one Honeywell relay box
and skip having to purchase and configure the iDevices plugs altogether.

## Conclusions

No matter how much you’re paying for space, you can always pay more to make
peripheral spaces more appealing. Get out there and wire some stuff together and
stay warm in your man cave this season. And if you’re not heating with
combustibles, take the time to properly weatherstrip your doors and windows.
Even if you love the tropics, you don’t want to get the PG&E bill for heating
the world.

Featured image by:
[Steve Halama](https://unsplash.com/@steve3p_0?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge)
