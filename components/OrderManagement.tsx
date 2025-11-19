
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IOrder } from '../types';
import { Package, CheckCircle, Truck, XCircle } from 'lucide-react';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    api.orders.list().then(setOrders);
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const updatedOrder = await api.orders.updateStatus(id, status);
      setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o));
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update status.');
    }
  };

  const getStatusColor = (status: IOrder['orderStatus']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <p className="text-gray-500">View and manage all customer orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-500">{order._id.substring(0, 8)}...</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.customerInfo.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.totalPrice} SYP</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <select 
                    value={order.orderStatus} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="p-1 border rounded-md text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
