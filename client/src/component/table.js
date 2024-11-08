import React, { useState } from "react";
import PropTypes from "prop-types";
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
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RoomMenu from "../moreselect/room";
import ElderlyMenu from "../moreselect/elderly";
import MedicineMenu from "../moreselect/medicine";

const DataTable = ({ headers, data = [], fontStyle, renderMenu }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  // คำนวณ totalFr โดยการรวมค่า fr จากทุกคอลัมน์
  const totalFr = headers.reduce(
    (total, header) => total + (header.fr || 1),
    0
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
                    // ใช้การคำนวณสัดส่วนจาก fr และ totalFr
                    width: `${((header.fr || 1) / totalFr) * 100}%`,
                    ...fontStyle,
                    fontWeight: "bold",
                  }}
                  align={"center"}
                  // align={header.align || "center"}
                >
                  {header.title}
                </TableCell>
              ))}
              <TableCell align="center" style={{ width: "90px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    align={header.align || "center"}
                    style={fontStyle}
                  >
                    {row[header.key]}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ width: "90px" }}>
                  <IconButton
                    onClick={(event) => {
                      handleMenuClick(event, row);
                    }}
                  >
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: "100px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {currentRow && renderMenu(currentRow, handleMenuClose)}
      </Menu>
    </Paper>
  );
};

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array,
  fontStyle: PropTypes.object,
  renderMenu: PropTypes.func.isRequired,
};

DataTable.Room = (props) => {
  return (
    <DataTable
      {...props}
      renderMenu={(row, onClose) => <RoomMenu row={row} onClose={onClose} />}
    />
  );
};
DataTable.Medicine = (props) => {
  return (
    <DataTable
      {...props}
      renderMenu={(row, onClose) => (
        <MedicineMenu row={row} onClose={onClose} />
      )}
    />
  );
};

DataTable.Elderly = (props) => {
  return (
    <DataTable
      {...props}
      renderMenu={(row, onClose) => <ElderlyMenu row={row} onClose={onClose} />}
    />
  );
};

export default DataTable;
