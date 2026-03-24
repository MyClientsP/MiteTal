'use client'
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import iconMap from "../LucideIcon";

type Value = {
  title: string;
  description: string;
  icon: any;
  color: string;
}

type CoreValueData = {
  coreValues: Value[];
  heading: string;
  subHeading: string;
}

type CoreValueProps = {
	core: CoreValueData;
}

const CoreValue = ({ core }: CoreValueProps) => {
  const {coreValues, heading, subHeading} = core
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    coreValues.forEach((_, index) => {
      initialState[`value-${index}`] = false;
    });
    setIsVisible(initialState);
  }, [coreValues]);

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
  }, [coreValues]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % coreValues.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [coreValues.length]);

  const colors = ['from-yellow-400 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-400 to-teal-500', 'from-primarymitetal-400 to-primarymitetal-500', 'from-red-400 to-red-500']

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-6 headingUpper">{heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subHeading}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {coreValues.map((value, index) => {
			const icon = value.icon ? value.icon.replace(/\s+/g, ''): 'Target';
			let Icon = iconMap[icon];
			if (!Icon) {
				Icon = iconMap['Target']
			}

            return (<div
              key={index}
              data-animate
              id={`value-${index}`}
              className={`relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                activeValue === index
                  ? 'bg-gradient-to-br ' + colors[index] + ' text-white shadow-2xl'
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
              } ${
                isVisible[`value-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              onClick={() => setActiveValue(index)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                  activeValue === index ? 'bg-white/20' : 'bg-gradient-to-br ' + colors[index]
                }`}>
                  <Icon className={`w-8 h-8 ${
                    activeValue === index ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <h3 className={`text-2xl font-bold  mb-4 ${
					activeValue === index ? 'text-white/90' : 'text-primarymitetal-700'
				}
					`}>{value.title}</h3>
                <p className={`text-lg leading-relaxed ${
                  activeValue === index ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
              {activeValue === index && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              )}
            </div>)
		  })}
        </div>
      </div>
    </section>
  );
}

export default CoreValue;