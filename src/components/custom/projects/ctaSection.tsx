'use client';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);

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

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={ctaRef}
      className="py-20 bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-700 text-white opacity-0 transform translate-y-8 transition-all duration-1000"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Ready to Start Your Next Project?
        </h2>
        <p className="text-xl text-primarymitetal-100 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Let's discuss how we can bring your vision to life with our expertise and innovative solutions.
        </p>
        <div className="flex flex-row sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primarymitetal-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;