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

module.exports.AudioPost=(req,res)=>{
    SQL.connect(function(err){
        if (err) throw err;
        var audioPostData=[req.file.filename,req.body.description]
        SQL.query("INSERT INTO audiopost (Description,AudioPath) VALUES (?)",[audioPostData],function(err,result){
            if(err) throw err;
            res.send(result)
        })
    })
}
