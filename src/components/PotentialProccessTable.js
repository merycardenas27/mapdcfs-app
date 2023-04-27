import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'Exito', label: 'PROBABILIDAD DE ÉXITO', minWidth: 70, align: 'center'},
  { id: 'Fonograma', label: 'FONOGRAMA', minWidth: 130 },
  { id: 'Recaudacion', label: 'RECAUDACIÓN ESTIMADA', minWidth: 70 },
];

const randomInteger = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);
const randomFloat = (min, max) => Number.parseFloat((Math.random() * (max - min) + min).toFixed(2));

export default function StickyHeadTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={`COLUMN-${columnIndex}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                const newRow = {
                  Exito: `${randomInteger(30, 90)}%`,
                  Recaudacion: `S/.${randomFloat(300, 900)}`,
                  ...row,
                };
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`ROW-${rowIndex}`}>
                    {columns.map((column, columnIndex) => {
                      const value = newRow[column.id];
                      return (
                        <TableCell key={`COLUMN-${columnIndex}-ROW-${rowIndex}`} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}