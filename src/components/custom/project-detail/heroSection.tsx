'use client';

import { HeroImage} from './projectQuery'

interface HeroSectionProps {
  heroImage: HeroImage;
  category: string;
  title: string;
  shortDescription: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  heroImage, 
  category, 
  title, 
  shortDescription 
}) => {
  return (
    <section className="relative h-96 lg:h-[500px] overflow-hidden">
      <img
        src={heroImage.url}
        alt={heroImage.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-4 py-2 bg-primarymitetal-500 text-white rounded-full text-sm font-semibold">
              {category}
            </span>
          </div>
          <h1 className="headingUpper text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {shortDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;