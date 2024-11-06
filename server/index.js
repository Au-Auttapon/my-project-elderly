const express = require("express");
const app = express();
const cors = require("cors");

const roomRoutes = require("./routes/room"); // นำเข้าไฟล์ route
const medicineRoutes = require("./routes/medicine"); // นำเข้าไฟล์ route

app.use(cors());
app.use(express.json());

app.use("/rooms", roomRoutes); // ใช้งาน route สำหรับ /rooms
app.use("/medicines", medicineRoutes); // ใช้งาน route สำหรับ /medicines

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
