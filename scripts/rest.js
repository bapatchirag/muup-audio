// Import rest extraction function
const rest_check = require("./componentCheck")

// Any rest string to be returned as an object of class Rest
class Rest {
    constructor(rest_string) {
        this.rest_string = rest_string
        this.rest_type = "Bad"
        this.rest_duration = 0
    }
}

/**
 * Given rest string, return Rest object with appropriate attributes
 * @param {string} rest  Rest string without leading R()
 * @returns {Rest} : Final erroneous/correct Rest object
 */
function getRestComponents(rest) {
    // Create Rest object to be returned
    var rest_obj = new Rest(rest)

    // Get rest attributes
    var rest_check_result = rest_check.is_correct_rest(rest)
    rest_obj.rest_type = rest_check_result.type
    rest_obj.rest_duration = rest_check_result.duration

    return rest_obj
}

module.exports = {getRestComponents}