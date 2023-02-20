const jwt = require('jsonwebtoken')
require("dotenv").config()

module.exports = (req, res, next) => {
    let token = ""
    let authorizationToken = req.header("Authorization")

    if(!authorizationToken){
        return res.status(401).json({message: "You are unauthorized to view this!"})
    }
    if(authorizationToken){
        authorizationToken = authorizationToken.replace("Bearer ", "")
        token = authorizationToken
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded.user
        next()
    }catch(err){
        return res.status(401).json({message: "Your token is invalid!"})
    }
}