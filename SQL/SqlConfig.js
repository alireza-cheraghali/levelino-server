const mysql=require('mysql');
const config=mysql.createConnection({
    host:'https://levelino.herokuapp.com/',
    user:'root',
    password:'alireza.09391306607,007',
    database:'post'
})
module.exports=config