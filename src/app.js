const hbs = require('hbs')
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const stockRouter = require('./routers/routers')
const flash = require('connect-flash')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const cookieParser = require('cookie-parser')


//App Initialization
const app = express()

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave:true,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 //8640000 1 day
    }
}))

//Connecting flash
app.use(flash())

//Passport
app.use(passport.initialize())
app.use(passport.session())



//Router configuration
app.use('/stock-api', stockRouter)



//Views and paritial paths
const pubicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Static directory configuration
app.use(express.static(pubicDirPath))
app.use(morgan('dev'))

//Views and paritial configurations
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Body Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())





app.listen(3001, ()=>{
    console.log("Listenig on current port")
})




