"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRegister } from '@/app/auth/hooks/use-register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterCustomerPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get('next') ?? '/';
  const { registerCustomer } = useRegister();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '', referralCode: '' });
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerCustomer(form);
      router.push(`/auth/login?next=${encodeURIComponent(next)}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 text-black">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
          <p className="text-black mb-6">Welcome! Lets create your account.</p>

          <Input name="name" placeholder="Full Name" value={form.name} onChange={onChange} />
          <Input name="email" placeholder="Email" value={form.email} onChange={onChange} />
          <Input name="username" placeholder="Username" value={form.username} onChange={onChange} />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
          <Input name="referralCode" placeholder="Referral Code (optional)" value={form.referralCode} onChange={onChange} />

          <Button type="submit" className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white">Register</Button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account? <span className="text-green-800 font-medium cursor-pointer" onClick={() => router.push(`/auth/login?next=${encodeURIComponent(next)}`)}>Log in</span>
          </p>
        </form>
      </div>

      {/* Right marketing panel */}
      <div className="hidden md:flex w-3/3 bg-gradient-to-tr from-green-800 to-teal-900 text-white flex-col justify-center items-center p-8 rounded-xl">
        <h1 className="text-4xl font-semibold mb-4">Search For The Event Of Your Life</h1>
        <p className="text-lg">Secure, fast, and simple transactions at your fingertips today.</p>
        {/* Optional card mockup */}
        <div className="backdrop-blur-md bg-white/10 mt-6 rounded-2xl p-4 w-72 shadow-xl">
          <p className="text-sm opacity-80">Combined Balance</p>
          <p className="text-xl font-bold">$12,347.23</p>
        </div>
      </div>
    </div>
  );
}