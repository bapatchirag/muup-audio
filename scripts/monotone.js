// Import component extraction functions, definitions, errors and valid note list
const comp_check = require("./componentCheck")
const PlayableTone = require("../definitions").PlayableTone
const Error = require("../definitions").Error
const errors = require("../errors")
const all_notes = require("../definitions").all_notes

/**
 * Given tone, return object with appropriate attributes
 * @param {string} tone : String without leading M()
 * @returns {object} : Final erroneous/correct object
 */
function getMonotoneComponents(tone) {
    // Create a Polytone object, to be returned
    var mono_obj = new PlayableTone()

    // Get octave number(s)
    var octave_result = comp_check.are_correct_octaves(tone, "M")

    // Check for bad octave(s)
    if(octave_result instanceof Error) {
        return octave_result
    }
    else {
        mono_obj.octaves = octave_result.octaves
        mono_obj.not_bad_component()
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
    else {
        mono_obj.notes = note_result.notes
        mono_obj.not_bad_component()        
    }

    /* ----------------------------------------------------------------------------------------------------------------------------- */

    // Get octave and note omitted string
    var non_note_tone = non_octave_tone.substring(non_octave_tone.indexOf("]") + 1)

    // Get duration(s)
    var duration_result = comp_check.are_correct_durations(non_note_tone, "M")

    // Checks for bad durations - extra condition to double check
    if(duration_result instanceof Error) {
        return duration_result
    }
    else if(duration_result.duration_count != 1 && mono_obj.notes.length != duration_result.duration_count) {
        return errors.errorFound(11)
    }
    else {
        mono_obj.durations = duration_result.durations
        mono_obj.not_bad_component()
    }

    // Return final errorless polytone object
    if(mono_obj.bad_component_count == 0) {
        return mono_obj
    }
    else {
        return errors.errorFound(13)
    }
}

module.exports = {getMonotoneComponents}