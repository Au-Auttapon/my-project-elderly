const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", (req, res) => {
  const search = req.query.search;

  let query = "SELECT * FROM rooms";
  let queryParams = [];

  if (search) {
    query += " WHERE roomId LIKE ?";
    queryParams.push(`%${search}%`);
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

router.get("/edit/:id", (req, res) => {
  const roomId = req.params.id;
  db.query(
    "SELECT * FROM rooms WHERE roomId = ?",
    [roomId],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.send(results[0]);
    }
  );
});

router.post("/create", (req, res) => {
  const {
    roomId,
    roomType,
    roomGender,
    roomPrice,
    bedQuantity,
    bedId,
    bedStatus,
    roomStatus,
  } = req.body;

  const CreateRoom = (bedId) => {
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
            return res.status(500).send("Error inserting room");
          } else {
            // เพิ่ม bedId ก่อนทำการเรียก CreateRoom ใหม่
            CreateRoom(bedId + 1); // ส่งค่า bedId ที่เพิ่มขึ้น
          }
        }
      );
    } else {
      res.send("Room inserted");
    }
  };

  CreateRoom(bedId); // เริ่มการสร้างห้องด้วย bedId ที่รับมาจาก body
});

module.exports = router;
