import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ArticleProvider } from './context/ArticleContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { AdminPage } from './pages/AdminPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <ArticleProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ArticleProvider>
  );
};

export default App;
