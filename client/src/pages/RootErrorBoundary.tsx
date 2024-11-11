import { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const RootErrorBoundary: FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Oops! Something went wrong 😢</h1>
      <p className='text-lg text-gray-700'>
        {error?.message || 'An unexpected error occurred. Please try reloading the page.'}
      </p>
      <Button size='sm' onClick={() => window.location.reload()}>
        Reload
      </Button>
    </div>
  );
};

export default RootErrorBoundary;
