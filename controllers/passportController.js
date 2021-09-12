const passport = require('passport')
const passportLocal = require('passport-local')
const {findUserByEmail, comparePassword, findUserById} = require('../services/signInServices')
const LocalStrategy = passportLocal.Strategy

const passportCallBack = async (req, email ,password, done)=>{
    try{
        let user = await findUserByEmail(email)
        if(!user){
            return done(null, false, req.flash("errors","There is no user with this email"))
        }
        if(user){
            comparePassword(user, password).then((result)=>{
                console.log("printing result")
                console.log(result)
                if(result==true){
                    return done(null, user)
                }else if(result==false){
                    return done(null, false,req.flash("errors","Incorrect password"))
                }
            }).catch((error)=>{
                return error
            })

        }
    }catch(error){
        return done(null, false, error)
    }
}
const initializeLocal = () =>{
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField: 'password',
        passReqToCallback: true
    }, passportCallBack))
}

passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    findUserById(id).then((user)=>{
        return done(null, user)
    }).catch(error=>{
        return done(error, null)
    }) 
})

module.exports ={initializeLocal}