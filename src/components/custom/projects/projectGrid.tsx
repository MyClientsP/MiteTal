'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react';
import { Project } from './projectQuery';
import { Button } from "@/components/ui/button"

interface ProjectGridProps {
  projects: Project[];
  selectedCategory: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, selectedCategory }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [isAnimated, setIsAnimated] = useState(false);

  const displayedProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = projects.length > visibleProjects;

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 9, projects.length));
  };

  useEffect(() => {
    setVisibleProjects(9);
    setIsAnimated(false);
  }, [projects, selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            const cards = entry.target.querySelectorAll('.project-card');
            
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 150);
            });

            const loadMoreButton = document.getElementById('loadmore');
            if (loadMoreButton) {
              setTimeout(() => {
                loadMoreButton.classList.add('animate-fade-in-up');
              }, cards.length * 150 + 150);
            }

            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, [displayedProjects, isAnimated]);

  if (projects.length === 0) return null;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primarymitetal-700 mb-8 animate-fade-in">
          {selectedCategory === "All" ? "Other Projects" : `Other ${selectedCategory} Projects`}
        </h2>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1  transform translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  transition-all duration-300"></div>
              <div className="absolute top-4 left-4 bg-primarymitetal-600 text-white px-2 py-1 rounded text-xs font-semibold transform group-hover:scale-105 transition-transform duration-300">
                {project.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-primarymitetal-700 mb-2 group-hover:text-primarymitetal-600 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 h-16 leading-relaxed">
				  {project.description.split(' ').length > 12
				    ? project.description.split(' ').slice(0, 12).join(' ') + '...'
				    : project.description}
			  </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                {project.client && <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {project.client}
                </div>}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.year}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              <Link 
                href={`/project/${project.documentId}`}
                className="block w-full bg-primarymitetal-600 text-white py-2 rounded-lg hover:bg-primarymitetal-700 transition-all duration-300 text-sm font-medium text-center transform hover:scale-105"
              >
                View Project Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {hasMoreProjects && (
        <div style={{marginTop: 100}}>
          <div className='flex justify-center'>
            <Button 
              id='loadmore'
              onClick={loadMore}
              variant="outline" 
              className="cursor-pointer bg-transparent border-secmitetal text-secmitetal hover:bg-secmitetal hover:text-white transition-all duration-200 px-6 py-6 text-md md:text-2xl transform translate-y-8"
            >
              Load More
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;