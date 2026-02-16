
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IUser } from '../types';

interface UserFormProps {
  user?: IUser;
  onClose: () => void;
  onSave: (user: IUser) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  // Not handling password or location editing for simplicity

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
      setProfileImage(user.profileImage);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = { name, email, bio, profileImage, role };

    try {
      if (user) {
        await api.put(`/users/${user._id}`, userData);
      } else {
        await api.post('/users', userData);
      }
      onSave(userData as any); // Assuming the backend returns the full user object
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{user ? 'Edit Producer' : 'Add Producer'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
          <textarea placeholder="Biography" value={bio} onChange={e => setBio(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Profile Image URL" value={profileImage} onChange={e => setProfileImage(e.target.value)} className="w-full p-2 border rounded" />
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select id="role" value={role} onChange={e => setRole(e.target.value as any)} className="w-full p-2 border rounded">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700">Save Producer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
