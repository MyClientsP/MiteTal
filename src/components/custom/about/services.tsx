'use client'
import { useState, useEffect } from "react";
import { CheckCircle2, Target } from "lucide-react";
import iconMap from "../LucideIcon";

type Feature = {
  feature: string;
}

type Service = {
  title: string;
  description: string;
  icon: any;
  features: Feature[];
}

type ServiceData = {
  heading: string;
  subHeading: string;
  services: Service[];
}

type ServiceProps = {
  serviceData: ServiceData;
}

const ServiceSec = ({ serviceData }: ServiceProps) => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const { services, heading, subHeading } = serviceData

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    services.forEach((_, index) => {
      initialState[`service-${index}`] = false;
    });
    setIsVisible(initialState);
  }, [services]);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
      { threshold: 0.1 }
    );

    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [services]);

  return (
    <section className="py-20 bg-bgmitetal" id="service-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-6 headingUpper">{heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subHeading}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const icon = service.icon ? service.icon.replace(/\s+/g, '') : 'Target';
            let Icon = iconMap[icon];
            if (!Icon) {
              Icon = iconMap['Target'] || Target;
            }

            return (
              <div
                key={index}
                data-animate
                id={`service-${index}`}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible[`service-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-12 lg:h-16 bg-gradient-to-r from-primarymitetal-300 to-primarymitetal-500 rounded-full mr-4">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-primarymitetal-700">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex  text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-primarymitetal-500 mr-3 mt-1 flex-shrink-0" />
                      {feature.feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceSec;