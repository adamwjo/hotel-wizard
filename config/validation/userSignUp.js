const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    //if the data is NOT empty data gets sent to subsequent lines of code for further validation
    //Validator can only check strings
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    //Checks first name for proper length on sign up
    if(!Validator.isLength(data.first_name, { min: 2, max: 30})){
        errors.first_name = "First name must be between 2 and 30 characters."
    }

    //Checks to see if first name field is empty
    if(Validator.isEmpty(data.first_name)){
        errors.first_name = "Must submit first name."
    }

    //Checks last name for proper length on sign up
    if(!Validator.isLength(data.last_name, { min: 2, max: 30})){
        errors.last_name = "Last name must be between 2 and 30 characters."
    }

    //Checks to see if last name field is empty
    if(Validator.isEmpty(data.last_name)){
        errors.Last_name = "Must submit last name."
    }

    //Checks to see if email field is empty
    if(Validator.isEmpty(data.email)){
        errors.email = "Must submit email"
    }

    //Checks for valid email input
    if(!Validator.isEmail(data.email)){
        errors.email = 'Must submit valid email'
    }

    //checks to see if password field isnt empty
    if (Validator.isEmpty(data.password)) {
        errors.password = "Must submit a password"
    }

    //Checks the password for valid length
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters"
    }

    //Checks to see if password confirmation is empty
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password confirmation field cannot be blank"
    }

    //Checks to see if password confirmation matches first password input
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password inputs must match"
    }


    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}