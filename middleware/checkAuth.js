const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
var verified=jwt.verify(req.body.token,'secret');
req.user=verified
next();
    }
    catch(error){
return res.status(401).json({
    message:'Auth Failed'
});
    }
};