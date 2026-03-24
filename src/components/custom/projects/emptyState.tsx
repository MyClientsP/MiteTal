'use client';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (emptyRef.current) {
      observer.observe(emptyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={emptyRef}
      className="text-center py-16 opacity-0 transition-all duration-800"
    >
      <div className="text-6xl mb-4 animate-pulse">🔍</div>

      <h3
        className="text-xl font-semibold text-gray-900 mb-2 opacity-0"
        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
      >
        No projects found
      </h3>

      <p
        className="text-gray-600 mb-6 opacity-0"
        style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
      >
        Try adjusting your search terms or filter criteria
      </p>

      <button
        onClick={onClearFilters}
        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg opacity-0"
        style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
      >
        Clear Filters
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
};

export default EmptyState;
