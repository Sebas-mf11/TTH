import React from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { ContextData } from '../types';

interface ContextModalProps {
  data: ContextData | null;
  onClose: () => void;
}

export const ContextModal: React.FC<ContextModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300">
        
        {/* Header */}
        <div className="bg-brand-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-serif text-xl font-medium tracking-wide">
            {data.term}
          </h3>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white min-h-[140px] flex flex-col justify-center">
          {data.loading ? (
            <div className="flex flex-col items-center justify-center space-y-3 text-brand-600">
              <Loader2 className="animate-spin" size={32} />
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Consultando a la IA...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="text-brand-500 shrink-0 mt-1" size={20} />
                <p className="text-slate-700 leading-relaxed font-sans text-lg">
                  {data.definition}
                </p>
              </div>
              {data.error && (
                <p className="text-red-500 text-sm mt-2">{data.error}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 to-purple-500" />
      </div>
    </div>
  );
};
