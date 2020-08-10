// Import error handler
const errors = require("../errors")

/**
 * Get octave number(s) based on tone string and type of tone
 * @param {string} tone : Stripped tone string
 * @param {string} type : Type of tone
 * @returns {object} : If valid, octave number array and number of octaves mentioned. If invalid, corresponding error object
 */
function are_correct_octaves(tone, type) {
    var result_octave = {
        octaves: [],
        octave_count: 0
    }

    if(type == "P") {
        // Get octave number(s)
        var first_ptone_char = tone[0]

        // If a single octave is specified
        if(first_ptone_char != '[') {
            // Only octaves 1 through 7 are recognized
            if(first_ptone_char >= 1 && first_ptone_char <= 7) {
                result_octave.octaves.push(first_ptone_char)
                result_octave.octave_count = 1
            }
            else {
                return errors.errorFound(2)
            }
        }
        // If multiple octave numbers are specified in a space separated list
        else {
            var octave_list = tone.substring(1, tone.indexOf("]")).split(" ")
            
            // Check whether each element of octave_list is a valid octave or not
            function validate_octave(test) {
                return (test >= 1 && test <= 7)
            }
            if(!octave_list.every(validate_octave)) {
                if(octave_list.length == 0 || octave_list[0] == "") {
                    return errors.errorFound(1)
                }
                else {
                    return errors.errorFound(2)
                }
            }

            // If all elements of octave_list are valid octave numbers
            result_octave.octaves = octave_list
            result_octave.octave_count = octave_list.length
        }
    }
    else if(type == "M") {
        // Get octave number
        var first_mtone_char = tone[0]
        if(first_mtone_char >= 1 && first_mtone_char <= 7) {
            result_octave.octaves.push(first_mtone_char)
            result_octave.octave_count = 1
        }
        else {
            return errors.errorFound(2)
        }
    }

    return result_octave
}

/**
 * Gets notes from the octave omitted tone string
 * @param {string} no_octave_tone : Stripped tone string without initial octave component
 * @param {Array<string>} all_notes : All notes which are valid and can be considered
 * @returns {object} : If valid, note array and number of notes. If invalid, corresponding error object
 */
function are_correct_notes(no_octave_tone, all_notes) {
    var result_notes = {
        notes: [],
        note_count: 0
    }

    // String must begin with a opening square brace
    if(no_octave_tone[0] != '[') {
        return errors.errorFound(12)
    }
    else {
        // Get space separated notes
        var note_list = no_octave_tone.substring(1, no_octave_tone.indexOf(']')).split(" ")

        // Check if all elements of note_list are valid notes
        function validate_notes(element, index) {
            if(!all_notes.includes(element)) {
                // Check for alternate sharp/flat representation for notes
                switch(element) {
                    case "Db":
                        note_list[index] = "C#"
                        break
                    case "Eb":
                        note_list[index] = "D#"
                        break
                    case "E#":
                        note_list[index] = "F"
                        break
                    case "Fb":
                        note_list[index] = "E"
                        break
                    case "Gb":
                        note_list[index] = "F#"
                        break
                    case "Ab":
                        note_list[index] = "G#"
                        break
                    case "Bb":
                        note_list[index] = "A#"
                        break
                    case "B#":
                        note_list[index] = "C"
                        break
                    case "Cb":
                        note_list[index] = "B"
                        break
                    default:
                        return false
                }
            }
            return true
        }
        // If at least one element is not valid
        if(!note_list.every(validate_notes)) {
            if(note_list.length == 0 || note_list[0] == "") {
                return errors.errorFound(3)
            }
            else {
                return errors.errorFound(4)
            }
        }

        // Generate appropriate result object attributes
        result_notes.notes = note_list
        result_notes.note_count = note_list.length

        return result_notes
    }
}

/**
 * Get appropriate measures from octave and note omitted tone string
 * @param {string} no_note_tone : Octave and note component omitted tone string
 * @param {string} type : Type of tone
 * @returns {object} : If valid, durations and number of durations. If invalid, corresponding error object
 */
