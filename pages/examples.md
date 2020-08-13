# Examples

## Let's Get Started

To play a simple G Major scale from the 4th to the 5th octave as 4th notes, the MuUp script required is:
```
M(4[G A B C D E F#]4), M(5[G]4)
```
<input type="button" id="simple-g" name="simple-g" value="Try It!">

The same scale with alternating 4th and 8th notes:
```
M(4[G A B C D E F#][4 8 4 8 4 8 4]), M(5[G]8)
```
<input type="button" id="complex-g" name="complex-g" value="Try It!">
<hr>

## Playing note runs

The first 2.5 bars of the treble clef in "Turkish March" (or "Rondo Alla Turca") by Wolfgang Amadeus Mozart (tempo = 151 BPM) have a quick succession of 16th notes, with a rest in between.

This is notated as:
```
M(4[B A G# A]16), M(5[C]8), R(8), M(5[D C]16), M(4[B]16), M(5[C E][16 8])
```
<input type="button" id="turkish" name="turkish" value="Try It!">

<hr>

## Playing chords

To demonstrate the playing of polyphony, let's look at some pieces of music.

- The first 2 bars of the bass clef in "Waltz Mystique" (tempo = 136 BPM), by Ray Moore go as follows:
    ```
    M(3[E]4), P([3 4][A C]4), P(3[G B]4), M(2[B]4), P(3[G B]4), P(3[F# A]4)
    ```
    <input type="button" id="waltz" name="waltz" value="Try It!">

- The first 4 bars of the treble clef in "Barcarolle" (tempo = 42 BPM) by Friedrich Burgmuller looks this way in MuUp script:
  ```
  M(4[Eb C]8), M(3[Bb Ab][8 4.]), M(4[Eb C]8), M(3[Bb Ab][8 4.]), P(4[C F Ab]4.), P(4[Eb G Bb]4.), P([4 4 5][Eb Ab C]2.)
  ```
  <input type="button" id="barcarolle" name="barcarolle" value="Try It!">

<hr>

## Playing the treble and bass clefs together

The current version of MuUp (the language and the audio player) do not support the playing of two lines of music written separately. But in most cases, with some adjustments, this can be satisfactorily achieved.

Take for instance, "Canon in D" (tempo = 68 BPM), by Johann Pachelbel. The first 4 bars of this piece have running treble clef notes with rests and a static note on the bass clef.

But this bass clef note lasts for the entire duration of the bar, whereas the treble clef notes do not. To solve this problem, the following notation may be used:
```
M(4[D]8), P(4[D F#]8), P(4[D A]8), P([4 5][D D]8), M(3[A]8), P([3 4][A E]8), P([3 4][A A]8), P([3 5][A C#]8)
```
<input type="button" id="canon" name="canon" value="Try It!">

<script src="./example-scripts/test-bundle.js"></script>

[Back to home](../README.md)