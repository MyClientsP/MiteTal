'use client';
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image'

export type LinkT = {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
};

export type HeaderData = {
  id: number;
  logoText: LinkT;
  cta: LinkT;
  navbar: LinkT[];
};

export type HeaderProps = {
	data: HeaderData
}

const Header = ({data}: HeaderProps) => {
  const {logoText, cta, navbar} = data
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-bgmitetal backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-bgmitetal shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-20">
			<Link 
            href={logoText.url} 
            className="text-2xl lg:text-3xl font-bold text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            <Image 
			    src="/logo.png"
			    alt="Zoomed logo"
			    width={150}
				height={150}
			  />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navbar.map((item) => (
			  <Link
			    key={item.id}
			    href={item.url}
			    target={item.isExternal ? '_blank' : '_self'}
			    rel={item.isExternal ? 'noopener noreferrer' : undefined}
			    className="text-gray-700 hover:text-secmitetal font-medium transition-colors duration-200 relative group"
			  >
			    {item.text}
			    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secmitetal transition-all duration-200 group-hover:w-full"></span>
			  </Link>
			))}

          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="cursor-pointer bg-transparent border-secmitetal text-secmitetal hover:bg-secmitetal hover:text-white transition-all duration-200 font-medium px-6"
            >
				<Link href={cta.url}>
              {cta.text}
				</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-secmitetal hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-1 border-t border-gray-100">
			{navbar.map((item) => (
			  <Link
			    key={item.id}
			    href={item.url}
			    target={item.isExternal ? '_blank' : '_self'}
			    rel={item.isExternal ? 'noopener noreferrer' : undefined}
			    className="block px-4 py-3 text-gray-700 hover:text-secmitetal hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
				onClick={handleNavClick}
			  >
			    {item.text}
			    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secmitetal transition-all duration-200 group-hover:w-full"></span>
			  </Link>
			))}
            <div className="px-4 pt-2">
              <Button 
                variant="outline" 
                className=" border-secmitetal bg-transparent text-secmitetal hover:bg-secmitetal hover:text-white transition-all duration-200 font-medium"
                onClick={handleNavClick}
              >
				<Link href={cta.url}>
                {cta.text}
				</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;