# DesM_CmsAPI
A barebones, extensible CMS. Designed for developers.

An ultra-hipster, Javascript CMS / framework that uses the MEAN stack ([mongodb], [nodejs], [angularjs], [expressjs]).

Jump to [installation](#installation)

### Features:

#### Includes [lesscss] + server-side less compiler + [semantic-ui] for a beautiful look out of the box.
![](http://i.imgur.com/RabMVaA.png)


#### Uses JWT authentication.
![](http://i.imgur.com/ISOqrQq.png)
![](http://i.imgur.com/U8XjFyd.png)


#### Angular powered CMS provides rich editing features.
![](http://i.imgur.com/dZ3eURq.png)


#### [Markdown] editing and processing middleware preconfigured.
![](http://i.imgur.com/47lgz74.png)
![](http://i.imgur.com/PbamWiO.png)

### This is still in active development, so don't use this in full production unless it's for a personal website, and you know what you're doing.

## Installation

0. Get [nodejs] and [npm].

1. Install all your dependencies with `sudo npm update` in your local folder.

2. Install and run mongodb on your system.

3. Check and edit this file: `server/config/secret.js`. For the `key` export, type any random string you want. Change the `password` export as well.

4. Run the server with `./run.sh` from the project root directory.

If you have an issue installing, contact me.

## Info

* For future reference, the `server` is where node/express will live. The `public` folder is where angular, along with any other public asset will live.

* The `server/config` folder is generally the goto folder for making changes to the server's functionality. From now on I will refer to this folder as just `config/`.

* Models are defined in `config/models.js` Currently the implemention of models is kind of clunky, but I believe the idea is good. It will need some cleanup / refactoring in the future, so the goal is to avoid complicating the architecture any further in the present.

## Todo

* Implement logout feature that deletes the auth token from the browser. This is crucial if user wants to log in via public computer.
* Error message on authentication fail.
* When the controllers take the user to the admin page, redirect back to the original page on successful authentication.

[nodejs]: http://nodejs.org/
[npm]: https://www.npmjs.org/
[mongodb]: https://www.mongodb.org/
[angularjs]: angularjs.org
[expressjs]: expressjs.com/
[lesscss]: http://lesscss.org/
[semantic-ui]: http://semantic-ui.com
[Markdown]: https://daringfireball.net/projects/markdown/