import { FC } from 'react';
import { ScaleLoader } from 'react-spinners';

const GlobalLoader: FC = () => {
  return (
    <div className='flex items-center justify-center pt-[300px]'>
      <ScaleLoader />
    </div>
  );
};

export default GlobalLoader;
