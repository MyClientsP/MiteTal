import { guideQuery, GuideData } from "@/components/custom/guide/guideQuery";
import ContentBlocks from "@/components/custom/project-detail/contentBlocks";
import { fetchStrapiData } from "@/utils/fetchData";
import { notFound } from "next/navigation";

interface StrapiProjectResponse {
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

const transformStrapiData = (strapiData: StrapiProjectResponse): GuideData => {
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
	contentBlocks
  };
};

const Guide = async () => {
  let strapiData: StrapiProjectResponse;
  let finalData: GuideData;

  strapiData = await fetchStrapiData(`guide`, guideQuery);

  if (!strapiData) {
	notFound();
  }

  try {
	finalData = transformStrapiData(strapiData);
  } catch (error) {
	throw new Error('Failed to process project data');
  }

  return (
	<div className="min-h-screen bg-gray-50">
	  <section className="py-16">
			<ContentBlocks contentBlocks={finalData.contentBlocks} />
	  </section>
	</div>
  );
};

export default Guide;
