'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function HomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="absolute top-4 left-4 z-50 hover:scale-110 transition-transform duration-300"
    >
      <Image
        src="/idea.png"
        alt="Home"
        width={40}
        height={40}
        className="rounded-full"
        priority
      />
    </button>
  );
} 