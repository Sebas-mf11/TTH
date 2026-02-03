import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plane, Hotel, Ship, MapPin } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Aerolíneas', icon: Plane, path: '/category/Aerolíneas' },
    { name: 'Hoteles', icon: Hotel, path: '/category/Hoteles' },
    { name: 'Navieras', icon: Ship, path: '/category/Navieras' },
    { name: 'Destinos', icon: MapPin, path: '/category/Destinos' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-brand-900 text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-brand-800">
          <h2 className="font-serif text-xl font-bold">Explorar</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="py-6">
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-brand-800 transition-all group"
              >
                <div className="bg-brand-800 p-2 rounded-lg group-hover:bg-brand-700 transition-colors">
                  <item.icon size={20} className="text-accent-400" />
                </div>
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-brand-800 bg-brand-900">
          <p className="text-brand-200 text-sm text-center">
            © {new Date().getFullYear()} The Travel Hub
          </p>
        </div>
      </div>
    </>
  );
};
