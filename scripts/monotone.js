// Import component extraction functions and list of notes
let index = require("../index")
const comp_check = require("./componentCheck")

// Any monotonal string to be returned as an object of class Monotone
class Monotone {
    constructor(tone_string) {
        this.tone_string = tone_string
        this.octave = "Bad"
        this.notes = "Bad"
        this.note_count = 0
        this.duration = "Bad"
        this.duration_count = 0
        this.bad_element_count = 3
    }
}

/**
 * Given tone, return object of type Monotone with appropriate attributes
 * @param {string} tone : String without leading M()
 * @returns {object} : Final erroneous/correct Monotone object
 */
function getMonotoneComponents(tone) {
    // Create a Monotone object, to be returned
    var mono_obj = new Monotone(tone)

    // Get octave number(s)
    var octave_obj = comp_check.are_correct_octaves(tone, "M")
    mono_obj.octave = octave_obj.octave

    // Check for bad octave
    if(mono_obj.octave == "Bad") {
        return mono_obj
    }

    // Update bad element count
    mono_obj.bad_element_count--

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave omitted string
    var non_octave_tone = tone.substring(1)

    // Get note list
    var note_obj = comp_check.are_correct_notes(non_octave_tone, index.all_notes)
    mono_obj.notes = note_obj.notes
    mono_obj.note_count = note_obj.note_count

    // Checks for bad notes - extra condition to double check
    if(mono_obj.note_count == 0 || mono_obj.notes == "Bad") {
        return mono_obj
    }

    // Update bad element count
    mono_obj.bad_element_count--

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave and note omitted string
    var non_note_tone = non_octave_tone.substring(non_octave_tone.indexOf("]") + 1)

    // Get duration(s)
    var duration_obj = comp_check.are_correct_durations(non_note_tone, "M")
    mono_obj.duration = duration_obj.durations
    mono_obj.duration_count = duration_obj.duration_count

    // Checks for bad durations - extra condition to double check
    if(mono_obj.duration_count == 0 || mono_obj.duration == "Bad") {
        return mono_obj
    }
    mono_obj.bad_element_count--

    // Return final errorless monotone object
    return mono_obj
}

module.exports = {getMonotoneComponents}