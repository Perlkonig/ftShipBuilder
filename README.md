# Full Thrust Ship Builder

This package is still very much in development. There is still much to do, but the core features are now working as expected.

You can play with the tool at <https://www.perlkonig.com/ftShipBuilder>. Everything is done on the client. No Internet access is required once the page is downloaded.

If you want to host it yourself, download the latest ZIP file from the Releases and put the files wherever you want.

## Developers

If you want to contribute to the code, here's how to get the development environment up and running:

* Install [NodeJS](https://nodejs.org).
* Clone the repo.
* From the newly cloned folder, type `npm i` to install all the dependencies.
* Then type `npm run dev` to start up the dev server.

Ideally you'd submit any changes via pull request, but if you wanted to just host your own instance, run `npm run build` and then put everything in the `dist` folder on some host somewhere.
