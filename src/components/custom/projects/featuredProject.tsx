'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, Calendar, Eye } from 'lucide-react';
import { Project } from './projectQuery';

interface FeaturedProjectProps {
  project: Project;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in-left');
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (featuredRef.current) {
    observer.observe(featuredRef.current);
  }

  return () => observer.disconnect();
}, []);


  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-primarymitetal-700 mb-8 animate-fade-in">
        Latest Project
      </h2>
      <div 
        ref={featuredRef}
        className="bg-white rounded-3xl shadow-xl overflow-hidden opacity-0 lg:transform lg:translate-x-8 transition-all duration-1000 hover:shadow-2xl"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative h-64 lg:h-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="text-primarymitetal-600 font-semibold mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {project.category}
            </div>
            <h3 className="text-3xl font-bold text-primarymitetal-700 mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {project.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {project.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {project.client && <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {project.client}
              </div>}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.year}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {project.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex} 
                  className="px-3 py-1 bg-primarymitetal-100 text-primarymitetal-700 rounded-full text-sm font-medium transform hover:scale-105 transition-transform duration-200"
                  style={{ animationDelay: `${0.7 + tagIndex * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Link 
                href={`/project/${project.documentId}`}
                className="flex items-center gap-2 px-6 py-3 bg-primarymitetal-600 text-white rounded-full hover:bg-primarymitetal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;