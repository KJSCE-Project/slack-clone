import './models/db.js'
import express from 'express'
import pkg from 'body-parser';
const { urlencoded, json } = pkg;

import userRouter from './routes/userRoutes.js'

var app = express()

app.use(urlencoded({extended:false}))
app.use(json())

app.get('/', (req, res)=>{
    res.end("<h1>Server is up and running.</h1>")
})
// Set routes
app.use('/user', userRouter);


app.listen('3000', ()=>{
    console.log('Server running');
})
