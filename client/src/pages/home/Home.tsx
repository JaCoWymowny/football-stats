import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-[75%] mx-auto p-8'>
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Tile 1: Settings */}
        <Link to='/settings'>
          <Card
            className='relative shadow-md border border-gray-300 rounded-2xl overflow-hidden cursor-pointer
            animate-rotate-360 delay-500 transition-transform w-64 h-56'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 opacity-80' />
            <CardHeader className='relative z-10'>
              <CardTitle className='text-2xl font-semibold text-gray-800 text-center'>
                Ustawienia
              </CardTitle>
            </CardHeader>
            <CardContent className='relative z-10 text-center text-gray-600'>
              <p>Przejdź do ustawień konta, aby zaktualizować swój email lub zmienić hasło.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
