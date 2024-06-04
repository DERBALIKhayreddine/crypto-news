const mysql = require('mysql');

const db = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    
});

db.connect((err) => {
    if (!err) {
        console.log('Connected to database');
    }
    else {
        console.log('Error connecting to database');
    }
});
module.exports = db;