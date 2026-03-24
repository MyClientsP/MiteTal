import HeroSection from "@/components/custom/projects/heroSection";
import FilterClient from "@/components/custom/projects/filterClient";
import CTASection from "@/components/custom/projects/ctaSection";
import { ProjectsData, projectQuery } from "@/components/custom/projects/projectQuery";
import { fetchStrapiData } from "@/utils/fetchData";
import { ImageSrc } from "@/components/custom/home/homeQuery";
import { notFound } from "next/navigation";

type Tag = {
	id : number;
	tag: string;
}

type Client = {
	id : number;
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
  createdAt: string;
  updatedAt: string;
  id: number,
  title: string,
  documentId: string,
  shortDescription: string,
  heroImage: ImageSrc,
  tags: Tag[],
  category: string,
  client: Client,
  timeline: Timeline,
  year: string
}

type TransformedProject = {
  createdAt: string;
  updatedAt: string;
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

const transformStrapiDataToProjects = (articles: Article[]) => {
  return articles.map(article => ({
	createdAt: article.createdAt,
	updatedAt: article.updatedAt,
    id: article.id,
    title: article.title,
    documentId: article.documentId,
    description: article.shortDescription || '', 
    image: article.heroImage?.url 
      ? (article.heroImage.url.startsWith('http') ? article.heroImage.url : `${process.env.STRAPI_URL || ''}${article.heroImage.url}`)
      : '',
    tags: article.tags?.map(tag => tag.tag) || [],
    category: article.category,
    client: article.client?.name || '',
    duration: article.timeline?.duration || '',
    year: article.timeline.startDate ? new Date(article.timeline.startDate).getFullYear().toString() : ''
  }));
};


const ProjectsPage = async () => {
	const data = await fetchStrapiData('articles', projectQuery)
	if (!data) {
		notFound()
	}
	const project = transformStrapiDataToProjects(data);

    const categories = [
    "All",
    ...Array.from(new Set(project.map(i => i.category)))
  ];
  const projects = project.sort((a: TransformedProject, b: TransformedProject) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const projectsData: ProjectsData = {
    heading: "Our Work",
    subHeading: "Showcasing Innovation Across Industries",
    description:
      "At Mite Tal, we turn curiosity into creation. Our projects span cutting-edge AR learning tools, interactive WebGL experiences, and engaging animated educational videos. Whether we’re building immersive modules for schools or crafting viral educational content for YouTube, each project reflects our commitment to joyful, meaningful learning.",
	cta: "Got a big idea for education or impact? We’d love to help you bring it to life.",
    projects,
    categories,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        heading={projectsData.heading}
        subHeading={projectsData.subHeading}
        description={projectsData.description}
		cta={projectsData.cta}
      />
      
      {/* <FilterClient projectsData={projectsData} /> */}
      
      <CTASection />
    </div>
  );
};

export default ProjectsPage;
