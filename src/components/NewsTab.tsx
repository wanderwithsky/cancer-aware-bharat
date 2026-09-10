import React, { useState, useMemo } from 'react';
import { Newspaper, ChevronRight, Search, Calendar, MapPin, ArrowRight, ChevronLeft, Sparkles, Tag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

// --- Mock Data ---
const NEWS_CATEGORIES = ['All', 'Announcements', 'Events', 'Medical', 'Campaigns', 'Partnerships'];

const UPCOMING_EVENTS = [
  {
    id: 'ue1',
    title: 'Women\'s Health Screening Camp',
    date: 'August 15, 2026',
    location: 'Pune General Hospital, Pune',
    description: 'Free breast and cervical cancer screening for women over 40.',
    image: '/events/event-2.jpeg'
  },
  {
    id: 'ue2',
    title: 'Tobacco Awareness Seminar',
    date: 'August 22, 2026',
    location: 'Delhi University Campus',
    description: 'Educational seminar on the dangers of tobacco consumption targeting youth.',
    image: '/events/event-4.jpeg'
  },
  {
    id: 'ue3',
    title: 'Rural Outreach Drive',
    date: 'September 5, 2026',
    location: 'Patna Rural District',
    description: 'A 3-day health camp focused on early cancer detection in rural communities.',
    image: '/events/event-6.jpeg'
  },
  {
    id: 'ue4',
    title: 'National Cancer Walkathon',
    date: 'September 12, 2026',
    location: 'Marine Drive, Mumbai',
    description: 'Join thousands in walking to raise awareness and funds for cancer research.',
    image: '/events/event-8.jpeg'
  }
];

const MOCK_NEWS = [
  {
    id: 'n1',
    title: 'Free Oral Cancer Screening Camp in Varanasi Completes Successfully',
    category: 'Campaigns',
    date: 'July 25, 2026',
    description: 'Over 5,000 residents were screened in our latest grassroots initiative aimed at combating the rising rates of oral cancer in Northern India.',
    image: '/gallery/gallery-4.jpeg',
    featured: true
  },
  {
    id: 'n2',
    title: 'Breast Cancer Awareness Walk Successfully Completed in Delhi',
    category: 'Events',
    date: 'July 20, 2026',
    description: 'Thousands of survivors and advocates marched through central Delhi to raise awareness and support for early detection.',
    image: '/gallery/gallery-7.jpeg'
  },
  {
    id: 'n3',
    title: 'New Hospital Partnership Announced with AIIMS',
    category: 'Partnerships',
    date: 'July 15, 2026',
    description: 'Cancer Aware Bharat has officially partnered with AIIMS to expedite subsidized treatment for rural patients.',
    image: '/gallery/gallery-10.jpeg'
  },
  {
    id: 'n4',
    title: 'Upcoming Women\'s Health Screening Camp Schedule Released',
    category: 'Announcements',
    date: 'July 10, 2026',
    description: 'We are organizing 15 dedicated women\'s health camps across Maharashtra this August. Registration is now open.',
    image: '/events/event-3.jpeg'
  },
  {
    id: 'n5',
    title: 'Cancer Awareness Drive Reaches 50 Remote Rural Villages',
    category: 'Campaigns',
    date: 'July 5, 2026',
    description: 'Our mobile medical units have successfully completed their first quarter targets, providing essential education to underserved populations.',
    image: '/gallery/gallery-12.jpeg'
  },
  {
    id: 'n6',
    title: 'Blood Donation & Cancer Support Initiative Launched',
    category: 'Medical',
    date: 'June 28, 2026',
    description: 'A new joint initiative to ensure steady blood supplies for oncology wards across our partner network.',
    image: '/gallery/gallery-15.jpeg'
  },
  {
    id: 'n7',
    title: 'Free Consultation Week at Tata Memorial Partner Clinics',
    category: 'Medical',
    date: 'June 20, 2026',
    description: 'Get free second opinions from top oncologists at our registered partner clinics during the first week of July.',
    image: '/dr-ajay-kumar.jpg'
  },
  {
    id: 'n8',
    title: 'Youth Tobacco Awareness Campaign Reaches 1M Students',
    category: 'Campaigns',
    date: 'June 15, 2026',
    description: 'Our digital and in-school campaigns targeting tobacco use have hit a major milestone across 5 states.',
    image: '/events/event-5.jpeg'
  },
  {
    id: 'n9',
    title: 'NGO Collaboration Announcement: Fight Cancer Together',
    category: 'Partnerships',
    date: 'June 10, 2026',
    description: 'Five leading regional NGOs have joined our national alliance to share resources and improve patient navigation.',
    image: '/gallery/gallery-22.jpeg'
  },
  {
    id: 'n10',
    title: 'National Cancer Awareness Month Activities Revealed',
    category: 'Announcements',
    date: 'June 5, 2026',
    description: 'Check out the complete calendar of events, webinars, and free screening drives planned for the upcoming awareness month.',
    image: '/hero-gallery/hero-5.jpeg'
  },
  {
    id: 'n11',
    title: 'Student Awareness Seminar Held at Top Universities',
    category: 'Events',
    date: 'May 28, 2026',
    description: 'Medical professionals conducted interactive sessions with students to discuss lifestyle choices and cancer prevention.',
    image: '/gallery/gallery-19.jpeg'
  },
  {
    id: 'n12',
    title: 'Community Outreach Success Story: Early Detection Saves Lives',
    category: 'Medical',
    date: 'May 20, 2026',
    description: 'A recent screening camp in Bihar identified 14 early-stage cases, all of whom are now receiving successful treatment.',
    image: '/events/event-9.jpeg'
  }
];

export default function NewsTab() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredNews = useMemo(() => {
    return MOCK_NEWS.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            news.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || news.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredNews = filteredNews.find(n => n.featured) || filteredNews[0];
  const regularNews = filteredNews.filter(n => n.id !== featuredNews?.id);

  const totalPages = Math.ceil(regularNews.length / itemsPerPage);
  const paginatedNews = regularNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F3F6F1] text-[#1B2620] min-h-screen">
      
      {/* ─── Sunrise Arc Hero Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAEFE9] via-[#F4F7F2] to-[#F3F6F1] border-b border-[#0E3B36]/10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8A23A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0E3B36]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E3B36]/8 border border-[#0E3B36]/15 text-[#0E3B36] text-xs font-bold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A23A]" />
              <span>Press Room & Field Dispatches</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0E3B36] tracking-tight leading-[1.12]">
              Latest News & <br />
              <span className="italic font-serif text-[#C8443C]">National Announcements.</span>
            </h1>

            <p className="font-serif-hindi text-lg sm:text-xl text-[#0E3B36]/80 mt-3 font-normal">
              प्रेस विज्ञप्तियां, राज्यव्यापी जांच अभियान और कैंसर अवेयर भारत के नवीनतम घटनाक्रम।
            </p>

            <p className="mt-5 text-sm sm:text-base text-[#1B2620]/75 leading-relaxed font-sans max-w-2xl">
              Stay updated with grassroots screening milestones, hospital tie-up announcements, medical initiatives, and upcoming events across Bharat.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content Grid ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column (Main News Feed) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Search and Category Filter Card */}
            <div className="bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/12 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#0E3B36]/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles, announcements, and events..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#0E3B36]/15 text-xs sm:text-sm text-[#1B2620] placeholder-[#1B2620]/40 focus:outline-none focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {NEWS_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#0E3B36] text-[#FAFCF8] shadow-sm'
                        : 'bg-white hover:bg-[#EEF3EF] text-[#1B2620]/80 border border-[#0E3B36]/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article Card */}
            {currentPage === 1 && featuredNews && (
              <div className="bg-[#FAFCF8] rounded-3xl border border-[#0E3B36]/12 overflow-hidden shadow-sm group hover:shadow-xl hover:border-[#0E3B36]/30 transition-all duration-300">
                <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden relative bg-[#EEF3EF]">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-[#E8A23A] text-[#1B2620] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {featuredNews.category}
                    </span>
                    <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
                      {featuredNews.date}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E3B36] leading-snug group-hover:text-[#C8443C] transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1B2620]/75 leading-relaxed line-clamp-3">
                    {featuredNews.description}
                  </p>
                  <div className="pt-2">
                    <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B36] group-hover:text-[#C8443C] transition-colors cursor-pointer">
                      Read Full Report <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paginatedNews.length > 0 ? (
                paginatedNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/12 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-48 sm:h-52 bg-[#EEF3EF] relative overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 bg-[#0E3B36]/90 backdrop-blur-md text-[#FAFCF8] text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                          {news.category}
                        </span>
                      </div>
                      
                      <div className="p-5 sm:p-6 space-y-2 text-left">
                        <div className="flex items-center text-[11px] text-[#1B2620]/60 font-semibold gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#E8A23A]" /> {news.date}
                        </div>
                        <h3 className="font-serif text-lg font-normal text-[#0E3B36] line-clamp-2 leading-snug group-hover:text-[#C8443C] transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-xs text-[#1B2620]/75 leading-relaxed line-clamp-3">
                          {news.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#0E3B36]/10 flex items-center justify-between bg-white/40">
                      <span className="text-xs font-bold text-[#0E3B36] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 text-center py-12 bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/10 p-8 space-y-2">
                  <p className="font-serif text-lg text-[#0E3B36]">No news articles found matching your search.</p>
                  <p className="text-xs text-[#1B2620]/60">Try clearing filters to see all press dispatches.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-6">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-[#0E3B36]/20 bg-white flex items-center justify-center text-[#0E3B36] hover:bg-[#EEF3EF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-[#0E3B36] text-white shadow-xs'
                        : 'bg-white text-[#0E3B36] border border-[#0E3B36]/20 hover:bg-[#EEF3EF]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-[#0E3B36]/20 bg-white flex items-center justify-center text-[#0E3B36] hover:bg-[#EEF3EF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Recent Posts Widget */}
            <div className="bg-[#FAFCF8] rounded-3xl p-6 sm:p-7 border border-[#0E3B36]/12 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-normal text-[#0E3B36] border-b border-[#0E3B36]/10 pb-3 flex items-center gap-2">
                <span className="w-2 h-4 bg-[#E8A23A] rounded-full" />
                Recent Press Updates
              </h3>
              <div className="space-y-4">
                {MOCK_NEWS.slice(0, 4).map(news => (
                  <div key={`sidebar-${news.id}`} className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#EEF3EF] border border-[#0E3B36]/10">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-normal text-[#0E3B36] line-clamp-2 leading-snug group-hover:text-[#C8443C] transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-[10px] text-[#1B2620]/60 font-medium mt-1">
                        {news.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events Box */}
            <div className="bg-[#0E3B36] rounded-3xl p-6 sm:p-7 shadow-xl text-white space-y-5">
              <h3 className="font-serif text-lg font-normal text-white border-b border-white/15 pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E8A23A]" />
                Upcoming Assemblies
              </h3>
              
              <div className="space-y-4">
                {UPCOMING_EVENTS.map(event => (
                  <div key={event.id} className="group cursor-pointer">
                    <div className="flex gap-3 mb-1.5">
                      <div className="bg-white/10 rounded-xl p-2 text-center shrink-0 w-12 h-12 flex flex-col justify-center items-center border border-white/10 group-hover:bg-[#E8A23A] group-hover:text-[#1B2620] transition-colors">
                        <span className="text-[10px] uppercase font-bold text-[#E8A23A] group-hover:text-[#1B2620] leading-none mb-0.5">
                          {event.date.split(' ')[0].substring(0, 3)}
                        </span>
                        <span className="text-sm font-black leading-none">
                          {event.date.split(' ')[1].replace(',', '')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif text-xs sm:text-sm font-normal text-white line-clamp-1 group-hover:text-[#E8A23A] transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-[10px] text-white/70 flex items-center mt-1 line-clamp-1">
                          <MapPin className="w-3 h-3 mr-1 text-[#E8A23A]" /> {event.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/events')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                View Full Calendar <ArrowRight className="w-3.5 h-3.5 text-[#E8A23A]" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
