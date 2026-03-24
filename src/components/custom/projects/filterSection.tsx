'use client';
import { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalProjects: number;
  filteredCount: number;
  searchTerm: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  totalProjects,
  filteredCount,
  searchTerm
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLElement>(null);

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

    if (filterRef.current) {
      observer.observe(filterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={filterRef}
      className="py-8 bg-white shadow-sm  z-40 opacity-0 transition-all duration-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Filter buttons */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {selectedCategory === category ? (
                    <span className="cursor-pointer bg-primarymitetal-500 text-white shadow-lg px-4 py-2 rounded-full">
                      {category}
                    </span>
                  ) : (
                    <span className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full">
                      {category}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status text */}
        <div className="mt-4 text-center lg:text-left">
          <p
            className="text-gray-600 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Showing {filteredCount} of {totalProjects} projects
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
