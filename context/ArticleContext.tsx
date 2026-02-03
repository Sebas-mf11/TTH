import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, ArticleContextType } from '../types';
import { articles as initialArticles } from '../data/mockData';

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_articles');
      return saved ? JSON.parse(saved) : initialArticles;
    } catch (e) {
      console.error("Failed to load articles from local storage", e);
      return initialArticles;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumina_articles', JSON.stringify(articles));
    } catch (e) {
      console.error("Failed to save articles to local storage", e);
    }
  }, [articles]);

  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, deleteArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error('useArticles must be used within ArticleProvider');
  return context;
};
