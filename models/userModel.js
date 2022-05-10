require('dotenv').config({path:'../.env'})
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        default:  uuidv4(),
        require:true,
        unique:true,
        trim:true
    },
    firstName:{
        type:String,
        require:true,
        lowercase:true,
    },
    lastName:{
        type:String,
        require:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
      },

    phoneNo:{
        type:Number,
        required:true,
        trim:true,

    },
    interest:{
        type:Number,
        required:true,

    },
    category:{
        type:Number,
        required:true,
    }  
    
},
{
    timestamps:true,
}
)

userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
    }


    userSchema.pre('save', async function (next){
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
        })

        userSchema.statics.findByCredentials = async (username, password) => {
            const user = await User.findOne({username})
            if(!user){
               throw new Error('User not found')
            }
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
               throw new Error('Password is wrong')
            }
            return user
        }


        userSchema.methods.generateAuthToken = async function(){
            const user = this
             user.token = jwt.sign({_id:user._id},process.env.USER_SECRET)
            await user.save()
            return user.token
        }

const User = mongoose.model('User',userSchema)
module.exports = User