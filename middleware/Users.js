const multer=require('multer');

const MongoClient=require('mongodb').MongoClient;
const mongoose=require('mongoose')
const url="mongodb://127.0.0.1:27017";
const bcrypt = require('bcryptjs');
const signupModel=require('../MongoDb/Schema/Signup');
const jwt=require('jsonwebtoken');
const Users=require('../MongoDb/Users-Collection/Users');
mongoose.Promise = global.Promise;
var userFind;
exports.ADD_User=async(req,res)=>{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(req.body.password,salt);
   if( req.body.password !=  req.body.confirmPassword){
       return res.send('رمزهای واردشده یکسان نیستند');
   }
    try{
    const user=await new signupModel({
        _id:new mongoose.Types.ObjectId,
        username:req.body.username,
        password:hashed,
        email:req.body.email,
        phonenumber:req.body.phoneNumber,
    })
     MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
        var dbo=db.db("Signup");
        var query={username:req.body.username};
        dbo.collection("users").find(query).toArray(function(err,result){
            if (err) throw err;
            if(result.length!=1){
            dbo.collection("users").insertOne(user,function(err,result){
                return res.status(200).send('OK')
            })
            }else{
                return res.status(200).send("این نام کاربری وجود دارد لطفا یک نام دیگر انتخاب کنید")
            }
        })
        
    })
}catch(error){
if(error) throw error
res.status(400).send('یک جای کار ایراد دارد')
}
    }

exports.Login=(req,res)=>{
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
        if(err) throw err
        var dbo=db.db("Signup");
        var query={username:req.body.username};
        dbo.collection("users").find(query).toArray(function(err,result){
            if(err) return res.send({Error:'مشکلی پیش آمده است'})
            if(result.length==1){
                bcrypt.compare(req.body.password,result[0].password,(err,find)=>{
                    if(find){
                        const token=jwt.sign({email:result[0].email,userID:result[0].userID},'secret',{expiresIn:'1h'})
                        return res.send({token:token,userInformation:result[0]})
                    }
                    return res.send({Error:'نام کاربری یا رمز عبور اشتباه است'})
                })
                
            }else{
                console.log(result)
                return res.send({Error:'نام کاربری یا رمز عبور اشتباه است'})
            }
        })
    })
}
exports.UpdateInformation=(req,res)=>{
    const username=req.body.username;
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
    const dbo=db.db("Signup");
    var query={username:username};
    var newuserName={$set:{username:req.body.newUsername}};
    dbo.collection('users').updateOne(query,newusername,function(err,result){
        if (err) throw err;
        console.log(result)
        db.close()
    })
})
}
exports.Remove_User=(req,res)=>{
    const username=req.body.username;
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
        var dbo=db.db("Signup");
        var query={username:username};
        dbo.collection('users').deleteOne(query,function(err,result){
            if (err) throw err;
            console.log(result)
        })
    })
}
exports.GetUserInformation=(req,res)=>{
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
    if(err) throw err
    var dbo=db.db('Signup');
    var username={username:req.body.username}
    dbo.collection('users').find(username).toArray(function(err,result){
        res.send(result)
    })
    console.log(username)
})
}