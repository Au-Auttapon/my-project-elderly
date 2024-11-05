import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DataTable = ({ headers, data = [], fontStyle }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, row) => {
    console.log('event.currentTarget',event.currentTarget)
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleEdit = () => {
    // Handle edit action here
    console.log('Editing:', currentRow);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action here
    console.log('Deleting:', currentRow);
    handleMenuClose();
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalFr = headers.reduce((acc, header) => acc + (header.fr || 1), 0);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  style={{
                    width: `${(header.fr || 1) / totalFr * 100}%`,
                    ...fontStyle,
                    fontWeight: 'bold',
                  }}
                  align={header.align || 'center'}
                >
                  {header.title}
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex} align={header.align || 'center'} style={fontStyle}>
                    {row[header.key]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton onClick={(event) => {handleMenuClick(event, row)}}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} 
      PaperProps={{
        style: {
          width: '90px',
        },
      }}
      anchorOrigin={{
        vertical: 'bottom', // เริ่มจากด้านล่าง
        horizontal: 'left', // ขยับไปทางด้านขวาของ anchor
      }}
        >

        <MenuItem onClick={handleEdit}>แก้ไข</MenuItem>
        <MenuItem onClick={handleDelete}>ลบ</MenuItem>
      </Menu>
    </Paper>
  );
};

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array,
  fontStyle: PropTypes.object,
};

export default DataTable;
