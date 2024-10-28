import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <main className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-4xl'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
