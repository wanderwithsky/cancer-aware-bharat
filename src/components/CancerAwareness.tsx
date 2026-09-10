import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronRight, Sparkles, Search as SearchIcon, Apple, Cigarette, 
  Dumbbell, Sun, Syringe, AlertTriangle, Activity, Info, Shield, 
  Heart, CheckCircle2, ChevronDown, ArrowRight, BookOpen
} from 'lucide-react';

const CANCER_TYPES = [
  { title: 'Oral Cancer', desc: 'Often caused by tobacco & supari use. Look for non-healing ulcers or white/red patches in the mouth.', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=300' },
  { title: 'Breast Cancer', desc: 'Early detection through regular monthly self-exams and annual mammograms drastically improves survival rates.', img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=400&h=300' },
  { title: 'Cervical Cancer', desc: 'Highly preventable with the HPV vaccine and regular Pap smear screenings for women aged 30 and above.', img: 'https://images.unsplash.com/photo-1579684453377-48ec05c6b30a?auto=format&fit=crop&q=80&w=400&h=300' },
  { title: 'Lung Cancer', desc: 'Primarily linked with bidi/cigarette smoking and severe air pollution. Quitting dramatically reduces risk.', img: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400&h=300' },
  { title: 'Blood & Lymph Node Cancers', desc: 'Includes leukemia and lymphoma. Watch for persistent unexplained fatigue, fever, or painless swollen glands.', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400&h=300' },
  { title: 'Colorectal Cancer', desc: 'Screening with stool tests and colonoscopy catches polyps before they turn malignant. High fiber diet is protective.', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400&h=300' },
];

const EARLY_SIGNS = [
  'Persistent fatigue or extreme tiredness lasting weeks',
  'Unexplained, rapid weight loss (5+ kg without dieting)',
  'Changes in bowel or bladder habits (blood in stool/urine)',
  'A sore, ulcer, or mouth patch that does not heal within 2 weeks',
  'A painless thickening or lump in the breast, neck, or groin',
  'Persistent indigestion, acidity, or difficulty swallowing',
  'Obvious changes in size, color, or shape of a mole',
  'Nagging chronic cough or persistent hoarseness of voice',
];

const RISK_FACTORS = [
  { icon: Cigarette, title: 'Tobacco & Gutkha Use', desc: 'Smoking and chewing tobacco are the leading preventable causes of cancer worldwide, especially in Bharat.' },
  { icon: Activity, title: 'Diet & Sedentary Lifestyle', desc: 'High-fat diets, deep-fried ultra-processed foods, and lack of exercise contribute significantly to metabolic oncology risk.' },
  { icon: Sun, title: 'Excessive UV Radiation', desc: 'Prolonged unprotected sun exposure can lead to skin damage and melanomas.' },
  { icon: Shield, title: 'Genetic & Family Predisposition', desc: 'A family history of early-onset cancer may indicate hereditary genetic markers (BRCA1/2, Lynch Syndrome).' },
];

const LIFESTYLE_TIPS = [
  { title: 'Eat a Diverse Plant-Rich Diet', desc: 'Fill your daily plate with seasonal local greens, turmeric, garlic, pulses, and whole grains.' },
  { title: 'Absolute Tobacco Cessation', desc: 'Eliminate all forms of smoked and smokeless tobacco, gutkha, and khaini immediately.' },
  { title: 'Daily 30-Min Physical Movement', desc: 'Brisk walking, yoga, or cycling strengthens natural immune surveillance.' },
  { title: 'Proactive Annual Health Checkups', desc: 'Schedule regular clinical screenings and blood tests after age 40.' },
];

const FAQS = [
  { q: 'At what age should I start cancer screenings?', a: 'It varies by cancer type. Generally, women should begin clinical breast exams and cervical Pap screenings at 25-30, and mammograms around 40-45. Both men and women should begin colorectal cancer screenings at 45. Discuss family history with your doctor for custom timelines.' },
  { q: 'Are all lumps and tumors cancerous?', a: 'No, most lumps turn out to be benign (non-cancerous cysts or fibroids). However, a definitive clinical biopsy or fine needle aspiration (FNAC) is essential to confirm diagnosis without guesswork.' },
  { q: 'Is cancer completely genetic or environmental?', a: 'Only about 5-10% of cancers are strongly linked to inherited genetic mutations. The vast majority (90%+) arise from environmental, lifestyle, and dietary exposures accumulated over a lifetime.' },
  { q: 'How effective is early detection for cancer survival?', a: 'Early detection is transformative. When detected at Stage I, survival rates for breast, oral, and cervical cancers exceed 85-95% with standard, less invasive treatments.' },
];

export default function CancerAwareness() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F3F6F1] text-[#1B2620] min-h-screen">
      
      {/* ─── Sunrise Arc Hero Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAEFE9] via-[#F4F7F2] to-[#F3F6F1] border-b border-[#0E3B36]/10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8A23A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0E3B36]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E3B36]/8 border border-[#0E3B36]/15 text-[#0E3B36] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A23A]" />
              <span>Public Health Education / जनस्वास्थ्य शिक्षा</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0E3B36] tracking-tight leading-[1.12]">
              Knowledge is the First Step to <br />
              <span className="italic font-serif text-[#C8443C]">Cancer Prevention.</span>
            </h1>

            <p className="font-serif-hindi text-lg sm:text-xl text-[#0E3B36]/80 font-normal">
              समय पर जांच, सही जानकारी और जीवनशैली में सुधार — हर जीवन की सुरक्षा का आधार।
            </p>

            <p className="text-sm sm:text-base text-[#1B2620]/75 leading-relaxed font-sans max-w-2xl">
              Understanding subtle warning signals, avoiding tobacco risks, and adopting evidence-backed preventive habits empowers families to detect cancer when it is most curable.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-4">
              <button
                onClick={() => navigate('/events')}
                className="px-6 py-3 rounded-xl bg-[#0E3B36] hover:bg-[#0E3B36]/90 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Find Free Screening Camp</span>
                <ArrowRight className="w-4 h-4 text-[#E8A23A]" />
              </button>

              <button
                onClick={() => navigate('/blogs')}
                className="px-6 py-3 rounded-xl bg-white hover:bg-[#EEF3EF] border border-[#0E3B36]/20 text-[#0E3B36] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#C8443C]" />
                <span>Read Clinical Guides</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Container ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        
        {/* ─── 6 Prevention Pillars Grid ─── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0E3B36]/8 text-[#0E3B36] text-xs font-bold uppercase tracking-wider border border-[#0E3B36]/15">
              PREVENTION PROTOCOLS / बचाव के उपाय
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#0E3B36]">
              6 स्तम्भ जो आपके जोखिम को घटाते हैं
            </h2>
            <p className="text-xs sm:text-sm text-[#1B2620]/70">
              दैनिक जीवन में छोटे बदलाव आपको और आपके परिवार को गंभीर बीमारियों से सुरक्षित रख सकते हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: SearchIcon, title: 'Periodic Screenings', desc: 'Schedule annual checkups, oral exams, and age-appropriate mammography scans.', tag: 'जांच' },
              { icon: Apple, title: 'Nourishing Diet', desc: 'Eat antioxidant-rich fruits, leafy vegetables, and whole grains. Limit ultra-processed foods.', tag: 'पोषण' },
              { icon: Cigarette, title: '100% Tobacco-Free', desc: 'Quit bidi, cigarettes, and gutkha — the #1 preventable cause of oral and lung cancers.', tag: 'तंबाकू निषेध' },
              { icon: Dumbbell, title: 'Daily Physical Activity', desc: 'Engage in 30 minutes of moderate exercise daily to maintain optimal BMI and immunity.', tag: 'व्यायाम' },
              { icon: Sun, title: 'Sun & Toxin Protection', desc: 'Protect skin with hats/sunscreen and use masks when exposed to industrial dust/fumes.', tag: 'सुरक्षा' },
              { icon: Syringe, title: 'Preventive Vaccines', desc: 'HPV and Hepatitis B vaccines offer robust protection against cervical and liver cancers.', tag: 'टीकाकरण' },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="bg-[#FAFCF8] rounded-2xl p-6 border border-[#0E3B36]/12 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0E3B36]/8 text-[#0E3B36] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8A23A]/15 text-[#8B5E00] text-[10px] font-bold uppercase tracking-wider">
                      {tip.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#0E3B36]">{tip.title}</h3>
                  <p className="text-xs text-[#1B2620]/75 leading-relaxed">{tip.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Types of Cancer We Address ─── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0E3B36]/8 text-[#0E3B36] text-xs font-bold uppercase tracking-wider border border-[#0E3B36]/15">
              COMMON CANCERS / प्रमुख कैंसर प्रकार
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#0E3B36]">
              Types of Cancer We Address
            </h2>
            <p className="text-xs sm:text-sm text-[#1B2620]/70">
              Understanding specific cancer profiles helps in targeted early screening and timely medical consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CANCER_TYPES.map((type, i) => (
              <div key={i} className="bg-[#FAFCF8] rounded-2xl border border-[#0E3B36]/12 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="h-48 overflow-hidden bg-[#EEF3EF] relative">
                  <img src={type.img} alt={type.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="font-serif text-lg font-normal text-[#0E3B36] group-hover:text-[#C8443C] transition-colors">{type.title}</h3>
                  <p className="text-xs text-[#1B2620]/75 leading-relaxed flex-1">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Early Warning Signs & Risk Factors Bento ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Early Signs Box */}
          <div className="lg:col-span-6 bg-[#FAFCF8] rounded-3xl p-7 sm:p-9 border border-[#0E3B36]/12 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C8443C]/10 text-[#C8443C] flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#0E3B36] mb-1">Early Warning Signs</h3>
              <p className="text-xs text-[#1B2620]/70 mb-5">Do not ignore persistent changes in your body.</p>

              <ul className="space-y-3">
                {EARLY_SIGNS.map((sign, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0E3B36] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#1B2620]/85 font-medium leading-relaxed">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-[#C8443C] italic font-medium pt-4 border-t border-[#0E3B36]/10">
              *If you experience any of these symptoms persistently for more than two weeks, please consult a physician.
            </p>
          </div>

          {/* Risk Factors Box */}
          <div className="lg:col-span-6 bg-[#FAFCF8] rounded-3xl p-7 sm:p-9 border border-[#0E3B36]/12 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8A23A]/15 text-[#8B5E00] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#0E3B36] mb-1">Common Risk Factors</h3>
              <p className="text-xs text-[#1B2620]/70 mb-5">Recognizing environmental & lifestyle triggers empowers you to modify them.</p>

              <div className="space-y-3.5">
                {RISK_FACTORS.map((risk, i) => {
                  const Icon = risk.icon;
                  return (
                    <div key={i} className="bg-white p-4 rounded-xl border border-[#0E3B36]/10 shadow-xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#0E3B36]/8 text-[#0E3B36] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#0E3B36] mb-0.5">{risk.title}</h4>
                        <p className="text-[11px] text-[#1B2620]/75 leading-relaxed">{risk.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-[#1B2620]/60 italic pt-4 border-t border-[#0E3B36]/10">
              90%+ of oncological triggers can be mitigated through early awareness and lifestyle intervention.
            </p>
          </div>

        </section>

        {/* ─── Healthy Lifestyle Tips Dusk Container ─── */}
        <section className="bg-[#0E3B36] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
            <Heart className="w-10 h-10 text-[#E8A23A] mx-auto" />
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              Daily Habits for Cellular Resilience
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-sans">
              Simple, consistent holistic practices form your body's strongest internal defense against neoplastic mutations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {LIFESTYLE_TIPS.map((tip, i) => (
              <div key={i} className="bg-white/8 border border-white/15 rounded-2xl p-6 space-y-2 backdrop-blur-sm">
                <h3 className="font-serif text-base text-[#E8A23A] font-normal">{tip.title}</h3>
                <p className="text-xs text-white/75 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ Accordion ─── */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E3B36]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#1B2620]/70">
              Medical answers to common queries regarding screening age, tumor types, and genetic predisposition.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-[#0E3B36]/12 rounded-2xl overflow-hidden bg-[#FAFCF8] shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none hover:bg-[#EEF3EF] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-sm sm:text-base text-[#0E3B36] font-normal pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#0E3B36] transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180 text-[#E8A23A]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 text-xs sm:text-sm text-[#1B2620]/75 leading-relaxed border-t border-[#0E3B36]/8 pt-3 font-sans">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Call to Action ─── */}
        <section className="bg-gradient-to-r from-[#0E3B36] via-[#134F49] to-[#0E3B36] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              Take Action for Your Community Today
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              Join hands with Cancer Aware Bharat to spread early detection in your locality or register for an upcoming screening assembly.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3.5">
            <button
              onClick={() => navigate('/join-us')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-[#F4F7F2] text-[#0E3B36] font-bold text-xs sm:text-sm shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
            >
              Become a Volunteer Advocate
            </button>

            <button
              onClick={() => navigate('/events')}
              className="px-6 py-3 rounded-xl bg-[#E8A23A] hover:bg-[#D49129] text-[#1B2620] font-bold text-xs sm:text-sm shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
            >
              Explore Free Screening Camps
            </button>
          </div>
        </section>

      </div>

    </div>
  );
}
