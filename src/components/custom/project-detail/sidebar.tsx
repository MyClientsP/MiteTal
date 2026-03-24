'use client';

import { ExternalLink } from "lucide-react";
import { Client, Feature } from "./projectQuery";

interface ClientCardProps {
  client: Client;
}

interface FeaturesCardProps {
  features: Feature[];
}

interface TagsCardProps {
  tags: string[];
}

interface SidebarProps {
  client?: Client;
  features: Feature[];
  tags: string[];
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-22">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Client</h3>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={client.logo}
          alt={client.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{client.name}</p>
          <a
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primarymitetal-500 hover:text-primarymitetal-700 text-sm flex items-center gap-1"
          >
            Visit Website
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

const FeaturesCard: React.FC<FeaturesCardProps> = ({ features }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-2xl">{feature.icon}</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TagsCard: React.FC<TagsCardProps> = ({ tags }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ client, features, tags }) => {
  return (
    <div className="space-y-8">
		{client && 
		<ClientCard client={client} />
		}
      <FeaturesCard features={features} />
      <TagsCard tags={tags} />
    </div>
  );
};

export default Sidebar;