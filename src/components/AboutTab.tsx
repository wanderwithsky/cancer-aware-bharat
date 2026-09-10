import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Target, Eye, Users, ShieldCheck, Heart, Award, Milestone, ArrowRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import PremiumSection from './common/PremiumSection';

interface AboutTabProps {
  onOpenVolunteer: () => void;
}

export default function AboutTab({ onOpenVolunteer }: AboutTabProps) {
  const navigate = useNavigate();
  const [activeYear, setActiveYear] = useState('2026');

  const timelineData: Record<string, { title: string; desc: string; stat: string; image: string }> = {
    '2021': {
      title: 'Inception in New Delhi',
      desc: 'Founded by Dr. Ramesh Sharma after witnessing the severe lack of accessible diagnostic oncology channels for low-income families. Started with 1 mobile screening van.',
      stat: '500+ Patients Screened',
      image: '/events/event-1.jpeg'
    },
    '2023': {
      title: 'First Hospital Partnerships',
      desc: 'Formally integrated with Apex Oncology Institute. Launched our Patient Navigation pilot, assigning caseworkers to oversee therapy pipelines from biopsy to remission.',
      stat: '4,000+ Screenings • 2 Partner Clinics',
      image: '/events/event-2.jpeg'
    },
    '2025': {
      title: 'Expansion to Central & West India',
      desc: 'Welcomed CareWell Cancer Hospital and Narayana Health City. Formed a dedicated volunteer auxiliary corps to run rural tobacco awareness workshops.',
      stat: '10,000+ Screenings • 120 campaigns',
      image: '/events/event-4.jpeg'
    },
    '2026': {
      title: 'National Digital Portal launch',
      desc: 'Deploying our integrated digital directory, automated screening guidance tool, and live scheduling assistance to streamline volunteer allocation and patient requests.',
      stat: '14,250+ Lives Touched Nationwide',
      image: '/events/event-5.jpeg'
    }
  };

  return (
    <>
      {/* ── 1. Sunrise Arc Hero Section ── */}
      <section className="relative gradient-dawn-1 text-white py-16 md:py-24 px-4 overflow-hidden border-b border-[#D5DFD7]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8A23A]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7C9A82]/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8A23A] text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Who We Are / हमारा परिचय</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            <span className="block">Restoring Dignity to</span>
            <span className="font-serif-hindi text-[#E8A23A] mt-1 block">गरिमापूर्ण ऑन्कोलॉजी सहायता</span>
          </h1>

          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Cancer Aware Bharat is a nationwide civil society network bridging the gap between cutting-edge clinical oncology and localized, empathetic patient navigation.
          </p>
        </div>

        {/* Impact Photography Banner */}
        <div className="relative z-10 max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { src: '/events/event-1.jpeg', alt: 'Screening Assembly', caption: 'Community Screening Assemblies' },
            { src: '/events/event-4.jpeg', alt: 'Mobile Diagnostic Units', caption: 'Mobile Diagnostic Mammography Fleet' },
            { src: '/events/event-5.jpeg', alt: 'Volunteer Training', caption: 'Grassroots Volunteer Advocate Corps' },
          ].map((img, i) => (
            <div key={i} className="h-56 sm:h-72 rounded-3xl overflow-hidden relative border border-white/20 shadow-xl group bg-[#0E3B36]">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B36]/90 via-transparent to-transparent flex items-end p-6">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E8A23A]" />
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Vision & Mission Bento ── */}
      <PremiumSection variant="warm-2" withTopDivider="kantha">
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-[#0E3B36] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-white/10 group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Target className="w-48 h-48 text-white" />
              </div>
              <div className="relative space-y-6 z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15">
                  <Target className="w-7 h-7 text-[#E8A23A]" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Our Critical Mission</h2>
                <p className="text-white/85 leading-relaxed text-base md:text-lg font-light">
                  To eliminate late-stage cancer diagnoses across India by organizing free community screening camps, educating families on key warning signs, and providing empathetic patient navigation from consultation to cure.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#E8A23A]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Free Diagnostics in Rural Districts</span>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-sm border border-[#D5DFD7] group hover:border-[#7C9A82] hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Eye className="w-48 h-48 text-[#0E3B36]" />
              </div>
              <div className="relative space-y-6 z-10">
                <div className="w-14 h-14 bg-[#EEF3EF] rounded-2xl flex items-center justify-center text-[#0E3B36] border border-[#D5DFD7]">
                  <Eye className="w-7 h-7 text-[#0E3B36]" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0E3B36]">Our Long-term Vision</h2>
                <p className="text-[#4A5E54] leading-relaxed text-base md:text-lg font-light">
                  An India where no cancer patient fights their diagnosis alone, where financial status is never a barrier to receiving clinical care, and where early detection is treated as a fundamental, accessible right for every citizen.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0E3B36]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C9A82]" />
                  <span>Universal Healthcare Dignity & Navigation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars of Purpose Grid */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="section-badge mx-auto">Core Framework</span>
              <h2 className="section-title text-2xl md:text-4xl">The Pillars of Our Care Model</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Rigorous Partnerships', desc: 'We operate exclusively with vetted oncology clinical networks ensuring standard diagnostics.', icon: ShieldCheck, color: 'text-[#0E3B36] bg-[#EEF3EF]' },
                { title: 'Grassroots Reach', desc: 'Mobilizing rural panchayats and local groups to hold on-site screening assemblies.', icon: Users, color: 'text-[#E8A23A] bg-[#FEF6EC]' },
                { title: 'Dedicated Navigation', desc: 'Translating doctor prescriptions, schedules, and government PMJAY aid schemes.', icon: Heart, color: 'text-[#C8443C] bg-[#FBEAE9]' },
                { title: 'Clinical Education', desc: 'Conducting simple workshops on self-exams, warning signs, and recovering nutrition.', icon: Award, color: 'text-[#7C9A82] bg-[#EEF3EF]' },
              ].map((pil, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-7 border border-[#D5DFD7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-13 h-13 rounded-2xl ${pil.color} flex items-center justify-center mb-5`}>
                    <pil.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0E3B36] mb-2">{pil.title}</h3>
                  <p className="text-xs md:text-sm text-[#4A5E54] leading-relaxed font-light">{pil.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PremiumSection>

      {/* ── 3. Founder Message & Interactive Milestones ── */}
      <PremiumSection variant="warm-1" withTopDivider="kantha">
        <div className="space-y-20">

          {/* Message from Founder */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#D5DFD7] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative">
                  <div className="w-52 h-52 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#EEF3EF]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGIjteBD0CWXW7KgteodS7d-DgD-XuVwGItAT-l6I7lGspLnQe-OTq-H8TXiUcjOWdbptTp4-nZIN7FAu9-zdREXhoNTAzOkPjMHZ8RnnYKIM7kYGlLYiE5KpSV4BkFXynSzHEJjwp7VVvMNDw1bDqE-ScPuLJY5TvnYNhOVGZI2eb7vDckiItLiy5vlfchPcRQaoc5WkD9Com-SwmLGUqW1QCP0PViJLWaPZEVivtluQAiRrMYOvypg"
                      alt="Dr. Ramesh Sharma"
                      className="w-full h-full object-cover scale-105 object-top transition-transform duration-700 hover:scale-115"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-[#E8A23A] text-[#1B2620] p-3.5 rounded-2xl shadow-lg flex items-center justify-center">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-6">
                <p className="font-serif text-[#0E3B36] italic leading-relaxed text-base md:text-xl font-normal">
                  "We often marvel at the leaps in clinical oncology—targeted immunotherapy, precision radiation, genomic profiling. Yet, none of these matter if a farm laborer in Bihar or a mother in Maharashtra does not identify a warning lump until it is too late. Cancer Aware Bharat is here to ensure clinical authority meets patients with deep human empathy, bridging that gap before it is too late."
                </p>
                <div className="pt-2 border-t border-[#D5DFD7]/60">
                  <p className="font-serif text-lg font-bold text-[#0E3B36]">Dr. Ramesh Sharma, MD</p>
                  <p className="text-xs md:text-sm text-[#7A8E83] font-medium">Founder & Chief Medical Advisor, Cancer Aware Bharat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Milestone timeline */}
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <span className="section-badge mx-auto"><Milestone className="w-3.5 h-3.5 text-[#E8A23A]" /> Journey</span>
              <h2 className="section-title text-2xl md:text-4xl">Our Milestones & Growth</h2>
              <p className="section-subtitle">Click on the milestones below to trace our clinical footprint across India.</p>
            </div>

            {/* Year Selector */}
            <div className="flex justify-center flex-wrap gap-3">
              {['2021', '2023', '2025', '2026'].map(year => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeYear === year
                      ? 'btn-primary shadow-md scale-105'
                      : 'bg-white text-[#4A5E54] border border-[#D5DFD7] hover:border-[#0E3B36] hover:bg-[#EEF3EF]'
                  }`}
                >
                  {year} {year === '2026' && '• Present'}
                </button>
              ))}
            </div>

            {/* Selected Year Display Card */}
            <div className="bg-white rounded-3xl max-w-2xl mx-auto p-8 border border-[#D5DFD7] shadow-sm flex flex-col items-center text-center space-y-6">
              <div className="w-full h-60 rounded-2xl overflow-hidden bg-[#EEF3EF] border border-[#D5DFD7]">
                <img src={timelineData[activeYear].image} alt={timelineData[activeYear].title} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E3B36] bg-[#EEF3EF] px-4 py-1.5 rounded-full border border-[#7C9A82]/30">
                {timelineData[activeYear].stat}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0E3B36]">{timelineData[activeYear].title}</h3>
              <p className="text-xs md:text-sm text-[#4A5E54] leading-relaxed font-light">
                {timelineData[activeYear].desc}
              </p>
            </div>
          </div>
        </div>
      </PremiumSection>

      {/* ── 4. Call to Action Banner ── */}
      <section className="bg-[#0E3B36] text-white py-16 px-4 relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white">
            Help Us Bridge Clinical Authority & Empathy
          </h2>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed text-sm md:text-base font-light">
            Whether you are an experienced oncologist, a medical student, a passionate survivor, or a hospital institution—your collaboration saves lives.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenVolunteer}
              className="btn-marigold cursor-pointer"
            >
              <span>Become a Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/hospitals')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
            >
              Explore Hospital Partners
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
