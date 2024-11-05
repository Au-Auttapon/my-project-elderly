const express = require("express");
const router = express.Router();
const db = require("../../db"); // สมมติว่าคุณเก็บการเชื่อมต่อ db ในไฟล์ db.js

router.get("/", (req, res) => {
  const roomId = req.query.roomId; // ใช้ req.query แทน req.body

  let query = "SELECT * FROM rooms";
  let queryParams = [];

  if (roomId) {
    query += " WHERE roomId LIKE ?";
    queryParams.push(`%${roomId}%`); // ใช้ % เพื่อทำการค้นหาแบบ wildcard
  }

  query += " GROUP BY roomId ORDER BY roomId DESC";

  db.query(query, queryParams, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

router.post("/create", (req, res) => {
  const roomId = req.body.roomId;
  const roomType = req.body.roomType;
  const roomGender = req.body.roomGender;
  const roomPrice = req.body.roomPrice;
  const bedQuantity = req.body.bedQuantity;
  let bedId = req.body.bedId; // ใช้ let แทน const เพื่อให้สามารถปรับค่าของ bedId ได้
  const bedStatus = req.body.bedStatus;
  const roomStatus = req.body.roomStatus;

  const CreateRoom = () => {
    if (bedId <= bedQuantity) {
      db.query(
        "INSERT INTO rooms (roomId, roomType, roomGender, roomPrice, bedQuantity, bedId, bedStatus, roomStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          roomId,
          roomType,
          roomGender,
          roomPrice,
          bedQuantity,
          bedId,
          bedStatus,
          roomStatus,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error inserting room"); // ส่งคำตอบกลับในกรณีเกิดข้อผิดพลาด
          } else {
            bedId++; // เพิ่ม bedId
            CreateRoom(); // เรียกฟังก์ชันใหม่เพื่อแทรกห้องถัดไป
          }
        }
      );
    } else {
      res.send("Room inserted"); // ส่งคำตอบเมื่อเสร็จสิ้นการแทรก
    }
  };

  CreateRoom(); // เรียกฟังก์ชันเพื่อเริ่มการแทรกข้อมูล
});

module.exports = router;
