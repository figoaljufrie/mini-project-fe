import { useState, useEffect, useCallback } from "react";
import { getMe, updateProfile } from "@/app/auth/services/auth/authService";
import { useAuthStore } from "@/app/auth/store/auth-store";
import type { User } from "@/app/types/users/user";

export function useProfile() {
  const { token, hydrated } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const profile = await getMe();
      setUser(profile);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const updateUser = useCallback(
    async (data: { name?: string; username?: string }) => {
      if (!user) throw new Error("User not loaded");
      setLoading(true);
      setError(null);
      try {
        const updated = await updateProfile(user.id, data);
        setUser(updated);
        return updated;
      } catch (err: any) {
        setError(err.message || "Failed to update profile");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    if (hydrated) {
      fetchUser();
    }
  }, [hydrated, fetchUser]);

  return { user, loading, error, fetchUser, updateUser };
}