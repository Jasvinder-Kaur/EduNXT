require('dotenv').config({path:'./.env'})
const express = require('express')
const router = require('./routes/router')
require('./db/db')
const PORT = 3000 || process.env.PORT
const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(router)

app.get('/', function (req, res){
    res.render('homepage')
    })
 app.get('/signup', function (req, res){
        res.render('signInPage')
        })
 app.get('/course', function (req, res){
        res.render('course')
        })
app.get('/contribution', function (req, res){
            res.render('contri')
            })
 app.get('/hiring', function (req, res){
        res.render('hiring')
        })

app.get('/hiringForm', function (req, res){
            res.render('hiringForm')
            })
app.get('/login', function (req, res){
     res.render('loginPage')
        })

app.listen(PORT, () => console.log("server is up at "+PORT))