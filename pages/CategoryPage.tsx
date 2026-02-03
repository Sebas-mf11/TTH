import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';
import { ArrowRight, Calendar, Trash2, Tag } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { articles, deleteArticle } = useArticles();

  const filteredArticles = articles.filter(
    article => article.category === category
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-brand-100 p-2 rounded-lg">
            <Tag className="text-brand-600" size={24} />
          </div>
          <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">Categoría</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900">
          {category}
        </h1>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div 
              key={article.id} 
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 relative"
            >
              <Link to={`/article/${article.id}`} className="flex-1 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-brand-900/0 transition-colors duration-300" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm">
                    {article.category}
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-brand-600 font-medium mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                  </div>
                  
                  <h2 className="text-xl font-serif font-bold text-brand-900 mb-3 group-hover:text-brand-700 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm line-clamp-3 mb-5 flex-1 leading-relaxed">
                    {article.subtitle}
                  </p>
                  
                  <div className="flex items-center text-accent-600 font-bold text-sm mt-auto group-hover:text-accent-500 transition-colors">
                    Leer Artículo <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if(window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
                    deleteArticle(article.id);
                  }
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 shadow-sm"
                title="Eliminar Artículo"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-lg">No hay artículos en esta categoría todavía.</p>
          <Link to="/" className="text-brand-600 font-medium mt-4 inline-block hover:underline">
            Volver al inicio
          </Link>
        </div>
      )}
    </div>
  );
};
