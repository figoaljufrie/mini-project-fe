// src/app/auth/hooks/use-avatar.ts
import { useState } from "react";
import { updateAvatar } from "@/app/auth/services/auth/authService";
import type { User } from "@/app/types/users/user";

export function useAvatar(userId: number | null, onSuccess?: (user: User) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File) => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const updated = await updateAvatar(userId, file);
      onSuccess?.(updated); // delegate update back to whoever uses it
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  return { uploadAvatar, loading, error };
}