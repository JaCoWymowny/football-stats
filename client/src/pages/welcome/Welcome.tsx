import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Welcome = () => {
  return (
    <div className='w-[90%] mx-auto p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Hero Section */}
        <Card className='shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-3 bg-background_light'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
              Witaj w Football-Stats!
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center text-gray-600'>
            <p>Zaloguj się aby zobaczyć więcej treści</p>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className='shadow-md rounded-2xl bg-background_light'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>Aktualności</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-700'>Nowa funkcjonalność - Analiza meczów</h3>
              <p className='text-gray-600'>
                Dodaliśmy nową funkcję, która pozwala na obstawanie wyników na punkty! Sprawdź to
                już teraz!
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-test2'>Wersja aplikacji</h3>
              <p className='text-test2'>1.0.0</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <Card className='shadow-md rounded-2xl bg-background_light'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>Statystyki</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between'>
              <span className='text-gray-700'>Rozegrane mecze:</span>
              <span className='font-bold text-gray-800'>3</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-700'>Wygrane mecze:</span>
              <span className='font-bold text-green-600'>2</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-700'>Przegrane mecze:</span>
              <span className='font-bold text-red-600'>1</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card className='shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-1 bg-background_light'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>
              Nadchodzące Wydarzenia
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-700'>Turniej Międzynarodowy</h3>
              <p className='text-gray-600'>
                Zbliża się nowy rok i druga część sezonu, oglądaj, graj i wygrywaj!
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-700'>Wydarzenia</h3>
              <p className='text-gray-600'>Puchar Króla w hiszpani zaraz się zacznie..</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
