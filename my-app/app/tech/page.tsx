'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Animate from '../animate/Animate';
import 'animate.css';
import HomeButton from '../components/HomeButton';

export default function TechnologiesPage() {
  const [tech_stack, setTechStack] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the interests from the query parameters
    const interests = new URLSearchParams(window.location.search).get('interests');
    // Navigate to the ideas page with both interests and tech_stack as query parameters
    if (interests) {
      router.push(`/ideas?interests=${encodeURIComponent(interests)}&tech_stack=${encodeURIComponent(tech_stack)}`);
    } else {
      // Handle the case where interests is null
      console.error('Interests is null');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-4 md:p-6 bg-black overflow-hidden relative'>
      <HomeButton />
      <div className='w-full max-w-md z-10'>
        <div className='mb-8 md:mb-16'>
          <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-yellow-500'>
            <Animate letterClass='text-animate' strArray={['T', 'e', 'c', 'h', '_', 'S', 't', 'a', 'c', 'k']} index={0} />
          </h1>
          <div className='w-16 md:w-24 h-1 bg-yellow-500 mx-auto rounded-full'></div>
        </div>
        
        <div className='space-y-6 md:space-y-8'>
          <p className='text-lg md:text-xl font-medium text-yellow-500'>What technologies do you want to use?</p>
          
          <form onSubmit={handleSubmit} className='space-y-6 md:space-y-8'>
            <div className='relative group'>
              <input
                type="text"
                value={tech_stack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Ex: Python, React, JavaScript"
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-transparent border-b-2 border-yellow-500 text-white placeholder-yellow-500/60 focus:outline-none focus:border-yellow-300 transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </div>
            
            <button 
              type="submit" 
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-yellow-500 text-black font-bold rounded-xl active:bg-yellow-600 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2"
            >
              <span>Generate Ideas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.629 16.693c.37.372.97.372 1.342 0l6.364-6.364a.95.95 0 000-1.342l-6.364-6.364a.95.95 0 00-1.342 0 .95.95 0 000 1.342L15.293 10l-5.664 5.664a.95.95 0 000 1.029z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}