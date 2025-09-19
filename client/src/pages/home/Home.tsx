import React from 'react';
import Tile from '@/components/ui/Tile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useUserContext } from '@/context/useUserContext';

const Home = () => {
  const { currentUser } = useUserContext();

  return (
    <div className='space-y-8'>
      <Card className='shadow-md rounded-lg bg-background_light'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-primary_text text-center'>
            Welcome to Football-Stats!
          </CardTitle>
        </CardHeader>
        <CardContent className='text-center text-sm text-primary_text'>
          <p>
            Football-Stats is an application for managing football results and statistics. Join us
            and track your progress!
          </p>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4'>
        <Tile
          title='Settings'
          description='Go to your account settings to update your information'
          link='/settings'
        />
        <Tile
          title='Match Data'
          description='Follow upcoming matches and their results.'
          link='/matches'
        />
        <Tile
          title='Results table'
          description='Total results for betting on matches'
          link='/bets'
        />
        <Tile
          title='My Bets'
          description='Your betting history'
          link={`/bets/user-bets/${currentUser?.id}`}
        />
      </div>
    </div>
  );
};

export default Home;
