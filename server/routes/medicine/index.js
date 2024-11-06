const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", (req, res) => {
  const search = req.query.search;

  let query = "SELECT * FROM medicines";
  let queryParams = [];

  if (search) {
    // ถ้ามี medicId ให้เพิ่มเงื่อนไขการค้นหาทั้ง medicId และ medicName
    query += " WHERE medicId LIKE ? OR medicName LIKE ?";
    queryParams.push(`%${search}%`, `%${search}%`);
  }

  // เรียงลำดับตาม medicId จากมากไปน้อย
  query += " ORDER BY medicId DESC";

  // ดำเนินการ query
  db.query(query, queryParams, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  const medicId = req.params.id;

  db.query(
    "SELECT * FROM medicines WHERE medicId = ?",
    [medicId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/create", (req, res) => {
  const { medicName, medicType } = req.body;

  db.query(
    "INSERT INTO medicines (medicName, medicType) VALUES (?, ?)",
    [medicName, medicType],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting medicine");
      } else {
        res.send("Medicine inserted");
      }
    }
  );
});

router.patch("/update/:id", (req, res) => {
  const medicId = req.params.id;
  const { medicName, medicType } = req.body;

  db.query(
    "UPDATE medicines SET medicName = ? , medicType = ? WHERE medicId = ?",
    [medicName, medicType, medicId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting medicine");
      } else {
        res.send("Medicine has updated");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const medicId = req.params.id;
  db.query(
    "DELETE FROM medicines WHERE medicId = ?",
    [medicId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Medicine has deleted");
      }
    }
  );
});

module.exports = router;
