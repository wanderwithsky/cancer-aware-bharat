import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  Calendar, Heart, Award, ChevronRight, ChevronLeft, Activity, HelpCircle,
  CheckCircle2, Microscope, HeartHandshake, BookOpen, ArrowRight, Shield, Users, MapPin,
  Phone, Stethoscope, Star, Quote, ChevronDown, Mail,
  Sun, Apple, Cigarette, Dumbbell, Syringe, Search as SearchIcon, Target,
  ClipboardCheck, UserCheck, Compass, HeartPulse, Droplet, Play,
  Plus, Building, Clock, Sparkles, ShieldCheck, PhoneCall
} from 'lucide-react';
import { useEvents } from '../api/hooks';
import TeamShowcase from './TeamShowcase';
import PremiumSection from './common/PremiumSection';

/* ═══════════════════════════════════════════
   HERO SLIDES DATA (Bilingual Hindi + English)
   ═══════════════════════════════════════════ */
const CAROUSEL_SLIDES = [
  {
    image: '/hero/hero-new-1.png',
    tag: 'डॉक्टर नेटवर्क',
    titleLine1: 'विशेषज्ञ कैंसर देखभाल',
    titleLine2: 'आपके निकट',
    subtitleEn: 'Connecting patients across India with leading oncology specialists and trusted healthcare centres.',
    desc: 'भारत भर के मरीजों को प्रमुख ऑन्कोलॉजी विशेषज्ञों और विश्वसनीय स्वास्थ्य केंद्रों से जोड़ना।',
    primaryBtn: 'विशेषज्ञ खोजें',
    secondaryBtn: 'मरीज पूछताछ',
    primaryAction: 'events',
    secondaryAction: 'enquiry',
    objectPosition: 'center 20%',
    alt: 'विशेषज्ञ कैंसर देखभाल',
    dawnTheme: 'gradient-dawn-1'
  },
  {
    image: '/hero/hero-new-2.png',
    tag: 'सामुदायिक जागरूकता',
    titleLine1: 'जागरूकता से सशक्त',
    titleLine2: 'बनता भारत',
    subtitleEn: 'Comprehensive awareness and clinical education campaigns for early symptom detection.',
    desc: 'कैंसर के शुरुआती लक्षणों की पहचान के लिए व्यापक जागरूकता और शिक्षा अभियान।',
    primaryBtn: 'अभियान देखें',
    secondaryBtn: 'हमारे साथ जुड़ें',
    primaryAction: 'events',
    secondaryAction: 'volunteer',
    objectPosition: 'center 30%',
    alt: 'जागरूकता से सशक्त बनता भारत',
    dawnTheme: 'gradient-dawn-2'
  },
  {
    image: '/hero/hero-new-3.png',
    tag: 'निःशुल्क जांच शिविर',
    titleLine1: 'सुलभ कैंसर जांच',
    titleLine2: 'हर गांव और शहर में',
    subtitleEn: 'Delivering free early detection screening camps directly to rural and underserved communities.',
    desc: 'ग्रामीण और वंचित क्षेत्रों तक सीधे निःशुल्क कैंसर जांच शिविर पहुंचाना।',
    primaryBtn: 'नजदीकी कैंप खोजें',
    secondaryBtn: 'सहयोग करें',
    primaryAction: 'events',
    secondaryAction: 'volunteer',
    objectPosition: 'center 25%',
    alt: 'सुलभ कैंसर जांच',
    dawnTheme: 'gradient-dawn-3'
  },
  {
    image: '/hero/hero-new-4.jpg',
    tag: 'मरीज सहायता केंद्र',
    titleLine1: 'स्वास्थ्य और जीवन की',
    titleLine2: 'नई किरण',
    subtitleEn: 'Dedicated caseworkers and volunteers walking beside patients from diagnosis to recovery.',
    desc: 'निदान से लेकर संपूर्ण इलाज तक, हमारे समर्पित स्वयंसेवक हर कदम पर मरीजों के साथ हैं।',
    primaryBtn: 'अभी मदद पाएं',
    secondaryBtn: 'मिशन से जुड़ें',
    primaryAction: 'enquiry',
    secondaryAction: 'volunteer',
    objectPosition: 'center 20%',
    alt: 'मरीज सहायता केंद्र',
    dawnTheme: 'gradient-dawn-4'
  }
];

