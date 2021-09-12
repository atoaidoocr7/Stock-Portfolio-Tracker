
const getMainPage = (req, res) =>{
    return res.render('welcome',{
        user:req.user
    })
}

const getIndex = (req,res)=>{
    res.render('index')
}


module.exports = {getMainPage, getIndex}
