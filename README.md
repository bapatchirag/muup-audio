# MuUp Audio player

Play audio using a new script called MuUp, enabling you to type in music, and hear it played from your speakers.

## MuUp

MuUp offers an easy and convenient way to (manually, for now) translate music to a string of text, capable of being analysed by software. By grouping notes together, it decreases the amount of text to be typed to represent the same piece of music. 

- Learn [how to](https://bapatchirag.github.io/muup-audio/pages/muup.html) write some MuUp.
- If you're new to music, have a look at some [basic music theory](https://bapatchirag.github.io/muup-audio/pages/theory.html).
- To look up some examples, see [here](https://bapatchirag.github.io/muup-audio/pages/examples.html).


# Installation

To install the latest version of MuUp Audio Player, execute the following at the nearest prompt:
```bash
npm i muup-audio
```

Installing muup-audio (obviously) requires npm, learn how to [here](https://www.npmjs.com/get-npm).

# Getting started

To start using the audio converter, include in file as:
```javascript
const muup = require('muup-audio')
```

## How to convert

Simply pass the MuUp string to the `playAudio()` function to start the playing of the MuUp encoded music:
```javascript
const status = muup.playAudio(muup-string)
```

To set the tempo of the audio, use the `setBPM()` function as:
```javascript
muup.setBPM(bpm)
```

# How to play on the browser

After the conversion file is ready, generate a client-side, browser-compatible JS file using [Browserify](http://browserify.org/) like so:
```bash
npx browserify <file-name> > <bundled-file-name>
```

For example, if the conversion file was `index.js`, and the Browserify-ed file was to be `bundle.js`, the following would be executed:
```bash
npx browserify index.js > bundle.js
```

Include this bundled file in your webpage's source code via a script tag and you're done!
```html
<script src="bundle.js"></script>
```