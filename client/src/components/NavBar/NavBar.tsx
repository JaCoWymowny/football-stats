import { useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '@/context/useUserContext';
import { useNavigate, Link } from 'react-router-dom';
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
    queryClient.clear();
    toast({
      title: 'Wylogowanie',
      description: 'Zostałeś pomyślnie wylogowany.',
      variant: 'positive',
    });
    navigate('/');
  };

  return (
    <nav className='flex text-info items-center justify-between h-20 p-4 tablet:px-6 laptop:px-8 bg-secondary shadow-md flex-shrink-0'>
      <div className='container mx-auto flex items-center justify-between'>
        <div onClick={() => navigate('/')} className='flex items-center space-x-2 cursor-pointer'>
          <img src={Logo} alt='Logo' className='text-infow-8 h-8 laptop:w-10 laptop:h-10' />
          <span className='font-bold laptop:text-xl'>Football-Stats</span>
        </div>

        <div className='flex items-center space-x-4'>
          {currentUser && authStatus === AuthStatus.AUTHENTICATED ? (
            <>
              <Link to={`/profile/${currentUser.id}`} className='hover:underline'>
                {currentUser.username}
              </Link>
              <Button
                onClick={() => navigate('/users-list')}
                className='px-2 py-1 tablet:px-4 tablet:py-2'
                variant='navbar'
              >
                Users List
              </Button>
              <Button
                onClick={handleLogout}
                className='px-2 py-1 tablet:px-4 tablet:py-2'
                variant='navbar'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/auth/login')}
                className='px-2 py-1 tablet:px-4 tablet:py-2'
                variant='navbar'
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/auth/register')}
                className='px-2 py-1 tablet:px-4 tablet:py-2'
                variant='navbar'
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
