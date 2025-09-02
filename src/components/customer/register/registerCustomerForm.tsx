"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterCustomer } from "@/app/auth/customer/register/hooks/useRegisterCustomer";

export default function RegisterCustomerForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get("next") ?? "/";

  const { registerCustomer, loading, error } = useRegisterCustomer();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    referralCode: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerCustomer(form);
      router.push(`/auth/login?next=${encodeURIComponent(next)}`);
    } catch (err) {
      // error state already handled in hook
    }
  };

  const handleOrganizerRegister = () => {
    router.push(`${window.location.origin}/auth/organizer/register`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4"
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
      <p className="text-black mb-6">Welcome! Let's create your account.</p>

      <Input name="name" placeholder="Full Name" value={form.name} onChange={onChange} />
      <Input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <Input name="username" placeholder="Username" value={form.username} onChange={onChange} />
      <Input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <Input name="referralCode" placeholder="Referral Code (optional)" value={form.referralCode} onChange={onChange} />

      <Button type="submit" className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* Added sentence for organizer registration INSIDE the card */}
      <p className="mt-4 text-sm text-gray-700">
        Want to create your own event?{" "}
        <span
          onClick={handleOrganizerRegister}
          className="text-teal-600 font-semibold cursor-pointer hover:underline"
        >
          Register as organizer!
        </span>
      </p>
    </form>
  );
}