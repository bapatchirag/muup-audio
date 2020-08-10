// Imports Error
const Error = require("./definitions").Error

/**
 * Calls appropriate error functions for given error code
 * @param {number} code : Error code
 * @returns {Error} : Error object
 */
function errorFound(code) {
    var error_obj = new Error(code)

    // Error code definitions
    switch(code) {
        case 0:
            error_obj.message = "Bad tone prefix"
            break
        case 1:
            error_obj.message = "Missing octave number"
            break
        case 2:
            error_obj.message = "Bad octave number"
            break
        case 3:
            error_obj.message = "Missing notes"
            break
        case 4:
            error_obj.message = "Bad note names"
            break
        case 5:
            error_obj.message = "Missing duration"
            break
        case 6:
            error_obj.message = "Bad duration number"
            break
        case 7:
            error_obj.message = "Missing rest type/value"
            break
        case 8:
            error_obj.message = "Bad rest type"
            break
        case 9:
            error_obj.message = "Bad rest value"
            break
        case 10:
            error_obj.message =  "Note-octave count mismatch"
            break
        case 11:
            error_obj.message = "Note-duration count mismatch"
            break
        case 12:
            error_obj.message = "Bad Format"
            break
        case 13:
            error_obj.message = "Undefined"
            break
    }

    return error_obj
}

module.exports = {errorFound}