const MongoClient=require('mongodb').MongoClient;
const url="mongodb://127.0.0.1:27017";
const jwt=require('jsonwebtoken')
module.exports.loginUser=function addUser(user){
    MongoClient.connect(url,{useUnifiedTopology:true},(error,db)=>{
        var dbo=db.db('Signup');
        var query={username:user.username,password:user.password}
        dbo.collection('users').find(query).toArray(function(err,result){
            if (err) throw err
            if(result.length==1){
                const token=jwt.sign({email:result[0].email,userId:result[0]._id},'secret',{expiresIn:'1h'})
                return console.log('YES')
            }
            else{
                return console.log('NO')
            }
        })

    })
    console.log(user)
}


