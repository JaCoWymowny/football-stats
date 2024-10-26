import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='p-4 bg-blue-500 text-white'>
      <h1>Hello, Tailwind CSS!</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
