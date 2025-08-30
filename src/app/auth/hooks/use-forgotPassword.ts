import { useAuth } from './use-auth';

export const useForgotPassword = () => {
  const { forgotPassword } = useAuth();
  return forgotPassword;
};