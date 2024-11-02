import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { User } from '@/types/types';

const fetchUser = async (): Promise<User> => {
  const token: string | null = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token available');
  }

  const response: AxiosResponse<User> = await axios.get('/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!localStorage.getItem('authToken'),
    staleTime: 300000,
    retry: false,
  });
};
