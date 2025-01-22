import React, { useState } from 'react';
import Title from '../common/Title';
import Button from '../common/Button';
import Table from '../common/Table';

const ticketsData = {
  new: [
    { sno: 1, ticketNumber: 'T001', title: 'Login Issue', createdDate: '2023-10-01', status: 'New' },
    { sno: 2, ticketNumber: 'T002', title: 'Page not loading', createdDate: '2023-10-02', status: 'New' },
  ],
  pending: [
    { sno: 3, ticketNumber: 'T003', title: 'Error on checkout', createdDate: '2023-09-28', status: 'Pending' },
  ],
  closed: [
    { sno: 4, ticketNumber: 'T004', title: 'Feature request', createdDate: '2023-09-25', status: 'Closed' },
  ],
};

const columns = [
  { key: 'sno', label: 'Sno' },
  { key: 'ticketNumber', label: 'Ticket #' },
  { key: 'title', label: 'Title' },
  { key: 'createdDate', label: 'Created Date' },
  { key: 'status', label: 'Status' },
];

function Tickets() {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="p-4">
      <Title>Tickets</Title>
      <div className="tabs flex space-x-2 mb-4">
        <Button
          onClick={() => setActiveTab('new')}
          text="New Tickets"
          className={`px-4 py-2 ${activeTab === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        />
        <Button
          onClick={() => setActiveTab('pending')}
          text="Pending Tickets"
          className={`px-4 py-2 ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        />
        <Button
          onClick={() => setActiveTab('closed')}
          text="Closed Tickets"
          className={`px-4 py-2 ${activeTab === 'closed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        />
      </div>
      <Table
        columns={columns}
        data={ticketsData[activeTab]}
        renderActions={(row) => (
          <Button text="View" className="text-blue-500 text-white hover:underline" />
        )}
      />
    </div>
  );
}

export default Tickets;
