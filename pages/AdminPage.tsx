import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';
import { InteractiveText } from '../components/InteractiveText';
import { ArticleCategory } from '../types';
import { Plus, X, Save, Image as ImageIcon, Type, AlignLeft, MousePointerClick, Tag } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { addArticle } = useArticles();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: 'Usuario Admin',
    imageUrl: 'https://picsum.photos/1200/600',
    content: '',
    category: 'Destinos' as ArticleCategory
  });
  
  const [terms, setTerms] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>('');
  const [manualTerm, setManualTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTerm = (termToAdd: string) => {
    const term = termToAdd.trim();
    if (term && !terms.includes(term)) {
      setTerms(prev => [...prev, term]);
    }
    setCurrentSelection('');
    setManualTerm('');
  };

  const removeTerm = (termToRemove: string) => {
    setTerms(prev => prev.filter(t => t !== termToRemove));
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setCurrentSelection(selection.toString().trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const newArticle = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }),
      interactiveTerms: terms
    };

    addArticle(newArticle);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-brand-900 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-lg border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold">Estudio del Editor</h1>
            <p className="text-brand-200 text-sm mt-1">Crea historias inmersivas y define el contexto interactivo.</p>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={!formData.title || !formData.content}
            className="flex items-center gap-2 bg-accent-500 hover:bg-accent-400 disabled:bg-slate-700 disabled:text-slate-500 text-brand-900 px-6 py-3 rounded-sm font-bold transition-all shadow-lg hover:shadow-accent-500/25"
          >
            <Save size={20} />
            Publicar Historia
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Editor */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-brand-900 mb-4 flex items-center gap-2">
              <Type size={20} className="text-brand-600" /> Metadatos
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="Ingresa el título del artículo..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subtítulo</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="Un breve resumen..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    >
                      <option value="Aerolíneas">Aerolíneas</option>
                      <option value="Hoteles">Hoteles</option>
                      <option value="Navieras">Navieras</option>
                      <option value="Destinos">Destinos</option>
                    </select>
                    <Tag size={18} className="absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Autor</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL de Imagen</label>
                <div className="relative">
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  />
                  <ImageIcon size={18} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
            <h2 className="text-lg font-bold text-brand-900 mb-4 flex items-center gap-2">
              <AlignLeft size={20} className="text-brand-600" /> Contenido
            </h2>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="flex-1 w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none font-serif text-lg leading-relaxed"
              placeholder="Escribe tu historia aquí..."
            />
          </div>
        </div>

        {/* Right Column: Interactive Preview */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
                <MousePointerClick size={20} className="text-brand-600" /> Palabras Clave Interactivas
              </h2>
              <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-medium">
                {terms.length} Activas
              </span>
            </div>

            {/* Keyword Input Area */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={manualTerm}
                  onChange={(e) => setManualTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTerm(manualTerm)}
                  placeholder="Escribe una palabra clave..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-brand-500"
                />
                <button 
                  onClick={() => handleAddTerm(manualTerm)}
                  className="bg-brand-900 text-white px-3 py-2 rounded-md hover:bg-brand-800 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              {currentSelection && (
                <div className="flex items-center justify-between bg-brand-50 border border-brand-200 p-3 rounded-md animate-in fade-in slide-in-from-top-2">
                  <span className="text-sm text-brand-900 font-medium truncate mr-2">
                    ¿Agregar "{currentSelection}"?
                  </span>
                  <button 
                    onClick={() => handleAddTerm(currentSelection)}
                    className="text-xs bg-brand-600 text-white px-3 py-1.5 rounded-md hover:bg-brand-700 transition-colors whitespace-nowrap"
                  >
                    Agregar Selección
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4 max-h-32 overflow-y-auto">
                {terms.map(term => (
                  <span key={term} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-700 shadow-sm">
                    {term}
                    <button onClick={() => removeTerm(term)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {terms.length === 0 && (
                  <p className="text-sm text-slate-400 italic">Aún no hay palabras clave. Resalta texto en la vista previa o escribe arriba.</p>
                )}
              </div>
            </div>

            {/* Live Preview */}
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vista Previa en Vivo (Selecciona texto para agregar)</h3>
              <div 
                className="prose prose-slate max-w-none p-4 border border-slate-200 rounded-lg bg-slate-50/50 min-h-[200px] max-h-[500px] overflow-y-auto"
                onMouseUp={handleTextSelect}
              >
                {formData.content ? (
                  formData.content.split('\n\n').map((paragraph, idx) => (
                    <InteractiveText 
                      key={idx}
                      content={paragraph}
                      terms={terms}
                      onTermClick={() => {}} // No-op in admin
                    />
                  ))
                ) : (
                  <p className="text-slate-400 italic text-center mt-10">Comienza a escribir contenido para ver la vista previa...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
