import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar/NavBar';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <NavBar />
      <main className='flex-1 flex justify-center p-4'>
        <div className='w-full max-w-[80%]'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
