# MuUp Audio player

Play audio using a new script called MuUp, enabling you to type in music, and hear it played from your speakers.

## MuUp

MuUp offers an easy and convenient way to (manually, for now) translate music to a string of text, capable of being analysed by software. By grouping notes together, it decreases the amount of text to be typed to represent the same piece of music. 

- Learn [how to](pages/muup.md) write some MuUp.
- If you're new to music, have a look at some [basic music theory](pages/theory.md).
- To look up some examples, see [here](pages/examples.md).


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
If the MuUp to Audio conversion is to be done client-side, consider using a module like [Browserify](http://browserify.org/).

Alternatively, include the main file as the source in a script tag as:
```html
<script src='unpkg.com/muup-audio'>
```