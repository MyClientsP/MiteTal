import { Project, projectQuery } from "@/components/custom/projects/projectQuery";
import { fetchStrapiData } from "@/utils/fetchData";
import { ImageSrc } from "@/components/custom/home/homeQuery";
import ProjectC from "./project";

type Tag = {
  id: number;
  tag: string;
}

type Client = {
  id: number;
  name: string;
  website: string;
}

type Timeline = {
  id: number;
  startDate: string;
  endDate: string;
  duration: string;
}

type Article = {
  id: number;
  createdAt: string;
  title: string;
  documentId: string;
  shortDescription: string;
  heroImage: ImageSrc;
  tags: Tag[];
  category: string;
  client: Client;
  timeline: Timeline;
  year: string;
  featured: boolean;
}

interface ProjectsData {
  heading: string;
  subHeading: string;
  description: string;
  projects: Project[];
}

const transformArticlesToProjects = (articles: Article[]) => {
  return articles.map(article => ({
    id: article.id,
    createdAt: article.createdAt,
    title: article.title,
    documentId: article.documentId,
    description: article.shortDescription || '',
    image: article.heroImage?.url || '',
    tags: article.tags?.map(tag => tag.tag) || [],
    category: article.category,
    client: article.client?.name || '',
    duration: article.timeline?.duration || '',
    year: article.timeline?.startDate
      ? new Date(article.timeline.startDate).getFullYear().toString()
      : '',
    featured: article.featured,
  }));
};

const ProjectsShowcase = async () => {
  const data = await fetchStrapiData('articles', projectQuery);

  // No articles yet — render nothing
  if (!data || data.length === 0) return null;

  const allProjects = transformArticlesToProjects(data);
  const featured = allProjects
    .filter(p => p.featured)
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (featured.length === 0) return null;

  const projectsData: ProjectsData = {
    heading: "Our Featured Projects",
    subHeading: "Showcasing Innovation and Excellence",
    description:
      "Discover our portfolio of successful projects that demonstrate our expertise in creating powerful, user-friendly digital solutions.",
    projects: featured,
  };

  return <ProjectC data={projectsData} />;
};

export { ProjectsShowcase };