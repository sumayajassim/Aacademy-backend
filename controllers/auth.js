mongoose = require('mongoose');
User = require('../models/User');
const salt = 10 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const signup = async(req, res) =>{
    console.log(req.body);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt)
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.json(newUser);
    }catch (err){
        res.json(err)
    }
}


const login = async(req, res) => {
    let {email, password} = req.body;
    try{
        let user = await User.findOne({email});

        if(!user){
            return res.json({error: "User not found!"}).status(400);
        }

        const isMatch = await bcrypt.compareSync(password, user.password);

        if(!isMatch){
            return res.json({error: "Password not matched!"}).status(401);
        }

        const payload = {
            user: {
                id: user._id,
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: 36000000},
            (err, token) => {
                if(err) throw err;
                //returns token as an object >>>>  {token : <token value>}
                res.json({token}).status(200)
            }
        )

    } catch (err){
        res.json({error: "You are not logged in!"}).status(400);
    }
}


module.exports = {
    signup,
    login

}