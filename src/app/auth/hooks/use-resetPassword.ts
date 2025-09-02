// src/app/auth/hooks/useResetPassword.ts
import { useState } from "react";
import * as authService from "@/app/auth/services/auth/authService";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await authService.resetPassword(token, password);
      setSuccess(res.data?.message || "Password reset successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to reset password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};