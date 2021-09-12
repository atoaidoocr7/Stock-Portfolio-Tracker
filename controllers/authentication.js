const checkAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/stock-api/sign-in')
}

const checkNotAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return res.redirect('/stock-api/welcome')
    }
    next()
}
const checkStockAuthentication = (req, res, next) =>{
    if(req.isAuthenticated()){
        return res.redirect('/stock-api/stocklist')
    }
    next()
}

const logUserOut = (req, res) =>{
    req.session.destroy((error)=>{
        res.redirect('/stock-api/sign-in')
    })
}
module.exports = {checkAuthenticated, checkNotAuthenticated, logUserOut, checkStockAuthentication}