"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/app/auth/hooks/use-forgotPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { sendResetEmail, loading, error, success } = useForgotPassword();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetEmail(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
        <p className="text-gray-700 mb-4">
          Enter your email to receive a password reset link.
        </p>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
}
