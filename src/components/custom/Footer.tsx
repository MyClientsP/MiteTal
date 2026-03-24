import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Mail, 
  Phone,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import {LinkT} from "@/components/custom/Header"
import Image from 'next/image'
import iconMap from './LucideIcon';

export type Contact = {
	id: number;
	road?: string;
	building?: string;
	country?: string;
	phone?: LinkT;
	email?: LinkT;
}

export type FooterData = {
  id: number;
  brandGuideLine: string;
  titleForContact: string;
  descriptionForContact: string;
  logoText: LinkT;
  cta: LinkT;
  chatBot: LinkT;
  contact: Contact[];
  socialMedia: LinkT[];
  regulations: LinkT[];
  navbar: LinkT[];
};

type FooterProps = {
  data: FooterData;
};

const Footer = ({data}: FooterProps) => {
  const {
	brandGuideLine, 
	logoText, 
	cta, 
	chatBot, 
	contact, 
	socialMedia, 
	regulations, 
	navbar,
	titleForContact,
	descriptionForContact
		} = data;
  

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="lg:col-span-1">
            <Link href={logoText.url} className="inline-block mb-6">
              <Image 
				src="/logo.png"
				alt="Zoomed logo"
				width={100}
				height={100}
			  />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {brandGuideLine}
            </p>
            
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
            <nav className="space-y-3">
			  {navbar.map((item) => {
				return (
				<Link 
					key={item.id}
	                href={item.url}
	                className="block text-gray-300 hover:text-secmitetal transition-colors duration-200 text-sm group"
	              >
	                <span className="flex items-center">
	                  {item.text}
	                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
	                </span>
	            </Link>
				)
			  })}
            </nav>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
            <div className="space-y-4">
				{ contact[0].building && contact[0].road && contact[0].country && contact[0].building.length > 0 && contact[0].road.length > 0 && contact[0].country.length > 0 &&
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {contact[0].building}<br />
                    {contact[0].road}<br />
                    {contact[0].country}
                  </p>
                </div>
              </div>
				}
              { contact[0].email && contact[0].email.url.length > 0 && 
              <div className="flex items-center space-x-3">
                <a 
                  href={contact[0].email.url}
                  className="flex text-gray-300 hover:text-secmitetal transition-colors duration-200 text-sm"
                >
                  <Mail size={18} className="flex-shrink-0 mr-3" />{contact[0].email.text}
                </a>
              </div>
			  }
              { contact[0].phone && contact[0].phone.url.length > 0 &&
              <div className="flex items-center space-x-3">
                <a 
                  href={contact[0].phone.url}
                  className="flex text-gray-300 hover:text-secmitetal transition-colors duration-200 text-sm"
                >
                  <Phone size={18} className="flex-shrink-0 mr-3" /> {contact[0].phone.text}
                </a>
              </div>
			  }
            </div>
			{ socialMedia &&
			<div className="flex space-x-4 mt-6">
              {socialMedia.map((item) => {
				  const icon = item.text.replace(/\s+/g, '');
				  let Icon = iconMap[icon];
				  if (!Icon) {
					Icon = iconMap['Target']
				  };

				  return (
				    <a
				      key={item.id}
				      href={item.url}
				      target="_blank"
				      rel="noopener noreferrer"
				      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secmitetal transition-all duration-200 group"
				      aria-label={item.text}
				    >
				      <Icon size={18} className="text-gray-300 group-hover:text-white" />
				    </a>
				  );
				})}
            </div>
			}
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">{titleForContact}</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {descriptionForContact}
            </p>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-secmitetal hover:bg-secmitetal text-white font-medium transition-all duration-200 group"
                asChild
              >
                <Link href={cta.url}>
                  {cta.text}
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              
              <a
			  href={chatBot.url}
			  target="_blank"
			  rel="noopener noreferrer"
			  role="button"
			  className="w-full flex  items-center px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-200 group"
			>
			  <MessageCircle size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
			  {chatBot.text}
			</a>

            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Mite Tal. All rights reserved.
            </p>
            
            {/* <div className="flex items-center space-x-6 text-sm">
			  {regulations.map((item) => {
				return (
					<Link 
					key={item.id}
	                href={item.url} 
	                className="text-gray-400 hover:text-secmitetal transition-colors duration-200"
	              >
	                {item.text}
	              </Link>
				)
			  })}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;