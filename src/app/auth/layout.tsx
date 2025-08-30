// src/app/auth/layout.tsx
import { ReactNode } from "react";
import { AuthProvider } from "./context/auth-context";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}