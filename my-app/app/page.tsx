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
    // Set a timeout to change the animation class after initial animation
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 1); // Added a 1ms delay
    
    return () => clearTimeout(timeoutId);
  }, []);

  const navigateToHobbies = () => {
    router.push('/hobbies');
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-black">
      {/* Header (Lightbulb at the top) */}
      <header className="flex flex-col items-center justify-center py-8 w-full max-w-4xl px-4">
        <div className="relative">
          <div className="absolute -inset-10 bg-yellow-400 opacity-20 blur-3xl rounded-full"></div>
          <Image
            src="/idea.png"
            alt="Lightbulb"
            width={150}
            height={150}
            className="relative mx-auto mb-6 lightbulb-glow md:w-[250px] md:h-[250px] w-[150px] h-[150px]"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-visible pb-4">
          <Animate letterClass={letterClass} strArray={titleArray} index={0} />
        </h1>
      </header>
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center w-full max-w-3xl px-6">
        <p className="text-xl md:text-3xl lg:text-4xl font-light text-white mb-10 md:mb-16 leading-relaxed">
          <span className="font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">CS Student</span> Without an Internship?<br />
          <span className="mt-2 md:mt-4 inline-block">Get Ideas and Start Building!</span>
        </p>
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-70 blur-sm rounded-lg"></div>
          <button
            onClick={navigateToHobbies}
            className="relative px-6 md:px-8 py-3 md:py-4 bg-white text-black text-lg md:text-xl font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
      
      {/* Footer at the bottom */}
      <footer className="text-center text-xs md:text-sm text-gray-500 my-4 md:my-6 w-full">
        <div className="mx-auto max-w-4xl pt-4 md:pt-6 px-4">
          <a href="https://www.flaticon.com/free-icons/idea" title="idea icons" className="hover:text-yellow-400 transition-colors">
            Idea icons created by Good Ware - Flaticon
          </a>
        </div>
      </footer>
    </div>
  );
}