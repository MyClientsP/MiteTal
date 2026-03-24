'use client';

import { User, Calendar, Clock } from "lucide-react";
import { Client, Timeline } from './projectQuery'

interface ProjectInfoProps {
  client?: Client;
  timeline: Timeline;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ client, timeline }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-white shadow-sm py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {client && (
			  <div className="flex items-center gap-3">
			    <User className="w-5 h-5 text-gray-400" />
			    <div>
			      <p className="text-sm text-gray-500">Client</p>
			      <p className="font-semibold text-primarymitetal-700">{client.name}</p>
			    </div>
			  </div>
			)}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-primarymitetal-700">{timeline.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="font-semibold text-primarymitetal-700">{formatDate(timeline.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;