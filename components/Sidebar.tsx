import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Ticket, Users, LogOut, Smartphone, ShoppingCart, Briefcase, BookOpen, Package, UserCheck } from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { IUser } from '../types'; // Import IUser

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobile: () => void;
  user: IUser | null; // Accept user prop
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleMobile, user }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', path: '/orders', label: 'Orders', icon: Package },
    { id: 'users', path: '/users', label: 'Users', icon: Users }, // Changed label from 'Producers' to 'Users' for clarity
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'upgrade-requests', path: '/upgrade-requests', label: 'Upgrade Requests', icon: UserCheck });
  } else if (user?.role === 'buyer') {
    navItems.push({ id: 'my-upgrade-request', path: '/my-upgrade-request', label: 'My Upgrade Request', icon: UserCheck });
  }

  navItems.push(
    { id: 'products', path: '/products', label: 'Products', icon: ShoppingCart },
    { id: 'services', path: '/services', label: 'Services', icon: Briefcase },
    { id: 'stories', path: '/stories', label: 'Stories', icon: BookOpen },
    { id: 'live-map', path: '/live-map', label: 'Live Map', icon: Map },
    { id: 'ticket-system', path: '/ticket-system', label: 'Ticket System', icon: Ticket },
    { id: 'mobile-app', path: '/mobile-app', label: 'Mobile App', icon: Smartphone },
  );

  const baseClasses = "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0";
  const mobileClasses = isMobileOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      <div className={`${baseClasses} ${mobileClasses} flex flex-col`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Munieh<span className="text-brand-500">Admin</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleMobile();
                }}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive 
                    ? 'bg-brand-50 text-brand-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;