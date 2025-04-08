'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../layout';
import Animate from '../animate/Animate';
import 'animate.css';

export default function HobbyPage() {
  const [hobby, setHobby] = useState('');
  const router = useRouter();

  const [letterClass, setLetterClass] = useState('text-animate');
  const titleArray = ['H', 'o', 'b', 'b', 'i', 'e', 's'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to the technologies page with the hobby as a query parameter
    router.push(`/tech?hobby=${encodeURIComponent(hobby)}`);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black'>
      <div className='w-full max-w-md bg-yellow-500 rounded-xl shadow-2xl p-8 mb-10 border border-yellow-300'>
        <h1 className='text-6xl font-bold mb-8 text-black'>
          <Animate letterClass={letterClass} strArray={titleArray} index={0} />
        </h1>
        
        <p className='text-black mb-6 font-medium'>What's your favorite hobby?</p>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <input
              type="text"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              placeholder="Ex: Cooking, Gaming, Photography"
              required
              className="w-full px-6 py-3 bg-yellow-50 border border-yellow-300 rounded-lg text-black placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-black text-yellow-400 font-bold rounded-lg active:bg-black transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}