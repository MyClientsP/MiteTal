'use client';

import { ExternalLink } from "lucide-react";

interface CTASectionProps {
  onStartProject?: () => void
  onViewMoreProjects?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onStartProject, onViewMoreProjects }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Have a Similar Project in Mind?
        </h2>
        <p className="text-xl text-primarymitetal-100 mb-8">
          Let's discuss how we can bring your vision to life with our proven expertise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<div className="flex flex-row">
	          <a 
			  	href="/contact"
	            className="inline-flex items-center px-8 py-4 bg-white text-primarymitetal-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
	          >
	            Start Your Project
	            <ExternalLink className="ml-2 w-5 h-5" />
	          </a>
		  </div>
		  <div className="flex flex-row">
	          <a 
			    href="/projects"
	            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primarymitetal-600 transition-colors duration-300"
	          >
	            View More Projects
	          </a>
		  </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;