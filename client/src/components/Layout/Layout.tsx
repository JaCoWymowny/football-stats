import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar/NavBar';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <NavBar />
      <main className='flex justify-center flex-1 overflow-y-auto p-4 tablet:p-6 laptop:p-8 w-full mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
