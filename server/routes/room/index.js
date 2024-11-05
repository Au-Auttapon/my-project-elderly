const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", (req, res) => {
  const roomId = req.query.roomId;

  let query = "SELECT * FROM rooms";
  let queryParams = [];

  if (roomId) {
    query += " WHERE roomId LIKE ?";
    queryParams.push(`%${roomId}%`);
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
  const roomId = req.body.roomId;
  const roomType = req.body.roomType;
  const roomGender = req.body.roomGender;
  const roomPrice = req.body.roomPrice;
  const bedQuantity = req.body.bedQuantity;
  let bedId = req.body.bedId;
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
            return res.status(500).send("Error inserting room");
          } else {
            bedId++;
            CreateRoom();
          }
        }
      );
    } else {
      res.send("Room inserted");
    }
  };

  CreateRoom();
});

module.exports = router;
