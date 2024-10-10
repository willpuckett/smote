---
title: "Nozzle Probing with ADXL345"
tags: [ 3dp, proto ]
publish_date: 2024-10-07
cover_html: <img src='images/dremel.webp'/>
---

While looking up the conversation about using ADXL345
[as a probe](https://github.com/Klipper3d/klipper/issues/3741) for the piezo
article, I stumbled on
[jniebuhr/adxl345-probe](https://github.com/jniebuhr/adxl345-probe) from summer
2024.

I was able to take some time yesterday afternoon to explore it a little bit. I
wanted to first compare the probing force on the bed against my piezo probe, and
the low-end strain gauge I had previously been using. I also wanted to evaluate
it for use on the dremel attachment I designed a few weeks ago.

## Wiring

I was doing my initial testing on an ebb42 mounted on a modified
mini-after-sherpa. The ebb42 neglects to connect adxl345's int pins. After
several attempts, I found the easiest thing I could do was to use a short
male-to-female dupont cable. I sculpted a glob of solder upwards from int1 to
the male tip resting across the top of the adxl345, then plugged the female end
into PB9.

It seems like very few toolboards have bothered to connect the int pins, so I
was delighted to find that the HermitCrab CAN actually did (both of them,
even!), although I haven't been able to make it in for testing yet...

## Probe Force

For accucracy, I used the time honored tradition of placing a kitchen scale
under the nozzle while probing. I obtained the following results:

|        Probe         | Speed (mm/s) | Scale Reading (grams) |
| :------------------: | :----------: | :-------------------: |
|        Piezo         |      5       |          137          |
| low-end strain gauge |      5       |        704 ish        |
|       ADXL345        |      10      |        200 ish        |
|       ADXL345        |      5       |          114          |

I had been afraid that the accelerometer probe would potentially be more damaging to the nozzles/bed, but it was a large improvement over the lowend probe I was using. I'm curious to see how it holds up with a router bit striking soft wood, though.

## Probing Tests

I used `activate_gcode` and `deactivate_gcode` to drop my acceleration way down (to 50mm/s^2 during probing) in order to reduce false triggers on probe start. I also added a small additional dwell (`G4 P600`) to the `activate_gcode` since it had proved instrumental to my piezo probing. I spent the better part of last night trying to tune parameters and have had probably the most success this morning with a probe speed of 25mm/s and a tap_threshold of 15000. 

The probe_accucracy results look good. 

More to follow...