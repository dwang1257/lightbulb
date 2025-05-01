'use client';
import 'animate.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Animate from '../app/animate/Animate';

export default function HomePage() {
  const [letterClass, setLetterClass] = useState('text-animate');
  const titleArray = ['L', 'i', 'g', 'h', 't', 'b', 'u', 'l', 'b'];
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 1);
    return () => clearTimeout(timeoutId);
  }, []);

  const navigateToHobbies = () => {
    router.push('/hobbies');
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-black px-6">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl space-y-10 flex-grow mx-auto">
        {/* Logo Glow */}
        <div className="relative group mt-4">
          <div className="absolute -inset-8 bg-gradient-to-r from-[#FFD700] to-[#FFB300] opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFB300] opacity-10 blur-xl rounded-full animate-pulse"></div>
          <Image
            src="/idea.png"
            alt="Lightbulb"
            width={200}
            height={200}
            className="relative mx-auto lightbulb-glow animate-float"
            priority
          />
        </div>

        {/* Gradient Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFB300] animate-fade-in">
          <Animate letterClass={letterClass} strArray={titleArray} index={0} />
        </h1>

        {/* New Tagline */}
        <div className="text-xl md:text-2xl lg:text-3xl font-light text-white text-center max-w-2xl animate-fade-in-up space-y-2">
          <p>CS Student Without an Internship?</p>
          <p className="text-yellow-400 font-medium">Get Inspired. Start Building.</p>
        </div>

        {/* CTA Button */}
        <div className="relative group mt-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#FFB300] opacity-70 blur rounded-lg group-hover:opacity-100 transition-opacity duration-300"></div>
          <button
            onClick={navigateToHobbies}
            className="relative px-8 py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Start Building →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs md:text-sm text-gray-500 py-6 mt-auto">
        <div className="mx-auto max-w-4xl px-4">
          <a href="https://www.flaticon.com/free-icons/idea" title="idea icons" className="hover:text-yellow-400 transition-colors">
            Idea icons created by Good Ware - Flaticon
          </a>
        </div>
      </footer>
    </div>
  );
}
