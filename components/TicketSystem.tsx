
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { TicketStatus, SupportTicket } from '@/types';
import { Check, X, AlertCircle, Search, Filter } from 'lucide-react';

const TicketSystem: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'direct'>('all');

  useEffect(() => {
    api.tickets.list().then(setTickets);
  }, []);

  const handleAction = async (id: string, newStatus: TicketStatus) => {
    try {
      await api.tickets.updateStatus(id, newStatus);
      // Optimistic update or refetch
      setTickets(tickets.map(t => t._id === id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Failed to update ticket", error);
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (filter === 'pending') return t.status === TicketStatus.PENDING;
    if (filter === 'direct') return t.type === 'DirectShipping';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Direct Shipping & Support</h2>
          <p className="text-gray-500">Manage logistics requests from farmers</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            All Tickets
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            Pending Only
          </button>
          <button 
            onClick={() => setFilter('direct')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'direct' ? 'bg-brand-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            Shipping Requests
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject / Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{ticket.farmerName}</div>
                    <div className="text-xs text-gray-500">ID: {ticket.farmerId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                      ticket.type === 'DirectShipping' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.type === 'DirectShipping' ? 'Direct Shipping' : 'General Support'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate" title={ticket.details}>{ticket.details}</p>
                    <div className="text-xs text-gray-400 mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${ticket.status === TicketStatus.APPROVED ? 'bg-green-100 text-green-800' : 
                        ticket.status === TicketStatus.REJECTED ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {ticket.status === TicketStatus.PENDING && (
                      <>
                        <button 
                          onClick={() => handleAction(ticket._id, TicketStatus.APPROVED)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          title="Approve Request"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleAction(ticket._id, TicketStatus.REJECTED)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          title="Reject Request"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {ticket.status !== TicketStatus.PENDING && (
                       <span className="text-xs text-gray-400 italic">Archived</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTickets.length === 0 && (
          <div className="p-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSystem;
