require('./models/db')
const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')

var app = express()

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/', (req, res)=>{
    res.end("<h1>Server is up and running.</h1>")
})

app.set('views', path.join__dirname, '/views/')

app.listen('3000', ()=>{
    console.log('Server running');
})

//app.use('/student', studentController)