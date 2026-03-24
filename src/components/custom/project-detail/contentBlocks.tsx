'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import {
  ContentBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  YoutubeBlock,
  ImgurBlock,
  ImageBlockContent
} from './projectQuery';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { div } from 'framer-motion/client';

interface ContentBlocksProps {
  contentBlocks: ContentBlock[];
  onImageClick?: (imageData: ImageBlockContent) => void;
}

interface TextBlockComponentProps {
  block: TextBlock;
}

interface ImageBlockComponentProps {
  block: ImageBlock;
  onImageClick?: (imageData: ImageBlockContent) => void;
}

interface VideoBlockComponentProps {
  block: VideoBlock;
}

interface YoutubeBlockComponentProps {
  block: YoutubeBlock;
}

interface ImgurBlockComponentProps {
	block: ImgurBlock;
}

interface RichTextBlockComponentProps {
  block: ContentBlock & { type: 'rich-content' };
  onImageClick?: (imageData: ImageBlockContent) => void;
}

export interface RichContentBlockContent {
  text: BlocksContent | string;
}

const TextBlockComponent: React.FC<TextBlockComponentProps> = ({ block }) => (
  <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
    {block.content.heading && (
      <h2 className="headingUpper text-lg sm:text-xl lg:text-2xl font-bold text-primarymitetal-700 mb-3 sm:mb-4 lg:mb-6 break-words">
        {block.content.heading}
      </h2>
    )}
    <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl break-words">
      {block.content.text}
    </p>
  </div>
);

const ImageBlockComponent: React.FC<ImageBlockComponentProps> = ({ block, onImageClick }) => {
  const sizeClasses = {
    small: "w-full max-w-sm mx-auto",
    medium: "w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto",
    large: "w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto",
    full: "w-full max-w-full"
  };

  return (
    <div className={`mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8 ${sizeClasses[block.content.size || 'large']}`}>
      <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          src={block.content.url}
          alt={block.content.alt}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => onImageClick?.(block.content)}
          loading="lazy"
        />
      </div>
      {block.content.caption && (
        <p className="text-center text-gray-600 mt-2 sm:mt-3 lg:mt-4 italic text-sm sm:text-base px-2 break-words">
          {block.content.caption}
        </p>
      )}
    </div>
  );
};

const VideoBlockComponent: React.FC<VideoBlockComponentProps> = ({ block }) => (
  <div className="mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="aspect-video rounded-lg overflow-hidden shadow-md">
        <video
          src={block.content.url}
          poster={block.content.thumbnail}
          controls
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          muted={block.content.autoplay}
          autoPlay={block.content.autoplay}
        />
      </div>
    </div>
    {block.content.caption && (
      <p className="text-center text-gray-600 mt-2 sm:mt-3 lg:mt-4 italic text-sm sm:text-base px-2 break-words max-w-3xl mx-auto">
        {block.content.caption}
      </p>
    )}
  </div>
);

const YoutubeBlockComponent: React.FC<YoutubeBlockComponentProps> = ({ block }) => {
	const subStr = block.content.videoId.substring(0, 17)
	let videoId 
	if (block.content.videoId.includes('https://')) {
		if (subStr === 'https://youtu.be/') {
			const idNum = block.content.videoId.substring(17)
			videoId = idNum.split('?')[0]
		} else {
			videoId = block.content.videoId.split('=')[1]
		}
	} else {
		videoId = block.content.videoId
	}
	return(
    <div className="mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
      {block.content.caption && (
        <p className="text-center text-gray-600 mt-2 sm:mt-3 lg:mt-4 italic text-sm sm:text-base px-2 break-words max-w-3xl mx-auto">
          {block.content.caption}
        </p>
      )}
    </div>
  );
};

const ImgurBlockComponent: React.FC<ImgurBlockComponentProps> = ({block}) => {
  let code = block.content.code;
  const classMatch = code.match(/class="([^"]+)"/);
  const langMatch = code.match(/lang="([^"]+)"/);
  const dataIdMatch = code.match(/data-id="([^"]+)"/);
  const hrefMatch = code.match(/<a[^>]*href="([^"]+)"[^>]*>/);
  const scriptSrcMatch = code.match(/<script[^>]*src="([^"]+)"[^>]*>/);
  const charSetMatch = code.match(/charset="([^"]+)"/);

  const classes = classMatch?.[1] || '';
  const lang = langMatch?.[1] || '';
  const dataId = dataIdMatch?.[1] || '';
  const linkId = hrefMatch?.[1] || '';
  const scriptSrc = scriptSrcMatch?.[1] || '';
  const charSet = charSetMatch?.[1] || 'utf-8';
  const match = code.match(/<a[^>]*>(.*?)<\/a>/);
  const linkText = match?.[1] || '';
  return (
    <div className="mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <blockquote className={`${classes} w-full overflow-hidden`} lang={lang} data-id={dataId}>
          <a href={linkId} className="block break-words text-sm sm:text-base">{linkText}</a>
        </blockquote>
        <script async src={scriptSrc}></script>
      </div>
    </div>
  );
};

