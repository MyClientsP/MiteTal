import Header from '@/components/custom/about/header'
import UPS from '@/components/custom/about/ups'
import Mission from '@/components/custom/about/mission'
import CoreValue from '@/components/custom/about/coreValue'
import Team from '@/components/custom/about/team'
import ServiceSec from '@/components/custom/about/services'
import Process from "@/components/custom/about/process";
import Market from "@/components/custom/about/marketing";
import AboutCompany from '@/components/custom/about/aboutCompany'
import {fetchStrapiData} from '@/utils/fetchData'
import {aboutQuery, TeamMember} from '@/components/custom/about/aboutQuery'
import { notFound } from 'next/navigation'

const componentMap: Record<string, React.ComponentType<any>> = {
  'layout.hero-about': Header,
  'layout.stats-data': UPS,
  'layout.mission': Mission,
  'layout.values': CoreValue,
  'layout.team-data': Team,
  'layout.service-data': ServiceSec,
  'layout.process-data': Process,
  'components.marketing': Market,
  'components.about-company': AboutCompany,
}

const getComponentProps = (block: any) => {
  switch (block.__component) {
    case 'layout.hero-about':
      return { hero: block }
    case 'layout.stats-data':
      return { statsData: block }
    case 'layout.mission':
      if (block.image?.url) {
        block.image.url = block.image.url
      }
      return { mission: block }
    case 'layout.values':
      return { core: block }
    case 'layout.team-data':
      if (block.team) {
        block.team.forEach((item: TeamMember) => {
          if (item.image?.url) {
            item.image.url = item.image.url
          }
        })
      }
      return { teamData: block }
    case 'layout.service-data':
      return { serviceData: block }
    case 'layout.process-data':
      return { processData: block }
    case 'components.marketing':
      return { marketing: block }
	case 'components.about-company':
	  return { about: block }
    default:
      return {}
  }
}

export default async function AboutUsPage() {
  const data = await fetchStrapiData('about', aboutQuery);
  if (!data) {
	notFound()
  }
  return (
    <div className="min-h-screen bg-white">
      {data.blocks?.map((block: any, index: number) => {
        const ComponentBlock = componentMap[block.__component]
        
        if (!ComponentBlock) {
          return null
        }
        
        const props = getComponentProps(block)
        
        return <ComponentBlock key={`${block.__component}-${index}`} {...props} />
      })}
    </div>
  )
}