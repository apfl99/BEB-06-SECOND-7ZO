const mysql = require("mysql");
require('dotenv').config()

console.log(process.env.DB_PW)

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT
});

db.connect();


module.exports = db;