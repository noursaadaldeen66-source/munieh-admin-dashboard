import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Assuming you have an API service
import { User } from '../types'; // Assuming you have a User type defined

const UpgradeRequests: React.FC = () => {
  const [requests, setRequests] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpgradeRequests();
  }, []);

  const fetchUpgradeRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/upgrade-requests');
      setRequests(response.data);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to fetch upgrade requests');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (userId: string, status: 'approved' | 'rejected', message: string = '') => {
    try {
      await api.put(`/users/${userId}/upgrade-request`, { status, message });
      fetchUpgradeRequests(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to update request');
    }
  };

  if (loading) return <div>Loading upgrade requests...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Upgrade Requests</h2>
      {requests.length === 0 ? (
        <p>No pending upgrade requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-700 mt-2">
                Request Message: {user.upgradeRequestMessage || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                Requested On: {user.upgradeRequestDate ? new Date(user.upgradeRequestDate).toLocaleDateString() : 'N/A'}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleResponse(user._id, 'approved', 'Your request has been approved.')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleResponse(user._id, 'rejected', 'Your request has been rejected.')}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpgradeRequests;