import React, { useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from '../services/AuthContext'; // Assuming AuthContext provides user info
import { IUser } from '../types'; // Import IUser for type checking

const BuyerUpgradeRequest: React.FC = () => {
  const { user, fetchUser } = useContext(AuthContext); // Assuming AuthContext provides user and a way to refetch
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Ensure user data is available and up-to-date
  useEffect(() => {
    if (!user && fetchUser) {
      fetchUser(); // Fetch user data if not available
    }
  }, [user, fetchUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await api.post('/my/upgrade-request', { message });
      setSubmitSuccess('Your upgrade request has been submitted successfully!');
      setMessage('');
      if (fetchUser) {
        fetchUser(); // Re-fetch user data to update status
      }
    } catch (err: any) {
      setSubmitError(err.response?.data?.msg || 'Failed to submit upgrade request.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="p-4">Loading user data...</div>;
  }

  if (user.role === 'seller' || user.role === 'admin') {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Seller Upgrade Request</h2>
        <p className="text-green-600">You are already a {user.role}.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Request Seller Upgrade</h2>
      {submitSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{submitSuccess}</div>}
      {submitError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{submitError}</div>}

      {user.upgradeRequestStatus === 'pending' ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
          <p className="font-bold">Your upgrade request is currently pending review.</p>
          <p className="text-sm">Message: {user.upgradeRequestMessage || 'N/A'}</p>
          <p className="text-sm">Requested on: {user.upgradeRequestDate ? new Date(user.upgradeRequestDate).toLocaleDateString() : 'N/A'}</p>
        </div>
      ) : user.upgradeRequestStatus === 'approved' ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <p className="font-bold">Your upgrade request has been approved!</p>
          <p className="text-sm">You are now a seller.</p>
          <p className="text-sm">Admin message: {user.adminResponseMessage || 'N/A'}</p>
        </div>
      ) : user.upgradeRequestStatus === 'rejected' ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p className="font-bold">Your upgrade request was rejected.</p>
          <p className="text-sm">Admin message: {user.adminResponseMessage || 'N/A'}</p>
          <p className="text-sm">You can submit a new request if needed.</p>
          <button
            onClick={() => {
              // Reset status to 'none' to allow re-submission
              if (user) {
                user.upgradeRequestStatus = 'none';
                // This local state change won't persist, but allows the form to re-appear
                // A more robust solution would involve a backend endpoint to reset the request
                // For now, we'll just allow the form to show again.
                setSubmitSuccess(null);
                setSubmitError(null);
              }
            }}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit New Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message (Optional):
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us why you want to become a seller..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BuyerUpgradeRequest;
