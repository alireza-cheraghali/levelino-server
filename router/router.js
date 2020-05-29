const express=require('express');
const router=express.Router();
const users=require('../middleware/Users')
const Posts=require('../middleware/Posts')
const mysql=require('mysql');
const multer=require('multer');
const checkAuth=require('../middleware/checkAuth');
const config=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'alireza.09391306607,007',
    database:'posts'
})
const storage=multer.diskStorage({
    destination:'G:/React and Node/nextproject/public/static/profilePicture',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})
const upload=multer({
    storage:storage
})
router.post('/signup',users.ADD_User);
router.post('/getUserInformation',upload.single('profilePicture'),users.GetUserInformation)
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
router.post('/postText',Posts.TextPost)
module.exports=router