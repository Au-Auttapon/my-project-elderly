import { TextField } from '@mui/material';
import React from 'react';

const InputText = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      sx={{
        width: '65%',
        '& .MuiInputBase-root': { height: '45px' }, // กำหนดความสูงของ input
        '& .MuiInputLabel-root': { marginTop: -0.6 }, // ปรับตำแหน่ง label
      }}
      {...props} // ส่ง props อื่น ๆ ถ้ามี
    />
  );
};

export default InputText;
