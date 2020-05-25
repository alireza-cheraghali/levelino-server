const express=require('express')
const router=express.Router()
const mysql=require('mysql');
const config=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'alireza.09391306607,007',
    database:'post'
})
router.post('/like',(req,res)=>{
    config.connect(function(err){
        if(err) throw err
        if(req.body.likes==true){
        config.query("UPDATE post SET likes=likes+1 WHERE postId=1",function(err,result){
            if(err) throw err
            console.log(result)
            return res.send("Likes:")
        })
    }else{
        config.query("UPDATE post SET likes=likes-1 WHERE postId=1",function(err,result){
            if(err) throw err
            console.log(result)
            return res.send("disLikes:")
        })
    }
    config.end()
    })
})
module.exports=router