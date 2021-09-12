const express = require('express')
const stockRouter = express.Router()
const morgan = require('morgan')
const path = require('path')
const {createNewUser, getSignUpPage} = require('../../controllers/signUpController')
const {getSignInPage} = require('../../controllers/signInController')
const {validatorArray} = require('../../validators/validators')
const passport = require('passport')
const {initializeLocal} = require('../../controllers/passportController')
const {getIndex,getMainPage} = require('../../controllers/mainPageController')
const {checkAuthenticated, checkNotAuthenticated, logUserOut} = require("../../controllers/authentication")
const { authenticate } = require('passport')
const methodOverride = require('method-override')
const {addStocks, getUserStocks,getOneStock, deleteStock, checkValidStockName} = require("../../controllers/stockController")


initializeLocal()
const pubicDirPath = path.join(__dirname,"/../../public")
stockRouter.use(express.static(pubicDirPath))


stockRouter.use(methodOverride('_method'))
stockRouter.use(express.urlencoded({ extended: true }));
stockRouter.use(express.json());
stockRouter.use(morgan('dev'))


stockRouter.get('',checkNotAuthenticated, getIndex)

stockRouter.get('/welcome', checkAuthenticated, getMainPage, getUserStocks)
stockRouter.post('/welcome',checkValidStockName, addStocks)
stockRouter.get("/stocklist/:id",getOneStock)
stockRouter.delete("/stocklist/:id",deleteStock, (req, res) => {
    res.redirect("/stock-api/stocklist")
})
stockRouter.get("/stocklist",checkAuthenticated,getUserStocks)
stockRouter.get('/sign-in', checkNotAuthenticated, getSignInPage)
stockRouter.get('/sign-up', checkNotAuthenticated,  getSignUpPage)
stockRouter.post('/sign-up', checkNotAuthenticated, validatorArray, createNewUser)
stockRouter.post('/sign-in', checkNotAuthenticated, passport.authenticate("local",{
    successRedirect: "/stock-api/welcome",
    failureRedirect:"/stock-api/sign-in",
    successFlash:true,
    failureFlash:true
}))
stockRouter.post('/sign-out',logUserOut)
stockRouter.get('/main', (req, res)=>{
    res.render('main')
})

stockRouter.get('/test', checkValidStockName)

module.exports = stockRouter;
