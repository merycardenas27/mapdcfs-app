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
  index,
  cell,
  row,
  colums,
  [handleDelete, handleEdit],
) => {
  if (index === 0) {
    return <TableCell key={`${row[1]}-${colums[index]}`} component="th" scope="row">{cell}</TableCell>
  }

  if (index === (row.length - 1)) {
    return(
      <>
        <TableCell key={`${row[1]}-${colums[index]}`}>{cell}</TableCell>
        <TableCell key={`${row[1]}-${colums[index + 1]}`}>
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
      </>
    );
  }

  return <TableCell key={`${row[1]}-${colums[index]}`}>{cell}</TableCell>
}

export default function CustomTable({
  columns = ['COLUMN 1', 'COLUMN 2', 'COLUMN 3', 'COLUMN 4', 'COLUMN 5'],
  handleDelete,
  handleEdit,
  rows,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map(column => <TableCell key={column}>{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={row[1]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell, cellIndex) => renderCell(
                cellIndex,
                cell,
                row,
                columns,
                [handleDelete, handleEdit],
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