function are_correct_durations(no_note_tone, type) {
    var result_durations = {
        durations: [],
        duration_count: 0
    }

    if(type == "P") {
        // Check for augmented dot presence
        if(no_note_tone[no_note_tone.length - 1] != '.') {
            var duration_unaug_single = no_note_tone
            
            // Check whether duration is valid
            if(!(/^\d+$/.test(duration_unaug_single)) || parseInt(duration_unaug_single) != duration_unaug_single || Math.log2(duration_unaug_single) % 1 !== 0) {
                return errors.errorFound(6)
            }
            else if(duration_unaug_single.length == 0) {
                return errors.errorFound(5)
            }
            else {
                result_durations.durations.push(duration_unaug_single + "n")
                result_durations.duration_count = 1
            }
        }
        else {
            var duration_aug_single = no_note_tone.substring(0, no_note_tone.length - 1)

            // Check whether duration is valid
            if(!(/^\d+$/.test(duration_aug_single)) || parseInt(duration_aug_single) != duration_aug_single || Math.log2(duration_aug_single) % 1 !== 0) {
                return errors.errorFound(6)
            }
            else if(duration_aug_single.length == 0) {
                return errors.errorFound(5)
            }
            else {
                result_durations.durations.push(duration_aug_single + "n.") 
                result_durations.duration_count = 1
            }
        }
    }
    else if(type == "M") {
        if(no_note_tone[0] != '[') {
            // Check for augmented dot presence
            if(no_note_tone[no_note_tone.length - 1] != '.') {
                var duration_unaug_single = no_note_tone
                
                // Check whether duration is valid
                if(!(/^\d+$/.test(duration_unaug_single)) || parseInt(duration_unaug_single) != duration_unaug_single || Math.log2(duration_unaug_single) % 1 !== 0) {
                    return errors.errorFound(6)
                }
                else if(duration_unaug_single.length == 0) {
                    return errors.errorFound(5)
                }
                else {
                    result_durations.durations.push(duration_unaug_single + "n") 
                    result_durations.duration_count = 1
                }
            }
            else {
                var duration_aug_single = no_note_tone.substring(0, no_note_tone.length - 1)

                // Check whether duration is valid
                if(!(/^\d+$/.test(duration_aug_single)) || parseInt(duration_aug_single) != duration_aug_single || Math.log2(duration_aug_single) % 1 !== 0) {
                    return errors.errorFound(6)
                }
                else if(duration_aug_single.length == 0) {
                    return errors.errorFound(5)
                }
                else {
                    result_durations.durations.push(duration_aug_single + "n.")
                    result_durations.duration_count = 1
                }
            }
        }
        else {
            // Get complete list of durations
            var duration_list = no_note_tone.substring(1, no_note_tone.indexOf(']')).split(" ")

            // Check if all durations specified are valid
            function validate_durations(element) {
                if(element[element.length - 1] != '.') {
                    var duration_unaug_multi = element

                    // Check whether duration is valid
                    return ((/^\d+$/.test(duration_unaug_multi)) && parseInt(duration_unaug_multi) == duration_unaug_multi && Math.log2(duration_unaug_multi) % 1 == 0)
                }
                else {
                    var duration_aug_multi = element.substring(0, element.length - 1)
    
                    // Check whether duration is valid
                    return ((/^\d+$/.test(duration_aug_multi)) && parseInt(duration_aug_multi) == duration_aug_multi && Math.log2(duration_aug_multi) % 1 == 0)
                }                
            }
            // If at least one element is not valid
            if(!(duration_list.every(validate_durations))) {
                if(duration_list.length == 0 || duration_list[0] == "") {
                    return errors.errorFound(5)
                }
                return errors.errorFound(6)
            }

            // Generate appropriate result object attributes
            result_durations.durations = duration_list.map((element) => {
                if(element[element.length - 1] != '.') {
                    return (element + "n")
                }
                else {
                    return (element.substring(0, element.length - 1) + "n.")
                }
            })
            result_durations.duration_count = duration_list.length
        }
    }
    return result_durations
}

/**
 * Get appropriate rest type (fractional or whole) and rest duration from rest string
 * @param {string} rest : Rest string
 * @returns {object} : If valid, rest type and duration. If invalid, corresponding error object
 */
function is_correct_rest(rest) {
    var result_rest = {
        type: "Bad",
        duration: 0
    }

    if(rest.length <= 1) {
        return errors.errorFound(7)
    }

    // For valid rest types
    var rest_type = rest[rest.length - 1]
    if(rest_type == '*' || rest_type == '/') {
        var rest_duration = rest.substring(0, rest.length - 1)

        // If rest duration is not an integer
        if(!(/^\d+$/.test(rest_duration)) || Math.log2(rest_duration) % 1 !== 0) {
            return errors.errorFound(9)
        }

        if(rest_type == '*') {
            result_rest.type = "Whole"
            result_rest.duration = rest_duration
        }
        else {
            result_rest.type = "Fractional"
            result_rest.duration = 1 / rest_duration
        }
    }
    else {
        return errors.errorFound(8)
    }

    return result_rest    
}

module.exports = {are_correct_octaves, are_correct_notes, are_correct_durations, is_correct_rest}