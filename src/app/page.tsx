import { HeroSection } from "@/components/custom/home/HeroSection";
import { AboutUs } from "@/components/custom/home/AboutUs";
import { ProjectsShowcase } from "@/components/custom/home/ProjectShowcase";
import { Testimonials } from "@/components/custom/home/Testimonials";
import { fetchStrapiData } from "@/utils/fetchData";
import { homeQuery, Testimonial } from "@/components/custom/home/homeQuery";
import ServiceSec from '@/components/custom/about/services';
import './globals.css';
import { notFound } from "next/navigation";

const componentMap: Record<string, React.ComponentType<any>> = {
  'layout.hero-section': HeroSection,
  'layout.about-short': AboutUs,
  'layout.testimonial': Testimonials,
  'layout.service-data': ServiceSec,
};

const getComponentProps = (block: any) => {
  switch (block.__component) {
    case 'layout.hero-section':
      return { data: block };

    case 'layout.about-short':
      return { data: block };

    case 'layout.testimonial':
      return { data: block };

    case 'layout.service-data':
      return { serviceData: block };

    default:
      return {};
  }
};

export default async function Home() {
  const homeData = await fetchStrapiData('home', homeQuery);

  if (!homeData) {
    notFound();
  }

  return (
    <main>
      {homeData.blocks?.map((block: any, index: number) => {
        const ComponentBlock = componentMap[block.__component];

        if (!ComponentBlock) {
          return null;
        }

        const props = getComponentProps(block);
        return <ComponentBlock key={`${block.__component}-${index}`} {...props} />;
      })}
      <ProjectsShowcase />
    </main>
  );
}