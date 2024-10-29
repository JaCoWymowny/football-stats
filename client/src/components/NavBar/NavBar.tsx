import { useAuth } from '@/features/hooks/useAuth';
import Logo from '../../assets/ball.svg';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='flex justify-between items-center py-4 px-8 bg-stone-800 text-white shadow-md'>
      <div className='flex items-center space-x-4 cursor-pointer' onClick={() => navigate('/')}>
        <Avatar className='w-16 h-16'>
          <AvatarImage src={Logo} alt='Logo' />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span className='text-xl font-bold'>MyApp</span>
      </div>
      <ul className='hidden md:flex items-center space-x-6'>
        <li className='cursor-pointer hover:text-stone-400' onClick={() => navigate('/about')}>
          About
        </li>
        <li className='cursor-pointer hover:text-stone-400' onClick={() => navigate('/services')}>
          Services
        </li>
        <li className='cursor-pointer hover:text-stone-400' onClick={() => navigate('/contact')}>
          Contact
        </li>
      </ul>
      <div className='flex items-center space-x-4'>
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400'
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate('/auth/login')}
              className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400'
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/auth/register')}
              className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400'
            >
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
