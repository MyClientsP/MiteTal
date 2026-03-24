'use client';

import { ArrowLeft } from "lucide-react";

interface ProjectHeaderProps {
  onBackClick?: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onBackClick }) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <a 
		  href="/projects"
          onClick={onBackClick}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </a>
      </div>
    </div>
  );
};

export default ProjectHeader;