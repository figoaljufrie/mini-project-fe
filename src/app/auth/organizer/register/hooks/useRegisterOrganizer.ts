// /app/auth/hooks/useRegisterOrganizer.ts
import { useState } from "react";
import * as authService from "@/app/auth/organizer/register/services/registerOrganizerService";
import { OrganizerRegisterData } from "@/app/auth/organizer/register/services/registerOrganizerService";

export const useRegisterOrganizer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerOrganizer = async (data: OrganizerRegisterData) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.registerOrganizer(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerOrganizer, loading, error };
};
