'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Animate from '../animate/Animate';
import 'animate.css';

export default function HobbyPage() {
  const [hobby, setHobby] = useState('');
  const router = useRouter();

  const letterClass = 'text-animate';
  const titleArray = ['H', 'o', 'b', 'b', 'i', 'e', 's'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to the technologies page with the hobby as a query parameter
    router.push(`/tech?hobby=${encodeURIComponent(hobby)}`);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black'>
      <div className='w-full max-w-md'>
        <div className='mb-16'>
          <h1 className='text-7xl font-bold mb-3 text-yellow-500'>
            <Animate letterClass={letterClass} strArray={titleArray} index={0} />
          </h1>
          <div className='w-24 h-1 bg-yellow-500 mx-auto rounded-full'></div>
        </div>
        
        <div className='space-y-8'>
          <p className='text-yellow-500 text-xl font-medium'>What's your favorite hobby?</p>
          
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
      
      <div className='absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none'></div>
      
      {/* Futuristic elements */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  );
}