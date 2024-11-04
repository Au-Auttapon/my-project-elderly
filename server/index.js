const express = require('express');
const app = express();
const cors = require('cors');
const roomRoutes = require('./routes/room'); // เชื่อมโยง routes

app.use(cors());
app.use(express.json());

app.use('/rooms', roomRoutes); // ใช้ routes ที่เชื่อมโยง

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
