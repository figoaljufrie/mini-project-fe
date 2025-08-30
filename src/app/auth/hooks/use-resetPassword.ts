import { useAuth } from './use-auth';

export const useResetPassword = () => {
  const { resetPassword } = useAuth();
  return resetPassword;
};