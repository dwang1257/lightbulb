'use client';

import React, { useEffect, useState } from 'react';
import 'animate.css';
import Animate from '../animate/Animate';
import { useRouter } from 'next/navigation';


// Loading Animation Component
const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-t-4 border-yellow-400 border-solid rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-r-4 border-orange-500 border-solid rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '1.5s' }}></div>
        <div className="w-16 h-16 border-b-4 border-black border-solid rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '2s' }}></div>
      </div>
      <p className="mt-4 text-lg font-medium text-white">Generating project ideas...</p>
    </div>
  );
};

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectBlocks, setProjectBlocks] = useState<any[]>([]);
  const [invalidInterests, setInvalidInterests] = useState(false);
  const [invalidTechStack, setInvalidTechStack] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);


  const letterClass = 'text-animate';
  const titleArray = ['P', 'r', 'o', 'j', 'e', 'c', 't', 's'];

  const router = useRouter();

  // Function to toggle expanded state
  const toggleExpand = (blockIndex: number) => {
    setExpandedBlock(expandedBlock === blockIndex ? null : blockIndex);
  };

  useEffect(() => {
    // Get interests and tech_stack from query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const interests = queryParams.get('interests');
    const tech_stack = queryParams.get('tech_stack');
    

    // Fetch AI-generated ideas from the backend
    const fetchIdeas = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        // CHANGED FROM /server/generate-ideas to /api/generate-ideas
        console.log('Fetching from:', `${apiUrl}/server/generate-ideas`);
        console.log('Sending data:', { interests, tech_stack });
        
        const response = await fetch(`${apiUrl}/server/generate-ideas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ interests, tech_stack }),
        });
    
        const data = await response.json();
        console.log('Response data:', data);
        if (data.ideas && data.ideas.length === 1 && data.ideas[0] === 'Invalid interests') {
          setInvalidInterests(true);
        } else if (data.ideas && data.ideas.length === 1 && data.ideas[0] === 'Invalid technology'){
          setInvalidTechStack(true);
        } else {
          setIdeas(data.ideas);
          organizeIdeasIntoBlocks(data.ideas);
        }
      } catch (error) {
        console.error('Error fetching ideas:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // Function to organize ideas into project blocks
  const organizeIdeasIntoBlocks = (ideasArray: string[]) => {
    const blocks: any[] = [];
    let currentBlock: {
      heading: string;
      description: string;
      steps: string[];
      expanded: boolean;
    } | null = null;

    for (let i = 0; i < ideasArray.length; i++) {
      const idea = ideasArray[i];
      
      // Check if this is a heading line (starts with **)
      if (idea.startsWith('**')) {
        // If we were building a previous block, push it to blocks array
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        
        // Extract the heading (removing ** and quotes)
        const headingMatch = idea.match(/\*\*(.*?):\*\* "(.*)"/);
        if (headingMatch) {
          const difficultyLevel = headingMatch[1]; // Basic, Medium, Advanced
          const projectTitle = headingMatch[2];
          
          // Start a new block with quotes removed from display
          currentBlock = {
            heading: `${difficultyLevel}: ${projectTitle}`,
            description: '',
            steps: [],
            expanded: false
          };
          
          // Check if the next line is the description
          if (i + 1 < ideasArray.length && !ideasArray[i + 1].startsWith('**')) {
            currentBlock.description = ideasArray[i + 1];
            i++; // Skip the description line in the next iteration
          }
        }
      } else if (idea.trim().startsWith('Step ') && currentBlock) {
        // Add implementation steps
        currentBlock.steps.push(idea.trim());
      } else if (idea.trim() !== '' && currentBlock && !idea.trim().startsWith('Step ')) {
        // If it's not a step and not empty, it might be part of the description
        if (currentBlock.description) {
          currentBlock.description += ' ' + idea.trim();
        } else {
          currentBlock.description = idea.trim();
        }
      }
    }

    // Don't forget to add the last block
    if (currentBlock) {
      blocks.push(currentBlock);
    }

    setProjectBlocks(blocks);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (invalidInterests) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-black text-center p-6'>
        <h1 className='text-6xl font-bold mb-10 text-yellow-500'>
          <Animate letterClass={letterClass} strArray={titleArray} index={0} />
        </h1>
        
        <div className='w-full max-w-2xl'>
          <div className='bg-red-500 rounded-xl shadow-2xl p-8 border border-red-400 transform transition-all duration-300'>
            <h2 className='text-2xl font-bold mb-4 text-white'>Invalid Interest Inputted</h2>
            <p className='text-white mb-4'>The interest you entered is either inappropriate or not recognized. Please go back and enter a valid interest.</p>
            <button 
              onClick={() => router.push("/hobbies")}
              className='bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300'
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (invalidTechStack) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-black text-center p-6'>
        <h1 className='text-6xl font-bold mb-10 text-yellow-500'>
          <Animate letterClass={letterClass} strArray={titleArray} index={0} />
        </h1>
        
        <div className='w-full max-w-2xl'>
          <div className='bg-red-500 rounded-xl shadow-2xl p-8 border border-red-400 transform transition-all duration-300'>
            <h2 className='text-2xl font-bold mb-4 text-white'>Invalid Tech Stack Inputted</h2>
            <p className='text-white mb-4'>The tech stack you entered is either inappropriate or not recognized. Please go back and enter a valid tech stack.</p>
            <button 
              onClick={() => router.back()}
              className='bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300'
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-center p-6'>
      <h1 className='text-6xl font-bold mb-10 text-yellow-500'>
        <Animate letterClass={letterClass} strArray={titleArray} index={0} />
      </h1>
      
      <div className='w-full max-w-2xl flex flex-col gap-6'>
        {projectBlocks.map((block, blockIndex) => (
          <div 
            key={blockIndex} 
            className='bg-yellow-500 rounded-xl shadow-2xl p-8 border border-yellow-300 transform transition-all duration-300 hover:shadow-yellow-400 cursor-pointer'
            onClick={() => toggleExpand(blockIndex)}
            style={{
              transition: 'all 0.3s ease',
            }}
          >
            <h2 className='text-2xl font-bold mb-4 text-black'>{block.heading}</h2>
            <p className='text-black mb-4 font-medium'>{block.description}</p>
            
            {expandedBlock === blockIndex && block.steps.length > 0 && (
              <div className='mt-4 bg-white bg-opacity-20 p-4 rounded-lg'>
                <h3 className='text-lg font-bold mb-3 text-black'>Implementation Plan:</h3>
                <ul className='text-left'>
                  {block.steps.map((step, idx) => (
                    <li key={idx} className='mb-2 flex'>
                      <span className='text-black font-medium'>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className='mt-3 text-sm text-black font-medium'>
              {expandedBlock === blockIndex ? 'Click to collapse' : 'Click to see implementation steps'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
