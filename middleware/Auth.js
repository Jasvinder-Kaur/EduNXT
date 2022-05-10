require('dotenv').config({path:'../config/.env'})
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const User = require('../models/userModel')
const auth = async (req, res , next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify( token, process.env.USER_SECRET)
        const id = mongoose.Types.ObjectId(decoded._id)
        const user = await User.findOne({_id:id , token:token})
        if(user) throw new Error("User not found!!")
        req.token = token
        req.user = user
        console.log("Auth working")
       next()
   } catch (error) {
     flags(undefined, 401 , req ,res)
   }
}
module.exports = auth