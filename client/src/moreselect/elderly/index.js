import React from "react";
import { MenuItem } from "@mui/material";

const ElderlyMenu = ({ row, onClose }) => {
  return (
    <>
      <MenuItem
        onClick={() => {
          console.log("Editing:", row);
          onClose();
        }}
      >
        แก้ไข
      </MenuItem>
      <MenuItem
        onClick={() => {
          console.log("Changing status:", row);
          onClose();
        }}
      >
        ปรับสถานะ
      </MenuItem>
    </>
  );
};

export default ElderlyMenu;
