// /components/register/OrganizerForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterOrganizer } from "@/app/auth/organizer/register/hooks/useRegisterOrganizer";

export default function OrganizerForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get("next") ?? "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const { registerOrganizer, loading, error } = useRegisterOrganizer();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerOrganizer(form);
      router.push(`/auth/login?next=${encodeURIComponent(next)}`);
    } catch (_) {}
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4" noValidate>
      <h2 className="text-2xl font-bold text-gray-900">Become an Organizer</h2>
      <p className="text-black mb-6">Create your organizer account and start hosting events today.</p>

      <Input name="name" placeholder="Full Name" value={form.name} onChange={onChange} required />
      <Input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <Input name="username" placeholder="Username" value={form.username} onChange={onChange} required />
      <Input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />

      <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        {loading ? "Registering..." : "Register as Organizer"}
      </Button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <p className="text-center text-gray-500 text-sm mt-4">
        Already an organizer?{" "}
        <span
          className="text-indigo-700 font-medium cursor-pointer"
          onClick={() => router.push(`/auth/login?next=${encodeURIComponent(next)}`)}
        >
          Log in
        </span>
      </p>
    </form>
  );
}