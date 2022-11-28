import './models/db.js'
import express from 'express'
import pkg from 'body-parser';
const { urlencoded, json } = pkg;

import userRouter from './routes/userRoutes.js'
import workspaceRouter from './routes/workspaceRoutes.js'
import useworkspaceRouter from './routes/useworkspaceRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import administrationRouter from './routes/administrationRoutes.js'
import channelRouter from './routes/channelRoutes.js'
import usechannelRouter from './routes/usechannelRoutes.js'
import invitationRouter from './routes/invitationRoutes.js'
import cloudinaryRouter from './routes/cloudinaryRouter.js'
import cors from 'cors';

import fileUpload from 'express-fileupload';
var app = express()

app.use(fileUpload({
    useTempFiles: true
}));

app.use(urlencoded({extended:false}))
app.use(json())
app.use(cors());
// Import config files
import './config/cloudinary.config.js';

// Set routes
app.use('/user', userRouter);
app.use('/workspace', workspaceRouter);
app.use('/useworkspace', useworkspaceRouter);
app.use('/message', messageRouter);
app.use('/administration', administrationRouter);
app.use('/channel', channelRouter);
app.use('/usechannel', usechannelRouter);
app.use('/invitation', invitationRouter);
app.use('/cloudinary', cloudinaryRouter);

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server running');
})

app.get('/', (req, res)=>{
    res.end("<h1>Server is up and running.</h1>")
})