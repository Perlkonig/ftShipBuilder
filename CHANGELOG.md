# Change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
