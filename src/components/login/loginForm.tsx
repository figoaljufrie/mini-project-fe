"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/auth/store/auth-store";

export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get("next") ?? "/";

  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // login() now returns { user, accessToken }
      const { user } = await login(email, password);

      // Redirect based on role
      if (user?.role?.toUpperCase() === "ORGANIZER") {
        router.push("/dashboard/home");
      } else {
        router.push(next);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
      <p className="text-black mb-6">Sign in to your account</p>

      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <p className="text-center text-gray-500 text-sm mt-4">
        Dont have an account?{" "}
        <span
          className="text-green-800 font-medium cursor-pointer"
          onClick={() =>
            router.push(
              `/auth/customer/register?next=${encodeURIComponent(next)}`
            )
          }
        >
          Register
        </span>
        <p className="text-center text-gray-500 text-sm mt-2">
          Forgot Password?
          <span
            className="text-green-800 font-medium cursor-pointer"
            onClick={() => router.push("/auth/forgot-password")}
          >
            Click Here!
          </span>
        </p>
      </p>
    </form>
  );
}
