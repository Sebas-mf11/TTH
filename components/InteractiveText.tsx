import React, { useMemo } from 'react';

interface InteractiveTextProps {
  content: string;
  terms: string[];
  onTermClick: (term: string) => void;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ content, terms, onTermClick }) => {
  
  const renderedContent = useMemo(() => {
    if (!terms || terms.length === 0) return <p className="mb-6 text-lg leading-8 text-slate-800 font-serif">{content}</p>;

    // Sort terms by length descending to match longest phrases first
    const sortedTerms = [...terms].sort((a, b) => b.length - a.length);

    // Escape special regex characters
    const escapedTerms = sortedTerms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    
    const parts = content.split(regex);

    return (
      <p className="mb-6 text-xl leading-9 text-slate-800 font-serif">
        {parts.map((part, index) => {
          const isInteractive = terms.some(term => term.toLowerCase() === part.toLowerCase());

          if (isInteractive) {
            return (
              <span
                key={index}
                onClick={() => onTermClick(part)}
                className="
                  relative inline-block cursor-pointer font-medium text-brand-900 
                  border-b-2 border-accent-500/60 hover:border-accent-500 hover:bg-accent-50 
                  transition-all duration-200 px-0.5 rounded-t-sm
                  group
                "
                role="button"
                tabIndex={0}
                aria-label={`Más información sobre ${part}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onTermClick(part);
                  }
                }}
              >
                {part}
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    );
  }, [content, terms, onTermClick]);

  return <>{renderedContent}</>;
};
