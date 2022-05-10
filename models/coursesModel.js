require('dotenv').config({path:'../.env'})
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const coursesModel = new mongoose.Schema({
    id:{
        type:String,
        default: uuidv4(),
        require:true,
        unique:true,
        trim:true
    },
    title:{
        type:String,
        require:true,
    },
    link:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
      },
    description:{
        type:String,
        required:true,

    },
    userId:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)
const Course = mongoose.model('Course',coursesModel)
module.exports = Course