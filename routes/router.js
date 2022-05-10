const express = require('express')
const router = express.Router()
const auth = require('../middleware/Auth')
const User = require('../models/userModel')
const Course = require('../models/coursesModel')
const Offer = require('../models/offersModel')
const multer = require('multer')

let fname;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
       fname = Date.now()+ '-' + file.originalname
      cb(null, fname)
    }
  })
  
  var upload = multer({ storage: storage })

router.post("/loginForm",  async (req, res)=>{
    try {
         const user = await User.findByCredentials(req.body.username , req.body.password)
        if(user){
            res.send({id:user.id , status:200, message:"LOGIN_SUCCESS"})
        }else{
        
            res.send({status:400, message:"WRONG_CREDENTIALS"})
        }
    } catch (error) {
    throw new Error(error)
    }
    })


router.post("/signupForm", async (req, res) => {
    try {
        signUpUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.phoneNo, req.body.interest, req.body.category , req, res)
       if(req.body.category === 1){
        res.render('course')
    }else if(req.body.category === 2){
        res.render('contri')
    }
    else if(req.body.category === 2){
        res.render('hiring')
    }
    } catch (error) {
        throw new Error(error)
    }
})

router.get("/getCourses:id", async (req, res) =>{
    const id = req.params.id
    const user = await User.findOne({id});
    const courses = await Course.find({tag:user.interest})
    res.send({message:"fetch complete", status:200, courses})
})

router.get("/listCourse", async (req, res) => {
    const courses = await Course.find();
    res.send({message:"fetch complete", status:200, courses})
})

router.post("/contribute", upload.single('file'), async (req, res) => {
    try {
        const file = req.file
    const b = JSON.parse(JSON.stringify(req.body));
    if(!file){
        const error = new Error('Please upload a file')
        error.httpsStatusCode = 400
        return next(error)
    }

    const newCourse = new Course({
        title:b.title,
        link:b.link,
        tag:b.tag,
        photo:fname,
        description:b.description,
        userId:b.userId
    })

    const course = await newCourse.save()
    res.send({message:"Record saved", status:200})  
    } catch (error) {
        res.send(error)  
    }
  
})

router.get("/listOffer", async (req, res) => {
    const offers = await Offer.find();
    res.send({message:"fetch complete", status:200, offers})
})

router.post("/hiring", async (req, res) => {
    try {

    const newOffer = new Offer({
      company:req.body.company,
      email:req.body.email,
      exprience:req.body.exprience,
      skill:req.body.skill,
      salary:req.body.salary,
      suggestion:req.body.suggestion
    })

    const offer = await newOffer.save()
    res.send({message:"Offer saved", status:200, offer})  
    } catch (error) {
        res.send(error)  
    }
  
})



const signUpUser = async (firstName, lastName, email, password, phoneNo, interest, category, req, res) => {
    try {
        const newuser = new User({
            firstName, lastName, email, password, phoneNo, interest, category
        })
        const user = await newuser.save()
        res.send({ email, message:"USER_SIGNED", status:200 })
    } catch (error) {
        throw new Error(error)
    }
};

    module.exports = router