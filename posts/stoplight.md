---
title:  "My Cover Journey"
tags: [ iot ]
publish_date: 2025-4-21
cover_html: <img src="/images/cover.webp" />
---

This is 28BYJ-48.

![28BYJ-48 shot](/images/28byj48.webp)

It can be purchased for 61¢ on aliexpress, probably less in quantity. It is
small and features a 1:64 gear reduction utilizing 5 tiny plastic gears. By all
accounts, it is a cheap, unexceptional motor.

I was introduced to 28BYJ-48 through the Hookup's
[Motorize and Automate Your Blinds for $10](https://www.youtube.com/watch?v=1O_1gUFumQM)
video, which I found when realizing that daylight was the most effective alarm
clock for me. I couldn't open my blinds to wake myself when I wasn't yet awake,
and so I needed to employ robotics. The video explained how to bipolar mod the
small motor to more than double torque, and write an arduino sketch to control
the motor remotely.

I was elated by what became my first foray into _cover._

## Cover

Cover moves us from day to night. It is a curtain; it is a blanket we pull over
ourselves. Cover nestles us. It is how we go from inside to outside. Cover spans
the region between two ends, usually OPEN and CLOSED. Some covers can only be at
one end or the other, but often, cover can be somewhere in between. As I began
to work more profoundly with cover, I found myself wondering,

> How do you know where home is?

For cover to function, it has to be able to find its ends. Some covers have a
switch at both ends, while others use a single endstop with a hand calibrated
number of steps between the ends, to establish their range. Still others might
not use any probed endstops at all, relying on the motor to 'skip steps' in
order to resynchronize position.

## TMC2209

My first blinds were controlled by A4988 drivers, known for loud operation. To
make my morning transition into wakefulness smoother, I switched to a slient
motor driver, TMC2208. Life was pretty good with the silent driver, but 2208 was
eventually surpassed in popuarity by its successor...

2209 includes _StealthChop_, the same quiet operating mode as 2208, but also
features _StallGuard_ and _CoolStep_. These modes use motor coil feedback to
detect stalls and improve motor power efficency. Stall detection was rapidly
implemented in 3d printing firmwares, but received almost no attention in the
home automation community. I was very interested in using StallGuard endstops in
my Cover applications. It seemed like such a natural pairing.

So it was a relief in 2023 when I found
[this gist](https://gist.github.com/lumascet/a5c48c3dc1ceab02f714735f8811b1ca)
outlining UART control of TMC2209. Until that time, steppers in the DIY home
automation community were controlled only through STEP/DIR interfaces, which
couldn't configure the more advanced features of newer drivers.

![testing small breadboard](/images/breadboard_small.webp)

Grabbing a breadboard, I wired up a stepstick, Xiao, and 28BYJ-48. Tuning
StallGuard always involves _some_ back and forth to get a motor working well in
its designed application, but no matter how hard I tried, I couldn't get 2209 to
reliably detect stalls on the tiny motors. As I read and reread the datasheet,
it became more and more clear to me that I needed to resize the sense resistors.
I recall running across notes indicating that StallGuard measurments could
become unreliable or just not possible at low drive currents. I gathered the
back emf current I was trying to measure was not a substantial enough portion of
the range the boards were designed for and there wasn't enough signal.

![🚦 StopLight Schematic](https://raw.githubusercontent.com/willpuckett/stoplight/refs/heads/main/.images/stoplight.svg)

Seasons passed. I had hoped to work out stall sensing with 28BYJ-48 by winter,
if it was even possible, when I planned to use it to control our
[aging wall heater](https://www.printables.com/model/777753-wall-heater-tamer-using-stoplight-controller).
Although I was uncertain if larger sense resistors would allow a stall
measurement, I had to try and eventually drafted the first revison of
[🚦 StopLight](https://github.com/willpuckett/stoplight). I landed on a very
minimal approach to the board, opting to access most features over UART, made
possible by @slimcdk's
[incredible TMC2209 implementation](https://github.com/slimcdk/esphome-custom-components),
which also allowed me to experiment with IPG (integrated pulse generation),
meaning I didn't need to bother wiring the STEP/DIR interface at all.

![StopLight board](/images/stoplight.webp)

The boards arrived and StallGuard is working reliably with 28BYJ-48. There are
often cautionary words spoken when it comes to StallGuard and geared steppers.
For good reason: repeatedly ramming a gear train to a sudden stop from full
speed can be damaging. Though the plastic gears _may_ absorb some of the shock,
it's possible that the gearing may turn out to be a problem. In practice,
however, I've run the steppers in stall conditions for longer durations as part
of the their normal homing operation for many years with no adverse effects. I
found the following settings successful at homing 28BYJ-48:

| Key          | Value           |
| ------------ | --------------- |
| microsteps   | 1               |
| vsense       | true            |
| current      | 122 ma ~ 140 ma |
| tcool        | 104             |
| sgthrs       | 23 ~ 43         |
| acceleration | 1000 steps/s    |
| speed        | 480 steps/s     |

I'd like to work further with these numbers in the hopes of finding something
effective at lower speeds.

The [first batch](https://octule.com/listing/1891073906/stoplight) is intended
more as a POC, but I'm excited to move forward with a few improvements to make
it more robust. I included a PD Controller (HUSB238), so the boards can raise
the voltage before moving the stepper, then return to 5v for idle, which helps
keep the onboard temp sensor (dallas DS18B20) reading more accurate. I hope this
cheap, easy way to move and home a large variety of household elements can make
automated daylighting more accessible. If the average home has 15 windows,
🚦StopLight could result in over $2,000 of savings compared to the other smart
window shades.

## Revisitation

Things were going well. So well, in fact, that I began to wonder if I had been
hasty in my pronouncement that smaller sense resistors were strictly necessary.
I pulled back out the breadboard and configured the BTT stepstick to use
VSENSE... Using @slimcdk's component, I was able to reliably home with IRUN set
to 4 and 5. I did confirm that I needed to pull ENN to GND for UART to
communicate.

### Using VSENSE

| IRUN | ma  |
| ---- | --- |
| 1    | 61  |
| 2    | 91  |
| 3    | 122 |
| 4    | 152 |
| 5    | 183 |

### Without VSENSE

I then decided to try homing without VSENSE, which also worked at IRUN 1 and 2
(I didn't try 3 since that's getting into motor frying territory).

| IRUN | ma  |
| ---- | --- |
| 1    | 110 |
| 2    | 165 |
| 3    | 220 |

Having the larger sense resistors is still nice: they provide more granularity
for current selection. They may also have been a little more forgiving in terms
of stall detection, making it easier to hone in on working settings...

I'm not sure if the older implementation I was using had an issue, or if I was
executing something incorrectly. Reviewing some of the
[older config](https://github.com/willpuckett/homeassistant/blob/38ccfee0bda9263d6cda2358f977e30c2166889e/esphome/heater.yaml),
it seems to be microstepping at 8 microsteps when compared to my current step
count, although it's set at 16 microsteps in the configuration.... 

![reworked breadboard](/images/blindandbreadboard.webp)

Reworking the old blinds breadboard to use the IPG, I got a lot of voltage drop
especially on the 3v3 rail. This had happened before, but was worse on the
larger breadboard. I had to drop UART to 230,400 baud. Everything is working
nicely with the 0.110 Ω sense resistors in VSENSE mode. I'm still glad I took
the time to explore making a dedicted board: it's quite a bit easier to setup,
and is more stable in physically demanding conditions. Now I just need to find
some more things to move...
