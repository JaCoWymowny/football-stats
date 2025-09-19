import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center py-16 px-4'>
      <div className='mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v2m0 4h.01M12 19h.01M12 12.5a2.5 2.5 0 00-2.5-2.5h-1a2.5 2.5 0 00-2.5 2.5v1c0 1.38 1.12 2.5 2.5 2.5h1c1.38 0 2.5-1.12 2.5-2.5v-1zm6 0a2.5 2.5 0 00-2.5-2.5h-1a2.5 2.5 0 00-2.5 2.5v1c0 1.38 1.12 2.5 2.5 2.5h1c1.38 0 2.5-1.12 2.5-2.5v-1z'
          />
        </svg>
      </div>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Oops!</h1>
        <p className='text-lg text-gray-600'>Sorry, an unexpected error occurred.</p>
        <p className='text-md text-gray-500 mt-2 mb-6'>404 - Page not found</p>

        <Link to='/'>
          <Button className='bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 transition-all'>
            Back to the main page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
