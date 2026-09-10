import React, { useState } from 'react';
import { Search, BookOpen, Clock, User, ChevronLeft, Send, CheckCircle, Heart, Sparkles, Share2, Tag, ArrowRight, X } from 'lucide-react';
import { useBlogs } from '../api/hooks';
import { BlogArticle } from '../types';
import { ApiError, submitSurvivorStory } from '../api/client';

export default function BlogsTab() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Prevention' | 'Nutrition' | 'Survivors' | 'Research'>('all');

  // Share story form states
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [storyName, setStoryName] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [cancerType, setCancerType] = useState('Breast Cancer');
  const [storyContent, setStoryContent] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { blogs } = useBlogs();

  const filteredArticles = blogs.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || art.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyName || !storyTitle || !storyContent || !email) {
      setFormError('Please fill in all the required fields.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    try {
      await submitSurvivorStory({
        name: storyName,
        storyTitle,
        cancerType,
        content: storyContent,
        inspiration: inspiration || undefined,
        email,
      });
      setStorySubmitted(true);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Unable to reach the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetStoryForm = () => {
    setShowStoryForm(false);
    setStorySubmitted(false);
    setStoryName('');
    setStoryTitle('');
    setCancerType('Breast Cancer');
    setStoryContent('');
    setInspiration('');
    setEmail('');
    setFormError('');
  };

  return (
    <div className="bg-[#F3F6F1] text-[#1B2620] min-h-screen">
      
      {/* ─── Sunrise Arc Hero Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAEFE9] via-[#F4F7F2] to-[#F3F6F1] border-b border-[#0E3B36]/10 pt-28 pb-16 md:pt-36 md:pb-20">
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8A23A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0E3B36]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E3B36]/8 border border-[#0E3B36]/15 text-[#0E3B36] text-xs font-bold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A23A]" />
              <span>Educational Magazine & Survivor Chronicles</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0E3B36] tracking-tight leading-[1.12]">
              Demystifying Oncology, <br />
              <span className="italic font-serif text-[#C8443C]">Amplifying Survivor Light.</span>
            </h1>

            <p className="font-serif-hindi text-lg sm:text-xl text-[#0E3B36]/80 mt-3 font-normal">
              चिकित्सा अंतर्दृष्टि, कीमोथेरेपी पोषण और भारत के साहसी कैंसर विजेताओं की प्रेरणादायी गाथाएं।
            </p>

            <p className="mt-5 text-sm sm:text-base text-[#1B2620]/75 leading-relaxed font-sans max-w-2xl">
              Peer-reviewed clinical guides, dietary recovery frameworks for post-chemotherapy care, and real first-person accounts from patients navigating treatment across Bharat.
            </p>

            {/* Quick Hero Stat Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-6 text-xs text-[#0E3B36] font-semibold">
              <span className="bg-white/80 border border-[#0E3B36]/15 px-3.5 py-1.5 rounded-full shadow-xs">
                📖 48+ Peer-Reviewed Articles
              </span>
              <span className="bg-white/80 border border-[#0E3B36]/15 px-3.5 py-1.5 rounded-full shadow-xs">
                🌸 120+ Survivor Accounts
              </span>
              <span className="bg-white/80 border border-[#0E3B36]/15 px-3.5 py-1.5 rounded-full shadow-xs">
                🥗 Clinical Onco-Diet Protocols
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Area ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {selectedArticle ? (
          /* Full Article Reader View */
          <article className="max-w-4xl mx-auto bg-[#FAFCF8] rounded-3xl border border-[#0E3B36]/12 p-6 sm:p-10 md:p-14 shadow-md space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0E3B36] bg-[#0E3B36]/8 hover:bg-[#0E3B36]/15 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to All Articles
            </button>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#0E3B36] text-[#FAFCF8] text-[11px] font-bold uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-[#1B2620]/60 font-semibold flex items-center gap-1.5 bg-[#0E3B36]/5 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#E8A23A]" /> {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#0E3B36] leading-[1.18] tracking-tight">
                {selectedArticle.title}
              </h1>

              {/* Author Credit Seal */}
              <div className="flex items-center space-x-3.5 border-y border-[#0E3B36]/10 py-4 my-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0E3B36]/10 text-[#0E3B36] flex items-center justify-center font-bold">
                  <User className="w-6 h-6 text-[#0E3B36]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0E3B36] leading-tight flex items-center gap-1.5">
                    {selectedArticle.author}
                    <span className="text-[10px] bg-[#E8A23A]/20 text-[#8B5E00] px-2 py-0.5 rounded-md font-semibold">Verified Clinician</span>
                  </p>
                  <p className="text-xs text-[#1B2620]/60 mt-0.5 font-medium">{selectedArticle.role} • Published {selectedArticle.date}</p>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div className="h-64 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-[#EEF3EF] relative shadow-xs border border-[#0E3B36]/15">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Prose with Fraunces Pull-quote styling */}
            <div className="prose max-w-none text-[#1B2620] font-sans text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line pt-2">
              {selectedArticle.content}
            </div>

            {/* Keywords / Tags */}
            <div className="pt-8 border-t border-[#0E3B36]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E3B36]/70 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {selectedArticle.tags.map(t => (
                  <span key={t} className="bg-white text-[#0E3B36] text-xs font-semibold px-3 py-1 rounded-full border border-[#0E3B36]/15">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B36] hover:text-[#C8443C] transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share Guide
              </button>
            </div>
          </article>
        ) : (
          /* Blog Directory & Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Articles Feed */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Filter Card */}
              <div className="bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/12 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#0E3B36]/50" />
                  <input
                    type="text"
                    placeholder="Search by oncology topic, symptom, or survivor tag..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#0E3B36]/15 text-xs sm:text-sm text-[#1B2620] placeholder-[#1B2620]/40 focus:outline-none focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] transition-all"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { val: 'all', label: 'All Articles' },
                    { val: 'Prevention', label: 'Screening & Prevention' },
                    { val: 'Nutrition', label: 'Chemo & Nutrition' },
                    { val: 'Survivors', label: 'Survivor Stories' },
                    { val: 'Research', label: 'Clinical Research' }
                  ].map(cat => (
                    <button
                      key={cat.val}
                      onClick={() => setCategoryFilter(cat.val as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        categoryFilter === cat.val 
                          ? 'bg-[#0E3B36] text-[#FAFCF8] shadow-sm' 
                          : 'bg-white hover:bg-[#EEF3EF] text-[#1B2620]/80 border border-[#0E3B36]/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length === 0 ? (
                <div className="bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/10 p-12 text-center text-[#1B2620]/60 space-y-3">
                  <BookOpen className="w-12 h-12 text-[#0E3B36]/30 mx-auto" />
                  <p className="font-serif text-lg text-[#0E3B36]">No articles found</p>
                  <p className="text-xs text-[#1B2620]/60">Try searching for other keywords like "diet", "breast", "oral", or reset the category.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
                    className="px-4 py-2 bg-[#0E3B36] text-white rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredArticles.map(art => (
                    <div 
                      key={art.id} 
                      onClick={() => setSelectedArticle(art)}
                      className="bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/12 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="h-52 sm:h-56 bg-[#EEF3EF] relative overflow-hidden">
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <span className="absolute top-3 left-3 bg-[#0E3B36]/90 backdrop-blur-md text-[#FAFCF8] text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                            {art.category}
                          </span>
                        </div>
                        
                        <div className="p-5 sm:p-6 space-y-2.5 text-left">
                          <div className="text-[11px] text-[#1B2620]/60 font-semibold flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#0E3B36]" /> {art.author} • {art.date}
                          </div>
                          <h3 className="font-serif text-lg font-normal text-[#0E3B36] line-clamp-2 leading-snug group-hover:text-[#C8443C] transition-colors">
                            {art.title}
                          </h3>
                          <p className="text-xs text-[#1B2620]/75 line-clamp-3 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#0E3B36]/10 flex items-center justify-between bg-white/40">
                        <span className="text-[11px] text-[#1B2620]/60 font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E8A23A]" /> {art.readTime}
                        </span>
                        <span className="text-xs font-bold text-[#0E3B36] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Share Story & Companion Kit Callout */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Share Story Card */}
              <div className="bg-[#FAFCF8] rounded-3xl border border-[#0E3B36]/12 p-6 sm:p-8 space-y-5 shadow-xs relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[#C8443C]/10 text-[#C8443C] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#C8443C]" fill="currentColor" />
                </div>

                <div className="space-y-2 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8443C]">Voices of Courage</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0E3B36] leading-tight">
                    Share Your Cancer Journey
                  </h3>
                  <p className="text-xs text-[#1B2620]/75 leading-relaxed">
                    Have you or a family member overcome oncology battles? Your firsthand experience can be the exact beacon of courage a newly-diagnosed patient in Bharat needs right now.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowStoryForm(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0E3B36] hover:bg-[#0E3B36]/90 text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#E8A23A]" /> Write Your Survivor Story
                </button>
              </div>

              {/* Patient Helpline / Resource Kit Card */}
              <div className="bg-[#0E3B36] text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <BookOpen className="w-36 h-36 text-white" />
                </div>
                
                <div className="space-y-2 text-left relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#E8A23A]">24/7 Companion Resource</p>
                  <h3 className="font-serif text-xl font-normal text-white leading-snug">
                    Need Direct Educational Pamphlets & Charts?
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Download specialized guides detailing self-breast exams, oral pre-cancer checks, high-protein dietary charts for chemotherapy, and state financial schemes.
                  </p>
                </div>

                <a
                  href="mailto:resources@awarebharat.org"
                  className="block text-center py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/15 relative z-10"
                >
                  Request Educational Care Kit
                </a>
              </div>

              {/* Helpline Quick Dial */}
              <div className="bg-[#EAEFE9] rounded-2xl border border-[#0E3B36]/10 p-5 text-left space-y-2">
                <p className="text-xs font-bold text-[#0E3B36] uppercase tracking-wider">National Patient Helpline</p>
                <p className="text-lg font-mono font-bold text-[#0E3B36]">+91 1800 200 4567</p>
                <p className="text-[11px] text-[#1B2620]/60">Mon-Sat • 9:00 AM to 6:00 PM IST (Free & Confidential)</p>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ─── Share Journey Form Modal ─── */}
      {showStoryForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
          <div className="relative bg-[#FAFCF8] w-full max-w-xl rounded-3xl shadow-2xl border border-[#0E3B36]/20 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-[#0E3B36] px-6 sm:px-8 py-5 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2.5">
                <Heart className="w-5 h-5 text-[#E8A23A]" fill="currentColor" />
                <span className="font-serif text-lg sm:text-xl font-normal text-white">Write Your Survivor Story</span>
              </div>
              <button 
                onClick={handleResetStoryForm} 
                className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
              {!storySubmitted ? (
                <form onSubmit={handleStorySubmit} className="space-y-4 text-left">
                  
                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <p className="text-xs text-[#1B2620]/75 leading-relaxed">
                    We publish vetted stories to inspire patients. Your email remains confidential, and you can submit under a pseudonym if you prefer.
                  </p>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0E3B36] mb-1">
                          Your Name / Alias <span className="text-[#C8443C]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={storyName}
                          onChange={e => setStoryName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E3B36]/20 bg-white text-xs text-[#1B2620] focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] outline-none"
                          placeholder="e.g. Rajeshwar S."
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0E3B36] mb-1">
                          Story Title <span className="text-[#C8443C]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={storyTitle}
                          onChange={e => setStoryTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E3B36]/20 bg-white text-xs text-[#1B2620] focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] outline-none"
                          placeholder="e.g. Overcoming Stage III Lymphoma"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0E3B36] mb-1">
                          Diagnosis / Cancer Type
                        </label>
                        <select
                          value={cancerType}
                          onChange={e => setCancerType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E3B36]/20 bg-white text-xs text-[#1B2620] focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] outline-none"
                        >
                          <option value="Breast Cancer">Breast Cancer</option>
                          <option value="Lymphoma / Leukemia">Lymphoma / Leukemia</option>
                          <option value="Oral / Throat Cancer">Oral / Throat Cancer</option>
                          <option value="Lung Cancer">Lung Cancer</option>
                          <option value="Cervical Cancer">Cervical Cancer</option>
                          <option value="Colorectal Cancer">Colorectal Cancer</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0E3B36] mb-1">
                          Your Email <span className="text-[#C8443C]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E3B36]/20 bg-white text-xs text-[#1B2620] focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] outline-none"
                          placeholder="For verification only"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0E3B36] mb-1">
                        Your Treatment & Recovery Journey <span className="text-[#C8443C]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={storyContent}
                        onChange={e => setStoryContent(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E3B36]/20 bg-white text-xs text-[#1B2620] focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] outline-none"
                        placeholder="Share how you detected it, which hospital helped, treatments undergone, and what gave you strength..."
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0E3B36] mb-1">
                        Inspirational Quote or Message for Patients
                      </label>
                      <textarea
                        rows={2}
                        value={inspiration}
                        onChange={e => setInspiration(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E3B36]/20 bg-white text-xs text-[#1B2620] focus:ring-2 focus:ring-[#0E3B36]/30 focus:border-[#0E3B36] outline-none"
                        placeholder="e.g. You are stronger than any chemo session. Accept care and hold on to hope."
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-[#0E3B36]/10">
                    <button
                      type="button"
                      onClick={handleResetStoryForm}
                      className="w-1/3 py-2.5 rounded-xl border border-[#0E3B36]/20 text-xs font-bold text-[#1B2620] hover:bg-[#EEF3EF] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow py-2.5 rounded-xl bg-[#0E3B36] text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5 text-[#E8A23A]" /> {isSubmitting ? 'Submitting...' : 'Submit Story for Review'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 px-4 space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#0E3B36]/10 rounded-full flex items-center justify-center text-[#0E3B36]">
                    <CheckCircle className="w-10 h-10 text-[#0E3B36]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#0E3B36] font-normal">Story Submitted Successfully</h3>
                    <p className="text-xs text-[#1B2620]/75 mt-1 max-w-sm leading-relaxed">
                      Thank you so much, <strong>{storyName}</strong>. Your account will undergo editorial review. Once verified, it will be published to inspire thousands fighting cancer across Bharat.
                    </p>
                  </div>
                  <button
                    onClick={handleResetStoryForm}
                    className="px-6 py-2.5 bg-[#0E3B36] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
