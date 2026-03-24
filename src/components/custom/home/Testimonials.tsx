'use client'
import { Star, Quote } from "lucide-react";
import { Testimonial, UPS, Marketing } from "@/components/custom/home/homeQuery";
import { useEffect, useRef, useState } from "react";

export type TestimonialSectionData = {
  id: number;
  heading: string;
  subHeading: string;
  description: string;
  testimonials: Testimonial[];
  ups: UPS[];
  marketing: Marketing;
};

type TestimonialSectionProps = {
  data: TestimonialSectionData;
};

const useIntersectionObserver = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

const Testimonials = ({ data }: TestimonialSectionProps) => {
  const { heading, subHeading, description, testimonials, ups, marketing } = data;

  const [headerRef, headerVisible] = useIntersectionObserver(0.2);
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver(0.1);
  const [statsRef, statsVisible] = useIntersectionObserver(0.3);
  const [ctaRef, ctaVisible] = useIntersectionObserver(0.3);

  const getGridCols = (length: number) => {
    if (length >= 4) return "lg:grid-cols-4";
    if (length === 3) return "lg:grid-cols-3";
    return "lg:grid-cols-2";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 transition-all duration-300 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        style={{
          transitionDelay: `${index * 100}ms`,
        }}
      />
    ));
  };

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2
            className={`headingUpper text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-4 transition-all duration-1000 delay-200 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {heading}
          </h2>
          <p
            className={`text-xl text-primarymitetal-600 font-semibold mb-6 transition-all duration-1000 delay-300 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {subHeading}
          </p>
          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-400 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {description}
          </p>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-primarymitetal-500 to-primarymitetal-600 mx-auto rounded-full transition-all duration-1000 delay-500 ease-out ${
              headerVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div
          ref={testimonialsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial: Testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 relative ${
                testimonialsVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-16 scale-95"
              }`}
              style={{
                transitionDelay: testimonialsVisible
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              <div
                className={`absolute -top-4 left-8 w-8 h-8 bg-primarymitetal-600 rounded-full flex items-center justify-center transition-all duration-500 ${
                  testimonialsVisible
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-0 rotate-45"
                }`}
                style={{
                  transitionDelay: testimonialsVisible
                    ? `${200 + index * 150}ms`
                    : "0ms",
                }}
              >
                <Quote className="w-4 h-4 text-white" />
              </div>

              <div
                className={`flex items-center mb-4 pt-4 transition-all duration-500 ${
                  testimonialsVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: testimonialsVisible
                    ? `${300 + index * 150}ms`
                    : "0ms",
                }}
              >
                {renderStars(testimonial.rating)}
              </div>

              <p
                className={`text-gray-600 mb-6 leading-relaxed text-sm transition-all duration-500 ${
                  testimonialsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: testimonialsVisible
                    ? `${400 + index * 150}ms`
                    : "0ms",
                }}
              >
                "{testimonial.testimonial}"
              </p>

              <div
                className={`mb-4 transition-all duration-500 ${
                  testimonialsVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
                style={{
                  transitionDelay: testimonialsVisible
                    ? `${500 + index * 150}ms`
                    : "0ms",
                }}
              >
                <span className="inline-block px-3 py-1 bg-primarymitetal-100 text-primarymitetal-700 rounded-full text-xs font-medium hover:bg-primarymitetal-200 transition-colors duration-300">
                  {testimonial.project}
                </span>
              </div>

              <div
                className={`flex items-center transition-all duration-500 ${
                  testimonialsVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{
                  transitionDelay: testimonialsVisible
                    ? `${600 + index * 150}ms`
                    : "0ms",
                }}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-100 transition-all duration-300 group-hover:border-primarymitetal-200">
                  <img
                    src={testimonial.image.url}
                    alt={testimonial.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primarymitetal-600 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
		
		{ ups.length > 0 && ups &&  
        <div
          ref={statsRef}
          className={`bg-primarymitetal-100  rounded-3xl p-8 lg:p-12 transition-all duration-1000 ease-out ${
            statsVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <div
            className={`grid grid-cols-2 gap-8 text-center ${getGridCols(
              ups.length
            )}`}
          >
            {ups.map((item, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ease-out ${
                  statsVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-90"
                }`}
                style={{
                  transitionDelay: statsVisible ? `${200 + idx * 150}ms` : "0ms",
                }}
              >
                <div
                  className={`text-3xl lg:text-4xl font-bold text-primarymitetal-600 mb-2 transition-all duration-500 ${
                    statsVisible ? "scale-100" : "scale-75"
                  }`}
                  style={{
                    transitionDelay: statsVisible
                      ? `${300 + idx * 150}ms`
                      : "0ms",
                  }}
                >
                  {item.title}
                </div>
                <div
                  className={`text-gray-700 font-medium transition-all duration-500 ${
                    statsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: statsVisible
                      ? `${400 + idx * 150}ms`
                      : "0ms",
                  }}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
			
        </div>
		}

        <div
          ref={ctaRef}
          className={`text-center mt-16 transition-all duration-1000 ease-out ${
            ctaVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h3
            className={`text-2xl font-bold text-primarymitetal-700 mb-4 transition-all duration-1000 delay-200 ease-out ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {marketing.title}
          </h3>
          <p
            className={`text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ease-out ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {marketing.description}
          </p>
          <div
            className={`transition-all duration-1000 delay-400 ease-out ${
              ctaVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <a
              href={marketing.cta.url}
              className="cursor-pointer inline-flex items-center px-8 py-4 bg-primarymitetal-600 text-white rounded-full font-semibold hover:bg-primarymitetal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {marketing.cta.text}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonials };