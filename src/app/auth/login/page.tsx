'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/app/auth/hooks/use-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get('next') ?? '/';
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'ORGANIZER') router.push('/dashboard');
      else router.push(next);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 text-black">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-black mb-6">Sign in to your account</p>

          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type="submit" className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white">Login</Button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account? <span className="text-green-800 font-medium cursor-pointer" onClick={() => router.push(`/auth/register/customer-register?next=${encodeURIComponent(next)}`)}>Register</span>
          </p>
        </form>
      </div>

      {/* Right marketing panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-green-800 to-teal-900 text-white flex-col justify-center items-center p-8 rounded-xl">
        <h1 className="text-4xl font-semibold mb-4">Find Your Perfect Event</h1>
        <p className="text-lg">Secure, fast, and simple transactions at your fingertips today.</p>
        <div className="backdrop-blur-md bg-white/10 mt-6 rounded-2xl p-4 w-72 shadow-xl">
          <p className="text-sm opacity-80">Combined Balance</p>
          <p className="text-xl font-bold">$12,347.23</p>
        </div>
      </div>
    </div>
  );
}