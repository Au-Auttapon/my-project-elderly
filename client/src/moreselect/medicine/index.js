import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../../component/modal-confirm-delete";
import Medicine from "../../api/medicine/Medicine";
import { enqueueSnackbar } from "notistack";

const MedicineMenu = ({ row, onClose }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    Medicine.delete(row.medicId);
    setIsDeleteOpen(false);
    enqueueSnackbar("ลบรายการสำเร็จ", {
      variant: "success",
      autoHideDuration: 5000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000); // รีโหลดหน้าเว็บหลังจาก 1 วินาที
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          onClose();
          navigate(`/medicine/edit/${row.medicId}`);
        }}
      >
        แก้ไข
      </MenuItem>
      <MenuItem onClick={handleClickDelete}>ลบ</MenuItem>

      <ConfirmDeleteModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="ลบรายการ"
        message={`คุณยืนยันที่จะลบยา ${row.medicName} ใช่หรือไม่ ?`}
      />
    </>
  );
};

export default MedicineMenu;
