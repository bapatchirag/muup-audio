const Tone = require("tone")

/**
 * Sets BPM of the piece via the Transport global of ToneJS
 * @param {number} bpm : BPM to be set
 */
function setBPM(bpm) {
    Tone.Transport.bpm.value = bpm
}

/**
 * Tokenizes MuUp string and validates token prefixes
 * @param {string} muup : Entire MuUp text to be converted
 * @returns {object} : Object with prefix check result and list of token objects with type and stripped tone strings as attributes
 */
function tokenizeAndValidatePrefix(muup) {
    var validate_result = {
        good: false,
        tokens: []
    }

    // Get list of individual prefixed tone strings after trimming leading and trailing whitespaces
    var separated_list = muup.split(",").map((token) => {
        return token.replace(/^\s+|\s+$/g, '')
    })

    // Prefix validator function
    function validate_prefix(element) {
        const first_two_chars = element.substring(0, 2)
        const last_char = element[element.length - 1]

        // Check if first two characters match appropriate prefix
        if(first_two_chars == "M(" || first_two_chars == "P(" || first_two_chars == "R(") {
            // Check if last character is closing paranthesis
            return (last_char == ")")
        }

        return false
    }

    // Check if all prefixes are validated
    if(separated_list.every(validate_prefix)) {
        validate_result.good = true
        validate_result.tokens = separated_list.map((token) => {
            return {
                type: token[0],
                tone_string: token.substring(2, token.length - 1)
            }
        })
    }

    return validate_result
}

module.exports = {setBPM}