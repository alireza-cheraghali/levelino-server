const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const config=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'alireza.09391306607,007',
    database:'posts'
})
router.get('/postImage',(req,res,next)=>{
config.query('SELECT * FROM postimage ORDER BY _postImageID DESC',function(err,result){
    if(err) throw err
    return res.send(result);
})
})
module.exports=router