/* ─────────── Animated Counter (Intersection Observer) ─────────── */
function AnimatedCounter({ value, className = '' }: { value: string; className?: string }) {
  const numericStr = value.replace(/,/g, '').match(/\d+/)?.[0] || '0';
  const target = parseInt(numericStr, 10);
  const nonNumericParts = value.replace(/,/g, '').split(numericStr);
  const prefix = nonNumericParts[0] || '';
  const suffix = nonNumericParts[1] || '';
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easedProgress * target));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─────────── Section Reveal on Scroll ─────────── */
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────── FAQ Connected Item with Kantha Stitch Motif ─────────── */
function FAQItem({ q, a, isOpen, onToggle, isLast }: { q: string; a: string; isOpen: boolean; onToggle: () => void; isLast?: boolean }) {
  return (
    <div className="relative group">
      <div className={`rounded-2xl transition-all duration-300 border ${isOpen ? 'bg-white border-[#0E3B36]/30 shadow-md ring-1 ring-[#0E3B36]/10' : 'bg-white/80 border-[#D5DFD7] hover:border-[#7C9A82]'}`}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none"
          aria-expanded={isOpen}
        >
          <span className={`font-serif text-[16px] md:text-[17px] font-bold pr-4 transition-colors ${isOpen ? 'text-[#0E3B36]' : 'text-[#1B2620]'}`}>
            {q}
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#0E3B36] text-white' : 'bg-[#EEF3EF] text-[#0E3B36]'}`}>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-350 ${isOpen ? 'max-h-[350px]' : 'max-h-0'}`}>
          <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-[15px] text-[#4A5E54] leading-relaxed border-t border-[#D5DFD7]/50 pt-4">
            {a}
          </div>
        </div>
      </div>
      {!isLast && (
        <div className="hidden md:block w-px h-4 kantha-connector-v mx-auto my-1" />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DYNAMIC SCREENING CAMPS CAROUSEL (Sage -> Sindoor Capacity Bar)
   ═══════════════════════════════════════════ */
function deriveCampStatus(registered: number, capacity: number): { label: string; badgeBg: string; textCol: string } {
  if (capacity <= 0 || registered >= capacity) {
    return { label: 'Fully Booked', badgeBg: 'bg-slate-100 border-slate-300', textCol: 'text-slate-700' };
  }
  if ((capacity - registered) / capacity <= 0.2) {
    return { label: 'Almost Full', badgeBg: 'bg-[#FBEAE9] border-[#C8443C]/30', textCol: 'text-[#C8443C]' };
  }
  return { label: 'Registration Open', badgeBg: 'bg-[#EEF3EF] border-[#7C9A82]/30', textCol: 'text-[#0E3B36]' };
}

function UpcomingCampsCarousel({ onOpenEnquiry }: { onOpenEnquiry: () => void }) {
  const { events } = useEvents();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.max(0, events.length - itemsPerView + 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <PremiumSection variant="warm-1" withTopDivider="kantha">
      <RevealSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-badge">
              <Calendar className="w-3.5 h-3.5 text-[#E8A23A]" /> FREE SCREENING CAMPS
            </span>
            <h2 className="section-title text-3xl md:text-5xl">
              Upcoming Detection & Care Camps
            </h2>
            <p className="section-subtitle">
              Verified clinical camps delivering free early detection, specialist evaluation, and direct hospital navigation across Indian towns and villages.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={prevSlide}
              className="w-11 h-11 rounded-full bg-white border border-[#D5DFD7] text-[#0E3B36] flex items-center justify-center hover:bg-[#EEF3EF] hover:border-[#0E3B36] transition-all shadow-sm focus:outline-none cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-11 h-11 rounded-full bg-[#0E3B36] text-white flex items-center justify-center hover:bg-[#164E48] transition-all shadow-sm focus:outline-none cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </RevealSection>

      {/* Carousel Container */}
      <RevealSection delay={150}>
        <div 
          className="overflow-hidden mx-auto py-2 -mx-3 px-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}%))` }}
          >
            {events.map((camp) => {
              const { label: statusLabel, badgeBg, textCol } = deriveCampStatus(camp.registeredCount, camp.capacity);
              const percentFull = camp.capacity > 0 ? Math.min(100, Math.round((camp.registeredCount / camp.capacity) * 100)) : 0;
              const isUrgent = percentFull >= 80;

              return (
                <div
                  key={camp.id}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-[#D5DFD7] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 group">
                    {/* Image Header with Side-Rail Badge */}
                    <div className="relative h-48 md:h-52 overflow-hidden bg-[#EEF3EF]">
                      <img
                        src={camp.image || '/events/event-1.jpeg'}
                        alt={camp.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B36]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {/* Top Category Tag */}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E3B36] text-[11px] font-bold shadow-sm">
                          {camp.category}
                        </span>
                      </div>

                      {/* Urgency Status Tag */}
                      <div className="absolute top-3.5 right-3.5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10.5px] font-bold border ${badgeBg} ${textCol} backdrop-blur-md`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-[#0E3B36] mb-3 line-clamp-2 leading-snug group-hover:text-[#E8A23A] transition-colors">
                        {camp.title}
                      </h3>

                      {/* Structured Side-Rail Details */}
                      <div className="space-y-2 mb-4 bg-[#FAFCF8] p-3.5 rounded-2xl border border-[#D5DFD7]/60 text-xs">
                        <div className="flex items-center gap-2 text-[#4A5E54] font-medium">
                          <Calendar className="w-4 h-4 text-[#E8A23A] shrink-0" />
                          <span className="font-semibold text-[#1B2620]">{camp.date}</span>
                          <span className="text-[#7A8E83]">•</span>
                          <Clock className="w-3.5 h-3.5 text-[#7A8E83] shrink-0" />
                          <span>{camp.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#4A5E54] font-medium pt-1 border-t border-[#D5DFD7]/40">
                          <MapPin className="w-4 h-4 text-[#C8443C] shrink-0" />
                          <span className="truncate">{camp.location}</span>
                        </div>
                      </div>

                      <p className="text-[13px] text-[#4A5E54] line-clamp-2 leading-relaxed mb-6">
                        {camp.description}
                      </p>

                      <div className="mt-auto pt-2">
                        {/* Capacity Fill Meter (Sage -> Sindoor gradient based on urgency) */}
                        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                          <span className="text-[#4A5E54]">Slot Capacity</span>
                          <span className={isUrgent ? 'text-[#C8443C] font-bold' : 'text-[#0E3B36]'}>
                            {percentFull}% Full ({camp.registeredCount}/{camp.capacity})
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#EEF3EF] rounded-full overflow-hidden mb-5">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              isUrgent ? 'bg-gradient-to-r from-[#E8A23A] to-[#C8443C]' : 'bg-gradient-to-r from-[#7C9A82] to-[#0E3B36]'
                            }`}
                            style={{ width: `${percentFull}%` }}
                          />
                        </div>

                        {/* Registration CTA */}
                        <button
                          onClick={onOpenEnquiry}
                          className="w-full btn-primary !py-2.5 !text-xs md:!text-sm font-bold flex items-center justify-center gap-2"
                        >
                          <span>Register For Camp</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>
    </PremiumSection>
  );
}

/* ═══════════════════════════════════════════
   PANORAMIC FIELD GALLERY WITH TEAL VIGNETTE
   ═══════════════════════════════════════════ */
const PANORAMIC_GALLERY_DATA = [
  { id: 'g1', image: '/events/event-1.jpeg', title: 'Rural Community Outreach', location: 'Jaipur, Rajasthan', link: '/gallery' },
  { id: 'g2', image: '/events/event-2.jpeg', title: 'Women Oncology Screening', location: 'Pune, Maharashtra', link: '/gallery' },
  { id: 'g3', image: '/events/event-4.jpeg', title: 'Early Oral Health Checkup', location: 'Ahmedabad, Gujarat', link: '/gallery' },
  { id: 'g4', image: '/events/event-5.jpeg', title: 'Awareness Blood Drive', location: 'Lucknow, UP', link: '/gallery' },
  { id: 'g5', image: '/dr-ajay-kumar.jpg', title: 'Specialist Clinical Consultation', location: 'Varanasi, UP', link: '/gallery' },
];

function PanoramicGallerySection() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const scrollItems = [...PANORAMIC_GALLERY_DATA, ...PANORAMIC_GALLERY_DATA];

  return (
    <PremiumSection variant="warm-2" paddingClass="py-16 md:py-24">
      <div className="section-container relative z-10 mb-10">
        <RevealSection>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="section-badge">
                <Sparkles className="w-3.5 h-3.5 text-[#E8A23A]" /> FIELD MOMENTS
              </span>
              <h2 className="section-title text-3xl md:text-5xl">
                Moments That Bring Hope & Healing
              </h2>
              <p className="section-subtitle">
                A documentary view of grassroots screening camps, volunteer interventions, and medical consultations across India.
              </p>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="btn-secondary text-xs md:text-sm !py-2.5 !px-6 shrink-0 cursor-pointer"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </RevealSection>
      </div>

      <div className="w-full relative px-4 md:px-8 max-w-[1920px] mx-auto">
        <RevealSection delay={200}>
          <div 
            className="w-full h-[240px] md:h-[360px] lg:h-[440px] relative overflow-hidden rounded-3xl shadow-xl group/panorama border border-[#D5DFD7]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ink-Teal Vignette Overlay for unified field tone */}
            <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl shadow-[inset_0_0_60px_rgba(14,59,54,0.35)]" />
            
            <div 
              className="flex h-full w-max"
              style={{
                animation: `scrollPanorama 45s linear infinite`,
                animationPlayState: isHovered ? 'paused' : 'running'
              }}
            >
              {scrollItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`}
                  className="h-full w-[280px] md:w-[420px] lg:w-[480px] relative overflow-hidden flex-shrink-0 border-r border-white/20 group cursor-pointer"
                  onClick={() => navigate(item.link)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B36]/95 via-[#0E3B36]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 md:p-8">
                    <h3 className="font-serif text-white text-lg md:text-xl font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E8A23A]" /> {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>

      <style>{`
        @keyframes scrollPanorama {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </PremiumSection>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS CAROUSEL
   ═══════════════════════════════════════════ */
const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    image: '/dr-ajay-kumar.jpg',
    name: 'Dr. Meena Gupta',
    designation: 'Consultant Oncologist',
    organization: 'Cancer Aware Bharat Panel',
    rating: 5,
    reviewHindi: 'जांच शिविरों के माध्यम से कैंसर के शुरुआती लक्षणों को समय पर पहचानना संभव हुआ है। हर मरीज को सही दिशा और इलाज मिला।',
    review: 'The free cancer screening camp helped detect early-stage cases. Our doctors and volunteers guided patients through every step with compassion.'
  },
  {
    id: 't-2',
    image: '/dr-ajay-kumar.jpg',
    name: 'Rajesh Sharma',
    designation: 'Community Volunteer',
    organization: 'Delhi Outreach Team',
    rating: 5,
    reviewHindi: 'गांव-गांव तक जागरूकता अभियान पहुंचाना और मरीजों को अस्पतालों से जोड़ना वास्तव में एक नया जीवन देने जैसा है।',
    review: 'The grassroots awareness program in our village educated hundreds of families on early symptoms. Being part of this mission is truly fulfilling.'
  },
  {
    id: 't-3',
    image: '/dr-ajay-kumar.jpg',
    name: 'Priya Verma',
    designation: 'Patient Support Beneficiary',
    organization: 'Pune Screening Camp',
    rating: 5,
    reviewHindi: 'समय पर जांच और डॉक्टरों के सही मार्गदर्शन ने मेरे इलाज को आसान बनाया। टीम का सहयोग सराहनीय रहा।',
    review: 'Smooth coordination and accurate specialist referral. The emotional and clinical guidance was invaluable for my family.'
  }
];

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <PremiumSection variant="warm-1" withTopDivider="kantha">
      <div className="section-container relative z-10">
        <RevealSection>
          <div className="section-header">
            <span className="section-badge">
              <Heart className="w-3.5 h-3.5 text-[#E8A23A]" /> VOICES OF HOPE
            </span>
            <h2 className="section-title text-3xl md:text-5xl">
              Stories of Resilience & Care
            </h2>
            <p className="section-subtitle">
              Authentic reflections from patients, caregivers, volunteer advocates, and partnering oncologists.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <RevealSection key={item.id} delay={idx * 120}>
              <div className="h-full flex flex-col bg-white rounded-3xl p-7 md:p-8 border border-[#D5DFD7] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                {/* Marigold Star Rating & Kantha Quote Motif */}
                <div className="flex justify-between items-center mb-5">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E8A23A] text-[#E8A23A]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#7C9A82]/30" />
                </div>

                {/* Hindi Quote */}
                <p className="font-serif-hindi text-[15px] text-[#0E3B36] font-semibold leading-relaxed mb-3">
                  "{item.reviewHindi}"
                </p>

                {/* English Translation */}
                <p className="text-[13.5px] text-[#4A5E54] leading-relaxed mb-6 flex-1 font-light">
                  {item.review}
                </p>

                {/* Profile Signature */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#D5DFD7]/60 mt-auto">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#D5DFD7]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover duotone-teal" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#0E3B36] text-[15px]">{item.name}</h4>
                    <p className="text-[11.5px] text-[#7A8E83] font-medium">
                      {item.designation} • <span className="text-[#0E3B36] font-semibold">{item.organization}</span>
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </PremiumSection>
  );
}

/* ═══════════════════════════════════════════
   CATEGORIZED CANCER AWARENESS ARTICLES
   Topic badges: Sage = Prevention, Marigold = Awareness, Sindoor = Screening
   ═══════════════════════════════════════════ */
const NEWS_ARTICLES_DATA = [
  {
    id: 'news-1',
    title: 'Oral Cancer Awareness & Early Screening Signs',
    description: 'Oral oncology insights on identifying persistent ulcers and mucosal changes early when treatment success exceeds 90%.',
    image: '/events/event-1.jpeg',
    category: 'Screening',
    badgeClass: 'bg-[#FBEAE9] text-[#C8443C] border-[#C8443C]/20',
    date: '24 Oct, 2026',
    readTime: '5 min read',
    link: '/cancer-awareness'
  },
  {
    id: 'news-2',
    title: 'Cervical Cancer Prevention & Routine Pap Smears',
    description: 'Guidelines on HPV vaccination, routine screening frequency, and community preventive healthcare measures for women.',
    image: '/events/event-4.jpeg',
    category: 'Prevention',
    badgeClass: 'bg-[#EEF3EF] text-[#0E3B36] border-[#7C9A82]/30',
    date: '18 Oct, 2026',
    readTime: '4 min read',
    link: '/cancer-awareness'
  },
  {
    id: 'news-3',
    title: 'Breast Cancer Detection Protocols & Self-Exam Guide',
    description: 'Clinical self-examination steps and structured mammography protocols recommended by our oncology advisory board.',
    image: '/events/event-2.jpeg',
    category: 'Awareness',
    badgeClass: 'bg-[#FDF4E5] text-[#D58F26] border-[#E8A23A]/30',
    date: '12 Oct, 2026',
    readTime: '6 min read',
    link: '/cancer-awareness'
  }
];

function NewsArticlesSection() {
  const navigate = useNavigate();

  return (
    <PremiumSection variant="warm-2" paddingClass="py-16 md:py-24">
      <div className="section-container relative z-10">
        <RevealSection>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-badge">
                <BookOpen className="w-3.5 h-3.5 text-[#E8A23A]" /> CLINICAL KNOWLEDGE
              </span>
              <h2 className="section-title text-3xl md:text-5xl">
                Oncology Insights & Prevention Guides
              </h2>
              <p className="section-subtitle">
                Evidence-based articles reviewed by medical professionals to empower patients with knowledge.
              </p>
            </div>
            <button
              onClick={() => navigate('/blogs')}
              className="btn-secondary text-xs md:text-sm !py-2.5 !px-6 shrink-0 cursor-pointer"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {NEWS_ARTICLES_DATA.map((article, i) => (
            <RevealSection key={article.id} delay={i * 120}>
              <div 
                onClick={() => navigate(article.link)}
                className="h-full bg-white rounded-3xl overflow-hidden border border-[#D5DFD7] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF3EF]">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full border backdrop-blur-md shadow-sm ${article.badgeClass}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="font-serif text-[18px] md:text-[19px] font-bold text-[#0E3B36] mb-2.5 leading-snug group-hover:text-[#E8A23A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[13.5px] text-[#4A5E54] leading-relaxed mb-6 flex-1 font-light">
                    {article.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#D5DFD7]/60 flex items-center justify-between text-xs text-[#7A8E83]">
                    <div className="flex items-center gap-3">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <span className="font-semibold text-[#0E3B36] group-hover:text-[#E8A23A] flex items-center gap-1 transition-colors">
                      Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </PremiumSection>
  );
}

/* ═══════════════════════════════════════════
   FINAL REPRISE CTA (Sunrise Callback)
   ═══════════════════════════════════════════ */
function SunriseRepriseCtaSection({ onOpenVolunteer, onOpenEnquiry }: { onOpenVolunteer: () => void; onOpenEnquiry: () => void }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden gradient-dawn-1 text-white">
      {/* Background Soft Ray Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[15%] w-96 h-96 bg-[#E8A23A]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-[10%] w-96 h-96 bg-[#7C9A82]/15 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E8A23A] text-xs font-bold uppercase tracking-widest mb-6">
                <Sun className="w-4 h-4 text-[#E8A23A]" /> जीवन की नई किरण
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-6">
                Join India's Grassroots Movement Against Cancer
              </h2>
              
              <p className="text-white/85 text-base md:text-lg mb-8 leading-relaxed font-light max-w-xl">
                Whether you need medical guidance for a family member or wish to volunteer at a community screening camp, our dedicated network is standing by to assist you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onOpenVolunteer}
                  className="btn-marigold text-sm md:text-base !py-3.5 !px-8 cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                  <span>Become a Volunteer</span>
                </button>
                <button 
                  onClick={onOpenEnquiry}
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#E8A23A]" />
                  <span>Submit Patient Enquiry</span>
                </button>
              </div>
            </RevealSection>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <RevealSection delay={200} className="w-full max-w-[440px]">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 md:p-8 shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8A23A] block mb-2">
                  Instant Support Hotline
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  24/7 National Patient Helpline
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                  Direct phone guidance for early symptom triage, free camp registrations, and hospital navigation.
                </p>
                <a
                  href="tel:+911140559200"
                  className="w-full btn-marigold !py-3 !text-sm flex items-center justify-center gap-2 mb-3"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 11 4055 9200</span>
                </a>
                <a
                  href="https://wa.me/919120110286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp Chat Support</span>
                </a>
              </div>
            </RevealSection>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN HOMETAB COMPONENT
   ═══════════════════════════════════════════ */
interface HomeTabProps {
  onOpenVolunteer: () => void;
  onOpenEnquiry: () => void;
}

export default function HomeTab({ onOpenVolunteer, onOpenEnquiry }: HomeTabProps) {
  const navigate = useNavigate();

  // Hero carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev <= 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const slideInterval = setInterval(() => {
      handleNextSlide();
    }, 5500);
    return () => clearInterval(slideInterval);
  }, [activeSlide, isPaused]);

  const faqs = [
    { 
      q: 'Are the screening camps really free of cost?', 
      a: 'Yes, all screening camps conducted by Cancer Aware Bharat are 100% free of cost for patients. We partner with leading healthcare institutions and philanthropic organizations to cover diagnostic tests, basic pathology, mammography, and specialist consultations.' 
    },
    { 
      q: 'How do I register for an upcoming screening camp in my city?', 
      a: 'You can register online through our Patient Enquiry form, call our 24/7 Helpline (+91 11 4055 9200), or check the Screening Camps schedule on the Events page to secure an appointment slot.' 
    },
    { 
      q: 'Can I join as a volunteer without medical qualifications?', 
      a: 'Absolutely. We welcome volunteers from all backgrounds. Volunteers support camp logistics, community education, patient navigation, and registration assistance. Complete orientation and training are provided.' 
    },
    { 
      q: 'What is the patient navigation support service?', 
      a: 'When an abnormal screening result is detected, our trained patient navigators guide the family through secondary biopsies, expert second opinions, hospital appointments, and relevant government financial aid schemes (e.g. PMJAY/Ayushman Bharat).' 
    },
    { 
      q: 'Which states does Cancer Aware Bharat currently operate in?', 
      a: 'We actively run screening camps and awareness drives across Delhi-NCR, Maharashtra, Uttar Pradesh, Gujarat, Madhya Pradesh, and Karnataka, with nationwide hospital navigation coverage.' 
    },
    { 
      q: 'How can hospitals and diagnostic centres partner with the network?', 
      a: 'Institutions can register through our Hospital Partner Portal. We collaborate with healthcare facilities committed to ethical oncology practices and community health access.' 
    },
  ];

  return (
    <div className="space-y-0 bg-[#F3F6F1]">

      {/* ═══════════════════════════════════════════
          SECTION 1: THE SUNRISE ARC HERO CAROUSEL
          ═══════════════════════════════════════════ */}
      <section 
        className={`relative min-h-[620px] lg:min-h-[700px] ${CAROUSEL_SLIDES[activeSlide].dawnTheme} text-white flex flex-col justify-center overflow-hidden pt-12 pb-16 md:pb-20 transition-colors duration-1000 ease-in-out`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Dawn Light & Grid Texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E8A23A]/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7C9A82]/15 rounded-full blur-[140px]" />
        </div>

        {/* Main Hero Container: 55/45 Asymmetric Grid */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Headline & Actions (7 Cols on LG) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category Pill Deck */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {CAROUSEL_SLIDES.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                        idx === activeSlide
                          ? 'bg-[#E8A23A] text-[#1B2620] shadow-md scale-105'
                          : 'bg-white/10 hover:bg-white/20 text-white/80 border border-white/15'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${idx === activeSlide ? 'bg-[#0E3B36]' : 'bg-[#E8A23A]'}`} />
                      <span>{slide.tag}</span>
                    </button>
                  ))}
                </div>

                {/* Bilingual Main Headline: Fraunces + Tiro Devanagari */}
                <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight mb-4" key={`hero-title-${activeSlide}`}>
                  <span className="font-serif-hindi block text-white">
                    {CAROUSEL_SLIDES[activeSlide].titleLine1}
                  </span>
                  <span className="font-serif-hindi block text-[#E8A23A] mt-1">
                    {CAROUSEL_SLIDES[activeSlide].titleLine2}
                  </span>
                </h1>

                {/* English Subtitle & Hindi Description */}
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-4 max-w-2xl" key={`hero-desc-${activeSlide}`}>
                  {CAROUSEL_SLIDES[activeSlide].desc}
                </p>
                <p className="text-white/70 text-xs sm:text-sm italic leading-relaxed mb-6 max-w-xl">
                  {CAROUSEL_SLIDES[activeSlide].subtitleEn}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    14,250+ Lives Screened Free
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E8A23A]" />
                    Empaneled Specialist Hospital Network
                  </span>
                </div>
              </div>

              {/* Action Buttons & Slide Controls */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const act = CAROUSEL_SLIDES[activeSlide].primaryAction;
                      if (act === 'volunteer') onOpenVolunteer();
                      else if (act === 'enquiry') onOpenEnquiry();
                      else navigate('/events');
                    }}
                    className="btn-marigold text-xs sm:text-[14.5px] cursor-pointer"
                  >
                    <span>{CAROUSEL_SLIDES[activeSlide].primaryBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const act = CAROUSEL_SLIDES[activeSlide].secondaryAction;
                      if (act === 'enquiry') onOpenEnquiry();
                      else if (act === 'volunteer') onOpenVolunteer();
                      else navigate('/mission');
                    }}
                    className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/40 text-white font-semibold text-xs sm:text-[14.5px] transition-colors cursor-pointer"
                  >
                    {CAROUSEL_SLIDES[activeSlide].secondaryBtn}
                  </button>
                </div>

                {/* Counter & Controls */}
                <div className="flex items-center justify-end gap-3 pt-2 sm:pt-0">
                  <span className="text-xs font-mono font-bold text-white/60">
                    0{activeSlide + 1} / 0{CAROUSEL_SLIDES.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevSlide}
                      aria-label="Previous Slide"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8A23A] text-white hover:text-[#1B2620] flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      aria-label="Next Slide"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8A23A] text-white hover:text-[#1B2620] flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Visual Showcase (5 Cols on LG) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.2] bg-[#0E3B36]">
                {CAROUSEL_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                        style={{ objectPosition: slide.objectPosition || 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B36]/90 via-transparent to-transparent" />
                    </div>
                  );
                })}

                {/* Tag Overlay */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E3B36]/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8A23A]" />
                  <span>{CAROUSEL_SLIDES[activeSlide].tag}</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute inset-x-4 bottom-4 z-20 p-3.5 rounded-2xl bg-[#0E3B36]/90 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8A23A] block">
                      National Initiative
                    </span>
                    <h4 className="text-white text-xs sm:text-sm font-bold truncate">
                      {CAROUSEL_SLIDES[activeSlide].titleLine1}
                    </h4>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>

              {/* 4-Thumbnail Pill Deck */}
              <div className="grid grid-cols-4 gap-2">
                {CAROUSEL_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`relative rounded-2xl overflow-hidden aspect-[4/3] border transition-all duration-300 cursor-pointer text-left ${
                        isActive
                          ? 'border-[#E8A23A] shadow-md scale-[1.02] ring-2 ring-[#E8A23A]/50'
                          : 'border-white/15 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: slide.objectPosition || 'center' }}
                      />
                      <div className={`absolute inset-0 ${isActive ? 'bg-[#E8A23A]/10' : 'bg-black/40'}`} />
                      <div className="absolute bottom-1 inset-x-1 text-center">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          isActive ? 'bg-[#E8A23A] text-[#1B2620]' : 'bg-black/60 text-white'
                        }`}>
                          0{idx + 1}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1.1: FLOATING ACTION BAR (Soft-Elevated on Paper)
          ═══════════════════════════════════════════ */}
      <div className="relative z-30 -mt-8 md:-mt-10 mb-8 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-5 md:p-7 shadow-[0_12px_36px_rgba(14,59,54,0.08)] border border-[#D5DFD7] grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          <div className="md:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3EF] text-[#0E3B36] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 text-[#E8A23A]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C9A82] block">
                Free Patient Consultation & Triage
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#0E3B36]">
                Need Medical Guidance or Second Opinion?
              </h3>
              <p className="text-xs md:text-sm text-[#4A5E54] font-light">
                Connect with empaneled surgical oncologists and patient caseworkers.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto btn-marigold !py-3 !px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <a
              href="tel:+911140559200"
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#0E3B36] text-[#0E3B36] text-xs sm:text-sm font-semibold hover:bg-[#EEF3EF] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#0E3B36]" />
              <span>Helpline</span>
            </a>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 1.5: TRUSTED BY LOGO STRIP (Paper Band with Grayscale Hover)
          ═══════════════════════════════════════════ */}
      <section className="bg-[#F3F6F1] border-b border-[#D5DFD7]/60 py-6 overflow-hidden">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#7A8E83] mb-4">
          Trusted Institutional & Hospital Collaborations
        </p>

        <div className="relative w-full max-w-[1440px] mx-auto flex items-center">
          <div className="animate-marquee hover:[animation-play-state:paused] flex items-center w-max [animation-duration:35s]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-12 md:space-x-16 px-6 shrink-0">
                {[
                  { name: 'Apex Oncology Network', icon: Activity },
                  { name: 'National Health Foundation', icon: Shield },
                  { name: 'CareWell Cancer Centres', icon: Building },
                  { name: 'MediTech Diagnostics Panel', icon: Microscope },
                  { name: 'IMS-BHU Clinical Network', icon: Award },
                  { name: 'Global Care Foundation', icon: HeartHandshake },
                ].map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-[#7A8E83] hover:text-[#0E3B36] transition-all duration-300 cursor-pointer grayscale hover:grayscale-0"
                  >
                    <partner.icon className="w-6 h-6 shrink-0" strokeWidth={1.5} />
                    <span className="font-serif font-bold text-[15px] md:text-[17px] tracking-tight whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: IMPACT STATS (Fraunces Numerals with Underline Accent)
          ═══════════════════════════════════════════ */}
      <PremiumSection variant="warm-1" paddingClass="py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'Free Screenings', val: '14250+', icon: Microscope, desc: 'Across 6 states & UTs' },
              { label: 'Hospital Partners', val: '4', icon: Building, desc: 'Empaneled oncology centres' },
              { label: 'Screening Camps', val: '180+', icon: MapPin, desc: 'Grassroots mobile outreach' },
              { label: 'Patient Navigations', val: '1240+', icon: Compass, desc: 'Full-cycle treatment support' }
            ].map((st, i) => (
              <RevealSection key={i} delay={i * 90}>
                <div className="text-left p-5 md:p-6 bg-white rounded-3xl border border-[#D5DFD7] shadow-sm hover:border-[#7C9A82] transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-[#EEF3EF] text-[#0E3B36] flex items-center justify-center mb-3">
                    <st.icon className="w-5 h-5 text-[#E8A23A]" />
                  </div>
                  <p className="font-serif text-3xl md:text-4xl font-bold text-[#0E3B36] tracking-tight relative inline-block">
                    <AnimatedCounter value={st.val} />
                    <span className="block h-1 w-12 bg-[#E8A23A] rounded-full mt-1" />
                  </p>
                  <p className="text-sm font-bold text-[#1B2620] mt-2">{st.label}</p>
                  <p className="text-xs text-[#7A8E83] mt-0.5">{st.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </PremiumSection>

      {/* ═══════════════════════════════════════════
          SECTION 2.5: CLINICAL LEADERSHIP SPOTLIGHT
          ═══════════════════════════════════════════ */}
      <PremiumSection variant="warm-2" paddingClass="py-16 md:py-24">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Doctor Photo & Badges (5 cols) */}
            <div className="lg:col-span-5 relative">
              <RevealSection>
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#D5DFD7] bg-white group">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-[#EEF3EF]">
                    <img
                      src="/dr-ajay-kumar.jpg"
                      alt="Dr. Ajay Kumar - Senior Surgical Oncologist"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 duotone-teal"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B36]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="kantha-tag">
                      <Award className="w-3.5 h-3.5" /> Gold Medalist • IMS-BHU
                    </span>
                  </div>

                  {/* Doctor Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <p className="font-serif text-xl font-bold leading-tight">Dr. Ajay Kumar</p>
                    <p className="text-xs text-[#E8A23A] font-medium mt-0.5">Senior Surgical Oncologist • Cancer Aware Bharat Panel</p>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right Column: Bio & Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              <RevealSection delay={150}>
                <span className="section-badge">
                  <Stethoscope className="w-3.5 h-3.5 text-[#E8A23A]" /> CLINICAL MISSION LEADERSHIP
                </span>

                <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
                  Dedicated Cancer Care with Clinical Integrity
                </h2>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1B2620] bg-[#EEF3EF] px-3 py-1 rounded-full border border-[#D5DFD7]">
                    MBBS, MS, MCh (Surgical Oncology) IMS-BHU Varanasi
                  </span>
                  <span className="text-xs font-bold text-[#0E3B36] bg-[#FDF4E5] px-3 py-1 rounded-full border border-[#E8A23A]/40">
                    UP Ratna & Kashi Ratna Honored
                  </span>
                </div>

                <p className="text-[#4A5E54] text-sm sm:text-base leading-relaxed">
                  Cancer Aware Bharat unites renowned surgical oncologists, medical specialists, and compassionate healthcare workers dedicated to early detection and patient-centric oncology care. With a track record of evaluating and navigating thousands of patients, our mission ensures clinical excellence with deep human empathy.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                  {[
                    'Evidence-Based Screening Protocols',
                    'Empaneled Specialist Guidance',
                    'Direct Hospital Referral Pathways',
                    'Comprehensive Patient Navigation'
                  ].map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#1B2620] text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#7C9A82] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                  <button
                    onClick={onOpenEnquiry}
                    className="btn-primary !py-3 !px-7 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Your Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/doctors')}
                    className="btn-secondary !py-3 !px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Explore Specialist Panel</span>
                  </button>
                </div>
              </RevealSection>
            </div>

          </div>
        </div>
      </PremiumSection>

      {/* ═══════════════════════════════════════════
          SECTION 3: CORE PROGRAMS (Asymmetric 3-Column Linework)
          ═══════════════════════════════════════════ */}
      <PremiumSection variant="warm-1">
        <div className="section-container relative z-10">
          <RevealSection>
            <div className="section-header">
              <span className="section-badge">
                <Target className="w-3.5 h-3.5 text-[#E8A23A]" /> CORE INITIATIVES
              </span>
              <h2 className="section-title text-3xl md:text-5xl">
                Programs That Bridge The Healthcare Divide
              </h2>
              <p className="section-subtitle">
                From early screening to second opinions and financial scheme navigation, we ensure patients receive complete care.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Microscope,
                badge: 'Oral Oncology',
                title: 'Early Cancer Screening Camps',
                desc: 'Doctor-led clinical screening camps across rural and urban communities for early identification of Oral, Breast, and Cervical anomalies with referral pathways.',
                action: 'Book Screening'
              },
              {
                icon: HeartPulse,
                badge: 'Patient Navigation',
                title: 'Caseworker Patient Navigation',
                desc: 'Dedicated caseworkers assist families through biopsy interpretation, specialist consultations, treatment planning, and government welfare scheme enrollments.',
                action: 'Get Navigation'
              },
              {
                icon: Stethoscope,
                badge: 'Clinical Oncology',
                title: 'Specialist Second Opinions',
                desc: 'Access our panel of senior surgical oncologists for independent evaluation and treatment verification before major surgical or chemotherapy interventions.',
                action: 'Request Opinion'
              },
              {
                icon: Activity,
                badge: 'Diagnostic Pathways',
                title: 'Targeted Clinical Guidance',
                desc: 'Structured diagnostic protocols for high-risk individuals, mammography scheduling, low-dose respiratory evaluations, and histopathology correlation.',
                action: 'View Protocols'
              },
              {
                icon: BookOpen,
                badge: 'Community Outreach',
                title: 'Cancer Education & Prevention',
                desc: 'Grassroots awareness workshops, tobacco cessation drives, self-examination training, and healthy lifestyle seminars for schools and community centres.',
                action: 'Join Workshop'
              },
              {
                icon: MapPin,
                badge: 'Mobile Healthcare',
                title: 'Follow-Up Health Camps',
                desc: 'Mobile teams equipped with diagnostic tools, delivering follow-up care and specialist consultations directly to underserved districts.',
                action: 'Find Nearest Camp'
              }
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 90}>
                <div className="card-clinical h-full p-7 md:p-8 flex flex-col justify-between group cursor-pointer bg-white">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF3EF] text-[#0E3B36] flex items-center justify-center group-hover:bg-[#0E3B36] group-hover:text-white transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-[#E8A23A]" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase bg-[#EEF3EF] text-[#0E3B36]">
                        {item.badge}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-[#0E3B36] text-[19px] font-bold mb-2.5 group-hover:text-[#E8A23A] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-[13.5px] text-[#4A5E54] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-[#D5DFD7]/60 flex items-center justify-between text-[#0E3B36] group-hover:text-[#E8A23A] transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider">{item.action}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </PremiumSection>

      {/* ═══════════════════════════════════════════
          SECTION 9: UPCOMING SCREENING CAMPS CAROUSEL
          ═══════════════════════════════════════════ */}
      <UpcomingCampsCarousel onOpenEnquiry={onOpenEnquiry} />

      {/* ═══════════════════════════════════════════
          SECTION 5: PANORAMIC FIELD MOMENTS GALLERY
          ═══════════════════════════════════════════ */}
      <PanoramicGallerySection />

      {/* ═══════════════════════════════════════════
          SECTION 8: WHY CHOOSE US (Split Asymmetric Layout with Marigold Fabric Tag)
          ═══════════════════════════════════════════ */}
      <PremiumSection variant="warm-2">
        <div className="section-container relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Images (45%) */}
            <div className="w-full lg:w-[45%] relative">
              <RevealSection>
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#D5DFD7] group">
                  <img src="/events/event-1.jpeg" alt="Medical Support" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B36]/70 via-transparent to-transparent" />
                </div>

                {/* Overlapping Small Image */}
                <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-36 h-36 md:w-48 md:h-48 rounded-2xl border-4 border-white overflow-hidden shadow-lg animate-float hidden sm:block">
                  <img src="/events/event-4.jpeg" alt="Camp" className="w-full h-full object-cover" />
                </div>

                {/* Rotated Marigold Fabric Tag */}
                <div className="absolute top-8 -left-4 z-20">
                  <span className="kantha-tag">
                    <Heart className="w-3.5 h-3.5 fill-[#1B2620]" />
                    जागरूकता ही बचाव है
                  </span>
                </div>
              </RevealSection>
            </div>

            {/* Right Column: Content (55%) */}
            <div className="w-full lg:w-[55%] flex flex-col">
              <RevealSection delay={150}>
                <span className="section-badge">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E8A23A]" /> WHY CANCER AWARE BHARAT
                </span>
                <h2 className="section-title text-3xl md:text-5xl">
                  Empowering Every Patient With Hope & Dignity
                </h2>
                <p className="text-base text-[#4A5E54] leading-relaxed mb-8">
                  Cancer Aware Bharat connects patients with trusted oncologists, screening camps, healthcare partners and trained caseworkers to ensure early diagnosis and continuous support.
                </p>

                {/* Feature Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#EEF3EF] text-[#0E3B36] flex items-center justify-center shrink-0">
                      <HeartPulse className="w-5 h-5 text-[#E8A23A]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] font-bold text-[#0E3B36] mb-1">Compassionate Caseworkers</h4>
                      <p className="text-[13px] text-[#4A5E54] leading-relaxed">Dedicated volunteers guiding families from first consultation through treatment roadmap.</p>
                    </div>
                  </div>
                  <div className="flex gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#EEF3EF] text-[#0E3B36] flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-[#E8A23A]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] font-bold text-[#0E3B36] mb-1">Hospital Partner Network</h4>
                      <p className="text-[13px] text-[#4A5E54] leading-relaxed">Direct links with empaneled cancer hospitals and diagnostic screening centres.</p>
                    </div>
                  </div>
                </div>

                <div className="w-full kantha-divider mb-6" />

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    '100% Free Cancer Screening Camps',
                    'Hospital & Referral Navigation',
                    'Verified Specialist Second Opinions',
                    'Grassroots Bilingual Awareness Drives'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#7C9A82] shrink-0" />
                      <span className="text-sm font-semibold text-[#1B2620]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => navigate('/mission')}
                    className="w-full sm:w-auto btn-primary !py-3 !px-7 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Explore Our Mission</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="tel:+911140559200"
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#0E3B36] text-[#0E3B36] text-xs sm:text-sm font-semibold hover:bg-[#EEF3EF] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#0E3B36]" />
                    <span>Call Helpline</span>
                  </a>
                </div>
              </RevealSection>
            </div>

          </div>
        </div>
      </PremiumSection>

      {/* ═══════════════════════════════════════════
          SECTION 10: TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <TestimonialsCarousel />

      {/* ═══════════════════════════════════════════
          SECTION 10.1: 3-PANEL PARTNERSHIPS
          Center panel has sindoor-to-marigold gradient overlay
          ═══════════════════════════════════════════ */}
      <section className="w-full bg-[#0E3B36] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#164E48]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Left Panel: Volunteer */}
          <div className="relative rounded-3xl overflow-hidden min-h-[400px] border border-white/15 flex flex-col justify-end p-8 bg-[#092824]">
            <img src="/events/event-1.jpeg" alt="Volunteer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-40" />
            <div className="relative z-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8A23A]">
                Join Our Mission
              </span>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                Become A Community Volunteer
              </h3>
              <p className="text-white/85 text-sm leading-relaxed mb-4">
                Support camp coordination, patient registration, and spread lifesaving cancer awareness in your neighborhood.
              </p>
              <button 
                onClick={() => navigate('/volunteer/login')}
                className="btn-marigold text-xs sm:text-sm !py-2.5 !px-6 cursor-pointer"
              >
                <span>Volunteer Login / Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Panel: Video Story with Sindoor-to-Marigold Gradient Overlay */}
          <div className="relative rounded-3xl overflow-hidden min-h-[380px] border border-white/20 flex items-center justify-center p-8 group">
            <img src="/dr-ajay-kumar.jpg" alt="Cancer Awareness" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            {/* Sindoor to Marigold Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C8443C]/80 via-[#E8A23A]/50 to-transparent" />
            
            {/* Play Button */}
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-white text-[#0E3B36] flex items-center justify-center mx-auto shadow-2xl transition-transform duration-300 group-hover:scale-110 mb-3 cursor-pointer">
                <Play className="w-7 h-7 fill-[#0E3B36] ml-1" />
              </div>
              <p className="font-serif text-white text-lg font-bold">Watch Our Impact Story</p>
              <p className="text-white/80 text-xs mt-0.5">Free Camps Across India</p>
            </div>
          </div>

          {/* Right Panel: Hospital Partner */}
          <div className="relative rounded-3xl overflow-hidden min-h-[400px] border border-white/15 flex flex-col justify-end p-8 bg-[#092824]">
            <img src="/events/event-4.jpeg" alt="Partner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-40" />
            <div className="relative z-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8A23A]">
                Healthcare Institutions
              </span>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                Partner As A Health Centre
              </h3>
              <p className="text-white/85 text-sm leading-relaxed mb-4">
                Join our nationwide network of diagnostic centres and oncology hospitals to widen cancer care access.
              </p>
              <button 
                onClick={() => navigate('/hospital/login')}
                className="px-6 py-2.5 rounded-full border border-white/40 text-white text-xs sm:text-sm font-semibold hover:bg-white/15 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Health Centre Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10.2: MEDICAL ADVISORY BOARD
          ═══════════════════════════════════════════ */}
      <TeamShowcase />

      {/* ═══════════════════════════════════════════
          SECTION 10.3: NEWS & ARTICLES
          ═══════════════════════════════════════════ */}
      <NewsArticlesSection />

      {/* ═══════════════════════════════════════════
          SECTION 11: CONNECTED FAQ (Kantha Connector Sequence)
          ═══════════════════════════════════════════ */}
      <PremiumSection variant="warm-1">
        <div className="section-container max-w-4xl mx-auto">
          <RevealSection>
            <div className="section-header">
              <span className="section-badge">
                <HelpCircle className="w-3.5 h-3.5 text-[#E8A23A]" /> CLARIFICATIONS
              </span>
              <h2 className="section-title text-3xl md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="section-subtitle">
                Clear guidance on screening camps, patient navigation, and volunteer partnerships.
              </p>
            </div>
          </RevealSection>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 50}>
                <FAQItem
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  isLast={i === faqs.length - 1}
                />
              </RevealSection>
            ))}
          </div>
        </div>
      </PremiumSection>

      {/* ═══════════════════════════════════════════
          SECTION 12: DUSK NEWSLETTER (Inline Form on Ink Teal Band)
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0E3B36] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#164E48]">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E8A23A] mb-2">
                  <Mail className="w-3.5 h-3.5" /> Newsletter
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">
                  Stay Informed on Camps & Guides
                </h3>
                <p className="text-white/80 text-sm font-light mt-1">
                  Monthly updates on free screening camps, clinical tips, and volunteer stories.
                </p>
              </div>

              <div className="w-full md:w-auto">
                {!newsletterSubmitted ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newsletterEmail.includes('@')) setNewsletterSubmitted(true);
                    }}
                    className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm outline-none focus:border-[#E8A23A] transition-colors min-w-[240px]"
                    />
                    <button
                      type="submit"
                      className="btn-marigold text-xs sm:text-sm !py-3 !px-6 cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <div className="px-4 py-2.5 rounded-full bg-white/15 text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-emerald-400/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Thank you! You are subscribed to our updates.</span>
                  </div>
                )}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 13: SUNRISE REPRISE FINAL CTA
          ═══════════════════════════════════════════ */}
      <SunriseRepriseCtaSection onOpenVolunteer={onOpenVolunteer} onOpenEnquiry={onOpenEnquiry} />

    </div>
  );
}
