'use client';
import { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

export default function notFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingElement = ({ delay, size, position }: any) => (
    <div
      className={`absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse ${size} ${position}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s',
      }}
    />
  );

  return (
    <div className="min-h-screen bg-bgmitetal  relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className={`text-center max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-primarymitetal-400 via-primarymitetal-300 to-primarymitetal-400 bg-clip-text text-transparent leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-white opacity-10 blur-sm">
              404
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primarymitetal-600 mb-4 flex items-center justify-center gap-2">
              
              Page Not Found
            </h2>
            <p className="text-lg text-gray-900 leading-relaxed max-w-md mx-auto">
              The page you're looking for has not found.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => window.history.back()}
              className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-700 hover:from-primarymitetal-500 hover:to-primarymitetal-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primarymitetal-600 to-primarymitetal-700 hover:from-primarymitetal-500 hover:to-primarymitetal-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
            >
              <Home size={20} className="group-hover:rotate-12 transition-transform" />
              Home
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}