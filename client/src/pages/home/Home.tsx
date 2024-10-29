import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Home = () => {
  return (
    <div className='w-[90%] mx-auto p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Hero Section */}
        <Card className='shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-3'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
              Witaj w MyApp!
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center text-gray-600'>
            <p>
              Cieszymy się, że jesteś z nami! MyApp to aplikacja do zarządzania wynikami i
              statystykami w piłce nożnej. Dołącz do nas, aby śledzić swoje postępy!
            </p>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className='shadow-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>Aktualności</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-700'>Nowa funkcjonalność - Analiza meczów</h3>
              <p className='text-gray-600'>
                Dodaliśmy nową funkcję, która pozwala na szczegółową analizę wyników i wydajności w
                meczach. Sprawdź teraz!
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-700'>Aktualizacja aplikacji</h3>
              <p className='text-gray-600'>
                Najnowsza aktualizacja poprawia wydajność i wprowadza nowe funkcje.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <Card className='shadow-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>Statystyki</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between'>
              <span className='text-gray-700'>Rozegrane mecze:</span>
              <span className='font-bold text-gray-800'>25</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-700'>Wygrane mecze:</span>
              <span className='font-bold text-green-600'>18</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-700'>Przegrane mecze:</span>
              <span className='font-bold text-red-600'>7</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card className='shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-1'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>
              Nadchodzące Wydarzenia
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-700'>Turniej Międzynarodowy</h3>
              <p className='text-gray-600'>
                Zbliża się międzynarodowy turniej piłkarski. Zarejestruj się i weź udział w
                rozgrywkach!
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-700'>Mecz przyjaźni</h3>
              <p className='text-gray-600'>
                W przyszłym miesiącu organizujemy mecz przyjaźni z lokalną drużyną. Zapraszamy do
                kibicowania!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
