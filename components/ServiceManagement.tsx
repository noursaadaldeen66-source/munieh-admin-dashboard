
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IService } from '../types';
import { Briefcase, Trash2, Edit2, Plus } from 'lucide-react';
import ServiceForm from './ServiceForm';

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | undefined>(undefined);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.services.list();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleSave = (savedService: IService) => {
    if (editingService) {
      setServices(services.map(s => s._id === savedService._id ? savedService : s));
    } else {
      setServices([savedService, ...services]);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await api.services.delete(id);
        setServices(services.filter(s => s._id !== id));
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('Failed to delete service.');
      }
    }
  };

  const handleEdit = (service: IService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setEditingService(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
          <p className="text-gray-500">Manage all services offered by producers</p>
        </div>
        <button onClick={openModal} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
          <Plus className="w-5 h-5 mr-2" />
          Add New Service
        </button>
      </div>

      {isModalOpen && <ServiceForm onClose={closeModal} onSave={handleSave} service={editingService} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500">{service.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof service.provider === 'object' ? service.provider.name : service.provider}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.price} SYP</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(service)} className="text-indigo-600 hover:text-indigo-900"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900 ml-4"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceManagement;
