const mysql=require('mysql');
const config=mysql.createConnection({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'alireza.09391306607,007',
    database:'levelino'
})
module.exports=config