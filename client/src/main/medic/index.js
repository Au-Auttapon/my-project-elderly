import React, { useEffect, useState } from "react";
import DataTable from "../../component/table";
import Badges from "../../component/badge";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Medicine from "../../api/medicine/Medicine";
import SearchMedicince from "./search";

export default function MedicinePage() {
  const [medicDatas, setMedicDatas] = useState([]);
  const [medicCount, setMedicCount] = useState();
  const [searchData, setSearchData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Medicine.get(searchData);
        setMedicDatas(data);
        setMedicCount(data.length);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [searchData]);

  const handleClickCreate = () => {
    navigate("/medicine/create");
  };

  const headers = [
    { title: "#", key: "medicId", fr: 1 },
    { title: "ชื่อยา", key: "medicName", fr: 3 },
    { title: "ประเภทยา", key: "medicType", fr: 2 },
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
        <Badges title="ยา" count={medicCount} />
        <div>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            onClick={handleClickCreate}
          >
            เพิ่มยา
          </Button>
        </div>
      </div>
      <SearchMedicince setSearchData={setSearchData} />
      <DataTable.Medicine headers={headers} data={medicDatas} />
    </>
  );
}
