// auth/customer/register/hooks/useRegisterCustomer.ts
import { useState } from "react";
import * as customerService from "../services/registerCustomerService";

export const useRegisterCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerCustomer = async (data: customerService.RegisterCustomerData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await customerService.registerCustomer(data);
      return response;
    } catch (err: any) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerCustomer, loading, error };
};