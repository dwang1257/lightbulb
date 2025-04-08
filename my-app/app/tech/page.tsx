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
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black'>
      <div className='w-full max-w-md bg-yellow-500 rounded-xl shadow-2xl p-8 mb-10 border border-yellow-300'>
        <h1 className='text-6xl font-bold mb-8 text-black'>
          <Animate letterClass='text-animate' strArray={['T', 'e', 'c', 'h', 'n', 'o', 'l', 'o', 'g', 'i', 'e', 's']} index={0} />
        </h1>
        
        <p className='text-black mb-6 font-medium'>What technologies do you want to use?</p>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Ex: Python, React, JavaScript"
              required
              className="w-full px-6 py-3 bg-yellow-50 border border-yellow-300 rounded-lg text-black placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-black text-yellow-400 font-bold rounded-lg active:bg-black transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            Generate Ideas
          </button>
        </form>
      </div>
    </div>
  );
}