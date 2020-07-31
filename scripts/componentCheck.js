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
        var first_tone_char = tone[0]

        // If a single octave is specified
        if(first_tone_char != '[') {
            // Only octaves 1 through 7 are recognized
            if(!isNaN(parseInt(first_tone_char)) && parseInt(first_tone_char) >= 1 && parseInt(first_tone_char) <= 7) {
                result_octave.octave = first_tone_char
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
            octave_list.forEach((element) => {
                if(isNaN(element) || parseInt(element) < 1 || parseInt(element) > 7) {
                    return result_octave
                }            
            });

            // If all elements of octave_list are valid octave numbers
            result_octave.octave = octave_list
            result_octave.octave_count = octave_list.length
        }
    }
    else if(type == "M") {
        // Get octave number
        var first_tone_char = tone[0]
        if(!isNaN(parseInt(first_tone_char)) && parseInt(first_tone_char) >= 1 && parseInt(first_tone_char) <= 7) {
            result_octave.octave = first_tone_char
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

module.exports = {are_correct_octaves}