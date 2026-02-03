import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { createChatSession, sendChatMessage } from '../services/geminiService';
import { Chat } from '@google/genai';

interface ChatWidgetProps {
  term: string | null;
  articleTitle: string;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ term, articleTitle, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat when term changes
  useEffect(() => {
    if (term) {
      const newChat = createChatSession(articleTitle, term);
      setChatSession(newChat);
      setMessages([]);
      setIsLoading(true);

      // Send initial prompt to get the definition/context
      const initialPrompt = `Explícame brevemente qué es "${term}" y dame un dato curioso al respecto.`;
      
      if (newChat) {
        sendChatMessage(newChat, initialPrompt)
          .then(response => {
            setMessages([
              {
                id: 'init',
                role: 'model',
                text: response
              }
            ]);
          })
          .catch(() => {
            setMessages([
              {
                id: 'error',
                role: 'model',
                text: "Lo siento, tuve problemas para conectar con el servidor de IA. Por favor intenta de nuevo.",
                isError: true
              }
            ]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        setMessages([{ id: 'no-key', role: 'model', text: "Error: API Key no configurada.", isError: true }]);
      }
    }
  }, [term, articleTitle]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (term && !isLoading) {
      inputRef.current?.focus();
    }
  }, [term, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(chatSession, userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Hubo un error al procesar tu mensaje.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!term) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity pointer-events-auto"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl pointer-events-auto flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
        
        {/* Header */}
        <div className="bg-brand-900 p-4 flex justify-between items-center shadow-md z-10 border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full">
              <Bot className="text-accent-400" size={24} />
            </div>
            <div>
              <h3 className="text-white font-serif font-bold text-lg leading-tight">
                {term}
              </h3>
              <p className="text-brand-200 text-xs flex items-center gap-1">
                <Sparkles size={10} className="text-accent-400" /> Asistente IA Activo
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[85%] rounded-2xl p-4 shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-brand-800 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }
                  ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                <Loader2 className="animate-spin text-brand-600" size={16} />
                <span className="text-xs text-slate-500 font-medium">Escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Haz una pregunta sobre este tema..."
              className="flex-1 bg-slate-100 text-slate-900 placeholder-slate-500 border-0 rounded-full py-3 pl-5 pr-12 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 p-2 bg-brand-900 text-white rounded-full hover:bg-brand-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            La IA puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </div>
    </div>
  );
};
