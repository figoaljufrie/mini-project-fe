// src/app/dashboard/settings/password/hooks/usePassword.ts
import { useState, useCallback } from "react";
import { updatePassword as updatePasswordService, UpdatePasswordPayload } from "@/app/auth/services/auth/authService";
import { useAuthStore } from "@/app/auth/store/auth-store";

export function usePassword() {
  const { token } = useAuthStore(); // token is already set in api instance
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updatePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!token) {
        setError("User not authenticated");
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const payload: UpdatePasswordPayload = { currentPassword, newPassword };
        const result = await updatePasswordService(payload);

        setSuccess(result.message); // <-- now valid
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to update password");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { loading, error, success, updatePassword };
}