const SQL=require('../SQL/SqlConfig');
const logger=require('../utils/logger')
const moment=require('moment');
const Date=moment().add(5, 'm').format('YYYY/MM/DD-HH:mm:ss')
const nowDate=moment().format('YYYY/MM/DD-HH:mm:ss')
const nodemailer=require('nodemailer');
var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"cheraghalialireza33@gmail.com",
        pass:"alireza.09391306607,007"
    }
})
exports.DeleteActiveCodeHasExpired=(req,res)=>{
    let SqlQuery="UPDATE customers SET ActiveAccountCode=null,ExpireActiveAccountCode=null  WHERE Email=?"
    SQL.query(SqlQuery,[req.body.Email],function(err,result){
        if (err){
            logger.error(`${err} at ${nowDate}`)
            res.send(err)
          return err  
        } 
        if(result.length===1){
            logger.info(`Expire Active Code For User ${result[0].UserName} at ${nowDate}`)   
            return res.send(result)
        }
    })
}
exports.CheckActiveCode=async(req,res)=>{
    
    let query="SELECT * FROM customers WHERE Email=?"
    SQL.query(query,[req.body.Email],function(err,result){
        if(err){
            logger.error(`${err} At ${nowDate}`)
            return err
        } 
          SQL.query("CALL CheckExpireDate()",function(err,result){
            if(err){
                logger.error("Error In CheckExpireDate SP")
                throw err
            }
        })
        if(result[0].ActiveAccountCode==req.body.ActiveAccountCode && result[0].ExpireActiveAccountCode!=null){
            logger.info(`Active Code And Send Code By Client is Same `)
            res.send({successful:'Succesful'})
        }else{
            logger.info(`Active Code And Send Code By Client is Not Same `)
            return res.send({Error:"Code is not Correct"})
        }
    })
}
exports.ForgetPasswordWithoutLogin=(req,res)=>{
    let ActiveAccountCode=Math.floor(Math.random()*1000000);
    var mailOption={
        from:'cheraghalialireza33@gmail.com',
        to:`${req.body.Email}`,
        subject:"Change Password",
        html:`<h1>Active Code</h1><h2 style='color:red'>${ActiveAccountCode}</h2> `
    }
    SQL.query('SELECT * FROM customers WHERE Email=(?)',[req.body.Email],(err,result)=>{
        if (err){
            logger.error(`${err} At ${nowDate}`)
            return err
        }
        if(result.length===1){
            transporter.sendMail(mailOption,function(err,info){
                if(info){
                    const information=[Date,ActiveAccountCode,req.body.Email]
                    SQL.query("UPDATE customers SET ExpireActiveAccountCode=? ,ActiveAccountCode=? WHERE Email=?",information,(err,result)=>{
                        if (err){
                            logger.error(`${err} At ${nowDate}`)
                            return err
                        }
                    return res.send({code:information[1]})
                    })
                }
                if(err){
                        logger.error(`${err} At ${nowDate}`)
                        return err
                }
            })
        }else{
                logger.info(`Email With  Email Addres ${req.body.Email} Is Not Exist In DB`)
                return res.send({Error:`Email Not Found`})
        }
    })
}
