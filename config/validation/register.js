const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if(!Validator.isLength(data.first_name, { min: 2, max: 30})){
        errors.first_name = "Name must be between 2 and 30 characters.";
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}