import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Award, ShieldCheck, Calendar, Sparkles, Star, Phone,
  PlayCircle, Stethoscope, UserPlus, CheckCircle2
} from 'lucide-react';
import PremiumSection from './common/PremiumSection';

export interface Doctor {
  id: string;
  name: string;
  nameHi: string;
  title: string;
  titleHi?: string;
  specialty: string;
  specialtyHi: string;
  degrees: string;
  degreesHi?: string;
  regNo?: string;
  honors?: string;
  honorsEn?: string;
  bioHi: string;
  bioEn?: string;
  image: string;
}

export const APPROVED_DOCTORS_PANEL: Doctor[] = [
  {
    id: 'dr-ajay-kumar',
    name: 'Dr. Ajay Kumar',
    nameHi: 'डॉ. अजय कुमार',
    title: 'Senior Surgical Oncologist',
    titleHi: 'वरिष्ठ सर्जिकल ऑन्कोलॉजिस्ट',
    specialty: 'Surgical Oncology',
    specialtyHi: 'सर्जिकल ऑन्कोलॉजी (शल्य कैंसर विशेषज्ञ)',
    degrees: 'MBBS, MS (General Surgery), MCh (Surgical Oncology), Gold Medalist',
    degreesHi: 'एमबीबीएस, एमएस (जनरल सर्जरी), एमसीएच (सर्जिकल ऑन्कोलॉजी), स्वर्ण पदक विजेता',
    regNo: 'MCI-28490',
    honors: '‘यूपी रत्न’ एवं ‘काशी रत्न’ से सम्मानित*',
    honorsEn: "Honored with 'UP Ratna' & 'Kashi Ratna'*",
    bioHi: 'कैंसर रोगियों की सर्जरी और उपचार में कार्य करते हुए डॉ. अजय कुमार ने ऐसे अनेक परिवारों की पीड़ा देखी है, जिनमें मरीज देर से चिकित्सा सहायता तक पहुँचे। यह अनुभव केवल चिकित्सकीय चुनौती नहीं, बल्कि जनजागरुकता की आवश्यकता का स्पष्ट संकेत था। इसी सोच ने उन्हें कैंसर के प्रति जागरूकता को लोगों के बीच ले जाने के संकल्प से जोड़ा। Cancer Aware Bharat Mission में उनका चिकित्सकीय अनुभव कैंसर जागरूकता, early warning awareness और appropriate referral की दिशा में प्रेरक आधार है।',
    bioEn: 'Through years of performing oncology surgeries and treating cancer patients, Dr. Ajay Kumar witnessed the suffering of numerous families where patients reached medical help at an advanced stage. This experience was not merely a clinical challenge, but a clear call for community awareness. This realization inspired his commitment to bring cancer awareness directly to the public. His clinical expertise serves as an inspiring pillar for early warning awareness, screening, and appropriate referrals in the Cancer Aware Bharat Mission.',
    image: '/dr-ajay-kumar.jpg'
  }
];

interface DoctorsTabProps {
  onOpenEnquiry: (hospitalName?: string) => void;
  onOpenVolunteer: () => void;
}

