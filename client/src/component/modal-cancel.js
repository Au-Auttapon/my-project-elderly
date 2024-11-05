import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
export default function CancelModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          width: 400, // Set the width to 500px
        },
      }}
    >
      <DialogTitle style={{ display: "flex", gap: 10 }}>
        <CancelIcon color="error" style={{ marginTop: 2 }} />
        <>{title}</>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions>
        <Button size="small" variant="outlined" onClick={onClose} color="error">
          ยกเลิก
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={onConfirm}
          color="error"
          autoFocus
        >
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
}
