import { ProjectData, ImageBlockContent, projectQuery } from "@/components/custom/project-detail/projectQuery";
import ProjectHeader from "@/components/custom/project-detail/projectHeader";
import HeroSection from "@/components/custom/project-detail/heroSection";
import ProjectInfo from "@/components/custom/project-detail/projectInfo";
import ContentBlocks from "@/components/custom/project-detail/contentBlocks";
import ProjectImpact from "@/components/custom/project-detail/projectImpact";
import TestimonialSection from "@/components/custom/project-detail/testimonialSection";
import Sidebar from "@/components/custom/project-detail/sidebar";
import CTASection from "@/components/custom/project-detail/ctaSection";
import { fetchStrapiData } from "@/utils/fetchData";
import { error } from "console";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

interface StrapiProjectResponse {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  shortDescription: string;
  category: string;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
  };
  tags: Array<{
    id: number;
    tag: string;
  }>;
  timeline: {
    id: number;
    startDate: string;
    endDate: string;
    duration: string;
  };
  features: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  client?: {
    id: number;
    name: string;
    website: string;
    logo: {
      id: number;
      documentId: string;
      url: string;
      alternativeText?: string;
    };
  };
  results?: Array<{
    id: number;
    result: string;
  }>;
  testimonial?: {
    id: number;
    quote: string;
    author: string;
    position: string;
    avatar: {
      id: number;
      documentId: string;
      url: string;
      alternativeText?: string;
    };
  };
  blocks: Array<{
    __component: string;
    id: number;
    heading?: string;
    text?: string;
    body?: any;
    code?: any;
    caption?: string;
    videoId?: string;
    autoplay?: boolean;
    image?: {
      id: number;
      documentId: string;
      url: string;
      alternativeText?: string;
    };
    video?: {
      id: number;
      documentId: string;
      url: string;
      alternativeText?: string;
    };
    thumbnail?: {
      id: number;
      documentId: string;
      url: string;
      alternativeText?: string;
    };
  }>;
}

