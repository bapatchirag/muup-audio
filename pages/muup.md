# MuUp Script

MuUp is a text script, designed for representing musical notes along with their attributes in a textual format, able to be read as a string of characters.

To read up on some basic music theory to make writing the MuUp script simpler and easier to understand, [click here](theory.md).

## How does it work

The entire MuUp text is split along commas (separator - ", ") into individual components, which are then analyzed and appropriate objects generated. There are 3 types of components that could be generated:
1. A run of notes in the same octave for either individually specified durations or a common duration - Monotones.
2. A polyphonic chord, specified across octaves, for either individually specified duration or a common duration - Polytones.
3. A rest specified for a certain number of beats - Notones/Rests.

In MuUp, the Western system of music has been implemented, which would include the notes, durations and octaves explained [here](theory.md).

# How to write MuUp

The general format of any component of MuUp is first specifying what type of component it is, followed by the octave number(s) for given note(s) and their time duration(s).

To represent a monotone/monotone sequence, the prefix `M` is used and the subsequent tone part is placed in parantheses following it. Similarly with polytones, the prefix `P` is used and `R` is used for rests.

## Monotones

Monotones refer to tones which are meant to be played singly, but one after the other. Monotones are written specific to the octave the notes belong to. This means that groups of notes with different or same durations can be grouped together, as long as they belong to the same octave. 

There are two ways of representing monotones using MuUp:

1. Notes with common time duration in a single octave are represented as `M(<octave>[<note> ...]<duration>)`.
   
    For example, if the notes C, D and E of the 4th octave were to be played as 8th notes (quavers), they would be notated as: 
    ``` 
    M(4[C D E]8) 
    ```
2. Notes with different time durations for each note in a single octave are represented as `M(<octave>[<note> ...][<duration>...])`. 

    For example, if the notes C, D and E of the 4th octave were to be played as two 4th notes (crochets) and an 8th note (quaver), they would be notated as:
    ```
    M(4[C D E][4 4 8])
    ```

## Polytones

Polytones refer to multiple tones meant to be played together at the same time. Some specific combinations of notes are called chords, although MuUp doesn't support the writing of chords by name (yet).

Polytones are written specific to duration, which means all the notes in the polytone are to be played for the same duration of time. These notes can be in multiple octaves, or a single octave.

1. Polytones which need to be played with tones from a single octave are specified as `P(<octave>[<note> ...]<duration>)`.
    
    For example, if the notes C#, E and Gb of the 4th octave were to be played for a dotted 4th note's worth of time (dotted crochet), it would be notated as:
    ```
    P(4[C# E Gb]4.)
    ```

2. Polytones which need to be played with tones from multiple octaves are specified as `P([<octave> ...]][<note> ...]<duration>)`.
    
    For example, if the note Gb of the 3rd octave and the notes C# and E of the 4th octave were to be played for a half note (minim), it would be notated as:
    ```
    P([4 4 3][C# E Gb]2)
    ```

## Rests

Rests are periods of silence in music. To specify the number of beats for which a rest is to be maintained, the following scheme is followed:

1. If the number of beats are more than or equal to 1, the notation would be `R(<beats>*)`.

    For example, if a 2 beat rest is to be given, the notation for the same would be
    ```
    R(2*)
    ```

2. If the number of beats is a fraction of 1, the notation would be `R(<fraction>/)`.

    For example, if a half beat (1/2) rest is to be maintained, the notation for it would be
    ```
    R(2/)
    ```

For a complete list of examples, click [here](examples.md).

<br>

# Notes
- Currently, the MuUp script and this module does not support the writing and playing of dynamics.
- Playing of polytones which have notes of different durations is currently not supported. To do so, split the notes into sets of notes with the least amount of common time, and group the remaining notes as either monotones or polytones. Examples of this are present [here](examples.md).