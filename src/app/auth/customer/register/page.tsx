// auth/customer/register/page.tsx
import RegisterCustomerForm from "@/components/customer/register/registerCustomerForm";

export default function RegisterCustomerPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 text-black">
        <RegisterCustomerForm />
      </div>

      {/* Right Marketing Panel */}
      <div className="hidden md:flex w-3/3 bg-gradient-to-tr from-green-800 to-teal-900 text-white flex-col justify-center items-center p-8 rounded-xl">
        <h1 className="text-4xl font-semibold mb-4">Search For The Event Of Your Life</h1>
        <p className="text-lg">Secure, fast, and simple transactions at your fingertips today.</p>
        <div className="backdrop-blur-md bg-white/10 mt-6 rounded-2xl p-4 w-72 shadow-xl">
          <p className="text-sm opacity-80">Combined Balance</p>
          <p className="text-xl font-bold">$12,347.23</p>
        </div>
      </div>
    </div>
  );
}