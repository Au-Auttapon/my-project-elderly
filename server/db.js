const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'project_data'
});

module.exports = db;
