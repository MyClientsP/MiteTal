'use client'
import { ImageSrc, LinkT } from "@/components/custom/home/homeQuery";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export type Feature = {
  id: number;
  title: string;
  description: string;
};

export type AboutSectionData = {
  id: number;
  heading: string;
  subHeading: string;
  description: string;
  image: ImageSrc;
  features: Feature[];
  cta: LinkT;
};

type AboutSectionProps = {
  data: AboutSectionData;
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

const AboutUs = ({ data }: AboutSectionProps) => {
  const { heading, subHeading, description, image, features, cta } = data;

  const [headerRef, headerVisible] = useIntersectionObserver(0.2);
  const [contentRef, contentVisible] = useIntersectionObserver(0.3);
  const [imageRef, imageVisible] = useIntersectionObserver(0.3);
  const [textRef, textVisible] = useIntersectionObserver(0.3);
  const [featuresRef, featuresVisible] = useIntersectionObserver(0.2);

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
          <div
            className={`w-24 h-1 bg-gradient-to-r from-primarymitetal-500 to-primarymitetal-600 mx-auto rounded-full transition-all duration-1000 delay-400 ease-out ${
              headerVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-16 items-center mb-10"
        >
          <div
            ref={imageRef}
            className={`relative h-full transition-all duration-1000 ease-out ${
              imageVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-16 scale-95"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={image.url}
                alt={image.alternativeText}
                className={`w-full h-96 lg:h-[350px] object-cover transition-all duration-1000 group-hover:scale-105 ${
                  imageVisible
                    ? "scale-100 opacity-100"
                    : "scale-110 opacity-80"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/30"></div>
              
              <div
                className={`absolute -top-4 -right-4 w-20 h-20 bg-primarymitetal-500 rounded-full opacity-20 transition-all duration-1000 delay-300 ${
                  imageVisible
                    ? "opacity-20 scale-100"
                    : "opacity-0 scale-0"
                }`}
              ></div>
              <div
                className={`absolute -bottom-6 -left-6 w-16 h-16 bg-primarymitetal-600 rounded-full opacity-15 transition-all duration-1000 delay-500 ${
                  imageVisible
                    ? "opacity-15 scale-100"
                    : "opacity-0 scale-0"
                }`}
              ></div>
            </div>
          </div>

          <div
            ref={textRef}
            className={`space-y-8 transition-all duration-1000 ease-out ${
              textVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16"
            }`}
          >
            <p
              className={`text-lg text-gray-600 leading-relaxed transition-all duration-1000 delay-200 ease-out ${
                textVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {description}
            </p>

            <div
              ref={featuresRef}
              className={`grid sm:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ease-out ${
                featuresVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`space-y-3 p-4 rounded-lg hover:bg-gray-50 transition-all duration-500 ease-out group ${
                    featuresVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                  style={{
                    transitionDelay: featuresVisible
                      ? `${600 + index * 150}ms`
                      : "0ms",
                  }}
                >
                  
                  <h3
                    className={`text-lg font-semibold text-gray-900 transition-all duration-500 group-hover:text-primarymitetal-600 ${
                      featuresVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    }`}
                    style={{
                      transitionDelay: featuresVisible
                        ? `${750 + index * 150}ms`
                        : "0ms",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed transition-all duration-500 ${
                      featuresVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    }`}
                    style={{
                      transitionDelay: featuresVisible
                        ? `${800 + index * 150}ms`
                        : "0ms",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
			  
            </div>
          </div>
        </div>
      </div>
	  <div
          className={`text-center transition-all duration-1000 ease-out ${
            contentVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: contentVisible ? "800ms" : "0ms" }}
        >
          <Link
            href={cta.url}
            className="group inline-flex items-center px-8 py-4 bg-primarymitetal-600 text-white rounded-full font-semibold hover:bg-primarymitetal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {cta.text}
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
    </section>
  );
};

export { AboutUs };