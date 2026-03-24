"use client";

import { ArrowRight,Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContactMethod } from "./contactQuery";
import iconMap from "../LucideIcon";

interface ContactMethodsSection {
  title: string;
  description: string;
  contactMethods: ContactMethod[];
}

type ContactMethodsSectionProps = {
  contactData: ContactMethodsSection;
};

const ContactMethodsSection = ({ contactData }: ContactMethodsSectionProps) => {
  const { contactMethods, title, description } = contactData;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            contactMethods.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 150);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [contactMethods]);

  useEffect(() => {
    setVisibleCards(new Array(contactMethods.length).fill(false));
  }, [contactMethods]);

  return (
    <>
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeUpCard {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }

        .animate-fade-up-card {
          animation: fadeUpCard 0.6s ease-out forwards;
        }

        .opacity-0 {
          opacity: 0;
        }

        .translate-y-8 {
          transform: translateY(32px);
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="py-20 bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="headingUpper text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-6">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
				const icon = method.icon ? method.icon.replace(/\s+/g, '') : 'Target';
				let Icon = iconMap[icon];
	            if (!Icon) {
	              Icon = iconMap['Target'] || Target;
	            }

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                    visibleCards[index] 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-10 scale-95'
                  }`}
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: visibleCards[index] ? '0ms' : `${index * 100}ms`
                  }}
                >
                  <div 
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primarymitetal-300 to-primarymitetal-500 rounded-full mb-4 transition-all duration-500`}
                    style={{
                      transform: visibleCards[index] ? 'scale(1)' : 'scale(0.8)',
                      transitionDelay: `${index * 100 + 200}ms`
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-center text-primarymitetal-700 mb-2">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-center">
                    {method.description}
                  </p>
                  
                  <a
                    href={
                      method.type === 'messenger'
                        ? `https://www.messenger.com/t/${method.action.url}`
                        : method.type === 'call'
                        ? `tel:${method.action.url}`
                        : method.type === 'mail'
                        ? `mailto:${method.action.url}`
                        : method.action.url
                    }
                    target={['messenger', 'book'].includes(method.type) ? '_blank' : undefined}
                    rel={['messenger', 'book'].includes(method.type) ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-primarymitetal-500 font-semibold hover:text-primarymitetal-600 transition-all duration-300 hover:translate-x-1"
                  >
                    {method.action.text}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMethodsSection;