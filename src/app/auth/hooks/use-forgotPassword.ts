// src/app/auth/hooks/useForgotPassword.ts
import { useState } from "react";
import * as authService from "@/app/auth/services/auth/authService";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sendResetEmail = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await authService.forgotPassword(email);
      setSuccess(res.data?.message || "Reset email sent successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to send reset email");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendResetEmail, loading, error, success };
};