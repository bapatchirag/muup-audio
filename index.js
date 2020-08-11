const Tone = require("tone")
const polytone = require("./scripts/polytone")
const errors = require("./errors")
const Token = require("./definitions").Token
const Error = require("./definitions").Error

// Set up PolySynth for playing polytones
const polysynth = new Tone.PolySynth(5, Tone.Synth).toMaster()

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
        validate_result.tokens.push(new Token(element))

        // Check if first two characters match appropriate prefix
        if(first_two_chars == "M(" || first_two_chars == "P(" || first_two_chars == "R(") {
            // Check if last character is closing parenthesis
            return (last_char == ")")
        }

        return false
    }

    // Check if all prefixes are validated
    if(separated_list.every(validate_prefix)) { 
        validate_result.good = true
    }
    else {
        return errors.errorFound(0)
    }

    return validate_result
}

/**
 * Sets the times of all tokens to be played (currently only Polytone)
 * @param {Array<Token>} token_list : List of verified Token objects
 * @returns {Array<object>} : If valid tone_strings for all tokens, list of playable objects. If not, singleton list of error object.
 */
function getToneObjects(token_list) {
    var tone_obj_list = []
    var complete_notes = []

    // Iterate through every token in the list of tokens
    token_list.forEach((token) => {
        if(token.token_type == "P") {
            var poly_obj = polytone.getPolytoneComponents(token.tone_string)
            if(poly_obj instanceof Error) {
                tone_obj_list = [poly_obj]
                return tone_obj_list
            }
            else {                
                if(poly_obj.octaves.length == 1) {
                    complete_notes = poly_obj.notes.map((note) => {
                        return note + poly_obj.octaves[0]
                    })
                }
                else {
                    for (let index = 0; index < poly_obj.octaves.length; index++) {
                        complete_notes.push(poly_obj.notes[index] + poly_obj.octaves[index])                        
                    }
                }
            }
            tone_obj_list.push({
                note: complete_notes,
                duration: poly_obj.durations[0]
            })
        }
    })
    return tone_obj_list
}

/**
 * Plays audio from complete MuUp string
 * @param {string} muup : Complete MuUp string
 */
function playAudio(muup) {
    var status = {
        instance: "Success",
        message: "OK"
    }

    const token_obj = tokenizeAndValidatePrefix(muup)
    if(!(token_obj instanceof Error)) {
        const tone_obj_list = getToneObjects(token_obj.tokens)

        if(!(tone_obj_list[0] instanceof Error)) {
            var time = Tone.now()
            tone_obj_list.forEach((obj) => {
                polysynth.triggerAttackRelease(obj.note, obj.duration, time)
                time += Tone.Time(obj.duration).toSeconds()
            })
        }
        else {
            status.instance = "Error"
            status.message = tone_obj_list[0].message
        }
    }
    else {
        status.instance = "Error"
        status.message = token_obj.message
    }

    return status
}

module.exports = {setBPM, playAudio}