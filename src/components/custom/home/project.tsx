'use client'
import { Project } from "../projects/projectQuery";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ProjectsData {
  heading: string;
  subHeading: string;
  description: string;
  projects: Project[];
}

interface ProjectsDataProps {
  data: ProjectsData;
}

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

const ProjectC = ({ data }: ProjectsDataProps) => {
  const projectsData = data;
//   const [firstProject, ...otherProjects] = projectsData.projects;
  const otherProjects = projectsData.projects
  const [headerRef, headerVisible] = useIntersectionObserver(0.2);
  const [featuredRef, featuredVisible] = useIntersectionObserver(0.2);
  const [gridRef, gridVisible] = useIntersectionObserver(0.1);

  return (
    <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
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
            {projectsData.heading}
          </h2>
          <p
            className={`text-xl text-primarymitetal-600 font-semibold mb-6 transition-all duration-1000 delay-300 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {projectsData.subHeading}
          </p>
          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-400 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {projectsData.description}
          </p>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-primarymitetal-500 to-primarymitetal-600 mx-auto rounded-full transition-all duration-1000 delay-500 ease-out ${
              headerVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        {/* {firstProject && (
          <div
            ref={featuredRef}
            className={`mb-20 transition-all duration-1000 ease-out ${
              featuredVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-16 scale-95"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full overflow-hidden">
                  <img
                    src={firstProject.image}
                    alt={firstProject.title}
                    className={`w-full h-full object-cover transition-all duration-1000 delay-200 ${
                      featuredVisible
                        ? "scale-100 opacity-100"
                        : "scale-110 opacity-80"
                    }`}
                  />
                </div>
                <div
                  className={`p-8 lg:p-12 flex flex-col justify-center transition-all duration-1000 delay-300 ease-out ${
                    featuredVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                >
                  <div className="text-primarymitetal-600 font-semibold mb-2">
                    {firstProject.category}
                  </div>
                  <h3 className="text-3xl font-bold text-primarymitetal-700 mb-4">
                    {firstProject.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {firstProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {firstProject.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-3 py-1 bg-primarymitetal-100 text-primarymitetal-700 rounded-full text-sm font-medium transition-all duration-500 ease-out ${
                          featuredVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${400 + tagIndex * 100}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/project/${firstProject.documentId}`}
                    className={`inline-flex items-center text-primarymitetal-600 font-semibold hover:underline transition-all duration-500 delay-500 ease-out group ${
                      featuredVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    View Detail
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 ${
                gridVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-16 scale-95"
              }`}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="text-primarymitetal-600 font-semibold text-sm mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-primarymitetal-700 mb-3 group-hover:text-primarymitetal-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs transition-all duration-300 hover:bg-primarymitetal-100 hover:text-primarymitetal-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <Link
                  href={`/project/${project.documentId}`}
                  className="inline-flex items-center text-primarymitetal-600 font-semibold hover:underline group/link"
                >
                  View Detail
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-1000 ease-out ${
            gridVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: gridVisible ? "800ms" : "0ms" }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center px-8 py-4 bg-primarymitetal-600 text-white rounded-full font-semibold hover:bg-primarymitetal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectC;