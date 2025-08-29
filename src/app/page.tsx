"use client";
import { useState } from "react";
import EventSlide from "@/components/landing-page/event-slide";
import EventList from "@/components/landing-page/event-list";
import TopEvents from "@/components/landing-page/top-events";
import Navbar from "@/components/landing-page/navbar";
import CategoryList from "@/components/landing-page/category-list";
import InformationSection from "@/components/landing-page/information-section";
import Footer from "@/components/landing-page/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Section navbar */}
      <Navbar />

      {/* Bagian Event Slide */}
      <section className="mb-10">
        <EventSlide />
      </section>

      {/* Section daftar highlight event */}
      <EventList />

      {/* Section Top Events */}
      <TopEvents />

      {/* Section kategori event */}
      <CategoryList />

      {/* Section informasi */}
      <InformationSection />

      {/* Section footer */}
      <Footer />
    </main>
  );
}
