import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const renderCell = (
  cell,
  cellIndex,
  row,
  rowIndex,
  [handleDelete, handleEdit],
) => {
  if (cellIndex === 0) {
    return <TableCell key={`ROW-${rowIndex}-COLUMN-${cellIndex}`} component="th" scope="row">{cell}</TableCell>
  }

  return <TableCell key={`ROW-${rowIndex}-COLUMN$-${cellIndex}`}>{cell}</TableCell>
}

export default function CustomTable({
  columns,
  handleDelete,
  handleEdit,
  rows,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => <TableCell key={`COLUMN-${index}`}>{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={`ROW-${rowIndex}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell, cellIndex) => renderCell(
                cell,
                cellIndex,
                row,
                rowIndex,
                [handleDelete, handleEdit],
              ))}
              <TableCell key={`ROW-${rowIndex}-COLUMN$-${columns.length}`}>
                {!(handleDelete && handleDelete) && 'No disponibles'}
                {handleEdit &&
                  <Tooltip placement="left" title="Editar">
                  <IconButton aria-label="editar" color="secondary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
                {handleDelete &&
                  <Tooltip placement="left" title="Eliminar">
                    <IconButton aria-label="eliminar" color="secondary" onClick={() => handleDelete(row[0])}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
