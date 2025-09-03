// src/app/auth/services/auth/auth.ts
import api, { setAuthToken } from "@/lib/api/api";
import type { User } from "@/app/types/users/user";

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

// Login -> returns { user, accessToken }
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  const { accessToken, user } = res.data.data;

  // Store token locally and set axios header
  localStorage.setItem("token", accessToken);
  setAuthToken(accessToken);

  return { user, accessToken };
};

// Current user
export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

// Update profile
export const updateProfile = async (
  id: number,
  data: { name?: string; username?: string }
): Promise<User> => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data.data;
};

// Update password
export const updatePassword = async (
  payload: UpdatePasswordPayload
): Promise<UpdatePasswordResponse> => {
  const res = await api.patch("/auth/update-password", payload);
  return res.data.data;
};

// Register customer
export const registerCustomer = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/register/customer", data);
  return res.data.data;
};

// Register organizer
export const registerOrganizer = async (data: {
  name: string;
  email: string;
  username: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/register/organizer", data);
  return res.data.data;
};

// Forgot password
export async function forgotPassword(email: string) {
  return api.post("/auth/forgot-password", { email });
}

// Reset password
export async function resetPassword(token: string, password: string) {
  return api.patch(
    "/auth/reset-password",
    { password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// Logout
export async function logout() {
  localStorage.removeItem("token");
  setAuthToken(undefined);
  return api.post("/auth/logout");
}

export const updateAvatar = async (id: number, file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.put(`/${id}/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};
