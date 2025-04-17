'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Animate from '../animate/Animate';
import 'animate.css';

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the hobby from the query parameters
    const hobby = new URLSearchParams(window.location.search).get('hobby');
    // Navigate to the ideas page with both hobby and technologies as query parameters
    if (hobby) {
      router.push(`/ideas?hobby=${encodeURIComponent(hobby)}&technologies=${encodeURIComponent(technologies)}`);
    } else {
      // Handle the case where hobby is null
      console.error('Hobby is null');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black bg-gradient-to-b from-black to-gray-900'>
      <div className='w-full max-w-md'>
        <div className='mb-10'>
          <h1 className='text-7xl font-bold mb-3 text-yellow-500'>
            <Animate letterClass='text-animate' strArray={['T', 'e', 'c', 'h', 'n', 'o', 'l', 'o', 'g', 'i', 'e', 's']} index={0} />
          </h1>
          <div className='w-16 h-1 bg-yellow-500 mx-auto rounded-full'></div>
        </div>
        
        <div className='bg-yellow-500 rounded-2xl shadow-2xl p-8 border border-yellow-300 backdrop-blur-sm'>
          <p className='text-black text-xl mb-8 font-medium'>What technologies do you want to use?</p>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='relative group'>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Ex: Python, React, JavaScript"
                required
                className="w-full px-6 py-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl text-black placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 shadow-md"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <button 
              type="submit" 
              className="w-full px-6 py-4 bg-black text-yellow-400 font-bold rounded-xl active:bg-gray-900 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/30 flex items-center justify-center gap-2"
            >
              <span>Generate Ideas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.629 16.693c.37.372.97.372 1.342 0l6.364-6.364a.95.95 0 000-1.342l-6.364-6.364a.95.95 0 00-1.342 0 .95.95 0 000 1.342L15.293 10l-5.664 5.664a.95.95 0 000 1.029z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <div className='absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none'></div>
      <div className='absolute top-40 left-20 w-32 h-32 rounded-full bg-orange-500/5 blur-2xl pointer-events-none'></div>
    </div>
  );
}