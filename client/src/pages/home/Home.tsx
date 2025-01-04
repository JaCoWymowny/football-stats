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
            Witaj w Football-stats!
          </CardTitle>
        </CardHeader>
        <CardContent className='text-center text-sm text-primary_text'>
          <p>
            Football-Stats to aplikacja do zarządzania wynikami i statystykami w piłce nożnej.
            Dołącz do nas i śledź swoje postępy!
          </p>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4'>
        <Tile
          title='Ustawienia'
          description='Przejdź do ustawień konta, aby zaktualizować swój dane'
          link='/settings'
        />
        <Tile
          title='Dane Meczów'
          description='Śledź nadchodzące mecze i ich wyniki.'
          link='/matches'
        />
        <Tile
          title='Tabela wyników'
          description='Łączne wyniki za obstawianie meczów'
          link='/bets'
        />
        <Tile
          title='Moje Zakłady'
          description='Historia Twoich zakładów'
          link={`/bets/user-bets/${currentUser?.id}`}
        />
      </div>
    </div>
  );
};

export default Home;
