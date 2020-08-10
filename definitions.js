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
        this.rest_type = null
        this.rest_amount = 0
        this.bad_component_count = 2
    }

    /**
     * Reduced bad component count when component checks out
     */
    not_bad_component() {
        this.bad_component_count -= 1
    }
}

/**
 * @classdesc Describes an individual token from comma separated MuUp string
 */
class Token {
    /**
     * Creates a Token object
     * @constructor
     */
    constructor() {
        this.token_type = null
        this.tone_string = null
        this.time = null
        this.is_good_token = false
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

module.exports = {PlayableTone, Rest, Token, Final, Error, all_notes}