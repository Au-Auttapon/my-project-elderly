import * as React from 'react';
import Badge from '@mui/material/Badge';

export default function Badges({ count, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}> {/* ใช้ flexbox */}
      <Badge badgeContent={count} color="primary" style={{ marginLeft: 20 }}> {/* ลด margin */}
        <span style={{fontSize: 38, fontWeight: 'bold'}}>{title}</span> {/* เปลี่ยนจาก <h1> เป็น <span> */}
      </Badge>
    </div>
  );
}
