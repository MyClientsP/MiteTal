'use client'
import { useState, useEffect } from "react";
import iconMap from "../LucideIcon";
import { StatsProps } from "./aboutQuery";

const UPS = ( {statsData} : StatsProps) => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  const {stats} = statsData

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    stats.forEach((_, index) => {
      initialState[`stat-${index}`] = false;
    });
    setIsVisible(initialState);
  }, [stats]);

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
  }, [stats]);

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
			    const icon = stat.icon ? stat.icon.replace(/\s+/g, '') : 'Target'
				let Icon = iconMap[stat.icon];
				if (!Icon) {
					Icon = iconMap['Target']
				}
			  return (
			    <div
			      key={index}
			      data-animate
			      id={`stat-${index}`}
			      className={`text-center transform transition-all duration-700 ${
			        isVisible[`stat-${index}`]
			          ? 'translate-y-0 opacity-100'
			          : 'translate-y-8 opacity-0'
			      }`}
			      style={{ transitionDelay: `${index * 100}ms` }}
			    >
			      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primarymitetal-300 to-primarymitetal-500 rounded-full mb-4">
			        <Icon className="w-8 h-8 text-white" />
			      </div>
			      <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
			      <div className="text-gray-600 font-medium">{stat.label}</div>
			    </div>
			  );
			})}

        </div>
      </div>
    </section>
  );
}

export default UPS;