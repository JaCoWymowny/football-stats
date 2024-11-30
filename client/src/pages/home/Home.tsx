import React from 'react';
import Tile from '@/components/ui/Tile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Home = () => {
  return (
    <div className='w-full max-w-screen-lg mx-auto p-4 sm:p-6 md:p-8'>
      <div className='mb-8'>
        <Card className='shadow-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
              Witaj w MyApp!
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center text-gray-600'>
            <p>
              MyApp to aplikacja do zarządzania wynikami i statystykami w piłce nożnej. Dołącz do
              nas i śledź swoje postępy!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid of Tiles */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8'>
        <Tile
          title='Ustawienia'
          description='Przejdź do ustawień konta, aby zaktualizować swój dane'
          link='/settings'
        />
        <Tile
          title='Statystyki'
          description='Śledź swoje wyniki i postępy na bieżąco.'
          link='/statistics'
        />
        <Tile
          title='Inna Funkcja'
          description='Opis innej funkcji, do której masz dostęp.'
          link='/another-feature'
        />
        <Tile
          title='Dane Meczów'
          description='Śledź nadchodzące mecze i ich wyniki.'
          link='/matches'
        />
      </div>
    </div>
  );
};

export default Home;