export default function DoctorsTab({ onOpenEnquiry, onOpenVolunteer }: DoctorsTabProps) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'hindi' | 'english'>('hindi');

  const scrollToTeam = () => {
    const el = document.getElementById('specialist-team-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isHindi = lang === 'hindi';

  return (
    <>
      {/* ── 1. Sunrise Arc Hero Section ── */}
      <section className="relative gradient-dawn-3 text-white py-16 md:py-24 px-4 overflow-hidden border-b border-[#D5DFD7]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8A23A]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7C9A82]/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8A23A] text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{isHindi ? 'हमारे विशेषज्ञ / Medical Panel' : 'Medical Advisory Panel'}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/20 backdrop-blur-md text-xs font-bold">
              <button
                onClick={() => setLang('hindi')}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  isHindi ? 'bg-[#E8A23A] text-[#1B2620] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => setLang('english')}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  !isHindi ? 'bg-[#E8A23A] text-[#1B2620] shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            {isHindi ? (
              <>
                <span className="block">हमारे विशेषज्ञ</span>
                <span className="font-serif-hindi text-[#E8A23A] mt-1 block">ऑन्कोलॉजिस्ट व चिकित्सक</span>
              </>
            ) : (
              <>
                <span className="block">Empaneled Oncology</span>
                <span className="font-serif text-[#E8A23A] mt-1 block">Specialists & Surgical Advisory Panel</span>
              </>
            )}
          </h1>

          <div className="bg-white/10 border border-white/20 p-5 sm:p-6 rounded-3xl backdrop-blur-md space-y-2 max-w-3xl">
            <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {isHindi
                ? '"Cancer Aware Bharat के जागरूकता कार्यक्रमों, स्वास्थ्य शिविरों और प्रशिक्षण गतिविधियों में चिकित्सकों की सहभागिता उनकी उपलब्धता, विशेषज्ञता और कार्यक्रम की आवश्यकता के अनुसार होती है।"'
                : '"Participation of medical experts in cancer screening, awareness drives, and training modules depends on clinical availability, area of specialization, and community program requirements."'
              }
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
            {[
              { label: isHindi ? 'नैदानिक मार्गदर्शन' : 'Clinical Guidance', val: '100% Verified' },
              { label: isHindi ? 'निरीक्षित शिविर' : 'Screening Camps Supervised', val: '180+ Camps' },
              { label: isHindi ? 'विशेषज्ञता कवरेज' : 'Specialty Coverage', val: 'Surgical & Medical' },
              { label: isHindi ? 'द्वितीय राय सहायता' : 'Second Opinion Support', val: 'Priority Access' }
            ].map((st, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
                <p className="font-serif text-lg sm:text-2xl font-bold text-white">{st.val}</p>
                <p className="text-[11px] text-white/75 font-medium mt-0.5">{st.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. Featured Lead Mentor: Dr. Ajay Kumar ── */}
      <PremiumSection variant="warm-2" withTopDivider="kantha">
        <div className="space-y-12">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D5DFD7] shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-[#D5DFD7]/60 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF3EF] text-[#0E3B36] flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-[#E8A23A]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8E83]">
                  {isHindi ? 'प्रेरणास्रोत एवं मुख्य मार्गदर्शक' : 'INSPIRATION & LEAD MENTOR'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E3B36]">
                  {isHindi ? 'डॉ. अजय कुमार / मुख्य प्रेरणास्रोत' : 'Dr. Ajay Kumar / Clinical Pillar'}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Doctor Photo & Credentials */}
              <div className="lg:col-span-4 space-y-4 text-center">
                <div className="relative inline-block mx-auto">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#EEF3EF] mx-auto group">
                    <img
                      src={APPROVED_DOCTORS_PANEL[0].image}
                      alt="Dr. Ajay Kumar"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute -bottom-3 right-4 bg-[#E8A23A] text-[#1B2620] px-3.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> Gold Medalist
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#0E3B36]">
                    {isHindi ? APPROVED_DOCTORS_PANEL[0].nameHi : APPROVED_DOCTORS_PANEL[0].name}
                  </h3>
                  <p className="text-xs font-bold text-[#0E3B36]">
                    {isHindi ? APPROVED_DOCTORS_PANEL[0].titleHi : APPROVED_DOCTORS_PANEL[0].title}
                  </p>
                  <p className="text-xs text-[#E8A23A] font-bold">
                    {isHindi ? APPROVED_DOCTORS_PANEL[0].honors : APPROVED_DOCTORS_PANEL[0].honorsEn}
                  </p>
                  <p className="text-[10px] text-[#7A8E83] italic">
                    {isHindi
                      ? '*सभी उपाधियाँ/पुरस्कार आधिकारिक दस्तावेज़ के अनुसार अंतिम किए जाएँ।'
                      : '*All credentials subject to official clinical verification.'}
                  </p>
                </div>
              </div>

              {/* Biography & Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-[#FAFCF8] p-6 sm:p-8 rounded-3xl border border-[#D5DFD7] space-y-4">
                  <h4 className="font-serif font-bold text-base text-[#0E3B36] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E8A23A]" />
                    <span>{isHindi ? 'कैंसर जागरूकता का प्रेरक आधार' : 'Inspirational Pillar of Cancer Awareness'}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A5E54] leading-relaxed font-light border-l-4 border-[#0E3B36] pl-4">
                    "{isHindi ? APPROVED_DOCTORS_PANEL[0].bioHi : APPROVED_DOCTORS_PANEL[0].bioEn}"
                  </p>
                  <div className="text-[11px] text-[#7A8E83] border-t border-[#D5DFD7]/60 pt-3 font-medium">
                    <strong className="text-[#0E3B36]">{isHindi ? 'उपाधियाँ:' : 'Degrees:'}</strong> {isHindi ? (APPROVED_DOCTORS_PANEL[0].degreesHi || APPROVED_DOCTORS_PANEL[0].degrees) : APPROVED_DOCTORS_PANEL[0].degrees}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/gallery')}
                    className="px-5 py-2.5 rounded-full bg-[#0E3B36] text-white font-bold text-xs hover:bg-[#164E48] shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <PlayCircle className="w-4 h-4 text-[#E8A23A]" />
                    <span>{isHindi ? 'जागरूकता वीडियो देखें' : 'Watch Awareness Videos'}</span>
                  </button>

                  <button
                    onClick={() => navigate('/events')}
                    className="px-5 py-2.5 rounded-full bg-[#EEF3EF] text-[#0E3B36] border border-[#D5DFD7] font-bold text-xs hover:bg-white flex items-center gap-2 cursor-pointer transition-all shadow-xs"
                  >
                    <Calendar className="w-4 h-4 text-[#E8A23A]" />
                    <span>{isHindi ? 'आगामी कैंप देखें' : 'View Upcoming Camps'}</span>
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(APPROVED_DOCTORS_PANEL[0].name)}
                    className="btn-marigold text-xs !py-2.5 !px-5 cursor-pointer shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'द्वितीय राय / ओपिनियन लें' : 'Request Second Opinion'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── 3. Doctor Details Card Deck ── */}
          <div id="specialist-team-grid" className="space-y-6 pt-6">
            
            <div className="flex items-center justify-between border-b border-[#D5DFD7] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E3B36]">APPROVED SPECIALISTS PANEL</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E3B36]">
                  {isHindi ? 'विशेषज्ञ डॉक्टर विवरण' : 'Approved Specialist Doctor Profiles'}
                </h2>
              </div>
              <span className="text-xs font-bold text-[#0E3B36] bg-[#EEF3EF] border border-[#7C9A82]/30 px-3.5 py-1 rounded-full">
                Verified Advisory Board
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {APPROVED_DOCTORS_PANEL.map((doc) => (
                <div
                  key={doc.id}
                  className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#D5DFD7] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-5">
                    
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#D5DFD7] shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute -bottom-2 -right-2 bg-[#0E3B36] text-white p-1 rounded-full shadow-md" title="Verified Doctor">
                          <ShieldCheck className="w-4 h-4 text-[#E8A23A]" />
                        </span>
                      </div>

                      <div className="space-y-1 flex-1">
                        <h3 className="font-serif text-xl font-bold text-[#0E3B36]">
                          {isHindi ? `${doc.nameHi} (${doc.name})` : `${doc.name} (${doc.nameHi})`}
                        </h3>

                        <p className="text-xs font-bold text-[#E8A23A]">
                          {isHindi ? doc.specialtyHi : doc.specialty}
                        </p>

                        {(doc.honors || doc.honorsEn) && (
                          <p className="text-[11px] text-[#4A5E54] font-semibold">
                            🏅 {isHindi ? doc.honors : (doc.honorsEn || doc.honors)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#FAFCF8] p-5 rounded-2xl border border-[#D5DFD7] space-y-3 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#0E3B36] text-[11px] shrink-0">
                          🎓 Qualification:
                        </span>
                        <span className="font-semibold text-[#4A5E54] text-[11px]">
                          {isHindi ? (doc.degreesHi || doc.degrees) : doc.degrees}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#0E3B36] text-[11px] shrink-0">
                          📋 Designation / Reg:
                        </span>
                        <span className="font-semibold text-[#4A5E54] text-[11px]">
                          {isHindi ? (doc.titleHi || doc.title) : doc.title} {doc.regNo ? `(MCI Reg: ${doc.regNo})` : ''}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#0E3B36] text-[11px] shrink-0">
                          🩺 Specialty:
                        </span>
                        <span className="font-semibold text-[#E8A23A] text-[11px]">
                          {isHindi ? doc.specialtyHi : doc.specialty}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#D5DFD7]/60 space-y-1">
                        <span className="font-bold text-[#0E3B36] text-[11px] block">
                          {isHindi ? 'Approved Clinical Bio:' : 'Approved Clinical Bio:'}
                        </span>
                        <p className="text-[#4A5E54] leading-relaxed text-xs font-light">
                          {isHindi ? doc.bioHi : (doc.bioEn || doc.bioHi)}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-[#D5DFD7]/60 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-[#7A8E83] font-medium italic">
                      {isHindi
                        ? '*सभी उपाधियाँ/पुरस्कार आधिकारिक दस्तावेज़ के अनुसार अंतिम किए जाएँ।'
                        : '*All credentials verified under clinical standard protocol.'}
                    </span>

                    <button
                      onClick={() => onOpenEnquiry(doc.name)}
                      className="btn-marigold text-xs !py-2 !px-4 cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'Request Opinion / राय लें' : 'Request Consultation'}</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Join Doctor Panel Card */}
              <div className="lg:col-span-4 bg-[#0E3B36] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#E8A23A] flex items-center justify-center font-bold border border-white/15">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {isHindi ? 'चिकित्सक पैनल से जुड़ें' : 'Join Our Doctors Panel'}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    {isHindi
                      ? 'यदि आप एक ऑन्कोलॉजिस्ट या चिकित्सा विशेषज्ञ हैं और कैंसर जागरूकता मिशन में अपना योगदान देना चाहते हैं, तो कृपया हमारे वालंटियर/चिकित्सक नेटवर्क से जुड़ें।'
                      : 'Are you an oncologist or medical specialist interested in contributing to early detection and awareness camps? Join our empaneled medical network today.'}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/15">
                  <button
                    onClick={onOpenVolunteer}
                    className="w-full btn-marigold !py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isHindi ? 'रजिस्टर करें (Register as Doctor)' : 'Register as Medical Specialist'}</span>
                  </button>
                  <button
                    onClick={() => onOpenEnquiry('Doctor Panel Inquiry')}
                    className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>{isHindi ? 'संपर्क करें (Contact Coordinator)' : 'Contact Panel Coordinator'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </PremiumSection>
    </>
  );
}


