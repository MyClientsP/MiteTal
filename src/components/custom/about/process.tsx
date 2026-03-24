'use client'
import { useState, useEffect, useRef } from 'react'

type ProcessStep = {
  step: string;
  title: string;
  description: string;
}

type ProcessData = {
  heading: string;
  subHeading: string;
  process: ProcessStep[];
}

type ProcessProps = {
  processData: ProcessData;
}

const Process = ({ processData }: ProcessProps) => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { process, heading, subHeading } = processData;

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    process.forEach((_, index) => {
      initialState[`process-${index}`] = false;
    });
    setIsVisible(initialState);
  }, [process]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [process]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-6 headingUpper">{heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subHeading}
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-primarymitetal-200 to-primarymitetal-300"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {process.map((step, index) => (
              <div
                key={`${step.step}-${index}`}
                data-animate
                id={`process-${index}`}
                className={`relative text-center transform transition-all duration-700 ease-out ${
                  isVisible[`process-${index}`] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primarymitetal-400 to-primarymitetal-600 text-white rounded-full text-xl font-bold mb-6 z-10 shadow-lg">
                  {step.step}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primarymitetal-700">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {index < process.length - 1 && (
                  <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-indigo-200 to-purple-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;