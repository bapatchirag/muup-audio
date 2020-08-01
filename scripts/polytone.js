// Import component extraction functions and list of notes
let index = require("../index")
const comp_check = require("./componentCheck")

// Any polytonal string to be returned as an object of class Polytone
class Polytone {
    constructor(tone_string) {
        this.tone_string = tone_string
        this.octaves = "Bad"
        this.octave_count = 0
        this.notes = "Bad"
        this.note_count = 0
        this.duration = "Bad"
        this.bad_element_count = 3
    }
}

/**
 * Given tone, return object of type Polytone with appropriate attributes
 * @param {string} tone : String without leading P()
 * @returns {object} : Final erroneous/correct Polytone object
 */
function getPolytoneComponents(tone) {
    // Create a Polytone object, to be returned
    var poly_obj = new Polytone(tone)

    // Get octave number(s)
    var octave_obj = comp_check.are_correct_octaves(tone, "P")
    poly_obj.octaves = octave_obj.octave
    poly_obj.octave_count = octave_obj.octave_count

    // Check for bad octave - extra condition to double check
    if(poly_obj.octave_count == 0 || poly_obj.octaves == "Bad") {
        return poly_obj
    }

    // Update bad element count
    poly_obj.bad_element_count--

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave omitted string
    var non_octave_tone = (tone[0] == '[') ? tone.substring(tone.indexOf("]") + 1) : tone.substring(1)

    // Get note list
    var note_obj = comp_check.are_correct_notes(non_octave_tone, index.all_notes)
    poly_obj.notes = note_obj.notes
    poly_obj.note_count = note_obj.note_count

    // Checks for bad notes - extra condition to double check
    if(poly_obj.note_count == 0 || poly_obj.notes == "Bad" || poly_obj.note_count != poly_obj.octave_count) {
        return poly_obj
    }

    // Update bad element count
    poly_obj.bad_element_count--

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave and note omitted string
    var non_note_tone = non_octave_tone.substring(non_octave_tone.indexOf("]") + 1)

    // Get duration(s)
    var duration_obj = comp_check.are_correct_durations(non_note_tone, "P")
    poly_obj.duration = duration_obj.durations

    // Checks for bad durations - extra condition to double check
    if(poly_obj.durations == "Bad") {
        return poly_obj
    }
    poly_obj.bad_element_count--

    // Return final errorless polytone object
    return poly_obj
}

module.exports = {getPolytoneComponents}