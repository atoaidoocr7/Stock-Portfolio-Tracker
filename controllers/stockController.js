const {password} = require('../../password')
const sql = require('mysql2')
const nodeFetch = require("node-fetch")
const APIKEY = require("./apikey")

//DATABSE CONFIGURATIONS
let db = sql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : password,
    database: 'stockapi'
})

db.connect((error)=>{
    if(error){
        console.log(error)
    }
    console.log("SUCCESS!")
})

const addStocks = (req, res) =>{
    const stockName= req.body.stock_name;
    const sql = 'INSERT INTO stocks SET ?'
    let items = {
        stock_name: stockName,
        user_id:req.user.id
    }
    db.query(sql, items,(error, result)=>{
        if(error){
            console.log("UNABLE TO ADD STOCK")
        }
        else if(!error){
            console.log("STOCK ADDED!")
            res.redirect('/stock-api/stocklist')
        }
    })
}

const checkValidStockName = async (req,res,next) =>{
        const response = await nodeFetch(`https://api.twelvedata.com/price?symbol=${req.body.stock_name}&apikey=${APIKEY}`);
        const body = await response.json();
        if(body.code){
                res.render('welcome',{
                errors:req.flash("errors","There is no user with this email")})
        }else{
            next()
        }
}
const getUserStocks = (req, res) =>{
    const sql = "SELECT * FROM stocks WHERE user_id=?"
    db.query(sql, req.user.id, (error, result)=>{
        if(error){
            console.log("FAILURE")
            return error
        }
        const tempArray = []
        const userStocks = []
        const userObject = {
            stock_name:" ",
            id: -1
        }
        result.forEach((item)=>{
            if(tempArray.indexOf(item.stock_name) !== -1){
                return
            }else{
                tempArray.push(item.stock_name)
                const newObj = Object.create(userObject)
                newObj.stock_name = item.stock_name
                newObj.id = item.id
                userStocks.push(newObj)
            }
        })
        console.log(userStocks)
        res.render('stocks',{result:userStocks, user:req.user})
    })
}

const getOneStock = (req, res) =>{
    const sql = "SELECT * FROM stocks WHERE id=?"
    db.query(sql, req.params.id, (error, result)=>{
        if(error){
            return error
        }
        console.log(result[0])
        res.render('details',{result:result[0]})
        
    })
}

const deleteStock = (req, res,next) =>{
    let temp = ""
    const sql = "SELECT stock_name FROM stocks where id = ?"
    db.query(sql, req.params.id, (error, result)=>{
        if(error){
            return error
        }
        temp = result[0].stock_name
        const secondQuery = "DELETE FROM stocks where stock_name = ?"
        db.query(secondQuery, temp, (error, result)=>{
            if(error){
                return error
            }
        })
    })
    next()
}

module.exports = {addStocks, getUserStocks,getOneStock, deleteStock, checkValidStockName}
