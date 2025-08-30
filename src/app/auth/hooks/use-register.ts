import { useAuth } from './use-auth';

export const useRegister = () => {
  const { registerCustomer, registerOrganizer } = useAuth();
  return { registerCustomer, registerOrganizer };
};