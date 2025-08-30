import { useAuth } from '@/app/auth/hooks/use-auth';

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};