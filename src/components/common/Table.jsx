import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ columns, data, renderActions }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <TableHeader columns={columns} hasActions={!!renderActions} />
      <TableBody columns={columns} data={data} renderActions={renderActions} />
    </table>
  );
};

export default Table; 