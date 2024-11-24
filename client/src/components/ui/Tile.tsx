import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface TileProps {
  title: string;
  description: string;
  link: string;
}

const Tile: React.FC<TileProps> = ({ title, description, link }) => {
  return (
    <Link to={link}>
      <Card className='relative shadow-md border border-gray-300 rounded-2xl overflow-hidden cursor-pointer w-full h-40 sm:h-32 md:h-44 lg:h-52 transition-transform hover:scale-105 hover:shadow-lg p-4'>
        <div className='absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 opacity-80 p-1' />

        <CardHeader className='relative z-10 p-2'>
          <CardTitle className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 text-center mb-2'>
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className='relative z-10 text-center text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl p-2'>
          <p>{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Tile;
