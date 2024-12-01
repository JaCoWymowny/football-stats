import { FC } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  title: string;
  description: string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ title, description }) => {
  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
