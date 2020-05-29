const SQL=require('../SQL/SqlConfig')
module.exports.TextPost=(req,res)=>{
SQL.connect(function(err){
    if(err) throw err
    var textPostData=[req.body.description,req.body.Post]
    SQL.query("INSERT INTO textpost (Description,Post) VALUES (?)",[textPostData],function(err,result){
        if(err) throw err
        res.send(result)
    })
})
}
