
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IService, IUser } from '../types';

interface ServiceFormProps {
  service?: IService;
  onClose: () => void;
  onSave: (service: IService) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [provider, setProvider] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api.users.list().then(setUsers);
    if (service) {
      setName(service.name);
      setDescription(service.description);
      setPrice(service.price);
      setCategory(service.category);
      setProvider(typeof service.provider === 'string' ? service.provider : service.provider._id);
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) {
      alert('Please select a provider.');
      return;
    }
    
    const serviceData = { name, description, price, category, provider };

    try {
      if (service) {
        const updatedService = await api.services.update(service._id, serviceData);
        onSave(updatedService);
      } else {
        const newService = await api.services.create(serviceData);
        onSave(newService);
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
        <h3 className="text-xl font-bold mb-6">{service ? 'Edit Service' : 'Add New Service'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Service Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 border rounded" />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full p-2 border rounded" />
          <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full p-2 border rounded" />
          <select value={provider} onChange={e => setProvider(e.target.value)} required className="w-full p-2 border rounded">
            <option value="" disabled>Select a Provider</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700">Save Service</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
