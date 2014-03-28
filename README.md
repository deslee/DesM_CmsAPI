# DesM_CmsAPI
A barebones, extensible CMS. Designed for developers.

### This is still in active development, so don't use this in full production unless it's for a personal website, and you know what you're doing.

## Installation

1. Install all your dependencies with `sudo npm update` in your local folder.

2. Install and run mongodb on your system.

3. Check and edit this file: `server/config/secret.js`. For the `key` export, type any random string you want. Change the `password` export as well.

4. Run the server with `./run.sh` from the project root directory.

## Info

* For future reference, the `server` is where node/express will live. The `public` folder is where angular, along with any other public asset will live.

* The `server/config` folder is generally the goto folder for making changes to the server's functionality. From now on I will refer to this folder as just `config/`.

* Models are defined in `config/models.js` Currently the implemention of models is kind of clunky, but I believe the idea is good. It will need some cleanup / refactoring in the future, so the goal is to avoid complicating the architecture any further in the present.

## Todo

* Implement logout feature that deletes the auth token from the browser. This is crucial if user wants to log in via public computer.