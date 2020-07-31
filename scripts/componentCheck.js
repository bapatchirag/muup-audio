/**
 * Get octave number(s) based on tone string and type of tone
 * @param {string} tone : Stripped tone string
 * @param {string} type : Type of tone
 * @returns {object} : If valid, octave number string/array and number of octaves mentioned. If invalid, "Bad" and 0
 */
function are_correct_octaves(tone, type) {
    var result_octave = {
        octave: "Bad",
        octave_count: 0
    }

    if(type == "P") {
        // Get octave number(s)
        var first_ptone_char = tone[0]

        // If a single octave is specified
        if(first_ptone_char != '[') {
            // Only octaves 1 through 7 are recognized
            if(first_ptone_char >= 1 && first_ptone_char <= 7) {
                result_octave.octave = first_ptone_char
                result_octave.octave_count = 1
            }
            else {
                return result_octave
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
                return result_octave
            }

            // If all elements of octave_list are valid octave numbers
            result_octave.octave = octave_list
            result_octave.octave_count = octave_list.length
        }
    }
    else if(type == "M") {
        // Get octave number
        var first_mtone_char = tone[0]
        if(first_mtone_char >= 1 && first_mtone_char <= 7) {
            result_octave.octave = first_mtone_char
            result_octave.octave_count = 1
        }
        else {
            return result_octave
        }
    }
    else {
        return result_octave
    }

    return result_octave
}

/**
 * Gets notes from the octave omitted tone string
 * @param {string} no_octave_tone : Stripped tone string without initial octave component
 * @param {Array<string>} all_notes : All notes which are valid and can be considered
 * @returns {object} : If valid, note array and number of notes. If invalid, "Bad" and 0
 */
function are_correct_notes(no_octave_tone, all_notes) {
    var result_notes = {
        notes: "Bad",
        note_count: 0
    }

    // String must begin with a opening square brace
    if(no_octave_tone[0] != '[') {
        return result_notes
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
            return result_notes
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
 * @returns {object} : If valid, durations and number of durations. If invalid, "Bad" and 0
 */
function are_correct_durations(no_note_tone, type) {
    var result_durations = {
        durations: "Bad",
        duration_count: 0
    }

    if(type == "P") {
        // Check for augmented dot presence
        if(no_note_tone[no_note_tone.length - 1] != '.') {
            var duration_unaug_single = no_note_tone
            
            // Check whether duration is valid
            if(!(/^\d+$/.test(duration_unaug_single)) || parseInt(duration_unaug_single) != duration_unaug_single) {
                return result_durations
            }
            else {
                result_durations.durations = duration_unaug_single + "n"
                result_durations.duration_count = 1
            }
        }
        else {
            var duration_aug_single = no_note_tone.substring(0, no_note_tone.length - 1)

            // Check whether duration is valid
            if(!(/^\d+$/.test(duration_aug_single)) || parseInt(duration_aug_single) != duration_aug_single) {
                return result_durations
            }
            else {
                result_durations.durations = duration_aug_single + "n."
                result_durations.duration_count = 1
            }
        }
    }
    else if(type == "M"){
        if(no_note_tone[0] != '[') {
            // Check for augmented dot presence
            if(no_note_tone[no_note_tone.length - 1] != '.') {
                var duration_unaug_single = no_note_tone
                
                // Check whether duration is valid
                if(!(/^\d+$/.test(duration_unaug_single)) || parseInt(duration_unaug_single) != duration_unaug_single) {
                    return result_durations
                }
                else {
                    result_durations.durations = duration_unaug_single + "n"
                    result_durations.duration_count = 1
                }
            }
            else {
                var duration_aug_single = no_note_tone.substring(0, no_note_tone.length - 1)

                // Check whether duration is valid
                if(!(/^\d+$/.test(duration_aug_single)) || parseInt(duration_aug_single) != duration_aug_single) {
                    return result_durations
                }
                else {
                    result_durations.durations = duration_aug_single + "n."
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
                    return (!(/^\d+$/.test(duration_unaug_multi)) || parseInt(duration_unaug_multi) == duration_unaug_multi)
                }
                else {
                    var duration_aug_multi = no_note_tone.substring(0, no_note_tone.length - 1)
    
                    // Check whether duration is valid
                    return (!(/^\d+$/.test(duration_aug_multi)) || parseInt(duration_aug_multi) == duration_aug_multi)
                }                
            }
            // If at least one element is not valid
            if(!duration_list.every(validate_durations)) {
                return result_durations
            }

            // Generate appropriate result object attributes
            result_durations.durations = duration_list.map((element) => {
                if(element[element.length - 1] != '.') {
                    return (element + "n")
                }
                else {
                    return (element + "n.")
                }
            })
            result_durations.duration_count = duration_list.length
        }
    }
    return result_durations
}

module.exports = {are_correct_octaves, are_correct_notes, are_correct_durations}