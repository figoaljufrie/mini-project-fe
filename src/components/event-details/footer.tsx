"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedInIcon, 
  YouTubeIcon 
} from "@/components/ui/social-icons";

function ExampleAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>FAQ 1</AccordionTrigger>
        <AccordionContent>
          Jawaban untuk FAQ pertama.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>FAQ 2</AccordionTrigger>
        <AccordionContent>
          Jawaban untuk FAQ kedua.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export { ExampleAccordion };

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      facebook: 'https://facebook.com/eventfinder',
      twitter: 'https://twitter.com/eventfinder',
      instagram: 'https://instagram.com/eventfinder',
      linkedin: 'https://linkedin.com/company/eventfinder',
      youtube: 'https://youtube.com/eventfinder'
    };
    
    const link = socialLinks[platform as keyof typeof socialLinks];
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <footer className="footer">
      {/* Desktop View */}
      <div className="footer-desktop">
        {/* Left Column */}
        <div className="footer-column">
          <h4 className="footer-column-title">Tentang EventFinder</h4>
          <a href="#" className="footer-link">Masuk</a>
          <a href="#" className="footer-link">Biaya</a>
          <a href="#" className="footer-link">Jelajah</a>
          <a href="#" className="footer-link">Panduan</a>
          <a href="#" className="footer-link">Syarat dan Ketentuan</a>
          <a href="#" className="footer-link">Kebijakan Privasi</a>
        </div>

        {/* Middle Column */}
        <div className="footer-column">
          <h4 className="footer-column-title">Rayakan Eventmu</h4>
          <a href="#" className="footer-link">Cara Mempersiapkan Event</a>
          <a href="#" className="footer-link">Cara Membuat Event Lomba</a>
          <a href="#" className="footer-link">Cara Mempublikasikan Event</a>
          <a href="#" className="footer-link">Cara Membuat Event Musik</a>
          <a href="#" className="footer-link">Cara Mengelola Event</a>
          <a href="#" className="footer-link">Cara Membuat Konsep Menarik</a>
        </div>

        {/* Right Column */}
        <div className="footer-column">
          <h4 className="footer-column-title">Lokasi Event</h4>
          <a href="#" className="footer-link">Jakarta</a>
          <a href="#" className="footer-link">Bandung</a>
          <a href="#" className="footer-link">Yogyakarta</a>
          <a href="#" className="footer-link">Surabaya</a>
          <a href="#" className="footer-link">Medan</a>
          <a href="#" className="footer-link">Semua Kota</a>
        </div>
      </div>

      {/* Mobile View - Accordion */}
      <div className="footer-mobile">
        <Accordion type="single" collapsible>
          {/* Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="footer-accordion-trigger">
              Tentang EventFinder
            </AccordionTrigger>
            <AccordionContent className="footer-accordion-content">
              <a href="#" className="footer-link">Masuk</a>
              <a href="#" className="footer-link">Biaya</a>
              <a href="#" className="footer-link">Jelajah</a>
              <a href="#" className="footer-link">Panduan</a>
              <a href="#" className="footer-link">Syarat dan Ketentuan</a>
              <a href="#" className="footer-link">Kebijakan Privasi</a>
            </AccordionContent>
          </AccordionItem>

          {/* Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="footer-accordion-trigger">
              Rayakan Eventmu
            </AccordionTrigger>
            <AccordionContent className="footer-accordion-content">
              <a href="#" className="footer-link">Cara Mempersiapkan Event</a>
              <a href="#" className="footer-link">Cara Membuat Event Lomba</a>
              <a href="#" className="footer-link">Cara Mempublikasikan Event</a>
              <a href="#" className="footer-link">Cara Membuat Event Musik</a>
              <a href="#" className="footer-link">Cara Mengelola Event</a>
              <a href="#" className="footer-link">Cara Membuat Konsep Menarik</a>
            </AccordionContent>
          </AccordionItem>

          {/* Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="footer-accordion-trigger">
              Lokasi Event
            </AccordionTrigger>
            <AccordionContent className="footer-accordion-content">
              <a href="#" className="footer-link">Jakarta</a>
              <a href="#" className="footer-link">Bandung</a>
              <a href="#" className="footer-link">Yogyakarta</a>
              <a href="#" className="footer-link">Surabaya</a>
              <a href="#" className="footer-link">Medan</a>
              <a href="#" className="footer-link">Semua Kota</a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Middle Section */}
      <div className="footer-social">
        <h3 className="footer-social-title">Ikuti Kami di Social Media</h3>
        <div className="footer-social-icons">
          <FacebookIcon 
            size={28} 
            className="social-icon" 
            onClick={() => handleSocialClick('facebook')}
          />
          <TwitterIcon 
            size={28} 
            className="social-icon" 
            onClick={() => handleSocialClick('twitter')}
          />
          <InstagramIcon 
            size={28} 
            className="social-icon" 
            onClick={() => handleSocialClick('instagram')}
          />
          <LinkedInIcon 
            size={28} 
            className="social-icon" 
            onClick={() => handleSocialClick('linkedin')}
          />
          <YouTubeIcon 
            size={28} 
            className="social-icon" 
            onClick={() => handleSocialClick('youtube')}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-bottom-links">
          Tentang Kami • Blog • Kebijakan Privasi • Kebijakan Cookies • Hubungi Kami
        </p>
        <p className="footer-bottom-copyright">© 2025 EventFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}