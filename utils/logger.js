const {createLogger,format,transports} =require('winston')
const moment=require('moment')
const Date=moment().format('YYYY-MM-DD,h_mm_ss')

module.exports=createLogger({
    format:format.combine(
        format.simple(),
        format.timestamp(),
        format.prettyPrint(),
        /*format.printf(info=>`
{
    time : ${Date}
    level: ${info.level}
    message: ${info.message}
}`
              )*/
        ), 
    transports:[
        new transports.File({
            maxsize:5120000,
            maxFiles:5,
            filename:`${__dirname}/../logs/log-api.log`
        }),
        new transports.Console({
            level:'debug',
        })
    ]
})