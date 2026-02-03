import React from 'react';
import { Globe, Users, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-brand-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Nuestra Misión</h1>
          <p className="text-xl text-brand-100 leading-relaxed max-w-2xl mx-auto">
            Transformar la manera en que el mundo consume noticias de turismo, conectando historias inspiradoras con tecnología de vanguardia.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-900 mb-6">Más que un blog, una experiencia.</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              En <strong>The Travel Hub</strong>, creemos que viajar comienza con la lectura. No nos conformamos con texto plano; queremos que cada palabra sea una puerta a un nuevo destino.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Utilizamos Inteligencia Artificial generativa para enriquecer nuestros artículos, permitiendo a nuestros lectores profundizar en conceptos, lugares y culturas con un solo clic, sin salir de nuestra plataforma web.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://picsum.photos/800/600?random=10" 
              alt="Equipo trabajando" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-900/10"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center">
            <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-900 mb-3">Cobertura Global</h3>
            <p className="text-slate-600">Desde las capitales más vibrantes hasta los rincones más remotos, nuestras historias no tienen fronteras.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center">
            <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-900 mb-3">Tecnología IA</h3>
            <p className="text-slate-600">Integramos modelos de lenguaje avanzados para ofrecer contexto instantáneo y respuestas a tus dudas.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center">
            <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-900 mb-3">Comunidad</h3>
            <p className="text-slate-600">Unimos a viajeros, expertos y soñadores en un espacio diseñado para la curiosidad.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
