# Full Thrust Ship Builder

You can play with the tool at <https://www.perlkonig.com/ftShipBuilder>. Everything is done on the client. No Internet access is required once the page is downloaded.

If you want to host it yourself, download the latest ZIP file from the Releases and put the files wherever you want.

This builder follows [the *Continuum* ruleset](https://emeraldcoastskunkworks.wordpress.com/category/project-continum-rules/). But the rules are not wholly unambiguous. Some tweaks have been made.

* Gunboats are not supported at all, and I don't know they ever will be.
* Turrets are implemented, but the rules are not clear, so I had to make some calls. You can have multiple arcs open on a turret, but they must be contiguous. Weapons have to be manually placed inside the turret graphic. Lines are drawn to help you.

This site is built on the [Svelte framework](https://svelte.dev/), using the [Bulma CSS library](https://bulma.io/) and good ol' [scalable vector graphics (SVG)](https://www.w3.org/Graphics/SVG/) for the SSD.

I believe in the "value for value" model. If you find this tool valuable, consider a donation proportional to that value: [paypal.me/abstractplay](https://www.paypal.me/abstractplay). Thank you!

## Developers

If you want to contribute to the code, here's how to get the development environment up and running:

* Install [NodeJS](https://nodejs.org).
* Clone the repo.
* From the newly cloned folder, type `npm i` to install all the dependencies.
* Then type `npm run dev` to start up the dev server.

Ideally you'd submit any changes via pull request, but if you wanted to just host your own instance, run `npm run build` and then move everything in the `dist` folder to some host somewhere.

The core ship handling code (including glyph drawing and JSON schema) has been abstracted into a standalone package: <https://github.com/Perlkonig/ftLibShip>.
