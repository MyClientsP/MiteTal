import { features } from "process";
import { Testimonials } from "./Testimonials";

const qs = require('qs');

export const homeQuery = qs.stringify({
  populate:
  {
	blocks: {
		on: {
			'layout.hero-section': {
				populate: {
		            fields: ['heading', 'subHeading'],
					image: {
						fields: ['url', 'alternativeText']
					},
					cta: {
						populate: '*'
					}
				},
            },
		    'layout.about-short': {
				populate: {
		            fields: ['heading', 'subHeading', 'description'],
					image: {
						fields: ['url', 'alternativeText']
					},
					features: {
						populate: '*'
					},
					cta: {
						populate: '*'
					}
				},
			},
			'layout.testimonial': {
				populate: {
		            fields: ['heading', 'subHeading', 'description'],
					testimonials: {
						populate: 
						{
							fields: ['name', 'position', 'company', 'rating', 'testimonial', 'project'],
							image: {
								fields: ['url', 'alternativeText']
							},
							
						},
					},
					ups: {populate: '*'},
					marketing: {
						populate:
						{
							fields: ['title', 'description'],
							cta: {
								populate: '*'
							}
						}
					}
				},
			},
			'layout.service-data': {
				populate: {
					fields: ['heading', 'subHeading'],
					services: {
						populate: '*',
					}
				}		
			},
		},
	},
	},
  },
 {
  encodeValuesOnly: true,
}
);

export type ImageSrc = {
	url: string;
	alternativeText: string;
}

export type LinkT = {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
};

export type Testimonial = {
	id: number;
	name: string;
	position: string;
	company: string;
	rating: number;
	testimonial: string;
	project: string;
	image: ImageSrc;
}

export type UPS = {
	id: number;
	title: string;
	description: string;
}

export type Marketing = {
	id: number;
	title: string;
	description: string;
	cta: LinkT;
}