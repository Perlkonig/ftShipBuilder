# Change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v3.7.1] - 2024-09-25

### Added

-   You can now toggle whether the exported fleet ships have an inverted footer or not.

### Fixed

-   Fixed a bug that caused the FTL icon to not appear.

## [v3.7.0] - 2024-09-24

### Added

-   There is now a rudimentary fleet manager, which includes basic import/export and a standalone HTML view one could customize. This involved significant changes to the underlying rendering code. Please let me know if something does not work as you expect.

## [v3.6.0] - 2024-06-14

### Added

-   You can now flag a ship has having a flawed design. As per the _Continuum_ ruleset, page 113, this reduces the point cost by 20% but renders the ship vulnerable to catastrophic failure. This option is only available to ships mass 60 or greater. A glyph is added to the SSD.

### Changed

-   K-guns now have no upper class limit. The extended base cost is outlined in _Fleet Book 2_, page 9. The modifiers for short- and long-range variants are found in the _Continuum_ rules, page 43.

## [v3.5.0] - 2023-04-29

### Changed

-   Normalized all the ordnance systems so you can select which three arcs the launcher targets. This change should be backwards compatible.

### Fixed

-   Fixed all ordnance arc selectors so the blacked out rear arc is removed in beta orientation.
-   The rules have some special "discounts" for some weapons (i.e., beams, Gatling batteries, and twin particle arrays) if they select one of the pairs of "broadside" arcs. While not explicit, it is logical that this only applies in alpha orientation. So the discount and arc auto-selection for those particular weapons have been disabled for ships in beta orientation.

## [v3.4.1] - 2023-04-28

### Added

-   You can now load JSON files from the file system using a standard file input box, including drag and drop. Remember that all processing is local. No files are transferred. Error handling is minimal. (Many thanks to @shadowmouse for the pull request!)

## [v3.4.0] - 2023-04-25

### Added

-   Added a fourth "Hold or Berth" option called "Tender Bay" (see page 89 of the _Continuum_ rules). It looks and works exactly the same as a "Boat Bay" but costs points.
-   Added the option to add FTL tug capacity to any ship.

## [v3.3.2] - 2023-04-17

### Added

-   In the freeform layout screen, you can now put any SVG into the background image box and the system will do basic validation and manipulation for you.
-   Added an opacity spinner for the background image as well.

## [v3.3.1] - 2023-04-16

### Added

-   Added the Vapour Shroud system and added all Phalon ships from _Fleet Book 2_ to the presets.
-   Added "Jump to" links to the sticky status div.

## [v3.3.0] - 2023-04-16

### Added

-   Added a shareable "short code" feature so you can quickly get to a particular ship configuration. You can append the code to the URL or paste it into the load dialog.
-   Added Kra'Vak ships from _Fleet Book 2_ to the list of presets.

### Fixed

-   Made the load dialog more error resistant.
-   Finally sorted the list of stored ships.

## [v3.2.0] - 2023-04-15

### Fixed

-   Nirvana achieved! Exported PNGs now retain correct fonts and sizing.
-   Fixed a bug that sometimes allowed the stats blocks in linear layouts to overflow.

## [v3.1.0] - 2023-04-14

### Added

-   New preset infrastructure in place. Fleets and ships can be submitted by submitting a pull request with an updated `stores/presets.json`.

### Changed

-   Finally consolidated the load and delete ship dropdowns and added a confirmation dialog to the delete button.

### Fixed

-   I had simply assumed that the maximum amount of armour you could have in any given row was the width of the top row of hull boxes; however, the _Fleet Book 1_ rules mention no such restriction, and there are ships in the book that break this rule. The builder will now let you add unlimited armour to any given row.
-   The minimum mass limitation of defensive screens, outlined in _Fleet Book 1_, is finally applied.
-   The navigation "burger" icon finally works as intended.

## [v3.0.1] - 2023-04-08

### Fixed

-   Area defense systems now render properly in Beta orientation.

## [v3.0.0] - 2023-04-07

### BREAKING CHANGE

Bays have been reworked so the `capacity` property is indeed as described. The mass is calculated by using the ratios given in the rules. But a `ratio` property has also been added so you can customize the mass-to-capacity ratio in a given scenario. The number displayed on the SSD is the capacity of the bay, and the mass is calculated by multiplying the capacity by the ratio.

If you have any saved ships that include bays, load them, correct the capacity, and resave.

### Added

-   New `orientation` property lets you now choose "beta" orientation, where all firing arcs are rotated 30 degrees clockwise. All three forward arcs fire starboard and all three aft arcs fire port. All glyphs and arc selectors should adjust automagically.

### Fixed

-   CPV now correctly incorporates hull integrity. (Thanks, @mandalon!)

## [v2.2.2] - 2023-01-16

### Fixed

-   Fixed NPV calculation so it includes the ship's base mass.

## [v2.2.1] - 2023-01-03

### Added

-   Added help text to the "capacity" field for holds and berths. The builder has always taken the capacity of holds and berths to be its gross mass. While the rules offer various mass-to-capacity ratios, this game is heavily house ruled. Using gross mass offers maximum flexibility.

## [v2.2.0] - 2022-12-31

### Added

-   Added the "boat bay," intended to carry light non-combat vehicles like shuttles, dropships, and survey craft (see _Continuum_, p. 110). I'm sorry, but gunboats themselves are still unsupported.
-   Added "assault shuttle" to the list of available fighters (see _Continuum_, pp. 75–76). The builder will allow robot assault shuttles, but they are really only legal if your universe allows purely robotic boarding parties. Human boarders cannot access a robotic fighter rack.

### Fixed

