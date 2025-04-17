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
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black overflow-hidden relative'>
      <div className='w-full max-w-md z-10'>
        <div className='mb-16'>
          <h1 className='text-7xl font-bold mb-3 text-yellow-500'>
            <Animate letterClass='text-animate' strArray={['T', 'e', 'c', 'h', 'n', 'o', 'l', 'o', 'g', 'i', 'e', 's']} index={0} />
          </h1>
          <div className='w-24 h-1 bg-yellow-500 mx-auto rounded-full'></div>
        </div>
        
        <div className='space-y-8'>
          <p className='text-yellow-500 text-xl font-medium'>What technologies do you want to use?</p>
          
          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='relative group'>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Ex: Python, React, JavaScript"
                required
                className="w-full px-6 py-4 bg-transparent border-b-2 border-yellow-500 text-white placeholder-yellow-500/60 focus:outline-none focus:border-yellow-300 transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </div>
            
            <button 
              type="submit" 
              className="w-full px-6 py-4 bg-yellow-500 text-black font-bold rounded-xl active:bg-yellow-600 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2"
            >
              <span>Generate Ideas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.629 16.693c.37.372.97.372 1.342 0l6.364-6.364a.95.95 0 000-1.342l-6.364-6.364a.95.95 0 00-1.342 0 .95.95 0 000 1.342L15.293 10l-5.664 5.664a.95.95 0 000 1.029z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Enhanced glowing dots elements */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1.5s', opacity: '0.7'}}></div>
      <div className="absolute top-1/3 right-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
      <div className="absolute bottom-2/5 left-1/5 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '1.2s', opacity: '0.6'}}></div>
      <div className="absolute top-3/5 right-1/5 w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
      <div className="absolute top-1/6 left-2/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.9s', opacity: '0.8'}}></div>
      <div className="absolute bottom-1/6 right-2/5 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '1.4s'}}></div>
      <div className="absolute top-2/3 left-3/5 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s', opacity: '0.5'}}></div>
      <div className="absolute bottom-3/4 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '1.7s'}}></div>
      <div className="absolute top-3/4 left-1/6 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
      
      {/* Larger, more subtle glowing dots */}
      <div className="absolute bottom-1/2 right-1/4 w-6 h-6 bg-orange-500 rounded-full animate-pulse opacity-10" style={{animationDelay: '0.6s'}}></div>
      <div className="absolute top-1/4 right-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-pulse opacity-15" style={{animationDelay: '1.9s'}}></div>
      
      {/* Background glow effect */}
      <div className='absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none'></div>
    </div>
  );
}