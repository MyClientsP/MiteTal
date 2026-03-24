const qs = require('qs')

export const projectQuery = qs.stringify({
  populate: {
    heroImage: {
      fields: ['url', 'alternativeText']
    },
    tags: {
      populate: '*'
    },
    timeline: {
      populate: '*'
    },
    features: {
      populate: '*'
    },
    client: {
      populate: 
	  {
        logo: {
          fields: ['url', 'alternativeText']
        }
      }
    },
    results: {
      populate: '*'
    },
    testimonial: {
      populate: {
        avatar: {
          fields: ['url', 'alternativeText']
        }
      }
    },
    blocks: {populate: '*'}
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

export const projectQueryDeep = qs.stringify({
  populate: 'deep'
}, {
  encodeValuesOnly: true,
});

export const projectQueryExplicit = qs.stringify({
  populate: [
    'heroImage',
    'tags',
    'timeline', 
    'features',
    'client',
    'client.logo',
    'results',
    'testimonial',
    'testimonial.avatar',
    'blocks',
    'blocks.image',
    'blocks.video',
    'blocks.media',
    'blocks.gallery',
    'blocks.files'
  ]
}, {
  encodeValuesOnly: true,
});

export interface Client {
  name: string;
  logo: string;
  website: string;
}

export interface HeroImage {
  url: string;
  alt: string;
}

export interface Timeline {
  startDate: string;
  endDate: string;
  duration: string;
}

export interface TextBlock {
  type: 'text';
  id: string;
  content: TextBlockContent;
}

export interface ImageBlock {
  type: 'image';
  id: string;
  content: ImageBlockContent;
}

export interface VideoBlock {
  type: 'video';
  id: string;
  content: VideoBlockContent;
}

export interface YoutubeBlock {
  type: 'youtube';
  id: string;
  content: YoutubeBlockContent;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar: string;
}

export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  heroImage: HeroImage;
  client?: Client;
  category: string;
  tags: string[];
  timeline: Timeline;
  contentBlocks: ContentBlock[];
  features: Feature[];
  results?: string[];
  testimonial?: Testimonial;
}

export interface RichContentBlockContent {
  text: string;
}

export interface RichContentBlock {
  type: "rich-content";
  id: string;
  content: RichContentBlockContent;
}

export type ContentBlock = 
  | TextBlock 
  | ImageBlock 
  | VideoBlock 
  | YoutubeBlock 
  | RichContentBlock
  | ImgurBlock;

export interface TextBlockContent {
  heading: string;
  text: string;
}

export interface TextBlock {
  type: "text";
  id: string;
  content: TextBlockContent;
}

export interface ImageBlockContent {
  url: string;
  alt: string;
  caption: string;
  size: "small" | "medium" | "large" | "full";
}

export interface ImageBlock {
  type: "image";
  id: string;
  content: ImageBlockContent;
}

export interface VideoBlockContent {
  url: string;
  thumbnail: string;
  caption: string;
  autoplay: boolean;
}

export interface ImgurBlockContent {
	code: string;
}

export interface ImgurBlock {
  type: "imgur";
  id: string;
  content: ImgurBlockContent;
}

export interface VideoBlock {
  type: "video";
  id: string;
  content: VideoBlockContent;
}

export interface YoutubeBlockContent {
  videoId: string;
  caption: string;
}

export interface YoutubeBlock {
  type: "youtube";
  id: string;
  content: YoutubeBlockContent;
}