const getSignInPage = (req, res) =>{
    res.render('sign-in',{
        success:req.flash("success"),
        errors: req.flash("errors")
    })
}



module.exports = {getSignInPage}