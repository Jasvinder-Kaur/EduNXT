require('dotenv').config({path:'../.env'})
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const offersModel = new mongoose.Schema({
    id:{
        type:String,
        default: uuidv4(),
        require:true,
        unique:true,
        trim:true
    },
    company:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true
    },
    exprience:{
        type:Number,
        required:true,
    },
    skill:{
        type:Number,
        required:true,
      },
    salary:{
        type:String,
        required:true,

    },
    suggestion:{
        type:String,
    }
},
{
    timestamps:true
}
)
const Offer = mongoose.model('Offer', offersModel)
module.exports = Offer