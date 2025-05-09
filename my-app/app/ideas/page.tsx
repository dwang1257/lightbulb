'use client';

import React, { useEffect, useState, useCallback } from 'react';
import 'animate.css';
import Animate from '../animate/Animate';
import { useRouter } from 'next/navigation';
import HomeButton from '../components/HomeButton';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  interface ProjectBlock {
    heading: string;
    description: string;
    steps: string[];
    expanded: boolean;
  }

  const [projectBlocks, setProjectBlocks] = useState<ProjectBlock[]>([]);
  const [invalidInterests, setInvalidInterests] = useState(false);
  const [invalidTechStack, setInvalidTechStack] = useState(false);
  const [inputTooLong, setInputTooLong] = useState(false);
  const [missingFields, setMissingFields] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  const letterClass = 'text-animate';
  const titleArray = ['P', 'r', 'o', 'j', 'e', 'c', 't', 's'];
  const router = useRouter();

  const toggleExpand = (blockIndex: number) => {
    setExpandedBlock(expandedBlock === blockIndex ? null : blockIndex);
  };

  const organizeIdeasIntoBlocks = useCallback((ideasArray: string[]) => {
    const blocks: ProjectBlock[] = [];
    let currentBlock: ProjectBlock | null = null;

    for (let i = 0; i < ideasArray.length; i++) {
      const idea = ideasArray[i];

      if (idea.startsWith('**')) {
        if (currentBlock) blocks.push(currentBlock);
        const headingMatch = idea.match(/\*\*(.*?):\*\* \"(.*)\"/);
        if (headingMatch) {
          const difficultyLevel = headingMatch[1];
          const projectTitle = headingMatch[2];
          currentBlock = {
            heading: `${difficultyLevel}: ${projectTitle}`,
            description: '',
            steps: [],
            expanded: false,
          };
          if (i + 1 < ideasArray.length && !ideasArray[i + 1].startsWith('**')) {
            currentBlock.description = ideasArray[i + 1];
            i++;
          }
        }
      } else if (idea.trim().startsWith('Step ') && currentBlock) {
        currentBlock.steps.push(idea.trim());
      } else if (idea.trim() !== '' && currentBlock && !idea.trim().startsWith('Step ')) {
        currentBlock.description += ' ' + idea.trim();
      }
    }

    if (currentBlock) blocks.push(currentBlock);
    setProjectBlocks(blocks);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const interests = queryParams.get('interests');
    const tech_stack = queryParams.get('tech_stack');

    const fetchIdeas = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/server/generate-ideas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests, tech_stack }),
        });

        const data = await response.json();

        if (data.ideas && data.ideas.length === 1) {
          switch (data.ideas[0]) {
            case 'Invalid interests.':
              setInvalidInterests(true);
              break;
            case 'Invalid tech stack.':
              setInvalidTechStack(true);
              break;
            case 'Input too long.':
              setInputTooLong(true);
              break;
            case 'Missing interests.':
            case 'Missing tech stack.':
              setMissingFields(true);
              break;
            default:
              setError(true);
          }
        } else {
          organizeIdeasIntoBlocks(data.ideas);
        }
      } catch (error) {
        console.error('Error fetching ideas:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [organizeIdeasIntoBlocks]);

  if (loading) return (<><HomeButton /><LoadingAnimation /></>);

  const renderErrorBlock = (title: string, message: string) => (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-center p-6'>
      <HomeButton />
      <h1 className='text-6xl font-bold mb-10 text-yellow-500'>
        <Animate letterClass={letterClass} strArray={titleArray} index={0} />
      </h1>
      <div className='w-full max-w-2xl'>
        <div className='bg-red-500 rounded-xl shadow-2xl p-8 border border-red-400'>
          <h2 className='text-2xl font-bold mb-4 text-white'>{title}</h2>
          <p className='text-white mb-4'>{message}</p>
          <button onClick={() => router.push('/')} className='bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800'>Go Back to Home</button>
        </div>
      </div>
    </div>
  );

  if (error) return renderErrorBlock('Error Occurred', 'Something went wrong while generating project ideas. Please try again.');
  if (invalidInterests) return renderErrorBlock('Invalid Interest Inputted', 'The interest you entered is either inappropriate or not recognized. Please go back and enter a valid interest.');
  if (invalidTechStack) return renderErrorBlock('Invalid Tech Stack Inputted', 'The tech stack you entered is either inappropriate or not recognized. Please go back and enter a valid tech stack.');
  if (inputTooLong) return renderErrorBlock('Input Too Long', 'Either your interests or tech stack exceeded the 100 character limit.');
  if (missingFields) return renderErrorBlock('Missing Required Fields', 'Either interests or tech stack is missing. Please go back and fill them in.');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-center p-6'>
      <HomeButton />
      <h1 className='text-6xl font-bold mb-10 text-yellow-500'>
        <Animate letterClass={letterClass} strArray={titleArray} index={0} />
      </h1>
      <div className='w-full max-w-2xl flex flex-col gap-6'>
        {projectBlocks.map((block, blockIndex) => (
          <div key={blockIndex} className='bg-yellow-500 rounded-xl shadow-2xl p-8 border border-yellow-300 hover:shadow-yellow-400 cursor-pointer' onClick={() => toggleExpand(blockIndex)}>
            <h2 className='text-2xl font-bold mb-4 text-black'>{block.heading}</h2>
            <p className='text-black mb-4 font-medium'>{block.description}</p>
            {expandedBlock === blockIndex && block.steps.length > 0 && (
              <div className='mt-4 bg-white bg-opacity-20 p-4 rounded-lg'>
                <h3 className='text-lg font-bold mb-3 text-black'>Implementation Plan:</h3>
                <ul className='text-left'>
                  {block.steps.map((step: string, idx: number) => (
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
