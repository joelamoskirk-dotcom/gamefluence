'use client';

import React, { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function GamefluenceLogo({ 
  size = 'md', 
  animated = true, 
  glowIntensity = 'medium',
  className = '' 
}: LogoProps) {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const letters = ['G', 'A', 'M', 'E', 'F', 'L', 'U', 'E', 'N', 'C', 'E'];
  
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const glowClasses = {
    low: 'drop-shadow-sm',
    medium: 'drop-shadow-lg',
    high: 'drop-shadow-2xl'
  };

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setCurrentLetter((prev) => (prev + 1) % letters.length);
    }, 200);

    return () => clearInterval(interval);
  }, [animated, letters.length]);

  const handleLogoClick = () => {
    setIsPlaying(true);
    setCurrentLetter(0);
    
    // Play through all letters once
    letters.forEach((_, index) => {
      setTimeout(() => {
        setCurrentLetter(index);
        if (index === letters.length - 1) {
          setTimeout(() => setIsPlaying(false), 300);
        }
      }, index * 100);
    });
  };

  const getLetterStyle = (index: number) => {
    const isActive = animated && (currentLetter === index || isPlaying);
    const baseClasses = "inline-block transition-all duration-300 font-bold tracking-wider";
    
    if (isActive) {
      // Lit up state with gambling lights effect
      return `${baseClasses} text-transparent bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text 
              shadow-[0_0_10px_#fbbf24,0_0_20px_#f59e0b,0_0_30px_#d97706] 
              transform scale-110 animate-pulse`;
    } else {
      // Dim state
      return `${baseClasses} text-gray-400 hover:text-gray-300`;
    }
  };

  return (
    <div 
      className={`cursor-pointer select-none ${className}`}
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
    >
      <div className={`${sizeClasses[size]} ${glowClasses[glowIntensity]} font-extrabold`}>
        {letters.map((letter, index) => (
          <span
            key={index}
            className={getLetterStyle(index)}
            style={{
              textShadow: animated && (currentLetter === index || isPlaying) 
                ? '0 0 10px #fbbf24, 0 0 20px #f59e0b, 0 0 30px #d97706, 0 0 40px #b45309'
                : 'none',
              animationDelay: `${index * 0.1}s`
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="flex justify-center mt-2 space-x-1">
        {[...Array(11)].map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              animated && (currentLetter === index || isPlaying)
                ? 'bg-yellow-400 shadow-[0_0_8px_#fbbf24] animate-ping'
                : 'bg-gray-600'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
      
      {/* Subtitle */}
      <div className="text-center mt-3">
        <span className="text-sm font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Gaming Influencer Marketing Platform
        </span>
      </div>
    </div>
  );
}

// Alternative compact logo for navigation
export function GamefluenceLogoCompact({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          G
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
        amefluence
      </span>
    </div>
  );
}

// Casino-style marquee logo
export function GamefluenceMarquee({ className = '' }: { className?: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        {/* Main text */}
        <div className="text-6xl font-extrabold tracking-wider">
          {'GAMEFLUENCE'.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-300 ${
                (frame + index) % 4 === 0
                  ? 'text-yellow-400 drop-shadow-[0_0_15px_#fbbf24] transform scale-110'
                  : (frame + index) % 4 === 1
                  ? 'text-pink-400 drop-shadow-[0_0_15px_#ec4899] transform scale-105'
                  : (frame + index) % 4 === 2
                  ? 'text-blue-400 drop-shadow-[0_0_15px_#3b82f6] transform scale-105'
                  : 'text-purple-400 drop-shadow-[0_0_15px_#8b5cf6] transform scale-105'
              }`}
              style={{
                textShadow: (frame + index) % 4 === 0
                  ? '0 0 10px #fbbf24, 0 0 20px #f59e0b, 0 0 30px #d97706'
                  : (frame + index) % 4 === 1
                  ? '0 0 10px #ec4899, 0 0 20px #db2777, 0 0 30px #be185d'
                  : (frame + index) % 4 === 2
                  ? '0 0 10px #3b82f6, 0 0 20px #2563eb, 0 0 30px #1d4ed8'
                  : '0 0 10px #8b5cf6, 0 0 20px #7c3aed, 0 0 30px #6d28d9'
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {/* Border lights */}
        <div className="absolute -inset-4 border-4 border-dashed border-yellow-400 rounded-lg animate-spin-slow opacity-50"></div>
        
        {/* Corner bulbs */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-4 h-4 rounded-full ${
              frame === index ? 'bg-yellow-400 animate-ping' : 'bg-gray-600'
            }`}
            style={{
              top: index < 2 ? '-8px' : 'calc(100% + 8px)',
              left: index % 2 === 0 ? '-8px' : 'calc(100% + 8px)',
              boxShadow: frame === index ? '0 0 15px #fbbf24' : 'none'
            }}
          />
        ))}
      </div>
      
      {/* Scrolling text */}
      <div className="mt-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium text-gray-400">
          ★ GAMING INFLUENCER MARKETING PLATFORM ★ LEVEL UP YOUR CAMPAIGNS ★ CONNECT WITH TOP CREATORS ★
        </div>
      </div>
    </div>
  );
}