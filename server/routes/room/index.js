const express = require('express');
const router = express.Router();
const db = require('../../db'); // สมมติว่าคุณเก็บการเชื่อมต่อ db ในไฟล์ db.js

router.get('/', (req, res) => {
    db.query("SELECT * FROM rooms", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

module.exports = router;
