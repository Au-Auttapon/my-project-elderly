import React, { useEffect, useState } from "react";
import DataTable from "../../component/table";
import Room from "../../api/room/Room";
import SearchRoom from "./search";
import Badges from "../../component/badge";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function RoomPage() {
  const [roomDatas, setRoomDatas] = useState([]);
  const [roomCount, setRoomCount] = useState();
  const [searchData, setSearchData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Room.get(searchData);
        const formattedData = data.map((room) => ({
          ...room,
          roomStatus: room.roomStatus === 1 ? "ว่าง" : "เต็ม",
        }));
        setRoomDatas(formattedData);
        setRoomCount(formattedData.length);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [searchData]);

  const handleClickCreate = () => {
    navigate("/house/room/create");
  };

  const headers = [
    { title: "เลขห้อง", key: "roomId", fr: 1 },
    { title: "ประเภทห้อง", key: "roomType", fr: 2 },
    { title: "เพศ", key: "roomGender", fr: 1 },
    { title: "ราคาห้อง", key: "roomPrice", fr: 2 },
    { title: "จำนวนเตียง", key: "bedQuantity", fr: 1 },
    { title: "สถานะห้อง", key: "roomStatus", fr: 1 },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Badges title="ห้องพัก" count={roomCount} />
        <div>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            onClick={handleClickCreate}
          >
            เพิ่มห้อง
          </Button>
        </div>
      </div>
      <SearchRoom setSearchData={setSearchData} />
      <DataTable.Room headers={headers} data={roomDatas} />
    </>
  );
}
