import React from 'react';
import TableRow from './TableRow'; // Import the TableRow component

const TableBody = ({ columns, data, renderActions }) => {
  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow key={index} row={row} columns={columns} renderActions={renderActions} />
      ))}
    </tbody>
  );
};

export default TableBody; 