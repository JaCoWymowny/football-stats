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
    <Link to={link} className='h-full'>
      <Card className='relative shadow-md border border-primary_text/20 rounded-lg overflow-hidden cursor-pointer w-full h-full p-4 bg-accent transition-transform hover:scale-105 hover:shadow-lg flex flex-col justify-between'>
        <CardHeader className='text-center'>
          <CardTitle className='text-base font-semibold text-secondary_text'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='text-center text-sm text-secondary_text mt-2'>
          <p>{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Tile;
