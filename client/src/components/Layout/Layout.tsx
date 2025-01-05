import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar/NavBar';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <NavBar />
      <main className='flex-1 mt-6 tablet:mt-8 laptop:mt-10'>
        <div className='container mx-auto p-8 tablet:px-0'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
