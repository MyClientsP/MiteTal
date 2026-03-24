'use client';
import { useEffect, useRef } from 'react';
import { 
  Zap,
  ChevronRight,
} from "lucide-react";
import {LinkT} from '@/components/custom/home/homeQuery'

interface HeroSectionProps {
  heading: string;
  subHeading: string;
  description: string;
  cta: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heading, subHeading, description, cta }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gradient-to-br from-primarymitetal-300 via-primarymitetal-400 to-primarymitetal-500 text-white py-20 lg:py-32">
        <div className="absolute inset-0">
	        <div className="absolute top-30 left-20 w-16 h-16 bg-bgmitetal rounded-full opacity-20 animate-pulse"></div>
	        <div className="absolute top-50  right-32 w-24 h-24 bg-bgmitetal  rounded-full opacity-15 animate-bounce"></div>
	        <div className="absolute bottom-60 left-32 w-20 h-20 bg-bgmitetal  rounded-full opacity-25 animate-bounce"></div>
			<div className="absolute bottom-60 right-20 w-10 h-10 bg-bgmitetal rounded-full opacity-20 animate-pulse"></div>
	      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heroRef}
          className="text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          <h1 className="headingUpper text-4xl lg:text-6xl font-bold mb-6">
            {heading}
          </h1>
          {/* <p className="text-xl lg:text-2xl mb-8 text-red-100">
            {subHeading}
          </p> */}
          <p className="text-lg text-red-100 max-w-6xl mx-auto mb-5">
            {description}
          </p>
		  <p className="text-lg text-red-100 max-w-6xl mx-auto mb-5">
            {cta}
          </p>
		  <div className="flex flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
	          <a 
	            href="https://www.youtube.com/@MiteTalContents"
				target='_blank'
	            className="inline-flex items-center px-8 py-4 bg-white text-primarymitetal-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
	          >
	            Explore Our YouTube
	            <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
	          </a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
