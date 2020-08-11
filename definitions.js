/**
 * @classdesc Describes a tone which has a non-zero volume, i.e. a polytone or a monotone
 */
class PlayableTone {
    /**
     * Creates a basic PlayableTone object 
     * @constructor
     */
    constructor() {
        this.octaves = []
        this.notes = []
        this.durations = []
        this.bad_component_count = 3
    }

    /**
     * Reduces bad component count when component checks out
     */
    not_bad_component() {
        this.bad_component_count -= 1
    }
}

/**
 * @classdesc Describes a volumeless tone, i.e. a rest
 */
class Rest {
    /**
     * Creates a basic Rest object
     * @constructor
     */
    constructor() {
        //this.rest_type = null
        this.rest_amount = ""
    }   
}

/**
 * @classdesc Describes an individual token from comma separated MuUp string
 */
class Token {
    /**
     * Creates a Token object
     * @param {string} full_string : Complete token string
     * @constructor
     */
    constructor(full_string) {
        this.token_type = full_string[0]
        this.tone_string = full_string.substring(2, full_string.length - 1)
    }
}

/**
 * @classdesc Describes an erroneous event
 */
class Error {
    /**
     * Creates a Error object
     * @param {number} code : Error code
     * @constructor
     */
    constructor(code) {
        this.code = code
        this.message = null
    }
}

// List of valid notes
const all_notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

module.exports = {PlayableTone, Rest, Token, Error, all_notes}