import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ConfirmModal from "../../../component/modal-confirm";
import { useNavigate } from "react-router-dom";
import CancelModal from "../../../component/modal-cancel";
import { enqueueSnackbar } from "notistack";
import Room from "../../../api/room/Room";
export default function CreateRoom() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      roomId: "",
      roomType: "",
      roomGender: "",
      roomPrice: "",
      bedQuantity: "",
      bedId: 1,
      bedStatus: true,
      roomStatus: true,
    },
  });
  const navigate = useNavigate();

  // สร้าง style สำหรับ input type number ไม่ให่มี arrow
  const stylesCSS = {
    input: {
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  };
  const [newRoomData, setNewRoomData] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const onSubmit = (data) => {
    setNewRoomData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    Room.create(newRoomData);
    reset();
    setIsConfirmOpen(false);
    enqueueSnackbar("ทำรายการสำเร็จ", {
      variant: "success",
      autoHideDuration: 4000,
    });
    navigate("/house/room");
  };
  const handleClickCancel = () => {
    setIsCancelOpen(true);
  };
  const handleCancel = () => {
    console.log("Cancelled");
    reset();
    setIsCancelOpen(false);
    navigate("/house/room");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: "60%" }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            เพิ่มห้อง
          </Typography>
          <Divider sx={{ my: 2 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="เลขห้อง"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                    type="number"
                    sx={{ ...stylesCSS.input }} // ลบ arrow
                  />
                )}
              />
              <Controller
                name="roomType"
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ marginTop: 2, minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel>ประเภทห้อง</InputLabel>
                    <Select
                      {...field}
                      label="ประเภทห้อง"
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>---</em>
                      </MenuItem>
                      <MenuItem value="ติดเตียง">ติดเตียง</MenuItem>
                      <MenuItem value="ช่วยเหลือตัวเองได้">
                        ช่วยเหลือตัวเองได้
                      </MenuItem>
                      <MenuItem value="อัลไซเมอร์หลงลืม">
                        อัลไซเมอร์หลงลืม
                      </MenuItem>
                      <MenuItem value="vip">VIP</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="roomGender"
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ marginTop: 2, minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel>เพศ</InputLabel>
                    <Select
                      {...field} // Spread the field properties here
                      label="เพศ"
                      onChange={(e) => field.onChange(e.target.value)} // Handle change manually
                    >
                      <MenuItem value="">
                        <em>---</em>
                      </MenuItem>
                      <MenuItem value="ชาย">ชาย</MenuItem>
                      <MenuItem value="หญิง">หญิง</MenuItem>
                      <MenuItem value="รวม">รวม</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="roomPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ราคาห้อง"
                    size="small"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    sx={{ ...stylesCSS.input }} // ลบ arrow
                  />
                )}
              />
              <Controller
                name="bedQuantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="จำนวนเตียง"
                    size="small"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    sx={{ ...stylesCSS.input }} // ลบ arrow
                  />
                )}
              />
            </Box>
            <Divider sx={{ my: 2, marginTop: 5 }} />
            <Box sx={{ display: "flex", justifyContent: "end", mt: 2, gap: 2 }}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={handleClickCancel}
              >
                ยกเลิก
              </Button>
              <Button type="submit" variant="contained" color="primary">
                บันทึก
              </Button>
            </Box>
          </form>
          <ConfirmModal
            open={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirm}
            title="บันทึกข้อมูล"
            message="คุณยืนยันที่จะบันทึกข้อมูลใช่หรือไม่ ?"
          />
          <CancelModal
            open={isCancelOpen}
            onClose={() => setIsCancelOpen(false)}
            onConfirm={handleCancel}
            title="ยกเลิกรายการ"
            message="คุณยืนยันที่จะละทิ้งข้อมูลใช่หรือไม่ ?"
          />
        </CardContent>
      </Card>
    </Box>
  );
}
