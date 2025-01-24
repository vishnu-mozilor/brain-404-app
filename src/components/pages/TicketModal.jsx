import React, { useState } from 'react';

function TicketModal({ ticket, onClose }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  
  if (!ticket) return null;

  const handleAccept = async () => {
    // Construct the complete message with greeting
    const completeMessage = `Hi ${ticket.customer.name},\n\n${ticket.suggestion}`;

    try {
      console.log(ticket.suggestion_id);
      // Update status first
      const statusResponse = await fetch(
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ 
            id: String(ticket.suggestion_id),
            status: "approved"
          }),
        }
      );

      const statusData = await statusResponse.json();
      if (!statusResponse.ok || !statusData.success) {
        throw new Error(statusData.error || `HTTP error! status: ${statusResponse.status}`);
      }

      // Then accept suggestion
      const acceptResponse = await fetch(
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/zendesk-comment-creater",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            zendesk_ticket_id: ticket.id.replace("#", ""),
            comment: completeMessage,
            auto_pilot_enabled: false,
          }),
        }
      );

      if (!acceptResponse.ok) {
        throw new Error(`HTTP error! status: ${acceptResponse.status}`);
      }

      setIsAccepted(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error in accept process:', error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            id: String(ticket.suggestion_id),
            status: "rejected"
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setIsRejected(true);
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
    }
  };

  const handleCreateJira = async () => {
    try {
      const ticketData = {
        zendesk_ticket_id: parseInt(ticket.id.replace('#', '')), // Convert to number
        title: ticket.title,
        description: ticket.title, // Using title as description since that's what we have
        type: "bug",
        solution_id: parseInt(ticket.suggestion_id) // Convert to number
      };

      const response = await fetch(
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/create-new-jira-ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Update zendesk ticket status
      const statusResponse = await fetch(
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/update-zendesk-ticket-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ zendesk_ticket_id: ticket.id.replace('#', ''), status: "hold" }),
        }
      );

      const statusData = await statusResponse.json();
      if (!statusResponse.ok || !statusData.success) {
        throw new Error(statusData.error || `HTTP error! status: ${statusResponse.status}`);
      }
      
      // Force reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error creating Jira ticket:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Customer Support Portal</h2>
            <p className="text-gray-500">Ticket #{ticket.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-gray-600">Subject</div>
            <div className="font-medium">{ticket.title}</div>
          </div>
          <div>
            <div className="text-gray-600">Status</div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full ${
                ticket.status === 'Pending' ? 'bg-yellow-400' : 
                ticket.status === 'Open' ? 'bg-green-400' : 'bg-blue-400'
              } mr-2`}></span>
              <span>{ticket.status}</span>
            </div>
          </div>
          <div>
            <div className="text-gray-600">Assignee</div>
            <div className="flex items-center">
              <img 
                src={ticket.customer.avatar || '/default-avatar.png'} 
                alt="" 
                className="w-6 h-6 rounded-full mr-2" 
              />
              <span>{ticket.assignedTo}</span>
            </div>
          </div>
          <div>
            <div className="text-gray-600">Priority</div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full ${
                ticket.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'
              } mr-2`}></span>
              <span>{ticket.priority}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="text-gray-600 mb-2">Description</div>
          <div className="text-gray-800">
            {ticket.description}
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-gray-50 p-4 rounded mb-4">
          <div className="flex items-center mb-2">
            <img 
              src={ticket.aiResponse?.avatar || "/default-avatar.png"}
              alt="" 
              className="w-8 h-8 rounded-full mr-2" 
            />
            <div>
              <div className="font-medium">{ticket.aiResponse?.assignee || 'AI Assistant'}</div>
              <div className="text-sm text-gray-500">{ticket.aiResponse?.createdAt || 'Just now'}</div>
            </div>
          </div>
          <div className="text-gray-700 gpt-suggestion">
            {!ticket.suggestion ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <p>Hi {ticket.customer.name},<br /><br />{ticket.suggestion}</p>
            )}
          </div>
        </div>

        {/* View Past Conversations Button */}
        <button className="w-full py-2 text-gray-600 bg-gray-50 rounded flex items-center justify-center gap-2 mb-6">
          <span>↻</span> View Past Conversations
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {!isRejected ? (
            <>
              <button 
                className="px-4 py-2 border rounded hover:bg-gray-50" 
                onClick={handleReject}
                disabled={!ticket.suggestion}
              >
                Reject
              </button>
              <button 
                className={`px-4 py-2 text-white rounded ${
                  isAccepted ? 'bg-green-600' : 'bg-black hover:bg-gray-800'
                }`}
                onClick={handleAccept}
                disabled={!ticket.suggestion || isAccepted}
              >
                {isAccepted ? 'Accepted ✓' : 'Accept'}
              </button>
            </>
          ) : (
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleCreateJira}
            >
              Create Jira
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketModal; 