---
title:  "Production Variants with KiBot"
tags: [ keebs, proto ]
publish_date: 2024-10-08
cover_html: <img src="/images/kibot.webp" />
---

In August, I started working on what I thought would be a small, couple of hours
project to make yet another diode matrix rework of the Ferris Sweep Half Swept
for Seeed Xiao called [Swoon](https://github.com/willpuckett/Swoon). I hoped to
make a flippable, hand-solderable version that could be produced as cheaply as
possible, and a version that could be fully assembled by the board house.

I had been flirting with Andrey Shmakov’s idea of
[PCBOps](https://www.youtube.com/watch?v=cQ-iFtBBwFc&t=157s), which I had been
introduced to via Pete Johanson’s
[revxlp repository](https://gitlab.com/lpgalaxy/revxlp). As I began to explore
KiBot, I found that what I was trying to do had a name:
[_variant_](https://github.com/INTI-CMNB/kibot_variants_arduprog?tab=readme-ov-file#changing-values).
Variants come in two types: production and assembly. While assembly variants
primarily address the BOM and CPL files and are fully implemented in KiBot,
production variants change the copper/mask/silk layers and are still under
development. Luckily, I didn't realize there was a difference and just dove in
expecting production variants to work, which with the help of the KiBot team,
they have.

## Structuring the Schematic

KiBot can use three different variant systems, which I think contributed to the
difficulty I had unraveling how to use them. Components which need to be
addressed with the system should have a field called `Config`, which can be
added in the component properties view, or gloablly in the symbol editor
(`Schematic Editor > Tools > Edit Symbol Fields...`).

I ultimately used the KiBoM variant style, which the
[docs](https://kibot.readthedocs.io/en/latest/configuration/variants/kibom.html)
describe as

```txt
The Config field (configurable) contains a comma separated list of variant directives.
    -VARIANT excludes a component from VARIANT.
    +VARIANT includes the component ONLY if we are using this variant.
```

Components with a `Config` field with no value are included in all variants.

I created a testpoint with a 0.00001mm pad as a placeholder
(Swoon:TestPoint_Pad_Empty) and implemented the following in my symbol editor:

|           Reference            |              Value               |           Footprint           |   LCSC    |    Config    |      flip:Footprint       |        left:Footprint         |        right:Footprint        |
| :----------------------------: | :------------------------------: | :---------------------------: | :-------: | :----------: | :-----------------------: | :---------------------------: | :---------------------------: |
| J1,J2,J5,J6,...J61,J62,J65,J66 |     3305-0-15-80-47-27-10-0      | Swoon:3305-0-15-80-47-27-10-0 | C17370797 |    +left     | Swoon:TestPoint_Pad_Empty | Swoon:3305-0-15-80-47-27-10-0 |   Swoon:TestPoint_Pad_Empty   |
|            J69,J71             |       310-13-107-41-001000       |    Swoon:MF254V-11-07-0743    | C5504401  |    +left     | Swoon:TestPoint_Pad_Empty |    Swoon:MF254V-11-07-0743    |   Swoon:TestPoint_Pad_Empty   |
|              J73               | Mill Max 0906-2-15-20-75-14-11-0 | Swoon:0906-2-15-20-75-14-11-0 | C5261048  |    +left     | Swoon:TestPoint_Pad_Empty | Swoon:0906-2-15-20-75-14-11-0 |   Swoon:TestPoint_Pad_Empty   |
|      TP1,TP3,...TP17,TP19      |         TestPoint_Small          |   Swoon:TestPoint_Pad_Empty   |           |    +left     | Swoon:TestPoint_Pad_Empty | Swoon:TestPoint_Pad_1.0x1.0mm |   Swoon:TestPoint_Pad_Empty   |
|        D1,D3,...D31,D33        |             CD4148WS             |    Swoon:D_0805_2012Metric    | C38587762 | +left,+flip  |  Swoon:D_0805_2012Metric  |    Swoon:D_0805_2012Metric    |   Swoon:TestPoint_Pad_Empty   |
|              SW18              |          MST22D18G2 125          |    Swoon:SW-SMD_MST22D18G2    | C2906280  | +left,+flip  |  Swoon:SW-SMD_MST22D18G2  |    Swoon:SW-SMD_MST22D18G2    |   Swoon:TestPoint_Pad_Empty   |
|               U2               |            MY-LR44-02            |   Swoon:BAT-SMD_MY-LR44-02    | C2902345  | +left,+flip  | Swoon:BAT-SMD_MY-LR44-02  |   Swoon:BAT-SMD_MY-LR44-02    |   Swoon:TestPoint_Pad_Empty   |
| J3,J4,J7,J8...J63,J64,J67,J68  |     3305-0-15-80-47-27-10-0      | Swoon:3305-0-15-80-47-27-10-0 | C17370797 |    +right    | Swoon:TestPoint_Pad_Empty |   Swoon:TestPoint_Pad_Empty   | Swoon:3305-0-15-80-47-27-10-0 |
|            J70,J72             |       310-13-107-41-001000       |    Swoon:MF254V-11-07-0743    | C5504401  |    +right    | Swoon:TestPoint_Pad_Empty |   Swoon:TestPoint_Pad_Empty   |    Swoon:MF254V-11-07-0743    |
|              J74               | Mill Max 0906-2-15-20-75-14-11-0 | Swoon:0906-2-15-20-75-14-11-0 | C5261048  |    +right    | Swoon:TestPoint_Pad_Empty |   Swoon:TestPoint_Pad_Empty   | Swoon:0906-2-15-20-75-14-11-0 |
|      TP2,TP4,...TP18,TP20      |         TestPoint_Small          |   Swoon:TestPoint_Pad_Empty   |           |    +right    | Swoon:TestPoint_Pad_Empty |   Swoon:TestPoint_Pad_Empty   | Swoon:TestPoint_Pad_1.0x1.0mm |
|        D2,D4,...D32,D34        |             CD4148WS             |    Swoon:D_0805_2012Metric    | C38587762 | +right,+flip |  Swoon:D_0805_2012Metric  |   Swoon:TestPoint_Pad_Empty   |    Swoon:D_0805_2012Metric    |
|              SW19              |          MST22D18G2 125          |    Swoon:SW-SMD_MST22D18G2    | C2906280  | +right,+flip |  Swoon:SW-SMD_MST22D18G2  |   Swoon:TestPoint_Pad_Empty   |    Swoon:SW-SMD_MST22D18G2    |
|               U3               |            MY-LR44-02            |   Swoon:BAT-SMD_MY-LR44-02    | C2902345  | +right,+flip | Swoon:BAT-SMD_MY-LR44-02  |   Swoon:TestPoint_Pad_Empty   |   Swoon:BAT-SMD_MY-LR44-02    |

Variants need to run a `var_rename` filter to replace footprints. I added the
variants to `swoon.kibot.yaml`:

```yaml
variants:
  - name: flip
    comment: For Hand Soldering
    type: kibom
    file_id: FLIP
    variant: flip
    pre_transform:
      - variant_rename
      - fix_rotation
  - name: left
    comment: Left for PCBA
    type: kibom
    file_id: LEFT
    variant: left
    pre_transform:
      - variant_rename
      - fix_rotation
  - name: right
    comment: Right for PCBA
    type: kibom
    file_id: RIGHT
    variant: right
    pre_transform:
      - variant_rename
      - fix_rotation

filters:
  - name: variant_rename
    comment: Remove single sided components
    type: var_rename
    separator: ':'
    variant_to_value: false
```

I exictedly pushed my changes, certain I had conquered the world. They errored
shortly thereafter.

## Setting Up the Action

I tottled around a little more, then posted my difficulties to the KiBot issues
area.

Footprint replacements are still in dev, so I needed to use
`uses: INTI-CMNB/KiBot@v2_dk8` for the GitHub Action, and

```json
{
  "image": "ghcr.io/inti-cmnb/kicad8_auto_full:dev"
}
```

for my devcontainer. I tried running my outputs and met a couple of additional
errors. Over the following week, Salvador from the KiBot team resolved issues
with drill file generation and getting replacement footprints on the correct
side of the board. Salvador cautions that footprint replacement (production
variants) are still in development, and asks that issues be reported with
patience in as much detail as possible.

## ☙ ❧

I’m delighted to report that, using KiBot’s ‘var_rename’ filter as a
‘pre_transform’ for variants, I’m now able to output production variants using
KiBot in a PCBOps pipeline. There were several issues I encountered along the
way but the process seems to be working well now. Given that KiBot wasn’t
successfully outputting the variant files before Salvador’s work and bug fixes
over the past few weeks, it seems unlikely that people have done this using
KiCad, and it has some really useful implications for keyboard designers.

If we examine for instance, the
[revxlp repository](https://gitlab.com/lpgalaxy/revxlp), there is a ‘10u’ and a
12u’ directory, both of which contain 3 different pcb files: a main pcb for
components and switches, a top plate, and a bottom plate. With KiBot’s support
of production variants, those could all be generated from the single 12u pcb
file, using ‘var_rename’ to switch the board outline footprint to the 10u
version, depopulate the unneeded components for the top and bottom plates, and
replace the key switch footprint with the cutout version for the top plate. See
this [demonstration repository](https://github.com/willpuckett/revxlp), which
implements the concept. It's notable that being able to execute a global
deletion of tracks and vias, or some other method to clean up the top and bottom
plates would be nice. Using footprint replacement can even allow for switching
graphic artwork on top and bottom plates as well, for those so inclined.

Using this sort of KiBot build matrix has made an iterative design approach more
comfortable for me. I feel like I can focus my time having fun with board
outlines and ergonomics without the cognitive burden of propogating changes
across multiple outputs. Hopefully the simplified project structure makes it
easier for others to navigate as well.
