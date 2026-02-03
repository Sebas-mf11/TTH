import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-brand-100 pt-16 pb-8 border-t border-brand-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col group select-none mb-4">
              <div className="font-serif text-xl leading-none tracking-tight text-white">
                The
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold tracking-tight leading-none text-white">Travel</span>
                <div className="relative">
                  <span className="font-serif text-lg italic leading-none relative z-10 text-white">Hub</span>
                  <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-accent-500/80 -rotate-1 z-0"></div>
                </div>
              </div>
            </Link>
            <p className="text-sm text-brand-200 leading-relaxed mb-6">
              Redefiniendo el periodismo de viajes con experiencias inmersivas e inteligencia artificial. Descubre el mundo con profundidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-brand-300 hover:text-accent-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-brand-300 hover:text-accent-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-brand-300 hover:text-accent-400 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/category/Destinos" className="hover:text-accent-400 transition-colors">Destinos</Link></li>
              <li><Link to="/category/Aerolíneas" className="hover:text-accent-400 transition-colors">Aerolíneas</Link></li>
              <li><Link to="/category/Hoteles" className="hover:text-accent-400 transition-colors">Hoteles</Link></li>
              <li><Link to="/category/Navieras" className="hover:text-accent-400 transition-colors">Navieras</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Compañía</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-accent-400 transition-colors">Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-accent-400 transition-colors">Contacto</Link></li>
              <li><Link to="/admin" className="hover:text-accent-400 transition-colors">Redacción</Link></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-500 shrink-0 mt-0.5" />
                <span>Av. Reforma 222, Ciudad de México, CDMX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-500 shrink-0" />
                <a href="mailto:hola@thetravelhub.com" className="hover:text-white">hola@thetravelhub.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-500 shrink-0" />
                <span>+52 55 1234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 text-center text-xs text-brand-400">
          <p>© {new Date().getFullYear()} The Travel Hub. Todos los derechos reservados. Una experiencia web inmersiva.</p>
        </div>
      </div>
    </footer>
  );
};
