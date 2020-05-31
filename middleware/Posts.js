const SQL=require('../SQL/SqlConfig')

module.exports.TextPost=(req,res)=>{
    var textPostData=[req.body.description,req.body.Post]
    SQL.query("INSERT INTO textpost (Description,Post) VALUES (?)",[textPostData],function(err,result){
        if(err) throw err
        res.send(result)
    })
}
module.exports.GetTextPost=(req,res)=>{
    SQL.query('CALL getTextPost()',function(err,result){
        res.send(result)
    })
}
module.exports.AudioPost=(req,res)=>{
        var audioPostData=[req.file.filename,req.body.description]
        SQL.query("INSERT INTO audiopost (Description,AudioPath) VALUES (?)",[audioPostData],function(err,result){
            if(err) throw err;
            res.send(result)
        })
    }
    module.exports.GetAudioPost=(req,res)=>{
        SQL.query('CALL GetAudioPost ()',function(err,result){
            res.send(result)
        })
    }
