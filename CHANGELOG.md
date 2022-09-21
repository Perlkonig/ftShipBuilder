# Change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.0] - 2022-09-21

### BREAKING CHANGE

The layout system has been almost completely rewritten. Your saved ships are fine, but their SSDs are not. You will have to rearrange your systems. The new system is extensible, so this sort of break should never happen again.

If you are having issues, try exporting *just* the ship (there is now a button for that) and reimporting it to start fresh.

### Added

* The freeform layout engine has been added. It gives you full control over the arrangement of your SSD and allows the addition of a background SVG (like a ship outline).
* Added CPV calculations from <https://fullthrust.star-ranger.com/CPV.htm> and <http://fullthrust.star-ranger.com/FighterGroups.htm>. Bays, hangars, and launch tubes are considered "non-combat mass," hangars and tubes are 1 CPV per mass, and fighters gain a base 30 CPV across the board, and long-range fighters go up an additional 2 points per fighter.
* You can now download the ship JSON file without the layout information. If that's the only piece you're trying to share, it's just more compact.

### Fixed

* Fixed nameplate scaling in the linear layout.
* In the linear layout, the default SVG export will render perfectly in the browser. In the "adjusted" SVG and PNG exports, the footer has been changed to white for visibility. Nothing I can do about the fonts, though.

## [v1.3.0] - 2022-09-17

### Added

* Added highlighting feature for overlapping elements.
* Added linear layout engine.

### Fixed

* Injecting `xlink:` into the exported SVG so it will work immediately in most editing apps.

## [v1.2.1] - 2022-09-15

### Fixed

* Mobile drag and drop now works consistently for arc selection.
* Made some minor layout changes to improve mobile experience.

## [v1.2.0] - 2022-09-15

### Fixed

* Click and drag finally works on mobile!

## [v1.1.0] - 2022-09-14

### Changed

* In response to much demand, arc selection is now done by click. Feedback welcomed.

## [v1.0.1] - 2022-09-14

### Fixed

* Drive and FTL systems were being saved but were not loading properly. That has been corrected.

## [v1.0.0] - 2022-09-13

Finally ready for a beta release!

### Added

* Remaining weapons and systems added (except for gunboats).

### Changed

* Layouts have been tweaked and renamed/categorized by hull space.

## [v0.5.0] - 2022-09-12

### Added

* Fighters have now been added. I haven't incorporated hangar icons yet. For now, the name of the fighter type is just printed on top.
* All the weapons except for Pulsers have now been added.

### Developers

* Completely refactored the SVG code. I finally incorporated the automated generation tools I was already using directly into the code base. This drastically reduced the lines of code and resulting package size.
* Moved some folders around.

## [v0.4.0] - 2022-09-10

* You can now create, share, save, and retrieve custom SSD layouts.

## [v0.3.0] - 2022-09-09

* You can now save and retrieve ship designs either by JSON or using local storage.
* Added mass and point value to layouts. Still a lot of tweaking to do there.

## [v0.2.1] - 2022-09-08

### Changed

* Moved to a more efficient site layout.

### Broken

* I'm afraid the click and drag is not working consistently on mobile. Something I hope to fix eventually. Works just fine across all desktop browsers, though.

### Developers

* Completely refactored the system handling code (`src/lib/systems`). Each system has its own class file that encapsulates its naming, mass, points, and symbols all together. This should make it much more straightforward to add or edit systems.

## [v0.2.0] - 2022-09-04

### Added

* Fleshed out the general systems.
* Added all the ordnance.

### Fixed

* Dragging should now work on mobile, but I haven't tried to adjust the code for `<g>` elements yet, so the lines and bay numbers don't reposition until you drop.

## [v0.1.0] - 2022-09-02

Initial commit. All the basic features are working, but still a ton of systems to add.
