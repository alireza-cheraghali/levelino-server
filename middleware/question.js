const SQL=require('../SQL/SqlConfig');
const logger=require('../utils/logger')
const moment=require('moment');
const nowDate=moment().format("YYYY/MM/DD-HH:mm:ss");
exports.defineQuestion=(req,res)=>{
    let query="INSERT INTO questionbank (Question,Option1,Option2,Option3,Option4,Answer,CurrectOption) VALUES (?)"
    let defineQuestion=[
        req.body.defineQuestion.question,
        req.body.defineQuestion.option1,
        req.body.defineQuestion.option2,
        req.body.defineQuestion.option3,
        req.body.defineQuestion.option4,
        req.body.defineQuestion.answer,
        req.body.defineQuestion.currentOrder
    ]
    SQL.query(query,[defineQuestion],function(err,result){
        if(err){
            logger.error("Error To Connect questionbank Table")
            throw err
        }
        logger.info(`Question:${req.body.defineQuestion.question} Create At ${nowDate}`)
        console.log(result)
        res.send({message:`Your Question Created With ID:${result.insertId}`})
    })
}
exports.getQuestion=(req,res)=>{
    let query="SELECT * FROM questionbank"
    SQL.query(query,function(err,result){
        res.send(result)
    })
}