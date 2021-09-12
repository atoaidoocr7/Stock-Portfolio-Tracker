const bcrypt = require('bcrypt')
const {password} = require('../../password')
const sql = require('mysql2')
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

const findUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        try{
            let sql = 'SELECT * FROM users WHERE email = ?'
            db.query(sql,[email],(error, result)=>{
                if(error){
                    reject(error)
                }
                const user = result[0]
                resolve(user)
            })
        }catch(e){
            reject(e)
        }
    })
}

const comparePassword = async (user, password) =>{
    const isMatch = await bcrypt.compare(password, user.pword)
    return isMatch
}
const findUserById = (id) =>{
    return new Promise((resolve, reject)=>{
        try{
            let sql = "SELECT * FROM users WHERE id = ?"
            db.query(sql, id, (error, result)=>{
                if(error){
                    reject(error)
                }else if (!error){
                    const user = result[0]
                    resolve(user)
                }
            })
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {findUserByEmail, comparePassword , findUserById}