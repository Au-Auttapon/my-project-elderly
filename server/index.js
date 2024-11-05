const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'',
    database: 'project_data'
})

app.get('/rooms', (req,res)=>{
    db.query("SELECT * FROM rooms",(err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen('3001',()=>{
    console.log('Server is running in port 3001')
})