'use client'
import { useState, useEffect } from "react";
import {ImageSrc} from '@/components/custom/home/homeQuery'

type MissionData = {
  title: string;
  description: string;
  heading: string;
  vision: string;
  image: ImageSrc;
}

type MissionProps = {
  mission: MissionData;
}

const Mission = ({ mission }: MissionProps) => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsVisible({
      'mission-text': false,
      'mission-visual': false
    });
  }, []);

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
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            data-animate
            id="mission-text"
            className={`transform transition-all duration-700 ${
              isVisible['mission-text'] ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <h2 className="headingUpper text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-8">
              {mission.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {mission.description}
            </p>
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-primarymitetal-700 mb-3 headingUpper">{mission.heading}</h3>
              <p className="text-gray-700">{mission.vision}</p>
            </div>
          </div>
          <div
            data-animate
            id="mission-visual"
            className={`transform transition-all duration-700 ${
              isVisible['mission-visual'] ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="relative">
              <img
                src={mission.image.url}
                alt={mission.image.alternativeText}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;