'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Animate from '../animate/Animate';
import 'animate.css';
import HomeButton from '../components/HomeButton';

export default function HobbyPage() {
  const [hobby, setHobby] = useState('');
  const router = useRouter();

  const letterClass = 'text-animate';
  const titleArray = ['I', 'n', 't', 'e', 'r', 'e', 's', 't', 's'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to the technologies page with the interests as a query parameter
    router.push(`/tech?interests=${encodeURIComponent(hobby)}`);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black overflow-hidden relative'>
      <HomeButton />
      <div className='w-full max-w-md z-10'>
        <div className='mb-16'>
          <h1 className='text-7xl font-bold mb-3 text-yellow-500'>
            <Animate letterClass={letterClass} strArray={titleArray} index={0} />
          </h1>
          <div className='w-24 h-1 bg-yellow-500 mx-auto rounded-full'></div>
        </div>
        
        <div className='space-y-8'>
          <p className='text-yellow-500 text-xl font-medium'>What&apos;s your favorite hobby?</p>
          
          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='relative group'>
              <input
                type="text"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                placeholder="Ex: Cooking, Gaming, Photography"
                required
                className="w-full px-6 py-4 bg-transparent border-b-2 border-yellow-500 text-white placeholder-yellow-500/60 focus:outline-none focus:border-yellow-300 transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </div>
            
            <button 
              type="submit" 
              className="w-full px-6 py-4 bg-yellow-500 text-black font-bold rounded-xl active:bg-yellow-600 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2"
            >
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}