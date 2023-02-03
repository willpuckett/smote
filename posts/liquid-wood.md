---
title:  "Liquid Wood"
tags: [ 3d, modeling, ios ]
publish_date: 2020-11-13
---

A couple of months ago, a Chiron fell into my lap. Not a centaur, but an
Anycubic Chiron 3D printer. I put down JavaScript for a while and began what I
imagined would be a short dig into the world of 3D on iOS.

The Chiron is an FDM (Fused Deposition Material) printer. This is basically like
the tube you squeeze to decorate a cake: pressurized filament is squeezed
through a heated cap as it moves to various places on the plate.

Things were not as straight forward as I had hoped. There's a LOT of hardware.
Solving 3D printer issues are real, tangible things. There are a lot of moving
parts, and the difference between blobs and beautiful objects can be incredibly
subtle. Shortly put, 3D on iOS is a mess. _When everything works,_ printing can
feel like a Star Trek replicator, but expect a lot of learning and failures on
the way, especially if you're not starting with a new printer.

> Think more midwestern craft closet than Star Trek replicator.

I spent some time in school modeling, but outputting to the printer was a
completely new problem for me to solve. I say completely new, but most printers
are just collections of hardware managed by microcontrollers like the Arduino,
with which I wasn't entirely unfamiliar. Most of the source code for printers is
available online, meaning you can adjust portions of the actual printer's
operation relatively easily.

The Chiron also came with some problems. Several, actually. I would try to print
things that would fail shortly in. I had to learn really the full anatomy of the
printer. I wouldn't have been motivated to do so if it had just worked, but
starting with problems meant I had to drill in deeply.

As I said, the prints kept failing shortly in. I thought it was a problem with
the thermistor that measures the heating block temperature, but even after
changing the entire hot end it kept happening. I tore through thermal regulating
software in the firmware, but it still kept failing. Finally, realizing the
cable had been damaged, and tucked the sensitivity part into the articulated
portion which gave it enough support it hasn't been an issue at all since. It
took almost a full month to figure it out though.

Bed adhesion was another HUGE issue. I went around and around. I tried so many
different filament and bed temp settings. Sometimes things would work for a
print or two, and then start failing again. Seeing a print get 70 or 80%
complete only to start sliding around the bed due to the increased leverage the
nozzle has on it further from the base plate was pretty disheartening. Poor bed
adhesion was also giving me lots of warped/curling corners.

One day, I was going through some of the hardware that had been included with
the Chiron and, by happenstance, started rubbing the spatula/putty scraper that
had been included I thought only to remove models across the bed. To my
surprise, goop started scratching off. I was afraid I was damaging the bed, so
just did a little of it. A week later, I realized that even though the glass bed
looked clean, it could be really not. I went to town the putty knife and scraped
the entire plate really hard, the sprayed it with glass cleaner, let it sit,
scraped it some more, and repeated that whole process several times.

Incredibly, every single print I've done since has been practically glued to the
bed, which is funny considering I even ordered glue sticks and hairspray to
experiment with. I'm happy to be able to keep the air in the apartment a little
cleaner and avoid the adhesives use. But I had to learn to really deep clean the
printer bed. It's important. Really important.

When I started using the printer, it had so many problems that I developed a
false expectation that 3D printing was a fragile undertaking. Although many
settings bring finesse and grace to your prints, the process should be fairly
solid when everything is ship shape. Learning to spot what ship shape looks
like, however, is just going to take a couple of months.

Essentially, printing happens in 3 steps: Modeling, Slicing, and Printing.

## Modeling

There are several types of models, each with multiple file formats. Modeled
objects need to be fully closed and
[manifold](https://blender.stackexchange.com/questions/7910/what-is-non-manifold-geometry)
(can exist in the real world) to print well.

### Solids Modeling

Solids Modeling is a type of modeling that helps you specifically create
functional, real world geometry, and is fantastic on iOS.
[Shapr3D](https://apps.apple.com/us/app/shapr-3d-cad-modeling/id1091675654) is
literally all you need to produce fully dimensioned engineering grade models. It
is a delight to work in and is super fast and responsive.

Shapr recently added AR export as well, so previewing models or collaborating
with non-technical colleagues is a snap.

If you'd like to read more of my ramblings about why drawing in Shapr is the
best thing ever, [look no further](smote.io/shapr). Shapr is what 3D should be
on iPad: elegant, fast, and intuitive.

### Mesh Modeling

Mesh modeling on iPad isn't so great. A lot of 3D models you come across are STL

### Lithophane

A great super easy way to get started doing 3d models with 2d drawing tools.

### CAD Shortage

Lack of 3D auto desk, BRL CAD, FreeCAD, etc

## Slicing

Slicing is definitely the bottle neck of any 3D workflow on iOS. It's miserable,
if not impossible. Slicing takes your model and runs it through a digital
mandolin. It makes flat layers of a designated thickness that can then be
extruded to your printer.

Slicing features define the tidiness of your print. Having granular control of
slicing is necessary to prevent stringing/warping/gaps/shifting/over & under
extruding/blobs/zits/ringing.

There is no slicing software for iOS.

This leaves you with two options:

1. Run a slicer on a desktop/SBC (Single Board Computer).
2. Cloud Slicing.

No matter how you slice it, none of these are ideal.

1. Desktop Slicing

The goal is reliable, clean, and accurate 3D prints. Slicing software is not
created equal, and is being innovated on routinely. You want to be able to run a
new version of Cura ideally. It has the most features and a great plugin ecology
to boot.

2. Cloud Slicing

Astroprint engine only uses old, nowhere near current slicer versions.

Octoprint legacy slicer only uses old cura version (as the name implies).

The one primary web based slicer is called
[AstroPrint](https://apps.apple.com/us/app/astroprint-for-3d-printing/id1152378866).
