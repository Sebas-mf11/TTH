import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';
import { InteractiveText } from '../components/InteractiveText';
import { ChatWidget } from '../components/ChatWidget';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useArticles();
  const [article, setArticle] = useState(articles.find(a => a.id === id));
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  useEffect(() => {
    setArticle(articles.find(a => a.id === id));
    window.scrollTo(0, 0);
  }, [id, articles]);

  const handleTermClick = (term: string) => {
    setActiveTerm(term);
  };

  const handleCloseChat = () => {
    setActiveTerm(null);
  };

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif text-slate-800 mb-4">Artículo no encontrado</h2>
        <Link to="/" className="text-brand-600 hover:underline">Volver al Inicio</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Volver a Noticias
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight shadow-sm">
            {article.title}
          </h1>
          <p className="text-xl text-white/90 font-light max-w-2xl">
            {article.subtitle}
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-sm border-t border-slate-100">
          
          {/* Meta Data */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{article.author}</p>
                <p className="text-xs text-slate-500">{article.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1 text-xs uppercase tracking-wider font-medium">
                <Clock size={14} /> 5 min de lectura
              </span>
              <button className="hover:text-brand-600 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg prose-slate prose-headings:font-serif prose-a:text-brand-600 hover:prose-a:text-brand-500">
            {/* We split the content by newlines to create paragraphs, then render interactive text in each */}
            {article.content.split('\n\n').map((paragraph, idx) => (
              <InteractiveText 
                key={idx}
                content={paragraph}
                terms={article.interactiveTerms}
                onTermClick={handleTermClick}
              />
            ))}
          </div>

          {/* Footer of Article */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Palabras clave en esta historia</h3>
            <div className="flex flex-wrap gap-2">
              {article.interactiveTerms.map(term => (
                <span key={term} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-default">
                  {term}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        term={activeTerm}
        articleTitle={article.title}
        onClose={handleCloseChat}
      />
    </div>
  );
};
