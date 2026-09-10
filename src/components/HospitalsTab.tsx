import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, Phone, Mail, Info, ArrowUpRight, Map, Building2, Sparkles, ShieldCheck } from 'lucide-react';
import { useApiHospitals } from '../api/hooks';
import { Hospital } from '../types';
import MapContainer from './MapContainer';
import PremiumSection from './common/PremiumSection';

interface HospitalsTabProps {
  onOpenEnquiry: (hospitalId?: string) => void;
}

export default function HospitalsTab({ onOpenEnquiry }: HospitalsTabProps) {
  const navigate = useNavigate();
  const { hospitals } = useApiHospitals();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<'all' | 'north' | 'south' | 'east' | 'west'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Center of Excellence' | 'Community Partner'>('all');

  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = regionFilter === 'all' || h.region === regionFilter;
    const matchesType = typeFilter === 'all' || h.type === typeFilter;

    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <>
      {/* ── 1. Sunrise Arc Hero Section ── */}
      <section className="relative gradient-dawn-2 text-white py-16 md:py-24 px-4 overflow-hidden border-b border-[#D5DFD7]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8A23A]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7C9A82]/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8A23A] text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Network / हमारे सहयोगी अस्पताल</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            <span className="block">Nationwide Oncology</span>
            <span className="font-serif-hindi text-[#E8A23A] mt-1 block">भागीदार अस्पताल नेटवर्क</span>
          </h1>

          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            We integrate exclusively with verified clinical centers and supportive community hospitals across India to ensure standard diagnostic pathways and second opinions.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/hospital/login')}
              className="btn-marigold text-xs md:text-sm !py-2.5 !px-6 cursor-pointer shadow-md"
            >
              <Building2 className="w-4 h-4" />
              <span>Hospital Partner Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive Map Section ── */}
      <PremiumSection variant="warm-2" withTopDivider="kantha">
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="section-badge"><Map className="w-3.5 h-3.5 text-[#E8A23A]" /> Geospatial Network</span>
              <h2 className="section-title text-2xl md:text-4xl">Interactive Hospital Map</h2>
              <p className="section-subtitle">Explore verified clinical partner locations and diagnostic units across India.</p>
            </div>
            <button
              onClick={() => navigate('/hospital/login')}
              className="btn-secondary !py-2 !px-4 !text-xs shrink-0 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <MapContainer
            hospitals={hospitals}
            onSelectHospital={(h) => setSelectedHospital(h)}
            onOpenContact={(id) => onOpenEnquiry(id)}
          />

          {/* ── 3. Main Directory & Filters ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Left Side: Directory search and results */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-5 border border-[#D5DFD7] rounded-3xl shadow-sm space-y-4">
                
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#7A8E83]" />
                  <input
                    type="text"
                    placeholder="Search partner by name, city, or specialty (e.g. Radiation)..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#D5DFD7] bg-[#FAFCF8] focus:border-[#0E3B36] focus:bg-white outline-none text-xs md:text-sm text-[#1B2620] transition-all shadow-inner"
                  />
                </div>

                {/* Region Filter Buttons */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A8E83]">Filter by Region</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { value: 'all', label: 'All Regions' },
                      { value: 'north', label: 'North India' },
                      { value: 'south', label: 'South India' },
                      { value: 'east', label: 'East India' },
                      { value: 'west', label: 'West India' }
                    ].map(r => (
                      <button
                        key={r.value}
                        onClick={() => setRegionFilter(r.value as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          regionFilter === r.value 
                            ? 'bg-[#0E3B36] border-[#0E3B36] text-white shadow-xs' 
                            : 'bg-white border-[#D5DFD7] text-[#4A5E54] hover:bg-[#EEF3EF] hover:border-[#0E3B36]'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Filter Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#D5DFD7]/60">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A8E83]">Filter by Center Type</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { value: 'all', label: 'All Center Types' },
                      { value: 'Center of Excellence', label: 'Centers of Excellence' },
                      { value: 'Community Partner', label: 'Community Partners' }
                    ].map(t => (
                      <button
                        key={t.value}
                        onClick={() => setTypeFilter(t.value as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          typeFilter === t.value 
                            ? 'bg-[#E8A23A] border-[#E8A23A] text-[#1B2620] shadow-xs' 
                            : 'bg-white border-[#D5DFD7] text-[#4A5E54] hover:bg-[#EEF3EF]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hospital Listings */}
              <div className="space-y-4">
                {filteredHospitals.length === 0 ? (
                  <div className="p-8 text-center bg-white border border-[#D5DFD7] rounded-3xl shadow-sm">
                    <p className="font-serif text-base text-[#0E3B36] font-bold">No hospitals matched your query.</p>
                    <p className="text-xs text-[#7A8E83] mt-1">Try clearing your filters or searching for terms like Delhi, Radiation, or Surgery.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setRegionFilter('all'); setTypeFilter('all'); }}
                      className="mt-4 px-4 py-2 bg-[#0E3B36] text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredHospitals.map(hosp => (
                    <div 
                      key={hosp.id} 
                      className={`bg-white border rounded-3xl p-5 shadow-sm transition-all hover:shadow-md cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                        selectedHospital?.id === hosp.id ? 'border-[#0E3B36] ring-2 ring-[#0E3B36]/20' : 'border-[#D5DFD7]'
                      }`}
                      onClick={() => setSelectedHospital(hosp)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#EEF3EF] border border-[#D5DFD7] overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                          {hosp.logo ? (
                            <img src={hosp.logo} alt={hosp.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="font-serif text-xl font-bold text-[#0E3B36]">{hosp.name[0]}</span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              hosp.type === 'Center of Excellence' 
                                ? 'bg-[#EEF3EF] text-[#0E3B36] border border-[#7C9A82]/30' 
                                : 'bg-[#FEF6EC] text-[#E8A23A] border border-[#E8A23A]/30'
                            }`}>
                              {hosp.type}
                            </span>
                            <span className="text-[10px] text-[#7A8E83] font-medium bg-[#EEF3EF] px-2 py-0.5 rounded-full capitalize">
                              {hosp.region} India
                            </span>
                          </div>
                          <h3 className="font-serif text-base font-bold text-[#0E3B36]">{hosp.name}</h3>
                          <p className="text-xs text-[#4A5E54] font-medium flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#C8443C]" /> {hosp.city}, {hosp.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-stretch gap-2 w-full md:w-auto shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHospital(hosp);
                          }}
                          className="flex-1 md:flex-none px-4 py-2 bg-[#EEF3EF] text-[#0E3B36] text-xs font-bold rounded-xl hover:bg-[#D5DFD7] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenEnquiry(hosp.id);
                          }}
                          className="flex-1 md:flex-none px-4 py-2 bg-[#0E3B36] text-white text-xs font-bold rounded-xl hover:bg-[#164E48] shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#E8A23A]" /> Contact
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Side: Hospital Detailed Inspector */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-white border border-[#D5DFD7] rounded-3xl p-6 md:p-8 shadow-sm min-h-[420px] flex flex-col justify-between">
                {selectedHospital ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          selectedHospital.type === 'Center of Excellence' 
                            ? 'bg-[#EEF3EF] text-[#0E3B36] border border-[#7C9A82]/30' 
                            : 'bg-[#FEF6EC] text-[#E8A23A] border border-[#E8A23A]/30'
                        }`}>
                          {selectedHospital.type}
                        </span>
                        <button 
                          onClick={() => setSelectedHospital(null)}
                          className="text-[#7A8E83] hover:text-[#1B2620] text-xs font-bold p-1 rounded-full hover:bg-[#EEF3EF] transition-colors cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <h2 className="font-serif text-xl font-bold text-[#0E3B36] leading-tight">{selectedHospital.name}</h2>
                      <p className="text-xs text-[#4A5E54] font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#C8443C] shrink-0" /> {selectedHospital.address}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8E83]">About the Institute</span>
                      <p className="text-xs md:text-sm text-[#4A5E54] leading-relaxed font-light">
                        {selectedHospital.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8E83]">Core Oncological Specialties</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedHospital.specialties.map(spec => (
                          <span key={spec} className="bg-[#EEF3EF] text-[#0E3B36] text-xs font-semibold px-3 py-1 rounded-full border border-[#D5DFD7]">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAFCF8] border border-[#D5DFD7] rounded-2xl space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8E83]">Direct Inquiries</span>
                      <div className="space-y-1.5 text-xs text-[#1B2620]">
                        <p className="flex items-center gap-2 font-medium">
                          <Phone className="w-3.5 h-3.5 text-[#E8A23A]" /> {selectedHospital.phone}
                        </p>
                        <p className="flex items-center gap-2 font-medium">
                          <Mail className="w-3.5 h-3.5 text-[#0E3B36]" /> {selectedHospital.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry(selectedHospital.id)}
                      className="w-full btn-marigold !py-3 !text-xs md:!text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Book Consultation / Ask Question</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 my-auto">
                    <div className="w-14 h-14 bg-[#EEF3EF] rounded-2xl flex items-center justify-center text-[#0E3B36]">
                      <Building2 className="w-7 h-7 text-[#0E3B36]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-[#0E3B36] font-bold">Select a Facility</h3>
                      <p className="text-xs text-[#7A8E83] max-w-[240px] mt-1 leading-relaxed font-light">
                        Click "Details" on any hospital card or click on a map pin to inspect contact channels, specialties, and location coordinates.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PremiumSection>
    </>
  );
}

