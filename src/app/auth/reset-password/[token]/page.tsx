"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/app/auth/hooks/use-resetPassword";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams(); // params: Record<string, string | string[] | undefined>
  const tokenParam = params?.token;

  // Ensure token is a string (take first element if it's an array)
  const token =
    typeof tokenParam === "string"
      ? tokenParam
      : Array.isArray(tokenParam)
      ? tokenParam[0]
      : undefined;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, loading, error, success } = useResetPassword();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid token.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      if (!error) router.push("/auth/login");
    } catch (_) {
      // error handled in hook
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-700 mb-4">Enter your new password below.</p>

        <Input
          className="text-black"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          className="text-black"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
}