const transformStrapiData = (strapiData: StrapiProjectResponse): ProjectData => {
  const contentBlocks = strapiData.blocks.map((block, index) => {
    switch (block.__component) {
      case 'shared.rich-text':
        return {
          type: "rich-content" as const,
          id: `rich-text-${block.id}`,
          content: {
            text: block.body
          }
        };
      
      case 'components.text-block':
        return {
          type: "text" as const,
          id: `text-${block.id}`,
          content: {
            heading: block.heading || "",
            text: block.text || ""
          }
        };
      
      case 'components.image-block':
        return {
          type: "image" as const,
          id: `image-${block.id}`,
          content: {
            url: block.image?.url ? `${block.image.url}` : "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            alt: block.image?.alternativeText || block.caption || "Project image",
            caption: block.caption || "",
            size: "large" as const
          }
        };

      case 'components.imgur-block':
        return {
          type: "imgur" as const,
          id: `imgur-${block.id}`,
          content: {
            code: block.code
          }
        }
      
      case 'components.video-block':
        return {
          type: "video" as const,
          id: `video-${block.id}`,
          content: {
            url: block.video?.url ? `${block.video.url}` : "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            thumbnail: block.thumbnail?.url ? `${block.thumbnail.url}` : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            caption: block.caption || "",
            autoplay: block.autoplay || false
          }
        };
      
      case 'components.youtube-block':
        return {
          type: "youtube" as const,
          id: `youtube-${block.id}`,
          content: {
            videoId: block.videoId || "",
            caption: block.caption || ""
          }
        };
      
      default:
        return {
          type: "text" as const,
          id: `unknown-${block.id}`,
          content: {
            heading: "Content",
            text: "Content block"
          }
        };
    }
  });

  return {
    id: strapiData.id,
    title: strapiData.title,
    slug: strapiData.slug,
    shortDescription: strapiData.shortDescription,
    heroImage: {
      url: strapiData.heroImage?.url ? `${strapiData.heroImage.url}` : "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: strapiData.heroImage?.alternativeText || strapiData.title
    },
    ...(strapiData.client && {client: {
      name: strapiData.client.name,
      logo: strapiData.client.logo?.url ? `${strapiData.client.logo.url}` : "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      website: strapiData.client.website
    }}),
    category: strapiData.category,
    tags: strapiData.tags.map(tag => tag.tag),
    timeline: {
      startDate: strapiData.timeline.startDate,
      endDate: strapiData.timeline.endDate,
      duration: strapiData.timeline.duration
    },
    contentBlocks,
    features: strapiData.features,
    ...(strapiData.results && strapiData.results.length > 0 && {results: 
        strapiData.results.map(item => item.result)
    }),
    ...(strapiData.testimonial && {testimonial: {
      quote: strapiData.testimonial.quote,
      author: strapiData.testimonial.author,
      position: strapiData.testimonial.position,
      avatar: strapiData.testimonial.avatar?.url ? `${strapiData.testimonial.avatar.url}` : "https://images.unsplash.com/photo-1494790108755-2616b612b131?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }})
  };
};

type ProjectDetailPageProps = {
  params: Promise<{ documentId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: { params: Promise<{ documentId: string }> }): Promise<Metadata> {
  const { documentId } = await params;
  
  try {
    const strapiData: StrapiProjectResponse = await fetchStrapiData(`articles/${documentId}`, projectQuery);
    
    if (!strapiData) {
      return {
        title: 'Project Not Found | Mite Tal',
        description: 'The requested project could not be found.'
      };
    }

    const heroImageUrl = strapiData.heroImage?.url 
      ? `${strapiData.heroImage.url}` 
      : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80';

    const projectUrl = `https://mitetal.com/project/${documentId}`;
    
    return {
      title: `${strapiData.title} | Mite Tal`,
      description: strapiData.shortDescription,
      keywords: [
        'Mite Tal',
        strapiData.category,
        ...strapiData.tags.map(tag => tag.tag),
        'AR Learning',
        'Educational Technology',
        'WebGL',
        'Animation'
      ],
      metadataBase: new URL('https://mitetal.com'),
      openGraph: {
        title: `${strapiData.title} | Mite Tal`,
        description: strapiData.shortDescription,
        url: projectUrl,
        siteName: 'Mite Tal',
        locale: 'en_US',
        type: 'article',
        images: [
          {
            url: heroImageUrl,
            width: 1200,
            height: 630,
            alt: strapiData.heroImage?.alternativeText || strapiData.title,
          },
        ],
        ...(strapiData.publishedAt && {
          publishedTime: strapiData.publishedAt,
        }),
        ...(strapiData.updatedAt && {
          modifiedTime: strapiData.updatedAt,
        }),
        ...(strapiData.tags.length > 0 && {
          tags: strapiData.tags.map(tag => tag.tag),
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${strapiData.title} | Mite Tal`,
        description: strapiData.shortDescription,
        images: [heroImageUrl],
        site: '@mitetal',
      },
      alternates: {
        canonical: projectUrl,
      },
      other: {
        'article:author': strapiData.client?.name || 'Mite Tal',
        'article:section': strapiData.category,
        'article:tag': strapiData.tags.map(tag => tag.tag).join(', '),
      },
    };
  } catch (error) {
    return {
      title: 'Project | Mite Tal',
      description: 'Explore our innovative AR and educational technology projects.'
    };
  }
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = async ({
  params,
  searchParams
}) => {
  const { documentId } = await params;
  let strapiData: StrapiProjectResponse;
  let finalProjectData: ProjectData;

  strapiData = await fetchStrapiData(`articles/${documentId}`, projectQuery);

  if (!strapiData) {
    notFound();
  }

  try {
    finalProjectData = transformStrapiData(strapiData);
  } catch (error) {
    throw new Error('Failed to process project data');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader />

      <HeroSection
        heroImage={finalProjectData.heroImage}
        category={finalProjectData.category}
        title={finalProjectData.title}
        shortDescription={finalProjectData.shortDescription}
      />

      <ProjectInfo
        client={finalProjectData.client}
        timeline={finalProjectData.timeline}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="lg:col-span-3 min-w-0">
              <ContentBlocks contentBlocks={finalProjectData.contentBlocks} />
              {finalProjectData.results && finalProjectData.results.length > 0 && (
                <ProjectImpact results={finalProjectData.results} />
              )}
              {finalProjectData.testimonial && (
                <TestimonialSection testimonial={finalProjectData.testimonial} />
              )}
            </div>
            <Sidebar
              client={finalProjectData.client}
              features={finalProjectData.features}
              tags={finalProjectData.tags}
            />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ProjectDetailPage;