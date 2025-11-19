
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Hub } from '@/types';
import { Warehouse, Plus, MapPin, User, Trash2, Edit2 } from 'lucide-react';

const HubManagement: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.hubs.list().then(setHubs);
  }, []);

  const getCapacityColor = (cap: number) => {
    if (cap > 80) return 'bg-red-500';
    if (cap > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this hub?')) {
      await api.hubs.delete(id);
      setHubs(hubs.filter(h => h._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Logistics Hubs</h2>
          <p className="text-gray-500">Manage storage facilities and collection points</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Hub
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubs.map((hub) => (
          <div key={hub._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-md"><Edit2 className="w-4 h-4"/></button>
                <button onClick={() => handleDelete(hub._id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-md"><Trash2 className="w-4 h-4"/></button>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="p-3 bg-brand-50 rounded-lg mr-4">
                <Warehouse className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{hub.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {hub.location}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Capacity Usage</span>
                  <span className="font-medium text-gray-900">{hub.capacity}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getCapacityColor(hub.capacity)}`} 
                    style={{ width: `${hub.capacity}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  {hub.manager}
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    Active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Add New Hub</h3>
                <p className="text-gray-500 mb-6">Form simulation for adding a new logistics point.</p>
                <div className="flex justify-end space-x-3">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700">Save Hub</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HubManagement;
