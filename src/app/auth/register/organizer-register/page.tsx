"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/app/auth/hooks/use-register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterOrganizerPage() {
  const router = useRouter();
  const { registerOrganizer } = useRegister();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerOrganizer(form);
      router.push("/auth/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-teal-900">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl 
                   bg-white/10 backdrop-blur-md border border-white/20"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Organizer Sign Up
        </h2>

        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          className="mb-3"
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="mb-3"
        />
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          className="mb-3"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          className="mb-5"
        />

        <Button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
        >
          Create Organizer Account
        </Button>

        {error && (
          <p className="text-sm text-red-400 mt-3 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
