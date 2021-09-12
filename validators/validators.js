const { check} = require('express-validator');

const checkConfirm = check('repeatPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))

const validatorArray = [
    check('fname', 'First Name is Required').not().isEmpty(),
    check('lname', 'Last Name is Required').not().isEmpty(),
    check('email', 'Email cannot be empty').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password must be of minimum length 8 ').isLength({min:8}),
    checkConfirm ]

module.exports = {validatorArray}