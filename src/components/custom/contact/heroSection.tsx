'use client';
import { ChevronRight, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

interface HeroData {
  title: string;
  heading: string;
  subHeading: string;
  description: string;
}

interface HeroSectionProps {
  hero: HeroData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  const { title, heading, subHeading, description } = hero ?? {};
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.classList.remove('opacity-0', 'translate-y-8');
      el.classList.add('opacity-100', 'translate-y-0');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primarymitetal-300 via-primarymitetal-400 to-primarymitetal-500 py-24 lg:py-32">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-12 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-28 h-28 bg-white rounded-full opacity-[0.07] animate-bounce" style={{ animationDuration: '3.5s' }} />
        <div className="absolute bottom-16 left-1/4 w-14 h-14 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-12 right-12 w-10 h-10 bg-white rounded-full opacity-10 animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        {/* Eyebrow */}
        {title && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            <Mail className="w-4 h-4" />
            {title}
          </div>
        )}

        {/* Heading */}
        <h1 className="headingUpper text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {heading}
        </h1>

        {/* Sub-heading */}
        {subHeading && (
          <p className="text-lg lg:text-xl text-white/80 font-medium mb-4">
            {subHeading}
          </p>
        )}

        {/* Divider */}
        <div className="w-16 h-0.5 bg-white/40 rounded-full mx-auto mb-6" />

        {/* Description */}
        {description && (
          <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            {description}
          </p>
        )}

        {/* CTA */}
        <a
          href="mailto:contact@mitetal.com?subject=New enquiry"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primarymitetal-600 rounded-full font-semibold text-lg hover:bg-primarymitetal-50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md"
        >
          Mail to Us
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-0.5 h-12 bg-gradient-to-b from-transparent to-white/50 rounded-full mx-auto animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;