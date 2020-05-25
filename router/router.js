const express=require('express');
const router=express.Router();
const users=require('../middleware/Users')
const mysql=require('mysql');
const checkAuth=require('../middleware/checkAuth');
const config=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'alireza.09391306607,007',
    database:'posts'
})
router.post('/signup',users.ADD_User);
router.post('/getUserInformation',users.GetUserInformation)
router.post('/login',users.Login);
router.get('/postImage',(req,res,next)=>{
config.query('SELECT * FROM postimage ORDER BY _postImageID DESC',function(err,result){
    if(err) throw err
    return res.send(result);
})
})
router.delete('/removeUser',users.Remove_User)
router.put('/changeInformation',users.UpdateInformation)
router.get('/checkAuth',checkAuth,(req,res,next)=>{
    res.send('Authenticate')
})
module.exports=router