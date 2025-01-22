import React from 'react';

const TableRow = ({ row, columns, renderActions }) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      {columns.map((column) => (
        <td key={column.key} className="py-2 px-4">
          {row[column.key]}
        </td>
      ))}
      {renderActions && (
        <td className="py-2 px-4">
          {renderActions(row)}
        </td>
      )}
    </tr>
  );
};

export default TableRow; 