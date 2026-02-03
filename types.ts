export type ArticleCategory = 'Aerolíneas' | 'Hoteles' | 'Navieras' | 'Destinos';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string; // The full text content
  interactiveTerms: string[]; // List of terms that should be clickable
  category: ArticleCategory;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
}
