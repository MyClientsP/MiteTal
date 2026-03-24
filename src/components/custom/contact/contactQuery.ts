import { LinkT } from "../Header";
import { ImageSrc } from "../home/homeQuery";
const qs = require('qs');

export const contactQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        'components.contact-info': {
		  populate: {
          fields: ['email', 'phone', 'address', 'hours'],
		  socialMedia: {
			populate: '*'
		  },
		  feature: {
			populate: '*'
		  }
		  }
        },
        'layout.contact-method': {
          populate: {
			fields: ['title', 'description'],
            contactMethods: {
              populate: '*',
            },
          },
        },
		'components.contact-hero': {
			fields: ['title', 'heading', 'subHeading', 'description']
		},
		'layout.contact-form': {
			populate: '*'
		},
		'layout.office': {
          populate: {
			fields: ['title', 'description'],
            offices: {
              fields: ['email', 'phone', 'address', 'city', 'timezone'],
              populate: {
                image: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
          },
        },
      },
    },
  },
}, {
  encodeValuesOnly: true,
});

export interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
//   agreedToTerms: boolean;
}

type Feature = {
	id: number;
	feature: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  hours: string;
  socialMedia: LinkT[];
  feature: Feature[];
}

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  image: ImageSrc;
}

export interface ContactMethod {
  icon: any;
  title: string;
  description: string;
  action: LinkT;
  color: string;
  type: string;
}

