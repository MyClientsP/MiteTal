"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Office } from "./contactQuery";

interface OfficeLocationsSection {
  title: string;
  description: string;
  offices: Office[];
}

type OfficeLocationsSectionProps = {
  office: OfficeLocationsSection;
};

const OfficeLocationsSection = ({ office }: OfficeLocationsSectionProps) => {
  const { offices, title, description } = office;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            offices.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 200);
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
  }, [offices]);

  useEffect(() => {
    setVisibleCards(new Array(offices.length).fill(false));
  }, [offices]);

  return (
    <>
      <style jsx>{`
        @keyframes fadeUpOffice {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUpImage {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInContactInfo {
          from {
            opacity: 0;
            transform: translateY(15px) translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }

        .animate-fade-up-office {
          animation: fadeUpOffice 0.8s ease-out forwards;
        }

        .animate-slide-up-image {
          animation: slideUpImage 0.6s ease-out forwards;
        }

        .animate-contact-info {
          animation: fadeInContactInfo 0.5s ease-out forwards;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="py-20 bg-gray-50"
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
          
          <div className="grid lg:grid-cols-3 gap-8">
            {offices.map((officeItem, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 ${
                  visibleCards[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: visibleCards[index] ? '0ms' : `${index * 150}ms`
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={officeItem.image.url}
                    alt={`${officeItem.city} office`}
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      visibleCards[index] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-6 scale-110'
                    }`}
                    style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-800 ${
                      visibleCards[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150 + 300}ms` }}
                  ></div>
                  <div 
                    className={`absolute bottom-4 left-4 transition-all duration-700 ${
                      visibleCards[index] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 150 + 400}ms` }}
                  >
                    <h3 className="text-2xl font-bold text-white">{officeItem.city}</h3>
                    <p className="text-white/80">{officeItem.timezone}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, content: officeItem.address, href: null },
                      { icon: Phone, content: officeItem.phone, href: `tel:${officeItem.phone}` },
                      { icon: Mail, content: officeItem.email, href: `mailto:${officeItem.email}` }
                    ].map((item, contactIndex) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={contactIndex}
                          className={`flex items-start transition-all duration-600 ${
                            visibleCards[index] 
                              ? 'opacity-100 translate-y-0 translate-x-0' 
                              : 'opacity-0 translate-y-3 -translate-x-2'
                          }`}
                          style={{ 
                            transitionDelay: `${index * 150 + 500 + contactIndex * 100}ms` 
                          }}
                        >
                          <Icon 
                            className={`w-5 h-5 text-primarymitetal-500 mr-3 flex-shrink-0 transition-all duration-500 ${
                              contactIndex === 0 ? 'mt-0.5' : ''
                            } ${
                              visibleCards[index] ? 'scale-100 rotate-0' : 'scale-75 -rotate-45'
                            }`}
                            style={{ 
                              transitionDelay: `${index * 150 + 600 + contactIndex * 100}ms` 
                            }}
                          />
                          {item.href ? (
                            <a 
                              href={item.href} 
                              className="text-primarymitetal-500 hover:text-primarymitetal-700 transition-colors duration-300 "
                            >
                              {item.content}
                            </a>
                          ) : (
                            <span className="text-gray-700">{item.content}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OfficeLocationsSection;