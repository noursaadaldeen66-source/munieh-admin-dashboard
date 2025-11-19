
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Bell, User } from 'lucide-react';
import { IUser } from '../types'; // Import IUser

interface DashboardLayoutProps {
  user: IUser | null;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  
  // Extract the view name from the URL path
  const currentView = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar 
        isMobileOpen={isMobileOpen}
        toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        user={user} // Pass user to Sidebar
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileOpen(true)} 
              className="mr-4 text-gray-500 focus:outline-none lg:hidden hover:bg-gray-100 p-2 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 capitalize hidden sm:block">
              {currentView.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-gray-100 pl-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">Operations Manager</div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border-2 border-white shadow-sm">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* Child routes will render here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
