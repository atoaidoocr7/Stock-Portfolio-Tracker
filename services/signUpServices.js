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



const createUser = (userData) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            //Checking if email eixts in our db
            let userFound = await checkIfEmailExists(userData.email)
            console.log(userFound)

            //If email exists reject
            if(userFound){
                reject("A user with this email already exists")
            }else if(!userFound){
                const hashedPassword = await bcrypt.hash(userData.password,10)
                let newUser = {
                    fname: userData.firstname,
                    lname: userData.lastname,
                    email: userData.email,
                    pword: hashedPassword
                }

                const sql = 'INSERT INTO users SET ?'
                db.query(sql,newUser,(error, result)=>{
                    if(error){
                        reject(error)
                    }
                    else if(!error){
                        resolve("New User succesfully created!")
                    }

                })
            }
            
        }catch(error){
            reject(error)
        }
    })
}

const checkIfEmailExists = (email) =>{
    return new Promise((resolve, reject)=>{
        try{
            const sql = 'SELECT * FROM users WHERE email = ?'
            db.query(sql, [email], (error, result)=>{
                if(error){
                    reject(false)
                }
                if(result.length>0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        }catch(error){
            reject(error)
        }  
    })
}

module.exports = {createUser, checkIfEmailExists}