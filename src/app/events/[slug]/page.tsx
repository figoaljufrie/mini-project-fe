import Navbar from "@/components/event-details/navbar";
import Footer from "@/components/event-details/footer";
import { useMemo } from "react";
import { events } from "@/lib/data";
import Link from "next/link";
import EventDetailsClient from "./event-details-client";

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = useMemo(() => {
    return events.find((e) => slugify(e.title) === slug);
  }, [slug]);

  if (!event) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
        <h1 className="text-2xl font-bold">Event tidak ditemukan</h1>
        <Link href="/event-browsing" className="event-list-button">Kembali ke daftar event</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <EventDetailsClient event={event} />

      <Footer />
    </main>
  );
}