const RichTextBlockComponent: React.FC<RichTextBlockComponentProps> = ({ block, onImageClick }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const markdownContent = typeof block.content.text === 'string'
    ? block.content.text
    : JSON.stringify(block.content.text);

  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-primarymitetal-700 break-words">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-primarymitetal-700 break-words">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 text-primarymitetal-700 break-words">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-primarymitetal-700 break-words">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm sm:text-base font-semibold mb-2 text-primarymitetal-700 break-words">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs sm:text-sm font-semibold mb-2 text-primarymitetal-700 break-words">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="mb-3 sm:mb-4 text-gray-800 leading-relaxed text-sm sm:text-base break-words">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-gray-800 pl-2 sm:pl-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-gray-800 pl-2 sm:pl-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-800 text-sm sm:text-base break-words">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 sm:border-l-4 border-gray-300 pl-2 sm:pl-4 italic text-gray-700 my-3 sm:my-4 text-sm sm:text-base break-words">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => {
            const codeContent = React.Children.toArray(children)
              .map(child => {
                if (React.isValidElement(child)) {
                  const props = child.props as { children?: React.ReactNode };
                  if (props.children) {
                    if (typeof props.children === 'string') {
                      return props.children;
                    }
                    if (Array.isArray(props.children)) {
                      return props.children.filter(c => typeof c === 'string').join('');
                    }
                  }
                }
                return '';
              })
              .join('');

            const isCopied = copiedCode === codeContent;

            return (
              <div className="relative group my-3 sm:my-4 w-full">
                <div className="overflow-x-auto">
                  <pre className="p-3 sm:p-4 rounded-lg text-xs sm:text-sm bg-gray-100 pr-10 sm:pr-12 min-w-0 whitespace-pre-wrap break-all">
                    {children}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(codeContent)}
                  className={`cursor-pointer absolute top-2 right-2 px-2 py-1 text-xs rounded transition-all duration-200 ${
                    isCopied
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 group-hover:opacity-100'
                  }`}
                  title={isCopied ? 'Copied!' : 'Copy code'}
                >
                  {isCopied ? (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline">Copied</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      <span className="hidden sm:inline">Copy</span>
                    </span>
                  )}
                </button>
              </div>
            );
          },
          code: ({ children }) => (
            <code className="bg-gray-100 text-gray-800 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-mono break-words">
              {children}
            </code>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          del: ({ children }) => (
            <del className="line-through">{children}</del>
          ),
          u: ({ children }) => (
            <u className="underline">{children}</u>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primarymitetal-500 hover:text-primarymitetal-700 underline break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            const srcString = typeof src === 'string' ? src : String(src || '');
            const imageUrl = srcString.startsWith('http') ? srcString : `${srcString}`;
            return (
            //   <div className="my-3 sm:my-4 lg:my-6 w-full">
                <img
                  src={imageUrl}
                  alt={alt || 'Image'}
                  className="my-3 sm:my-4 lg:my-6 w-full h-auto object-cover rounded-md sm:rounded-lg shadow-sm sm:shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    onImageClick?.({
                      url: imageUrl,
                      alt: alt || 'Image',
                      caption: alt || '',
                      size: 'large' as const,
                    })
                  }
                  loading="lazy"
                />
            //   </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 sm:my-4 w-full">
              <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 bg-gray-100 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold break-words">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm break-words">
              {children}
            </td>
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

const ContentBlocks: React.FC<ContentBlocksProps> = ({ contentBlocks, onImageClick }) => {
  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return <TextBlockComponent key={block.id} block={block} />;
      case 'image':
        return <ImageBlockComponent key={block.id} block={block} onImageClick={onImageClick} />;
      case 'video':
        return <VideoBlockComponent key={block.id} block={block} />;
      case 'youtube':
        return <YoutubeBlockComponent key={block.id} block={block} />;
      case 'rich-content':
        return <RichTextBlockComponent key={block.id} block={block} onImageClick={onImageClick} />;
	  case 'imgur':
		return <ImgurBlockComponent key={block.id} block={block} />
      default:
        return null;
    }
  };

  return (
    <article className="w-full max-w-4xl mx-auto overflow-hidden">
      {contentBlocks.map(renderContentBlock)}
    </article>
  );
};

export default ContentBlocks;
export { TextBlockComponent, ImageBlockComponent, VideoBlockComponent, YoutubeBlockComponent, RichTextBlockComponent, ImgurBlockComponent };