import React, { useState, useEffect } from 'react';
import { BsGrid, BsListUl, BsEye } from 'react-icons/bs';
import { IoNotificationsOutline } from 'react-icons/io5';
import TicketModal from './TicketModal';

function StatCard({ title, value, change, changeType }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="text-gray-600 mb-2">{title}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={`text-sm ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  );
}

function Tickets() {
  const [viewType, setViewType] = useState('list');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [autopilotMode, setAutopilotMode] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        let url = "https://elyotmkzieihocmhryim.supabase.co/functions/v1/found-zendesk-details";
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();        
        // Transform the tickets data
        const transformedTickets = responseData.data.openTickets.map(ticket => ({
          id: `#${ticket.id}`,
          title: ticket.subject,
          customer: {
            name: ticket.submitter_name,
            email: ticket.submitter_email,
            avatar: '/path-to-avatar.jpg'
          },
          assignedTo: ticket.assignee_id ? `Agent ${ticket.assignee_id}` : 'Unassigned',
          priority: ticket.priority || 'Normal',
          status: ticket.status,
          created: new Date(ticket.created_at).toLocaleString()
        }));

        setTicketsData(transformedTickets);

        // Update stats data based on the response counts
        setStatsData([
          { 
            title: 'Total Open Tickets', 
            value: responseData.data.openCount.toString(), 
            change: '12% vs last week', 
            changeType: 'positive' 
          },
          { 
            title: 'Resolved Today', 
            value: responseData.data.resolvedCount.toString(), 
            change: '8% vs yesterday', 
            changeType: 'positive' 
          },
        ]);

      } catch (error) {
        console.error('Error fetching tickets:', error);
        setTicketsData([]); // Set empty data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Add these pagination helper functions
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = ticketsData.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(ticketsData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewTicket = async (ticket) => {
    // Set the selected ticket immediately to open the modal
    setSelectedTicket({
      ...ticket,
      suggestion: '', // Initialize suggestion as empty
      aiResponse: {
        createdAt: '',
        assignee: 'AI Assistant',
        avatar: '/ai-avatar.png' // Make sure to add an AI avatar image to your project
      }
    });

    try {
      const response = await fetch(
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/get-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ zendesk_ticket_id: ticket.id.replace('#', '') }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      // Update the selected ticket with the suggestion and AI response details
      if (responseData.success && responseData.data.length > 0) {
        const aiResponse = responseData.data[0];
        setSelectedTicket(prevTicket => ({
          ...prevTicket,
          suggestion: aiResponse.suggestion,
          suggestion_id: aiResponse.id,
          aiResponse: {
            createdAt: new Date(aiResponse.created_at).toLocaleString(),
            assignee: 'AI Assistant',
            avatar: '/ai-avatar.png', // Make sure to add an AI avatar image to your project
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Autopilot</span>
            <button
              onClick={() => setAutopilotMode(!autopilotMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                autopilotMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  autopilotMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="relative">
            <input
              type="search"
              placeholder="Search tickets..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
          </div>
          <div className="relative">
            <IoNotificationsOutline className="text-2xl cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/path-to-avatar.jpg" alt="John Smith" className="w-8 h-8 rounded-full" />
            <span>John Smith</span>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            + New Ticket
          </button>
          <select className="border rounded-lg px-4 py-2">
            <option>Bulk Actions</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex border rounded-lg">
            <button 
              className={`p-2 ${viewType === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewType('list')}
            >
              <BsListUl />
            </button>
            <button 
              className={`p-2 ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewType('grid')}
            >
              <BsGrid />
            </button>
          </div>
          <select className="border rounded-lg px-4 py-2">
            <option>All Tickets</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4"><input type="checkbox" /></th>
                  <th className="p-4 text-left">Ticket</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Assigned To</th>
                  <th className="p-4 text-left">Priority</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Created</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t">
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4">
                      <div className="font-medium">{ticket.id}</div>
                      <div className="text-gray-500">{ticket.title}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">{ticket.customer.name}</div>
                          <div className="text-gray-500">{ticket.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{ticket.assignedTo}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded ${
                        ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded ${
                        ticket.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">{ticket.created}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewTicket(ticket)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <BsEye size={16} />
                      </button>
                      <button className="p-2">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ticketsData.length > 5 && (
              <div className="p-4 border-t flex justify-between items-center">
                <div>
                  Showing {indexOfFirstTicket + 1} to{' '}
                  {Math.min(indexOfLastTicket, ticketsData.length)} of{' '}
                  {ticketsData.length} results
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 border rounded ${
                      currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                  >
                    ←
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`p-2 border rounded ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 border rounded ${
                      currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}

export default Tickets;
