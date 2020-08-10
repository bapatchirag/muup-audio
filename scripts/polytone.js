// Import component extraction functions, definitions, errors and valid note list
const comp_check = require("./componentCheck")
const PlayableTone = require("../definitions").PlayableTone
const Error = require("../definitions").Error
const errors = require("../errors")
const all_notes = require("../definitions").all_notes

/**
 * Given tone, return object of type Polytone with appropriate attributes
 * @param {string} tone : String without leading P()
 * @returns {object} : Final erroneous/correct Polytone object
 */
function getPolytoneComponents(tone) {
    // Create a Polytone object, to be returned
    var poly_obj = new PlayableTone()

    // Get octave number(s)
    var octave_result = comp_check.are_correct_octaves(tone, "P")

    // Check for bad octave(s)
    if(octave_result instanceof Error) {
        return octave_result
    }
    else {
        poly_obj.octaves = octave_result.octaves
        poly_obj.not_bad_component()
    }

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave omitted string
    var non_octave_tone = (tone[0] == '[') ? tone.substring(tone.indexOf("]") + 1) : tone.substring(1)

    // Get note list
    var note_result = comp_check.are_correct_notes(non_octave_tone, all_notes)

    // Checks for bad notes/note-octave count mismatch
    if(note_result instanceof Error) {
        return note_result
    }
    else if(poly_obj.octaves.length != 1 && note_result.note_count != poly_obj.octaves.length) {
        return errors.errorFound(10)
    }
    else {
        poly_obj.notes = note_result.notes
        poly_obj.not_bad_component()        
    }

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave and note omitted string
    var non_note_tone = non_octave_tone.substring(non_octave_tone.indexOf("]") + 1)

    // Get duration(s)
    var duration_result = comp_check.are_correct_durations(non_note_tone, "P")

    // Checks for bad durations - extra condition to double check
    if(duration_result instanceof Error) {
        return duration_result
    }
    else {
        poly_obj.durations = duration_result.durations
        poly_obj.not_bad_component()
    }

    // Return final errorless polytone object
    if(poly_obj.bad_component_count == 0) {
        return poly_obj
    }
    else {
        return errors.errorFound(13)
    }
}

module.exports = {getPolytoneComponents}