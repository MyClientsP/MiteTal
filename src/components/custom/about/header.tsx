import { ChevronRight, Sparkles } from "lucide-react";

type LinkT = {
  url: string;
  text: string;
  isExternal: boolean;
}

type Hero = {
  heading: string;
  title: string;
  subtitle: string;
  cta: LinkT;
}

type HeroProps = {
  hero: Hero;
}

const Header = ({ hero }: HeroProps) => {
  return (
    <section
      style={{ minHeight: '70vh' }}
      className="relative flex items-center justify-center overflow-hidden bg-primarymitetal-600 py-24"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primarymitetal-300 via-primarymitetal-400 to-primarymitetal-500" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-16 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-1/3 right-24 w-32 h-32 bg-white rounded-full opacity-10 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-24 left-1/3 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 right-16 w-12 h-12 bg-white rounded-full opacity-10 animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      {/* Content — always visible, no opacity animation */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium mb-8 border border-white/30 bg-white/10">
          <Sparkles className="w-4 h-4 text-white" />
          <span>{hero.heading}</span>
        </div>

        {/* Title */}
        <h1 className="headingUpper text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl text-white mb-10" style={{ opacity: 0.85 }}>
          {hero.subtitle}
        </p>

        {/* Divider */}
        <div className="w-16 h-1 rounded-full mx-auto mb-10 bg-white" style={{ opacity: 0.4 }} />

        {/* CTA */}
        <a
          href={hero.cta.url}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primarymitetal-700 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          {hero.cta.text}
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 rounded-full animate-pulse bg-white" style={{ opacity: 0.4 }} />
      </div>
    </section>
  );
}

export default Header;