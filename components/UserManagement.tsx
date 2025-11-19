
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IUser } from '../types';
import { User as UserIcon, Trash2, Edit2, MapPin, Plus } from 'lucide-react';
import UserForm from './UserForm';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    api.users.list().then(setUsers);
  }, []);

  const handleSave = (savedUser: IUser) => {
    if (editingUser) {
      setUsers(users.map(u => u._id === savedUser._id ? savedUser : u));
    } else {
      // setUsers([savedUser, ...users]); // Not supporting create from UI yet
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this user? This might affect their products and services.')) {
      try {
        await api.users.delete(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Producer Management</h2>
          <p className="text-gray-500">Manage rural women and their projects</p>
        </div>
        {/* <button onClick={openModal} className="..."><Plus/> Add New Producer </button> */}
      </div>

      {isModalOpen && <UserForm onClose={closeModal} onSave={handleSave} user={editingUser} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(user)} className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-md"><Edit2 className="w-4 h-4"/></button>
                <button onClick={() => handleDelete(user._id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-md"><Trash2 className="w-4 h-4"/></button>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-lg mr-4">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">{user.bio}</p>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {user.location?.coordinates ? user.location.coordinates.join(', ') : 'No location'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
