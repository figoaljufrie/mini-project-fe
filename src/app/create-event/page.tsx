"use client";

import React, { useEffect } from 'react';
import CreateEventForm from '@/app/create-event/components/CreateEventForm';
import { Event } from '@/app/types/event/event';
import { useEventStore } from '@/app/create-event/stores/EventStore';
import { useAuthStore } from '@/app/auth/store/auth-store';

const CreateEventPage: React.FC = () => {
  const { 
    createNewEvent, 
    loading, 
    error, 
    success, 
    successMessage, 
    clearMessages,
    setCurrentEvent 
  } = useEventStore();
  
  const { user } = useAuthStore();

  // Clear messages when component mounts
  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  // Check if user is organizer
  useEffect(() => {
    if (user && user.role !== 'ORGANIZER') {
      // Redirect non-organizers
      window.location.href = '/dashboard';
    }
  }, [user]);

  const handleSuccess = async (event: Event) => {
    console.log('Event created successfully:', event);
    
    // Set current event for potential use
    setCurrentEvent(event);
    
    // Show success message
    setTimeout(() => {
      // Redirect to organizer events page after 2 seconds
      window.location.href = '/organizer/events';
    }, 2000);
  };

  const handleCancel = () => {
    // Clear any messages
    clearMessages();
    
    // Redirect back to dashboard
    window.location.href = '/organizer/dashboard';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Kembali ke Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show success state
  if (success && successMessage) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Berhasil Dibuat!</h2>
                <p className="text-gray-600 mb-6">{successMessage}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Anda akan diarahkan ke halaman events dalam beberapa detik...
                </p>
                <button
                  onClick={() => window.location.href = '/organizer/events'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Lihat Events Saya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800">Buat Event Baru</h1>
          <p className="text-gray-600 mt-2">
            Isi form di bawah ini untuk membuat event baru
          </p>
        </div>

        <CreateEventForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateEventPage;

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Navbar from "@/components/landing-page/navbar";
// import Footer from "@/components/landing-page/footer";

// export default function BuatEventPage() {
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [locations, setLocations] = useState<string[]>([]);
//   const [newLocation, setNewLocation] = useState("");
//   const [price, setPrice] = useState<number | "">("");
//   const [category, setCategory] = useState("Musik");
//   const [description, setDescription] = useState("");
//   const [thumbnailName, setThumbnailName] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const summary = [
//       `Judul: ${title}`,
//       `Kategori: ${category}`,
//       `Lokasi: ${locations.join(", ") || "-"}`,
//       `Rentang Tanggal: ${startDate || "-"} s/d ${endDate || "-"}`,
//       `Waktu: ${startTime || "-"} - ${endTime || "-"}`,
//       `Harga: ${price || "-"}`,
//       `Thumbnail: ${thumbnailName || "-"}`,
//       `Deskripsi: ${description ? description.slice(0, 80) + (description.length > 80 ? "..." : "") : "-"}`,
//     ].join("\n");
//     alert(`Event disimpan (mock)\n\n${summary}`);
//   };

//   const addLocation = () => {
//     if (!newLocation.trim()) return;
//     if (!locations.includes(newLocation.trim())) {
//       setLocations([...locations, newLocation.trim()]);
//     }
//     setNewLocation("");
//   };

//   return (
//     <main className="min-h-screen bg-black text-white">
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold">Create Event</h1>
//           <Link href="/event-browsing" className="text-sm text-gray-300 hover:underline">Lihat semua event</Link>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 md:p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left: Form fields */}
//             <div className="lg:col-span-2 space-y-5">
//               <div>
//                 <label className="block text-sm mb-1">Title<span className="text-red-500"> *</span></label>
//                 <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm mb-1">Category<span className="text-red-500"> *</span></label>
//                   <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0">
//                     <option>Musik</option>
//                     <option>Teknologi</option>
//                     <option>Hiburan</option>
//                     <option>Seni</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm mb-1">Locations<span className="text-red-500"> *</span></label>
//                   <div className="flex gap-2">
//                     <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Tambah lokasi" className="flex-1 rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" />
//                     <button type="button" onClick={addLocation} className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition">Add</button>
//                   </div>
//                   {locations.length > 0 && (
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {locations.map((loc) => (
//                         <span key={loc} className="px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs">{loc}</span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm mb-1">Select date range<span className="text-red-500"> *</span></label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
//                   <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm mb-1">Start time<span className="text-red-500"> *</span></label>
//                   <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
//                 </div>
//                 <div>
//                   <label className="block text-sm mb-1">End time<span className="text-red-500"> *</span></label>
//                   <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm mb-1">Harga (Rp)</label>
//                   <input type="number" min={0} value={price as number | undefined} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" />
//                 </div>
//               </div>
//             </div>

//             {/* Right: Thumbnail & Description */}
//             <div className="space-y-5">
//               <div>
//                 <label className="block text-sm mb-2">Thumbnail<span className="text-red-500"> *</span></label>
//                 <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-700 bg-black/60 p-6 text-center hover:border-purple-500 transition">
//                   <input type="file" accept="image/*" className="hidden" onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     setThumbnailName(file ? file.name : null);
//                   }} />
//                   <div className="space-y-2">
//                     <div className="text-sm text-gray-300">Upload files</div>
//                     <div className="text-xs text-gray-500">{thumbnailName ? thumbnailName : "0 files uploaded so far."}</div>
//                   </div>
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm mb-2">Description<span className="text-red-500"> *</span></label>
//                 {/* Simple toolbar (visual) */}
//                 <div className="flex items-center gap-2 bg-black border border-gray-700 rounded-t-xl px-3 py-2 text-sm">
//                   <select className="bg-transparent outline-none">
//                     <option>Heading 1</option>
//                     <option>Heading 2</option>
//                     <option>Paragraph</option>
//                   </select>
//                   <div className="h-4 w-px bg-gray-700" />
//                   <button type="button" className="px-2 py-1 rounded border border-gray-700 hover:border-purple-500">B</button>
//                   <button type="button" className="px-2 py-1 rounded border border-gray-700 hover:border-purple-500">I</button>
//                   <button type="button" className="px-2 py-1 rounded border border-gray-700 hover:border-purple-500">•</button>
//                 </div>
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-[180px] rounded-b-xl bg-black border border-t-0 border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" placeholder="Tulis deskripsi event..." required />
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end">
//             <button type="submit" className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition transform hover:scale-[1.02] focus:outline-none bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-800/20">
//               <span className="relative z-10">Simpan Event</span>
//               <span className="absolute inset-0 rounded-xl blur opacity-30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse" />
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </main>
//   );
// }


