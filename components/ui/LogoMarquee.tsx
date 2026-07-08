'use client';

import React from 'react';

const LOGOS = [
  'King',
  'Amazon Games',
  'Prime Gaming',
  'Activision Blizzard',
  'Kick',
  'IGN',
  'Twitch',
  'AppsFlyer',
  'InMobi',
  'AWS',
  'IAB',
  'Halfbrick',
];

export default function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden py-4">
      <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30 mb-5">
        Founded by 20 years across
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex marquee-track">
          {/* First set */}
          <div className="flex shrink-0 items-center gap-8 sm:gap-12 px-4">
            {LOGOS.map((logo, i) => (
              <span
                key={`a-${i}`}
                className="text-sm sm:text-base font-semibold tracking-wide text-white/50 whitespace-nowrap select-none"
              >
                {logo}
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0 items-center gap-8 sm:gap-12 px-4">
            {LOGOS.map((logo, i) => (
              <span
                key={`b-${i}`}
                className="text-sm sm:text-base font-semibold tracking-wide text-white/50 whitespace-nowrap select-none"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: scroll 35s linear infinite;
          width: max-content;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause on hover for accessibility */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
