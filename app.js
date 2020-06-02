const express=require('express');
const app=express();
const morgan=require('morgan');
const winston=require('./utils/logger');
const bodyParser=require('body-parser');
const cors=require('cors');
const getImage=require('./router/postImage')
const router=require('./router/router')
const passwordRouter=require("./router/forgetPassword")
const changePasswordRouter=require('./router/changePassword')
const mongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017'
//POSTIMAGE
const SQL=require('./SQL/SqlConfig');
const path=require('path');
const moment=require('moment');
const Date=moment().format('YYYY-MM-DD,h_mm_ss')
const multer=require('multer');
const storage=multer.diskStorage({
    destination:'G:/React and Node/nextproject/public/static/postImage',
    filename(req,file,cb){
        cb(null,file.fieldname+'-'+Date+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var fs=require('fs')
var rfs=require('rotating-file-stream');
var accessLogStream=rfs.createStream('access.log',{
    size: "10M",
    interval:'1d',
    compress:'gzip',
    path:path.join(__dirname,'log')
})

const audiostorage=multer.diskStorage({
    destination:'G:/React and Node/nextproject/public/static/Audio',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date+path.extname(file.originalname))
    }
})
const uploadAudio=multer({
    storage:audiostorage
})
app.post('/postAudio',uploadAudio.single('audioPost'),(req,res)=>{
    SQL.connect(function(err){
        if (err) throw err;
        var audioPostData=[req.file.filename,req.body.description]
        SQL.query("INSERT INTO audiopost (AudioPath,Description) VALUES (?)",[audioPostData],function(err,result){
            if(err) throw err;
            res.send(result)
        })
    })
    console.log(req.file)
})
app.use(morgan('combined',{stream:accessLogStream}))
app.get('/',(req,res,next)=>{
    res.status(200).send('Server Running With Heroku And Enjoy ')
})
app.post('/postImage',upload.single('imagePost'),(req,res,next)=>{
    /*mongoClient.connect(url,{useUnifiedTopology:true},(err,db)=>{
        const dbo=db.db('posts')
        const query={PostPath:req.file.filename,Description:req.body.description}
        dbo.collection('postImage').insertOne(query,(err,result)=>{
            if(err) throw err;
            console.log(result,query)
        })
    })*/
    SQL.connect(function(err){
        if(err) throw err;
        winston.info('HELLO')
        const postimage=[req.file.filename,req.body.description];
        const sql="INSERT INTO imagepost (PostPath,Description) VALUES (?)";
        SQL.query(sql,[postimage],(err,result)=>{
            if(err)throw err;
            res.send("SAVE SUCCESFULY")
        })
        try{
            config.end()
        }catch(err){
            console.log(err)
        }
    })
})
app.use('/',getImage)
app.use('/',router)
app.use('/password',passwordRouter)
app.use('/changePassword',changePasswordRouter)
module.exports=app