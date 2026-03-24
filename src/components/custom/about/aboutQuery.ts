const qs = require('qs');
import { ImageSrc } from "@/components/custom/home/homeQuery";

export const aboutQuery = qs.stringify(
	{
	  populate:
	  {
		blocks: 
		{
			on: {
				'layout.hero-about': {
					populate:
					{
			            fields: ['title', 'subtitle', 'heading'],
						cta: {
							populate: '*'
						}
					},
	            },
				'layout.mission': {
					populate:
					{
			            fields: ['title', 'description', 'heading', 'vision'],
						image: {
							fields: ['url', 'alternativeText'],
						}
					},
	            },
				'layout.stats-data': {
					populate: {
						fields: ['title'],
						stats: {
							populate: '*'
						}
					}
				},
				'layout.values': {
					populate: {
						fields: ['heading', 'subHeading'],
						coreValues: {
							populate: '*',
						}
					}
				},
				'layout.team-data': {
					populate: {
						fields: ['heading', 'subHeading'],
						team: {
							populate: '*'
						}
					}
				},
				'layout.service-data': {
					populate: {
						fields: ['heading', 'subHeading'],
						services: {
							populate: '*',
						}
					}		
				},
				'layout.process-data': {
					populate: {
						fields: ['heading', 'subHeading'],
						process: {
							populate: '*',
						}
					}
				},
				'components.marketing': {
					populate: {
						fields: ['title', 'description'],
						cta: {
							populate: '*'
						}
					}
				},
				'components.about-company': {
					populate: {
						fields: ['title'],
						aboutCompany: {
							fields: ['description']
						}
					}
				}
			},
		},
	  },
	},
	{
	  encodeValuesOnly: true,
	}
);

export type Stats = {
  number: string;
  label: string;
  icon: any;
}

export type StatsData = {
  title: string;
  stats: Stats[];
}

export type StatsProps = {
	statsData: StatsData
}

export type TeamMember = {
  name: string;
  position: string;
  bio: string;
  image: ImageSrc;
  social: {
	linkedin?: string;
	twitter?: string;
	github?: string;
	facebook?: string;
	instagram?: string;
	youtube?: string;
  };
}

export type TeamData = {
  heading: string;
  subHeading: string;
  team: TeamMember[];
}

export type TeamProps = {
	teamData: TeamData;
}