import api, { setAuthToken } from "@/lib/api/api";
import type { User } from "@/app/types/users/user";

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// login -> returns { user, accessToken }
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  const { accessToken, user } = res.data.data;

  // Store token and set axios header
  localStorage.setItem("token", accessToken);
  setAuthToken(accessToken);

  return { user, accessToken };
};

// current user
export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data.data; // make sure backend returns data.data
};

export const updateProfile = async (
  id: number,
  data: { name?: string; username?: string }
): Promise<User> => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data.data;
};

// Register endpoints
export const registerCustomer = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/register/customer", data);
  return res.data.data;
};

export const registerOrganizer = async (data: {
  name: string;
  email: string;
  username: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/register/organizer", data);
  return res.data.data;
};

export async function forgotPassword(email: string) {
  return api.post("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, password: string) {
  return api.patch(
    "/auth/reset-password",
    { password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// src/app/auth/services/auth/auth.ts
export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export const updatePassword = async (
  payload: UpdatePasswordPayload
): Promise<UpdatePasswordResponse> => {
  const res = await api.patch("/auth/update-password", payload);
  return res.data.data; // backend returns { message: string } inside data
};

export async function logout() {
  localStorage.removeItem("token");
  setAuthToken(undefined);
  return api.post("/auth/logout");
}