import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';
import { HeroSlider } from '../components/HeroSlider';
import { ArrowRight, Calendar, Trash2 } from 'lucide-react';

export const Home: React.FC = () => {
  const { articles, deleteArticle } = useArticles();

  // We use the first 5 for the slider, display the rest in the grid
  // Or display all in grid as well? The prompt says "slider showing latest...". 
  // Usually, you don't duplicate immediately below, but for a blog listing, it's fine to list everything or offset.
  // Let's list everything below for now, or maybe offset by 3 if we want variety.
  // For simplicity and "latest news" feel, we'll show the slider and then the full grid below.

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Slider Section */}
      <HeroSlider articles={articles} />

      {/* Latest News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12 border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-serif font-bold text-brand-900 relative">
            Últimas Noticias
            <span className="absolute -bottom-4 left-0 w-20 h-1 bg-accent-500"></span>
          </h2>
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group flex flex-col bg-white h-full"
            >
              <Link to={`/article/${article.id}`} className="flex-1 flex flex-col">
                <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-accent-500 text-brand-900 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider shadow-sm">
                    {article.category}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-accent-600 font-bold">{article.author}</span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-brand-900 mb-3 group-hover:text-accent-600 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  
                  <p className="text-slate-600 text-base line-clamp-3 mb-5 flex-1 leading-relaxed">
                    {article.subtitle}
                  </p>
                  
                  <div className="flex items-center text-brand-900 font-bold text-sm mt-auto group-hover:text-accent-600 transition-colors uppercase tracking-wide">
                    Leer Más <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              
              {/* Admin Delete Button */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if(window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
                    deleteArticle(article.id);
                  }
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 shadow-sm z-10"
                title="Eliminar Artículo"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
