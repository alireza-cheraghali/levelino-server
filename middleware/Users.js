const multer=require('multer');
const SQL=require('../SQL/SqlConfig');
const logger=require('../utils/logger')
SQL.connect(function(err){
    if (err) throw err
})
const url="mongodb://127.0.0.1:27017";
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const moment=require('moment');
const Date=moment().format('YYYY:MM:DD-hh:mm:ss')
var userFind;
exports.SignUp=async(req,res)=>{
    var activeCode=Math.floor(Math.random()*1000000)
    if (req.body.password != req.body.confirmPassword){
        logger.info('Password And Confirm Password Dose not Match')
        return res.send("PASSWORD DOES NOT MACHED")
    }
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(req.body.password,salt)
    var userInformation=[req.body.username,req.body.email,hashed,req.body.phoneNumber,activeCode]
    SQL.query("SELECT * FROM customers WHERE Username = (?)",[req.body.username],(err,result)=>{
        if(err){
            logger.error("ERROR TO CONNECT DB IN API:signup")
            return res.send("ERROR IN DB")
        }
        if(result.length!==1){
            SQL.query("INSERT INTO customers (Username,Email,Password,PhoneNumber,ActiveAccountCode) VALUES (?)",[userInformation],function(err,result){
                if(err){
                    logger.info("EMAIL HAS EXIST")
                    return res.send("EMAIL HAS EXIST")
                }
                logger.info(`${userInformation[0]} has Saved With Password:${req.body.password}`)
                return res.send("congratulations")
            })
        }else{
            logger.info(`USER WITH USERNAME ${userInformation[0]} HAS EXIST IN DB`)
            return res.send("USER HAS EXIST")
        }
    })
    try{
        SQL.query("UPDATE customers SET ExpireActiveAccountCode=now()+420 WHERE Username= ?",[userInformation[0]],function(err,result){
            if (err) throw err 
            res.send("Updated")
        })
    }catch(err){
        res.send("ERROR")
    }
    }

exports.Login=(req,res)=>{
    var userInformation=[req.body.username,req.body.password]
    SQL.query("SELECT * FROM customers WHERE Username = (?)",[userInformation[0]],function(err,result){
        if(err) throw err
        if(result.length===1){
            bcrypt.compare(req.body.password,result[0].Password,(err,find)=>{
                if (err) return res.send('False')
                if(find){
                    const token=jwt.sign({email:result[0].email,password:result[0].password},'secret',{expiresIn:'1h'})
                    logger.info(`USER WITH USERNAME: ${req.body.username} AND HAS TOKEN LOGIN AT ${Date} `)
                    return res.send("LOGIN")
                }else{
                    logger.info('PASSWORD IS INCORRECT')
                    return res.send("USER NOT FOUND")
                }
            })
        }else{
            logger.info(`USER WITH USERNAME: ${req.body.username} NOT EXIST IN DB`)
            return res.send("User Not Found")
        }
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
        if(err) throw err
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

/* MONGO DB SET 
const MongoClient=require('mongodb').MongoClient;
const mongoose=require('mongoose')
const Users=require('../MongoDb/Users-Collection/Users');
const signupModel=require('../MongoDb/Schema/Signup');
mongoose.Promise = global.Promise;
//LOGIN
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

    //SIGNUP
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
         if (err) throw err
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
*/