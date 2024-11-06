import React, { useEffect, useState } from "react";
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
import Medicine from "../../../api/medicine/Medicine";

export default function EditMedicine({ medicId }) {
  const navigate = useNavigate();

  const [newMedicineData, setNewMedicineData] = useState({});
  const [medicineData, setMedicineData] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      medicId: medicineData.medicId || "",
      medicName: medicineData.medicName || "",
      medicType: medicineData.medicType || "",
    },
  });

  const { isDirty } = formState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Medicine.getById(medicId);
        if (data && data.length > 0) {
          setMedicineData(data);
          reset({
            medicId: data[0].medicId || "",
            medicName: data[0].medicName || "",
            medicType: data[0].medicType || "",
          });
        }
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };
    fetchData();
  }, [medicId, reset]);

  const onSubmit = (data) => {
    setNewMedicineData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    Medicine.update(newMedicineData);
    reset();
    setIsConfirmOpen(false);
    enqueueSnackbar("ทำรายการสำเร็จ", {
      variant: "success",
      autoHideDuration: 5000,
    });
    navigate("/medicine");
  };
  const handleClickCancel = () => {
    setIsCancelOpen(true);
  };
  const handleCancel = () => {
    console.log("Cancelled");
    reset();
    setIsCancelOpen(false);
    navigate("/medicine");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: "60%" }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            เพิ่มยา
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
                name="medicName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ชื่อยา"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
              />

              <Controller
                name="medicType"
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ marginTop: 2, minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel>ประเภทยา</InputLabel>
                    <Select
                      {...field}
                      label="ประเภทยา"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>---</em>
                      </MenuItem>
                      <MenuItem value="ยาเม็ด">ยาเม็ด</MenuItem>
                      <MenuItem value="ยาน้ำ">ยาน้ำ</MenuItem>
                      <MenuItem value="ยาทา">ยาทา</MenuItem>
                    </Select>
                  </FormControl>
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
              <span style={{ cursor: !isDirty ? "not-allowed" : "" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isDirty}
                >
                  บันทึก
                </Button>
              </span>
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