-   There are some fighter combinations that are not valid (e.g., light fighters can't have the "heavy" modification). Checking invalid boxes will now automatically uncheck the box.

## [v2.1.0] - 2022-12-30

### Added

-   Added a `civilian` flag that reduces the crew factor from 1/20 to 1/50.

### Fixed

-   Fixed a display bug where bays of different masses all showed the same capacity.
-   Long-range kguns now correctly have black as opposed to white backgrounds. (Thanks, @shadowmouse!)
-   The save name now correctly syncs with your ship name until you focus the save name box, at which point you're on your own. (Thanks, @InsaneWookie!)

## [v2.0.4] - 2022-10-16

### Changed

-   Some minor UI improvements. (Thanks, @InsaneWookie, for the pull request!)

## [v2.0.3] - 2022-10-06

### Fixed

-   Fixed a display bug I introduced when you have screens of different explicit levels.

## [v2.0.2] - 2022-10-05

### Added

-   You can now explicitly assert the level of a specific defensive screen system. I read the rules as saying the number of individual systems determined your screen level (maxing out at 2), but there are other compatible interpretations. Setting the level as `unleveled` uses the level 2 glyphs but the level 1 points. Explicitly setting the level will adjust both the glyph and the points. (Thank you, @shadowmouse, for the pull request!)

## [v2.0.1] - 2022-09-24

### Changed

-   Made it easier to associate a magazine with a salvo launcher.

### Developers

-   Completely refactored the code again, this time removing all the core ship-handling libraries into a standalone package so I can reuse it in other tools (<https://github.com/Perlkonig/ftLibShip>). Users shouldn't notice any changes! If something is broken, [please let me know](https://github.com/Perlkonig/ftShipBuilder/issues).

## [v2.0.0] - 2022-09-21

### BREAKING CHANGE

The layout system has been almost completely rewritten. Your saved ships are fine, but their SSDs are not. You will have to rearrange your systems. The new system is extensible, so this sort of break should never happen again.

If you are having issues, try exporting _just_ the ship (there is now a button for that) and reimporting it to start fresh.

### Added

-   The freeform layout engine has been added. It gives you full control over the arrangement of your SSD and allows the addition of a background SVG (like a ship outline).
-   Added CPV calculations from <https://fullthrust.star-ranger.com/CPV.htm> and <http://fullthrust.star-ranger.com/FighterGroups.htm>. Bays, hangars, and launch tubes are considered "non-combat mass," hangars and tubes are 1 CPV per mass, and fighters gain a base 30 CPV across the board, and long-range fighters go up an additional 2 points per fighter.
-   You can now download the ship JSON file without the layout information. If that's the only piece you're trying to share, it's just more compact.
-   Regenerative armour has been added. The rules say you can mix the two types, but it doesn't prescribe how they can be arranged. I had to make a call, so regenerative armour is grouped at the end of any mixed armour layer.

### Fixed

-   Fixed nameplate scaling in the linear layout.
-   In the linear layout, the default SVG export will render perfectly in the browser. In the "adjusted" SVG and PNG exports, the footer has been changed to white for visibility. Nothing I can do about the fonts, though.

## [v1.3.0] - 2022-09-17

### Added

-   Added highlighting feature for overlapping elements.
-   Added linear layout engine.

### Fixed

-   Injecting `xlink:` into the exported SVG so it will work immediately in most editing apps.

## [v1.2.1] - 2022-09-15

### Fixed

-   Mobile drag and drop now works consistently for arc selection.
-   Made some minor layout changes to improve mobile experience.

## [v1.2.0] - 2022-09-15

### Fixed

-   Click and drag finally works on mobile!

## [v1.1.0] - 2022-09-14

### Changed

-   In response to much demand, arc selection is now done by click. Feedback welcomed.

## [v1.0.1] - 2022-09-14

### Fixed

-   Drive and FTL systems were being saved but were not loading properly. That has been corrected.

## [v1.0.0] - 2022-09-13

Finally ready for a beta release!

### Added

-   Remaining weapons and systems added (except for gunboats).

### Changed

-   Layouts have been tweaked and renamed/categorized by hull space.

## [v0.5.0] - 2022-09-12

### Added

-   Fighters have now been added. I haven't incorporated hangar icons yet. For now, the name of the fighter type is just printed on top.
-   All the weapons except for Pulsers have now been added.

### Developers

-   Completely refactored the SVG code. I finally incorporated the automated generation tools I was already using directly into the code base. This drastically reduced the lines of code and resulting package size.
-   Moved some folders around.

## [v0.4.0] - 2022-09-10

-   You can now create, share, save, and retrieve custom SSD layouts.

## [v0.3.0] - 2022-09-09

-   You can now save and retrieve ship designs either by JSON or using local storage.
-   Added mass and point value to layouts. Still a lot of tweaking to do there.

## [v0.2.1] - 2022-09-08

### Changed

-   Moved to a more efficient site layout.

### Broken

-   I'm afraid the click and drag is not working consistently on mobile. Something I hope to fix eventually. Works just fine across all desktop browsers, though.

### Developers

-   Completely refactored the system handling code (`src/lib/systems`). Each system has its own class file that encapsulates its naming, mass, points, and symbols all together. This should make it much more straightforward to add or edit systems.

## [v0.2.0] - 2022-09-04

### Added

-   Fleshed out the general systems.
-   Added all the ordnance.

### Fixed

-   Dragging should now work on mobile, but I haven't tried to adjust the code for `<g>` elements yet, so the lines and bay numbers don't reposition until you drop.

## [v0.1.0] - 2022-09-02

Initial commit. All the basic features are working, but still a ton of systems to add.
