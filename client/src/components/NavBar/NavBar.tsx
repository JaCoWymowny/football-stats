import { useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '@/context/useUserContext';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import Logo from '@/assets/ball.svg';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/hooks/use-toast';
import { AuthStatus } from '@/store/authStatus';
import { useAuthStore } from '@/store/useAuthStore';

const NavBar = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  const { toast } = useToast();
  const { status: authStatus, setStatus } = useAuthStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    setStatus(AuthStatus.UNAUTHENTICATED);
    queryClient.removeQueries({ queryKey: ['user'] });
    toast({
      title: 'Wylogowanie',
      description: 'Zostałeś pomyślnie wylogowany.',
      variant: 'destructive',
    });
    navigate('/');
  };

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
        {currentUser && authStatus === AuthStatus.AUTHENTICATED ? (
          <>
            <Link
              to={`/profile/${currentUser.id}`}
              className='text-gray-300 hover:text-stone-400 cursor-pointer'
            >
              {currentUser.username}
            </Link>
            <Button
              onClick={() => navigate('/users-list')}
              className='border border-gray-300 text-gray-300 cursor-pointer rounded-full hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
            >
              Users List
            </Button>
            <Button
              onClick={handleLogout}
              className='border border-gray-300 text-gray-300 cursor-pointer rounded-full hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate('/auth/login')}
              className='border border-gray-300 text-gray-300 cursor-pointer rounded-full hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/auth/register')}
              className='border border-gray-300 text-gray-300 cursor-pointer rounded-full hover:text-stone-400 px-2 py-1 md:px-4 md:py-2'
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
