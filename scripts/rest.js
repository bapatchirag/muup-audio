// Import rest extraction function, definitions and error handling function
const rest_check = require("./componentCheck").is_correct_rest
const Rest = require("../definitions").Rest
const Error = require("../definitions").Error
const errors = require("../errors")

/**
 * Given rest string, return Rest object with appropriate attributes
 * @param {string} rest : Rest string without leading R()
 * @returns {object} : Final erroneous/correct Rest object
 */
function getRestComponents(rest) {
    // Create Rest object to be returned
    var rest_obj = new Rest(rest)

    // Get rest attributes
    var rest_check_result = rest_check(rest)
    if(rest_check_result instanceof Error) {
        return rest_check_result
    }
    else {
        rest_obj.rest_amount = rest_check_result.duration
        return rest_obj
    }
}

module.exports = {getRestComponents}