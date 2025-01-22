import React from 'react';

const TableHeader = ({ columns, hasActions }) => {
  return (
    <thead>
      <tr className="bg-gray-100">
        {columns.map((column) => (
          <th key={column.key} className="py-2 px-4 text-left">
            {column.label}
          </th>
        ))}
        {hasActions && <th className="py-2 px-4 text-left">Actions</th>}
      </tr>
    </thead>
  );
};

export default TableHeader; 