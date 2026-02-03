import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface HeroSliderProps {
  articles: Article[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use the first 5 articles for the slider
  const sliderArticles = articles.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [sliderArticles.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderArticles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderArticles.length) % sliderArticles.length);
  };

  if (sliderArticles.length === 0) return null;

  return (
    <div className="relative w-full h-[600px] bg-brand-900 overflow-hidden group">
      {sliderArticles.map((article, index) => (
        <div
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-90" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto flex flex-col items-start justify-end h-full pb-20">
            <div className="max-w-4xl animate-in slide-in-from-bottom-8 fade-in duration-700">
              <span className="inline-block bg-accent-500 text-brand-900 text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 rounded-sm">
                {article.category}
              </span>
              <Link to={`/article/${article.id}`}>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-4 hover:text-accent-400 transition-colors drop-shadow-lg">
                  {article.title}
                </h2>
              </Link>
              <p className="text-white/80 text-lg md:text-xl line-clamp-2 font-light max-w-2xl mb-6 drop-shadow-md">
                {article.subtitle}
              </p>
              
              <div className="flex items-center gap-4 text-white/60 text-sm font-medium uppercase tracking-wider">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-accent-500 hover:text-brand-900 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-accent-500 hover:text-brand-900 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sliderArticles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentIndex ? 'bg-accent-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
      
      {/* Chat Icon Decoration (from reference image) */}
      <div className="absolute bottom-8 right-8 z-20">
         <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
            <MessageSquare size={24} />
         </div>
      </div>
    </div>
  );
};
