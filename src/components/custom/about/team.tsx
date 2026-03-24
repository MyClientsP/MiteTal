'use client'
import { useState, useEffect } from "react";
import { Linkedin, Twitter, Github, Facebook, Instagram, Youtube } from "lucide-react";
import { TeamProps } from "./aboutQuery";


const Team = ({ teamData }: TeamProps) => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const {team, heading, subHeading} = teamData

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    team.forEach((_, index) => {
      initialState[`team-${index}`] = false;
    });
    setIsVisible(initialState);
  }, [team]);

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
  }, [team]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-6 headingUpper">{heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subHeading}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              data-animate
              id={`team-${index}`}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible[`team-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <img
                  src={member.image.url}
                  alt={member.image.alternativeText}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primarymitetal-700 mb-1">{member.name}</h3>
                <p className="text-primarymitetal-600 font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="p-2 bg-gray-100 rounded-full hover:bg-indigo-100 transition-colors">
                      <Linkedin className="w-4 h-4 text-gray-600 hover:text-indigo-600" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors">
                      <Twitter className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Github className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
				  {member.social.facebook && (
                    <a href={member.social.facebook} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Facebook className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
				  {member.social.instagram && (
                    <a href={member.social.instagram} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Instagram className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
				  {member.social.youtube && (
                    <a href={member.social.youtube} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Youtube className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;