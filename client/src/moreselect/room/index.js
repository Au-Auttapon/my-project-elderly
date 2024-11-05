import React from "react";
import { MenuItem } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const RoomMenu = ({ row, onClose }) => {
  //   const navigate = useNavigate();

  return (
    <>
      {/* <MenuItem
        onClick={() => {
          onClose();
          navigate(`/house/room/edit/${row.roomId}`);
        }}
      >
        แก้ไข
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          onClose();
        }}
      >
        ลบ
      </MenuItem>
    </>
  );
};

export default RoomMenu;
