import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar/NavBar';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <NavBar />
      <main className='flex-1 flex justify-center'>
        <div className='w-full max-w-screen-lg lg:max-w-screen-xl mx-auto p-4 sm:p-6 md:p-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
