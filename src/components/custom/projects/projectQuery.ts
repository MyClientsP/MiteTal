const qs = require('qs')

export const projectQuery = qs.stringify({
  populate:
  {
    heroImage: {
      fields: ['url', 'alternativeText']
    },
    tags: {
      populate: '*'
    },
    timeline: {
      populate: '*'
    },
    client: {
      populate: 
	  {
        fields: ['name']
      }
    }
  }
}, {
  encodeValuesOnly: true,
});

export const projectQueryMaxDepth = qs.stringify({
  populate: {
    '*': {
      populate: {
        '*': {
          populate: {
            '*': {
              populate: '*'
            }
          }
        }
      }
    }
  }
}, {
  encodeValuesOnly: true,
});

export interface Project {
  id: number;
  title: string;
  documentId: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  client: string;
  duration: string;
  year: string;
}

export interface ProjectsData {
  heading: string;
  subHeading: string;
  description: string;
  cta: string;
  projects: Project[];
  categories: string[];
}

export interface ProjectsPageProps {
  projectsData: ProjectsData;
}