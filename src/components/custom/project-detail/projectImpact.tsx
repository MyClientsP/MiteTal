'use client';

import { Award, CheckCircle } from "lucide-react";

interface ProjectImpactProps {
  results: string[];
}

const ProjectImpact: React.FC<ProjectImpactProps> = ({ results }) => {
  return (
    <div className="bg-gradient-to-r from-primarymitetal-50 to-primarymitetal-100 p-8 rounded-2xl mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-primarymitetal-700" />
        Project Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primarymitetal-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{result}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectImpact;