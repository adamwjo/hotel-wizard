const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    
    //email is valid
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Must input a valid email address'
    }
    
    //email is required
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Must input an email address'
    }
    
    //password is required
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Must input password'          
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
    
};