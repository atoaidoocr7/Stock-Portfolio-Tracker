const {validationResult} = require('express-validator');
const {createUser} = require('../services/signUpServices')

//Function for get sign-up
const getSignUpPage = (req, res) =>{
    res.render('sign-up', {
        errors: req.flash("errors")
    })
}

//Function for post sign-in
const createNewUser = async (req, res) =>{
    //Validating all required fields
    const errorsArr = [];
    let validationErrors = validationResult(req)

    const arrayOfErrors = validationErrors.errors
    if(arrayOfErrors.length>0){
        arrayOfErrors.forEach(element => {
            errorsArr.push(element.msg)
        });
        req.flash("errors", errorsArr)
        return res.redirect('/stock-api/sign-up')
    }
    //creating the new user
    try{
        const user ={
            firstname : req.body.fname,
            lastname : req.body.lname,
            email : req.body.email,
            password : req.body.password
        }
        console.log("WHY NOT PRINTING")
        console.log(req.body)
        const value = await createUser(user)
        req.flash("success", value)
        return res.redirect('/stock-api/sign-in')
    }catch(error){
        req.flash("errors", error)
        res.redirect('/stock-api/sign-up')
    }
}



module.exports = {createNewUser, getSignUpPage}