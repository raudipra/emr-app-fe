import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';

export default function TableMedicalData(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index_parent) => (
            <TableRow onClick={() => props.handler(row)} key={row[0]+"_"+index_parent}>
              {row.map((item, index) => (
                index !== 5 && (<TableCell key={row[index]+"_"+index_parent}>{item}</TableCell>)
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}