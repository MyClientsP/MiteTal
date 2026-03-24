// 'use client';
// import React, { useEffect, useState } from 'react';

// const CursorDot = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isVisible, setIsVisible] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);
//   const [isMoving, setIsMoving] = useState(false);

//   useEffect(() => {
//     let moveTimer;

//     const updatePosition = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//       setIsMoving(true);
      
//       if (!isVisible) setIsVisible(true);
      
//       clearTimeout(moveTimer);
//       moveTimer = setTimeout(() => setIsMoving(false), 50);
//     };

//     const handleMouseDown = () => setIsClicking(true);
//     const handleMouseUp = () => setIsClicking(false);
//     const handleMouseLeave = () => setIsVisible(false);
//     const handleMouseEnter = () => setIsVisible(true);

//     window.addEventListener('mousemove', updatePosition);
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mouseenter', handleMouseEnter);

//     return () => {
//       window.removeEventListener('mousemove', updatePosition);
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       clearTimeout(moveTimer);
//     };
//   }, [isVisible]);

//   if (!isVisible) return null;

//   return (
//     <>
//       <div
//         className={`fixed pointer-events-none z-[9999] w-4 h-4 bg-black rounded-full transition-all duration-200 ease-out ${
//           isClicking ? 'animate-bounce' : ''
//         } ${
//           isMoving ? 'scale-75' : 'scale-50'
//         }`}
//         style={{
//           left: position.x,
//           top: position.y,
//           transform: 'translate(-50%, -50%)',
//           animation: isClicking ? 'bounce 0.6s ease-in-out' : 'wobble 2s ease-in-out infinite',
//         }}
//       />

//       <style jsx>{`
//         @keyframes wobble {
//           0%, 100% {
//             transform: translate(-50%, -50%) rotate(0deg);
//           }
//           25% {
//             transform: translate(-50%, -50%) rotate(1deg) scale(1.05);
//           }
//           75% {
//             transform: translate(-50%, -50%) rotate(-1deg) scale(0.95);
//           }
//         }
        
//         @keyframes bounce {
//           0%, 20%, 53%, 80%, 100% {
//             transform: translate(-50%, -50%) translateY(0);
//           }
//           40%, 43% {
//             transform: translate(-50%, -50%) translateY(-8px);
//           }
//           70% {
//             transform: translate(-50%, -50%) translateY(-4px);
//           }
//           90% {
//             transform: translate(-50%, -50%) translateY(-2px);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default CursorDot;

// 'use client';
// import React, { useEffect, useState, useRef } from 'react';

// const CursorDot = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isVisible, setIsVisible] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);
//   const [trail, setTrail] = useState([]);
//   const trailLength = 8;

//   useEffect(() => {
//     const updatePosition = (e: any) => {
//       const newPos = { x: e.clientX, y: e.clientY };
//       setPosition(newPos);
      
//       // Update trail
//       setTrail(prevTrail => {
//         const newTrail = [newPos, ...prevTrail.slice(0, trailLength - 1)];
//         return newTrail;
//       });
      
//       if (!isVisible) setIsVisible(true);
//     };

//     const handleMouseDown = () => setIsClicking(true);
//     const handleMouseUp = () => setIsClicking(false);
//     const handleMouseLeave = () => setIsVisible(false);
//     const handleMouseEnter = () => setIsVisible(true);

//     window.addEventListener('mousemove', updatePosition);
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mouseenter', handleMouseEnter);

//     return () => {
//       window.removeEventListener('mousemove', updatePosition);
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//     };
//   }, [isVisible]);

//   if (!isVisible) return null;

//   return (
//     <>
//       {/* Trail dots */}
//       {trail.map((pos, index) => (
//         <div
//           key={index}
//           className="fixed pointer-events-none z-50 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
//           style={{
//             left: pos.x - 2,
//             top: pos.y - 2,
//             width: Math.max(2, 8 - index),
//             height: Math.max(2, 8 - index),
//             opacity: Math.max(0.1, 1 - index * 0.15),
//             transform: 'translate(-50%, -50%)',
//           }}
//         />
//       ))}
      
//       {/* Main cursor dot */}
//       <div
//         className={`fixed pointer-events-none z-[9999] transition-all duration-150 ease-out ${
//           isClicking ? 'scale-75' : 'scale-100'
//         }`}
//         style={{
//           left: position.x,
//           top: position.y,
//           transform: 'translate(-50%, -50%)',
//         }}
//       >
//         {/* Outer ring */}
//         <div className={`absolute rounded-full border-2 border-white/30 ${
//           isClicking ? 'w-8 h-8' : 'w-6 h-6'
//         } transition-all duration-150 ease-out`} 
//         style={{
//           transform: 'translate(-50%, -50%)',
//           animation: 'pulse 2s infinite',
//         }} />
        
//         {/* Inner dot */}
//         <div className={`absolute rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg ${
//           isClicking ? 'w-3 h-3' : 'w-4 h-4'
//         } transition-all duration-150 ease-out`}
//         style={{
//           transform: 'translate(-50%, -50%)',
//           boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)',
//         }} />
        
//         {/* Sparkle effect */}
//         <div className="absolute w-1 h-1 bg-white rounded-full opacity-80"
//         style={{
//           transform: 'translate(-150%, -150%)',
//           animation: 'sparkle 1.5s infinite',
//         }} />
//         <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
//         style={{
//           transform: 'translate(100%, -200%)',
//           animation: 'sparkle 1.5s infinite 0.5s',
//         }} />
//       </div>

//       {/* CSS animations */}
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//             transform: translate(-50%, -50%) scale(1);
//           }
//           50% {
//             opacity: 0.5;
//             transform: translate(-50%, -50%) scale(1.1);
//           }
//         }
        
//         @keyframes sparkle {
//           0%, 100% {
//             opacity: 0;
//             transform: translate(-150%, -150%) scale(0);
//           }
//           50% {
//             opacity: 1;
//             transform: translate(-150%, -150%) scale(1);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default CursorDot;