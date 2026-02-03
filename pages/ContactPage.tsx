import React, { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Info Side */}
        <div className="bg-brand-900 text-white p-10 md:w-2/5 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-6">Contáctanos</h1>
            <p className="text-brand-100 mb-8 leading-relaxed">
              ¿Tienes una historia que contar, una sugerencia o quieres colaborar con nosotros? Nos encantaría escucharte.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="text-accent-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-300 uppercase tracking-wider font-bold">Email</p>
                  <p className="font-medium">hola@thetravelhub.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <MessageSquare className="text-accent-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-300 uppercase tracking-wider font-bold">Prensa</p>
                  <p className="font-medium">prensa@thetravelhub.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-brand-300">
              Respondemos generalmente en menos de 24 horas hábiles.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-10 md:w-3/5">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Mensaje Enviado!</h2>
              <p className="text-slate-600">Gracias por ponerte en contacto. Te responderemos pronto.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-brand-600 font-medium hover:underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all bg-white">
                  <option>Consulta General</option>
                  <option>Sugerencia Editorial</option>
                  <option>Publicidad</option>
                  <option>Reportar un error</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-900 text-white font-bold py-3 rounded-lg hover:bg-brand-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Enviar Mensaje <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
