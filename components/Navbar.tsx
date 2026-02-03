import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Facebook, Instagram, Linkedin, Menu, PenTool } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-brand-900 text-white shadow-lg relative z-40">
        {/* Top Bar: Subscribe, Search, Socials */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <button className="bg-action-500 hover:bg-action-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-sm transition-colors">
                Suscribirse
              </button>
              
              <div className="relative hidden sm:block">
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-white/10 border border-transparent focus:border-white/30 text-white text-sm rounded-full pl-9 pr-4 py-1 focus:outline-none focus:bg-white/20 transition-all w-48 placeholder-white/50"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!isAdmin && (
                <Link 
                  to="/admin" 
                  className="hidden md:flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white transition-colors mr-4"
                >
                  <PenTool size={12} />
                  <span>Admin</span>
                </Link>
              )}
              <div className="flex items-center gap-3 text-white/80">
                <a href="#" className="hover:text-accent-500 transition-colors"><Facebook size={16} /></a>
                <a href="#" className="hover:text-accent-500 transition-colors"><Instagram size={16} /></a>
                <a href="#" className="hover:text-accent-500 transition-colors"><Linkedin size={16} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Area: Logo and Navigation */}
        <div className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative">
            
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center group select-none mb-8">
              <div className="font-serif text-5xl text-white leading-none tracking-tight">
                The
              </div>
              <div className="font-serif text-5xl font-bold text-white leading-none tracking-tight mb-1">
                Travel
              </div>
              <div className="bg-accent-500 px-1.5 py-0.5 rounded-sm">
                <span className="font-serif text-sm font-bold text-brand-900 uppercase tracking-widest block leading-none">Hub</span>
              </div>
            </Link>

            {/* Navigation Menu */}
            <div className="w-full border-t border-white/10 pt-4 flex items-center justify-center relative">
              
              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-white/90">
                <Link to="/" className="hover:text-accent-500 transition-colors">Inicio</Link>
                <span className="text-white/20">|</span>
                <Link to="/category/Hoteles" className="hover:text-accent-500 transition-colors">Hoteles</Link>
                <span className="text-white/20">|</span>
                <Link to="/category/Navieras" className="hover:text-accent-500 transition-colors">Cruceros</Link>
                <span className="text-white/20">|</span>
                <Link to="/category/Aerolíneas" className="hover:text-accent-500 transition-colors">Aviación</Link>
                <span className="text-white/20">|</span>
                <Link to="/category/Destinos" className="hover:text-accent-500 transition-colors">Destinos</Link>
              </nav>

              {/* Mobile/Sidebar Toggle */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="absolute right-0 top-3 md:top-2 bg-accent-500 hover:bg-accent-400 text-brand-900 p-2 rounded-full transition-colors shadow-lg"
                aria-label="Abrir menú"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
