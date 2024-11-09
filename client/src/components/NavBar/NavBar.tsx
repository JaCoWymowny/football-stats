import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/features/hooks/useAuth';
import { useAuthActions } from '@/features/hooks/useAuthActions';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import Logo from '@/assets/ball.svg';
import { Button } from '@/components/ui/Button';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { handleLogout } = useAuthActions();
  const { data: user, isLoading } = useUserQuery();

  return (
    <nav className='flex justify-between items-center py-4 px-8 bg-stone-800 text-white shadow-md overflow-hidden'>
      <div className='flex items-center space-x-4 cursor-pointer' onClick={() => navigate('/')}>
        <Avatar className='w-10 h-10 md:w-16 md:h-16'>
          <AvatarImage src={Logo} alt='Logo' />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span className='text-lg md:text-xl font-bold'>MyApp</span>
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
      <div className='flex items-center space-x-2 md:space-x-4'>
        {isAuthenticated ? (
          <>
            {!isLoading && user && (
              <Link
                to={`/profile/${user.id}`}
                className='text-gray-300 hover:text-stone-400 cursor-pointer'
              >
                {user.username}
              </Link>
            )}
            <Button
              onClick={() => navigate('/users-list')}
              className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
            >
              Users List
            </Button>
            <Button
              onClick={handleLogout}
              className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate('/auth/login')}
              className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/auth/register')}
              className='border border-gray-300 text-gray-300 cursor-pointer hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
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
