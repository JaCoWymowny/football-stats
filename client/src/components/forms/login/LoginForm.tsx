import { useNavigate } from 'react-router-dom';
import { LoginSchemaType } from '@/components/forms/login/loginSchema';
import { useAuthActions } from '@/features/hooks/useAuthActions';
import { useLoginForm } from '@/helpers/useFormHelper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/Form';

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useLoginForm();
  const { loginAndSetCache } = useAuthActions();

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await loginAndSetCache(data);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wprowadź nazwę użytkownika'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Wprowadź hasło'
                  className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'
        >
          Zaloguj się
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
