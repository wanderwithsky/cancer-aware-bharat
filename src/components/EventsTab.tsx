import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Heart, ChevronDown, ChevronUp, CheckCircle, History, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { useEvents } from '../api/hooks';
import PremiumSection from './common/PremiumSection';

interface EventsTabProps {
  onOpenEnquiry: () => void;
}

export default function EventsTab({ onOpenEnquiry }: EventsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Blood Donation' | 'Screening Camp' | 'Workshop'>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const { events: liveEvents } = useEvents();

  const pastEvents = [
    {
      id: 'past-1',
      title: 'Patna Rural Screening Assembly',
      date: 'Dec 12, 2025',
      location: 'Gaya Panchayat Bhavan, Bihar',
      impact: '350+ Villagers Checked',
      summary: 'Operated 2 mobile diagnostic units in collaboration with Patna Oncology partners. Identified 12 early-stage pre-malignant oral lesions, successfully mapping patients to tertiary oncology wards within 10 days.',
      image: '/events/event-7.jpeg'
    },
    {
      id: 'past-2',
      title: 'Nagpur Breast Cancer Awareness Drive',
      date: 'Nov 05, 2025',
      location: 'Government College Grounds, Nagpur',
      impact: '420+ Women Guided',
      summary: 'Conducted a comprehensive tutorial on Breast Self-Examination BSE protocols. Deployed a portable low-cost thermal scanner to flag suspicious thermal anomalies in 8 asymptomatic women, now under observation.',
      image: '/events/event-8.jpeg'
    },
    {
      id: 'past-3',
      title: 'Mumbai Tobacco Prevention Teen Campaign',
      date: 'Oct 14, 2024',
      location: '12 Municipal Schools, Bandra East',
      impact: '1,800+ Students Pledged',
      summary: 'Delivered an interactive audio-visual presentation outlining the carcinogenic impacts of tobacco and vape cartridges. Established student-led anti-tobacco cells in 8 schools to sustain awareness peer-to-peer.',
      image: '/events/event-9.jpeg'
    },
    {
      id: 'past-4',
      title: 'Varanasi Grassroots Health & Mammography Drive',
      date: 'Sep 28, 2024',
      location: 'Chandauli Block Center, UP',
      impact: '510+ Screenings',
      summary: 'Mobilized rural families for free breast and oral screening under expert surgical oncology guidance.',
      image: '/events/event-10.jpeg'
    }
  ];

  const [expandedPastId, setExpandedPastId] = useState<string | null>(null);

  const filteredEvents = liveEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || e.type === categoryFilter;

    return matchesSearch && matchesCategory;
  });

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
            <span>Campaign Schedule / शिविर अनुसूची</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            <span className="block">Upcoming Diagnostic</span>
            <span className="font-serif-hindi text-[#E8A23A] mt-1 block">निःशुल्क स्वास्थ्य जांच शिविर</span>
          </h1>

          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Book free admissions to our localized screening drives and awareness assemblies. Ensure early cancer detection for you and your loved ones completely free of charge.
          </p>
        </div>
      </section>

      {/* ── 2. Main Events List & Controls ── */}
      <PremiumSection variant="warm-2" withTopDivider="kantha">
        <div className="space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Active Events Directory Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* Controls Box */}
              <div className="bg-white p-5 border border-[#D5DFD7] rounded-3xl shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#7A8E83]" />
                  <input
                    type="text"
                    placeholder="Search active camps by title, city, or venue..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#D5DFD7] bg-[#FAFCF8] focus:border-[#0E3B36] focus:bg-white outline-none text-xs md:text-sm text-[#1B2620] transition-all shadow-inner"
                  />
                </div>

                {/* Filter */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { val: 'all', label: 'All Camps' },
                    { val: 'Screening Camp', label: 'Screening' },
                    { val: 'Blood Donation', label: 'Blood Drives' },
                    { val: 'Workshop', label: 'Workshops' }
                  ].map(cat => (
                    <button
                      key={cat.val}
                      onClick={() => setCategoryFilter(cat.val as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                        categoryFilter === cat.val
                          ? 'bg-[#0E3B36] text-white shadow-xs'
                          : 'bg-[#EEF3EF] hover:bg-[#D5DFD7] text-[#4A5E54]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Events Cards List */}
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="p-10 text-center bg-white border border-[#D5DFD7] rounded-3xl shadow-sm">
                    <p className="font-serif text-base text-[#0E3B36] font-bold">No upcoming campaigns matched your search criteria.</p>
                    <p className="text-xs text-[#7A8E83] mt-1">Try resetting the filter search box above or searching for another city.</p>
                  </div>
                ) : (
                  filteredEvents.map(camp => {
                    const isExpanded = expandedEventId === camp.id;
                    const remainingSlots = camp.capacity - camp.registeredCount;
                    const capacityPercent = camp.capacity > 0 ? Math.min(100, (camp.registeredCount / camp.capacity) * 100) : 0;
                    const isUrgent = capacityPercent >= 80;

                    return (
                      <div key={camp.id} className="bg-white rounded-3xl border border-[#D5DFD7] shadow-sm hover:shadow-md transition-all overflow-hidden">
                        <div className="p-5 flex flex-col md:flex-row gap-5 items-start">
                          <div className="w-full md:w-36 h-28 rounded-2xl bg-[#EEF3EF] overflow-hidden flex-shrink-0 border border-[#D5DFD7]">
                            <img src={camp.image || '/events/event-1.jpeg'} alt={camp.title} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-grow space-y-2 text-left">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EEF3EF] text-[#0E3B36] border border-[#7C9A82]/30 px-2.5 py-0.5 rounded-full">
                                {camp.type}
                              </span>
                              <span className="text-[10px] text-[#C8443C] font-bold bg-[#FBEAE9] border border-[#C8443C]/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8443C] animate-pulse" /> Active Booking
                              </span>
                            </div>

                            <h3 className="font-serif text-lg font-bold text-[#0E3B36] leading-snug">{camp.title}</h3>

                            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#4A5E54]">
                              <p className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#E8A23A]" /> {camp.date} • {camp.time}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-[#C8443C]" /> {camp.location}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => setExpandedEventId(isExpanded ? null : camp.id)}
                            className="p-2.5 rounded-2xl border border-[#D5DFD7] hover:bg-[#EEF3EF] text-[#0E3B36] transition-colors self-end md:self-center cursor-pointer"
                            title="Show details"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Collapsible Details */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-[#D5DFD7]/60 bg-[#FAFCF8] space-y-4">
                            <div className="space-y-1 pt-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8E83]">Campaign Scope</span>
                              <p className="text-xs md:text-sm text-[#4A5E54] leading-relaxed font-light">
                                {camp.description}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-[#D5DFD7]/40">
                              <div className="text-xs space-y-1.5 flex-1">
                                <div className="flex items-center justify-between max-w-xs font-semibold">
                                  <span className="text-[#4A5E54]">Available Seats:</span>
                                  <span className={isUrgent ? 'text-[#C8443C] font-bold' : 'text-[#0E3B36]'}>
                                    {remainingSlots > 0 ? `${remainingSlots} Slots Left` : 'Fully Booked'} ({camp.registeredCount}/{camp.capacity})
                                  </span>
                                </div>
                                <div className="h-2 bg-[#EEF3EF] rounded-full overflow-hidden max-w-xs">
                                  <div
                                    className={`h-full rounded-full transition-all duration-700 ${
                                      isUrgent ? 'bg-gradient-to-r from-[#E8A23A] to-[#C8443C]' : 'bg-gradient-to-r from-[#7C9A82] to-[#0E3B36]'
                                    }`}
                                    style={{ width: `${capacityPercent}%` }}
                                  />
                                </div>
                              </div>

                              <button
                                onClick={onOpenEnquiry}
                                disabled={remainingSlots <= 0}
                                className="btn-marigold !py-2.5 !px-5 !text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm"
                              >
                                <span>{remainingSlots > 0 ? 'Register For Camp' : 'Waiting List Full'}</span>
                                {remainingSlots > 0 && <ArrowRight className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Historic Camps Gallery */}
            <div className="lg:col-span-4 space-y-5">
              <div className="space-y-1">
                <span className="section-badge"><History className="w-3.5 h-3.5 text-[#E8A23A]" /> Archive</span>
                <h2 className="font-serif text-xl font-bold text-[#0E3B36]">Historic Assembly Gallery</h2>
                <p className="text-xs text-[#7A8E83] font-light">Documentary views of grassroots screening drives across India.</p>
              </div>

              <div className="space-y-4">
                {pastEvents.map(past => {
                  const isPastExpanded = expandedPastId === past.id;

                  return (
                    <div key={past.id} className="bg-white rounded-3xl border border-[#D5DFD7] overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="h-32 relative bg-[#0E3B36] overflow-hidden">
                        <img src={past.image} alt={past.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        <span className="absolute bottom-2 left-2 bg-[#0E3B36]/90 backdrop-blur-md text-xs font-bold text-[#E8A23A] px-2.5 py-1 rounded-xl shadow-sm border border-white/20">
                          {past.impact}
                        </span>
                      </div>

                      <div className="p-4 space-y-2 text-left">
                        <span className="text-[10px] text-[#7A8E83] font-medium block">{past.date} • {past.location}</span>
                        <h4 className="font-serif text-sm font-bold text-[#0E3B36] leading-tight line-clamp-1">{past.title}</h4>

                        {isPastExpanded ? (
                          <div className="space-y-2 pt-1 border-t border-[#D5DFD7]/40">
                            <p className="text-xs text-[#4A5E54] leading-relaxed font-light">
                              {past.summary}
                            </p>
                            <button
                              onClick={() => setExpandedPastId(null)}
                              className="text-[11px] text-[#0E3B36] font-bold hover:underline flex items-center cursor-pointer"
                            >
                              Show Less <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setExpandedPastId(past.id)}
                            className="text-[11px] text-[#0E3B36] font-bold hover:underline flex items-center cursor-pointer"
                          >
                            Read Summary <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </PremiumSection>
    </>
  );
}

