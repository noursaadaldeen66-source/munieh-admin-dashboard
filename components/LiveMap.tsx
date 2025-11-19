
import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Driver } from '@/types';
import { Truck, Navigation, MapPin } from 'lucide-react';

const LiveMap: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Initial Fetch
    api.drivers.list().then(setDrivers);

    // Simulate Socket.io updates
    const interval = setInterval(() => {
      setDrivers(prevDrivers => prevDrivers.map(d => {
        if (d.status !== 'active') return d;
        return api.drivers.updateLocation(d);
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Live Fleet Tracking</h2>
            <p className="text-gray-500">Real-time geolocation updates via Socket.io</p>
        </div>
        <div className="flex space-x-2">
            <span className="flex items-center text-xs font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full animate-pulse"></span>
                Live
            </span>
        </div>
      </div>

      <div className="flex-1 bg-blue-50 rounded-xl border border-blue-100 relative overflow-hidden shadow-inner group">
        {/* Map Grid Background (simulated map) */}
        <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }}></div>
        
        {/* Simulated Geography (Shapes) */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-200 rounded-full opacity-20 blur-xl"></div>

        {/* Drivers */}
        {drivers.map((driver) => (
          <div 
            key={driver._id}
            className="absolute transition-all duration-1000 ease-linear flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${driver.location.lat}%`, left: `${driver.location.lng}%` }}
          >
            <div className={`relative p-2 rounded-full shadow-lg ${driver.status === 'active' ? 'bg-brand-600 text-white' : 'bg-gray-400 text-white'}`}>
                <Truck className="w-5 h-5" />
                {driver.status === 'active' && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                    </span>
                )}
            </div>
            <div className="mt-1 px-2 py-1 bg-white bg-opacity-90 rounded shadow text-xs font-semibold whitespace-nowrap border border-gray-200">
                {driver.name}
            </div>
          </div>
        ))}

        {/* Hubs (Static) */}
        <div className="absolute top-[30%] left-[40%] flex flex-col items-center">
             <MapPin className="w-8 h-8 text-purple-600 drop-shadow-md" fill="currentColor" />
             <span className="text-xs font-bold text-purple-800 mt-1 bg-white px-1 rounded">Hub: Damascus</span>
        </div>
        <div className="absolute top-[70%] right-[20%] flex flex-col items-center">
             <MapPin className="w-8 h-8 text-purple-600 drop-shadow-md" fill="currentColor" />
             <span className="text-xs font-bold text-purple-800 mt-1 bg-white px-1 rounded">Hub: Tartus</span>
        </div>

      </div>

      {/* Legend / Driver List */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Drivers</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
            {drivers.map(d => (
                <div key={d._id} className="flex items-center space-x-3 min-w-[200px] p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className={`w-2 h-2 rounded-full ${d.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{d.name}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                            <Navigation className="w-3 h-3 mr-1" />
                            {d.location.lat.toFixed(2)}, {d.location.lng.toFixed(2)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
