import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import DashboardStats from './components/DashboardStats';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import ServiceManagement from './components/ServiceManagement';
import StoryManagement from './components/StoryManagement';
import OrderManagement from './components/OrderManagement';
import UpgradeRequests from './components/UpgradeRequests';
import BuyerUpgradeRequest from './components/BuyerUpgradeRequest';
import LiveMap from './components/LiveMap';
import TicketSystem from './components/TicketSystem';
// ...
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardStats />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="upgrade-requests" element={<UpgradeRequests />} />
        <Route path="my-upgrade-request" element={<BuyerUpgradeRequest />} />
        <Route path="products" element={<ProductManagement />} />
// ...
    </Routes>
  );
};

export default App;