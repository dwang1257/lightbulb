'use client';
import 'animate.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import lightbulb from '../app/idea.png';
import Animate from '../app/animate/Animate';

export default function HomePage() {
  const [letterClass, setLetterClass] = useState('text-animate');
  const titleArray = ['L', 'i', 'g', 'h', 't', 'b', 'u', 'l', 'b'];

  const router = useRouter();

  useEffect(() => {
    // Set a timeout to change the animation class after initial animation
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    },);
    
    fetch('http://localhost:8080/generate-ideas')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching data:', error));
      
    return () => clearTimeout(timeoutId);
  }, []);

  const navigateToHobbies = () => {
    router.push('/hobbies');
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-black">
      {/* Header (Lightbulb at the top) */}
      <header className="flex flex-col items-center justify-center py-8 mt-12 w-full max-w-4xl">
        <div className="relative">
          <div className="absolute -inset-10 bg-yellow-400 opacity-20 blur-3xl rounded-full"></div>
          <Image
            src={lightbulb}
            alt="Lightbulb"
            width={250}
            height={250}
            className="relative mx-auto mb-8 lightbulb-glow"
          />
        </div>
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-visible pb-4">
          <Animate letterClass={letterClass} strArray={titleArray} index={0} />
        </h1>
      </header>
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center w-full max-w-3xl px-6">
        <p className="text-4xl font-light text-white mb-16 leading-relaxed">
          <span className="font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">CS Student</span> Without an Internship?<br />
          <span className="mt-4 inline-block">Create a Project Now!</span>
        </p>
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-70 blur-sm rounded-lg"></div>
          <button
            onClick={navigateToHobbies}
            className="relative px-8 py-4 bg-white text-black text-xl font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
      
      {/* Footer at the bottom */}
      <footer className="text-center text-sm text-gray-500 my-6 w-full">
        <div className="mx-auto max-w-4xl pt-6">
          <a href="https://www.flaticon.com/free-icons/idea" title="idea icons" className="hover:text-yellow-400 transition-colors">
            Idea icons created by Good Ware - Flaticon
          </a>
        </div>
      </footer>
    </div>
  );
}