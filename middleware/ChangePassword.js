const SQL=require('../SQL/SqlConfig')
const bcrypt=require('bcryptjs');
const logger=require('../utils/logger');
const moment=require('moment');
const nowDate=moment().format('YYYY/MM/DD-HH:mm:ss')
exports.ChangePasswordWithoutLogin=async(req,res)=>{
    let query="SELECT * FROM customers WHERE Email=?"
    const salt=await bcrypt.genSalt(10)
    const hashed=await bcrypt.hash(req.body.newPassword,salt)
    SQL.query(query,[req.params.email],(err,result)=>{
        if(err){
            logger.error("ERROR TO CONNECT TO DB`")
            throw err;
        } 
        if(result.length!=0){
            let updatePassword="UPDATE customers SET Password= ? WHERE Email= ?"
            SQL.query(updatePassword,[hashed,req.params.email],function(err,result){
                if(err) throw err
                logger.info(`Change Password At ${nowDate}`)
                res.send("UPDATE")
            })
        }else{
            res.send("Email Not Found")
        }
    })
}

