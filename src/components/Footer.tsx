import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Heart, Mail, Phone, MapPin, ArrowRight,
  ArrowUp, MessageCircle, PhoneCall
} from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from './icons/SocialIcons';

interface FooterProps {
  onOpenVolunteer: () => void;
  onOpenEnquiry: () => void;
  onOpenSitemap: () => void;
}

export default function Footer({
  onOpenVolunteer,
  onOpenEnquiry,
  onOpenSitemap
}: FooterProps) {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#0E3B36] text-white mt-0 w-full relative z-20 border-t border-[#164E48]">
        {/* Emergency Contact Bar (Deep Dusk Strip) */}
        <div className="border-b border-white/10 bg-[#072421]">
          <div className="section-container py-3.5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#E8A23A]/20 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 text-[#E8A23A]" />
                </div>
                <div>
                  <span className="text-white/60 text-xs font-medium">24/7 Cancer Care Helpline:</span>
                  <a href="tel:+911140559200" className="ml-2 font-bold text-white hover:text-[#E8A23A] transition-colors">
                    +91 11 4055 9200
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Helpline Active 24/7 Across All Indian States & UTs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="section-container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* Column 1: Brand & Mission (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/brand-logo.jpeg"
                  alt="Cancer Aware Bharat Logo"
                  className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-md"
                />
                <div>
                  <span className="font-serif text-xl font-bold text-white block leading-tight">
                    Cancer Aware Bharat
                  </span>
                  <span className="font-serif-hindi text-[11px] text-[#E8A23A] tracking-wide">जीवन की नई किरण • राष्ट्रीय अभियान</span>
                </div>
              </div>
              <p className="text-sm text-white/75 leading-relaxed max-w-sm font-light">
                Dedicated to grassroots oncological awareness, free early detection screening camps, specialist patient navigation, and connecting families with trusted cancer care institutions across India.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2.5 pt-2">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(social => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E8A23A] hover:text-[#1B2620] flex items-center justify-center text-white/75 transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-serif font-bold text-sm text-[#E8A23A] mb-4 tracking-wide uppercase">Navigation</h4>
              <div className="space-y-2.5">
                {[
                  { label: 'Home', action: () => navigate('/') },
                  { label: 'About Us', action: () => navigate('/about') },
                  { label: 'Our Mission', action: () => navigate('/mission') },
                  { label: 'Screening Camps', action: () => navigate('/events') },
                  { label: 'Health Centres', action: () => navigate('/hospitals') },
                  { label: 'Blogs & Articles', action: () => navigate('/blogs') },
                  { label: 'Photo Gallery', action: () => navigate('/gallery') },
                ].map(link => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="block text-sm text-white/80 hover:text-[#E8A23A] transition-colors cursor-pointer text-left group"
                  >
                    <span className="group-hover:ml-1 transition-all duration-200">{link.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Contact & Get In Touch (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#E8A23A] mb-4 tracking-wide uppercase">Helpline & Care</h4>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E8A23A] shrink-0 mt-0.5" />
                  <span className="font-light">National Partner Hospital Network & Delhi Outreach Support Centre</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#E8A23A] shrink-0" />
                  <a href="tel:+911140559200" className="hover:text-[#E8A23A] transition-colors">+91 11 4055 9200 / +91-9120110286</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E8A23A] shrink-0" />
                  <a href="mailto:info@awarebharat.org" className="hover:text-[#E8A23A] transition-colors">info@awarebharat.org</a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="btn-marigold w-full !py-2.5 text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
                >
                  Book Free Consultation
                </button>
                <button
                  onClick={() => onOpenVolunteer()}
                  className="w-full py-2.5 px-4 rounded-full border border-white/30 text-white font-semibold text-xs hover:bg-white/10 transition-colors cursor-pointer text-center"
                >
                  Become A Volunteer
                </button>
              </div>
            </div>

            {/* Column 4: Map Location Embed (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#E8A23A] mb-2 tracking-wide uppercase">Partner Centre Location</h4>
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-md h-[180px] bg-[#072421]">
                <iframe
                  title="Partner Centre Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.917390358686!2d82.96418637431428!3d25.306979427247338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2d8bb6a15bdf%3A0xc82280d2e5ad4e7b!2sChakrapadi%20cancer%20%26%20multispeciality%20hospital!5e0!3m2!1sen!2sin!4v1765611105376!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-[11px] text-white/60 text-center font-light">
                National Referral & Partner Centre Network
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Dusk Strip */}
        <div className="border-t border-white/10 bg-[#072421]">
          <div className="section-container py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
              <p>© {new Date().getFullYear()} Cancer Aware Bharat. All Rights Reserved. A Grassroots Oncological Support Initiative.</p>
              <div className="flex items-center gap-4">
                <button onClick={() => onOpenSitemap()} className="hover:text-white transition-colors cursor-pointer">Sitemap</button>
                <span>•</span>
                <button onClick={() => navigate('/hospital/login')} className="hover:text-white transition-colors cursor-pointer">Hospital Login</button>
                <span>•</span>
                <button onClick={() => navigate('/volunteer/login')} className="hover:text-white transition-colors cursor-pointer">Volunteer Portal</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Contact Widgets ── */}
      {/* 1. Emergency Helpline (Bottom Left) */}
      <div className="fixed bottom-6 left-5 z-40 hidden sm:flex flex-col items-center group">
        <a
          href="tel:+911140559200"
          aria-label="Call Emergency Helpline"
          title="24/7 Cancer Care Helpline"
          className="w-13 h-13 rounded-full bg-[#0E3B36] border-2 border-[#E8A23A] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(14,59,54,0.4)] hover:scale-110 hover:shadow-[0_12px_30px_rgba(232,162,58,0.4)] transition-all duration-300"
        >
          <Phone className="w-5 h-5 text-[#E8A23A]" />
        </a>
      </div>

      {/* 2. WhatsApp Support (Bottom Left, above phone) */}
      <div className="fixed bottom-22 left-5 z-40 hidden sm:flex flex-col items-center group">
        <a
          href="https://wa.me/919120110286"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp Support"
          className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 fill-current text-white" />
        </a>
      </div>

      {/* 3. Back to Top (Bottom Right) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          title="Back to Top"
          className="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-[#0E3B36] text-white border border-white/20 flex items-center justify-center shadow-lg hover:bg-[#E8A23A] hover:text-[#1B2620] transition-all duration-300 hover:scale-110 cursor-pointer animate-fade-in"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
