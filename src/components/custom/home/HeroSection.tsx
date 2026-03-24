import { ArrowRight } from "lucide-react";

import {LinkT, ImageSrc} from "@/components/custom/home/homeQuery"


export type HeroSectionData = {
  id: number;
  heading: string;
  subHeading: string;
  image: ImageSrc;
  cta: LinkT;
};

type HeroSectionProps = {
  data: HeroSectionData;
};

const HeroSection = ({data} : HeroSectionProps) => {
  const {
	heading,
	subHeading,
	image,
	cta
  } = data

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primarymitetal-500 to-primarymitetal-600"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primarymitetal-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-15"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          
          <div className="lg:hidden space-y-12">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  leading-tight">
                  {heading.split(' ').map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mr-3 mb-2 bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-500 bg-clip-text text-transparent"
                    >
                      {word}
                    </span>
                  ))}
                </h1>
                
                <div className="w-20 h-1 bg-gradient-to-r from-primarymitetal-500 to-primarymitetal-600 mx-auto rounded-full"></div>
              </div>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {subHeading}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={cta.url}
                  className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-700 rounded-full shadow-xl hover:shadow-primarymitetal-500/25 transition-all duration-300 hover:scale-105 hover:from-primarymitetal-500 hover:to-primarymitetal-600"
                >
                  <span className="flex items-center">
                    {cta.text}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  alt={image.alternativeText}
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  src={image.url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primarymitetal-500 rounded-full blur-sm opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full blur-sm opacity-60"></div>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
            
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 leading-tight">
                  {heading.split(' ').map((word, index) => (
                    <span
                      key={index}
                      className="headingUpper inline-block mr-4 mb-3 bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-500 bg-clip-text text-transparent"
                    >
                      {word}
                    </span>
                  ))}
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-primarymitetal-500 to-primarymitetal-600 rounded-full"></div>
              </div>

              <p className="text-xl xl:text-2xl text-gray-600 leading-relaxed">
                {subHeading}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href={cta.url}
                  className="group inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-700 rounded-full shadow-xl hover:shadow-primarymitetal-500/25 transition-all duration-300 hover:scale-105 hover:from-primarymitetal-500 hover:to-primarymitetal-600"
                >
                  <span className="flex items-center">
                    {cta.text}
                    <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <div className="relative w-full h-[300px] xl:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    alt={image.alternativeText}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                    src={image.url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                                
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-primarymitetal-500 rounded-full blur-lg opacity-40"></div>
                <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-blue-500 rounded-full blur-lg opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };