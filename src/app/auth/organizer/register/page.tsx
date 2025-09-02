// /app/auth/organizer/page.tsx
"use client";

import OrganizerForm from "@/components/organizer/register/registerForm";

export default function OrganizerPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 text-black">
        <OrganizerForm />
      </div>

      {/* Right Marketing Panel */}
      <div className="hidden md:flex w-3/3 bg-gradient-to-tr from-green-800 to-teal-900 text-white flex-col justify-center items-center p-8 rounded-xl">
        <h1 className="text-4xl font-semibold mb-4">Host Unforgettable Events</h1>
        <p className="text-lg">Empower your audience with seamless event management tools.</p>
        <div className="backdrop-blur-md bg-white/10 mt-6 rounded-2xl p-4 w-72 shadow-xl">
          <p className="text-sm opacity-80">Upcoming Events</p>
          <p className="text-xl font-bold">12 Active Listings</p>
        </div>
      </div>
    </div>
  );
}