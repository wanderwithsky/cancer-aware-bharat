import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Target, ShieldAlert, HeartPulse, GraduationCap, GitFork, Tent,
  Clock, Eye, Sparkles, CheckCircle2, ArrowRight, HeartHandshake,
  Users, MapPin, Activity, Stethoscope, ChevronRight, Award, Shield, FileText
} from 'lucide-react';

interface MissionTabProps {
  onOpenVolunteer: () => void;
  onOpenEnquiry: () => void;
}

export default function MissionTab({ onOpenVolunteer, onOpenEnquiry }: MissionTabProps) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'hindi' | 'english'>('hindi');

  const objectives = [
    {
      icon: ShieldAlert,
      titleHi: 'कैंसर के संभावित चेतावनी संकेतों की जागरूकता',
      titleEn: 'Cancer Warning Signs Awareness',
      descHi: 'समुदाय स्तर पर स्तन, मुख (oral), गर्भाशय ग्रीवा और अन्य कैंसर के शुरुआती लक्षणों के प्रति व्यापक जनजागरूकता फैलाना।',
      descEn: 'Spreading wide awareness on early warning signs of breast, oral, cervical and organ cancers at the village level.',
      tag: 'प्रारंभिक पहचान'
    },
    {
      icon: HeartPulse,
      titleHi: 'सामान्य व महिला स्वास्थ्य शिक्षा',
      titleEn: 'Women & Lifestyle Health Education',
      descHi: 'महिला स्वास्थ्य, स्वच्छता, तंबाकू निषेध और पोषण से जुड़े जोखिमों पर नियमित ग्रामीण शिक्षा सत्र एवं काउंसलिंग प्रदान करना।',
      descEn: 'Providing regular rural education sessions and counseling on women health, hygiene, tobacco cessation, and diet risks.',
      tag: 'महिला स्वास्थ्य'
    },
    {
      icon: GraduationCap,
      titleHi: 'स्वयंसेवक व फर्स्ट ऐड प्रशिक्षण',
      titleEn: 'Volunteer First Aid & Safety Training',
      descHi: 'प्रशिक्षित कर्मियों एवं स्वयंसेवकों को प्राथमिक सहायता (First Aid), मरीज सुरक्षा और जिम्मेदार रेफरल जागरूकता में प्रशिक्षित करना।',
      descEn: 'Training grassroot volunteers and caseworkers in First Aid protocols, patient safety standards, and referral scope.',
      tag: 'प्रशिक्षण'
    },
    {
      icon: GitFork,
      titleHi: 'स्पष्ट रेफरल पाथवे विकास',
      titleEn: 'Clear Referral Pathways Development',
      descHi: 'गंभीर या संदिग्ध मरीजों को प्राथमिक केंद्र से सही ऑन्कोलॉजी अस्पताल तक पहुँचाने के लिए स्पष्ट और पारदर्शी रेफरल नेटवर्क तैयार करना।',
      descEn: 'Developing clear, transparent referral channels connecting rural screening nodes with accredited oncology hospitals.',
      tag: 'रेफरल नेटवर्क'
    },
    {
      icon: Tent,
      titleHi: 'ग्रामीण स्वास्थ्य शिविर आयोजन',
      titleEn: 'Rural Health Camps & Workshops',
      descHi: 'गाँव और समुदाय स्तर पर विशेषज्ञ डॉक्टरों के मार्गदर्शन में निःशुल्क मोबाइल जांच शिविर और स्वास्थ्य जागरूकता कार्यक्रम संचालित करना।',
      descEn: 'Operating free mobile screening camps and wellness workshops in rural villages under expert medical guidance.',
      tag: 'निःशुल्क शिविर'
    },
    {
      icon: Clock,
      titleHi: 'फॉलो-अप कोऑर्डिनेशन सिस्टम',
      titleEn: 'Patient Follow-up Coordination',
      descHi: 'रेफर किए गए मरीजों के लिए अस्पताल अपॉइंटमेंट, जांच रिपोर्ट और आगे के उपचार में उपलब्ध व्यवस्था अनुसार निरंतर फॉलो-अप सहयोग देना।',
      descEn: 'Providing continuous follow-up coordination for hospital appointments, diagnostic reports, and ongoing therapy support.',
      tag: 'फॉलो-अप सहयोग'
    }
  ];

  const referralSteps = [
    {
      step: '01',
      titleHi: 'गाँव स्तर पर जांच व स्क्रीनिंग',
      titleEn: 'Grassroots Risk Screening',
      descHi: 'ग्रामीण शिविरों में स्वयंसेवक और पैरामेडिक्स द्वारा प्राथमिक लक्षण स्क्रीनिंग और जोखिम मूल्यांकन।',
      descEn: 'Grassroots symptom screening and risk assessment conducted by paramedics and trained volunteers at rural camps.'
    },
    {
      step: '02',
      titleHi: 'जिम्मेदार रेफरल सहायता',
      titleEn: 'Responsible Referral Navigation',
      descHi: 'संदिग्ध मामले में मरीज और परिवार को निकटतम अनुबंधित कैंसर अस्पताल के विशेषज्ञ के पास रेफर करना।',
      descEn: 'Navigating suspected patient cases to accredited partner oncology hospitals with verified referral slips.'
    },
    {
      step: '03',
      titleHi: 'प्राथमिकता अस्पताल जांच',
      titleEn: 'Priority Clinical Examination',
      descHi: 'अस्पताल नोड पर बायोप्सी, मैमोग्राफी और स्कैन के लिए रियायती या प्राथमिकता स्लॉट बुक करना।',
      descEn: 'Booking priority slots for diagnostic biopsy, mammography, and PET-CT scans at hospital network nodes.'
    },
    {
      step: '04',
      titleHi: 'सतत फॉलो-अप व सहायता',
      titleEn: 'Continuous Follow-up Support',
      descHi: 'इलाज के दौरान मरीज के परिवार से संवाद, पोषण मार्गदर्शन और सरकारी सहायता का समन्वय।',
      descEn: 'Maintaining continuous contact with patient families for treatment adherence, nutrition guides, and financial aid coordination.'
    }
  ];

  return (
    <div className="bg-[#F3F6F1] text-[#1B2620] min-h-screen">
      
      {/* ─── Sunrise Arc Hero Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAEFE9] via-[#F4F7F2] to-[#F3F6F1] border-b border-[#0E3B36]/10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8A23A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0E3B36]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E3B36]/8 border border-[#0E3B36]/15 text-[#0E3B36] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A23A]" />
              <span>OUR STRATEGIC CHARTER / हमारा मिशन एवं चार्टर</span>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-white/90 p-1 rounded-xl border border-[#0E3B36]/15 text-xs font-bold shadow-xs">
              <button
                onClick={() => setLang('hindi')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  lang === 'hindi' ? 'bg-[#0E3B36] text-white shadow-xs' : 'text-[#0E3B36]/70 hover:text-[#0E3B36]'
                }`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => setLang('english')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  lang === 'english' ? 'bg-[#0E3B36] text-white shadow-xs' : 'text-[#0E3B36]/70 hover:text-[#0E3B36]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0E3B36] tracking-tight leading-[1.12]">
              {lang === 'hindi' ? (
                <>
                  समुदाय-आधारित स्वास्थ्य क्रांति व <br />
                  <span className="italic font-serif text-[#C8443C]">जिम्मेदार रेफरल सहायता।</span>
                </>
              ) : (
                <>
                  Grassroots Oncology & <br />
                  <span className="italic font-serif text-[#C8443C]">Responsible Referral Pathways.</span>
                </>
              )}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#1B2620]/80 leading-relaxed max-w-3xl">
              {lang === 'hindi' ? (
                'हमारा मिशन गाँव-गाँव स्वास्थ्य जागरूकता और जिम्मेदार रेफरल सहायता का ऐसा समुदाय-आधारित नेटवर्क विकसित करना है, जो लोगों को संभावित गंभीर स्वास्थ्य संकेतों के प्रति जागरूक करे और उन्हें समय पर उचित चिकित्सा सेवा तक पहुँचने के लिए प्रेरित एवं सहयोग करे।'
              ) : (
                'Our mission is to build a grassroots, community-driven network for health awareness and responsible referral support across every village—empowering people to recognize critical health signals early and guiding them towards timely, expert medical care.'
              )}
            </p>

            <div className="flex flex-wrap gap-3.5 pt-4">
              <button
                onClick={onOpenVolunteer}
                className="px-6 py-3 rounded-xl bg-[#0E3B36] hover:bg-[#0E3B36]/90 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Users className="w-4 h-4 text-[#E8A23A]" />
                <span>{lang === 'hindi' ? 'स्वयंसेवक के रूप में जुड़ें' : 'Join as Volunteer Advocate'}</span>
              </button>

              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 rounded-xl bg-white hover:bg-[#EEF3EF] border border-[#0E3B36]/20 text-[#0E3B36] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <HeartHandshake className="w-4 h-4 text-[#C8443C]" />
                <span>{lang === 'hindi' ? 'शिविर व सहायता अनुरोध' : 'Request Screening Camp'}</span>
              </button>
            </div>
          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#0E3B36]/10">
            {[
              { label: 'Target Rural Districts', val: '50+' },
              { label: 'Screening Camps Held', val: '180+' },
              { label: 'Certified Caseworkers', val: '2,400+' },
              { label: 'Patient Guidance Cases', val: '1,240+' }
            ].map((st, i) => (
              <div key={i} className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-[#0E3B36]/10 text-center shadow-xs">
                <p className="font-serif text-2xl sm:text-3xl text-[#0E3B36] font-normal">{st.val}</p>
                <p className="text-xs text-[#1B2620]/65 font-medium mt-1">{st.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Mission Philosophy & Core Manifesto ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 space-y-16">
        
        {/* Core Manifesto Card */}
        <section className="bg-[#FAFCF8] rounded-3xl p-8 sm:p-12 border border-[#0E3B36]/12 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-[#0E3B36]">
            <div className="w-12 h-12 rounded-2xl bg-[#0E3B36]/8 flex items-center justify-center font-bold">
              <Target className="w-6 h-6 text-[#0E3B36]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8443C]">Foundational Philosophy</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E3B36]">
                हमारा मूल मिशन एवं उद्देश्य
              </h2>
            </div>
          </div>

          <div className="bg-[#EEF3EF] p-6 sm:p-8 rounded-2xl border border-[#0E3B36]/10 space-y-4">
            <p className="font-serif-hindi text-base sm:text-lg text-[#0E3B36] leading-relaxed font-normal border-l-4 border-[#E8A23A] pl-4">
              "हमारा मिशन गाँव-गाँव स्वास्थ्य जागरूकता और जिम्मेदार रेफरल सहायता का ऐसा समुदाय-आधारित नेटवर्क विकसित करना है, जो लोगों को संभावित गंभीर स्वास्थ्य संकेतों के प्रति जागरूक करे और उन्हें समय पर उचित चिकित्सा सेवा तक पहुँचने के लिए प्रेरित एवं सहयोग करे।"
            </p>
            <p className="text-xs sm:text-sm text-[#1B2620]/75 leading-relaxed italic">
              At Cancer Aware Bharat, we believe no individual should suffer due to lack of timely health information or diagnostic hesitation. By establishing verified grassroots referral pathways, we bridge the gap between rural families and advanced clinical oncology centers.
            </p>
          </div>
        </section>

        {/* ─── 6 Strategic Objectives Grid ─── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0E3B36]/8 text-[#0E3B36] text-xs font-bold uppercase tracking-wider border border-[#0E3B36]/15">
              CORE OBJECTIVES / मुख्य रणनीतिक उद्देश्य
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#0E3B36]">
              हमारे 6 मुख्य रणनीतिक स्तम्भ
            </h2>
            <p className="text-xs sm:text-sm text-[#1B2620]/70">
              समुदाय स्तर पर कैंसर जागरूकता से लेकर अस्पताल फॉलो-अप तक हमारी चरणबद्ध कार्ययोजना।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, index) => {
              const Icon = obj.icon;
              return (
                <div
                  key={index}
                  className="bg-[#FAFCF8] rounded-2xl p-6 sm:p-7 border border-[#0E3B36]/12 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#0E3B36]/8 flex items-center justify-center border border-[#0E3B36]/15 group-hover:bg-[#0E3B36] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6 text-[#0E3B36] group-hover:text-[#E8A23A] transition-colors" />
                      </div>
                      <span className="font-serif text-xl font-normal text-[#0E3B36]/30 group-hover:text-[#0E3B36] transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-block px-2.5 py-0.5 rounded bg-[#E8A23A]/15 text-[#8B5E00] text-[10px] font-bold uppercase tracking-wider mb-1">
                        {obj.tag}
                      </div>
                      <h3 className="font-serif text-lg font-normal text-[#0E3B36] group-hover:text-[#C8443C] transition-colors leading-snug">
                        {lang === 'hindi' ? obj.titleHi : obj.titleEn}
                      </h3>
                      <p className="text-xs text-[#1B2620]/75 leading-relaxed">
                        {lang === 'hindi' ? obj.descHi : obj.descEn}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0E3B36]/10 mt-5 flex items-center justify-between text-[11px] font-bold text-[#0E3B36]/60 group-hover:text-[#0E3B36]">
                    <span>Standardized Clinical Protocol</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 4-Stage Referral Pathway Navigation Ribbon ─── */}
        <section className="bg-[#0E3B36] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-white/10 text-[#E8A23A] text-xs font-bold uppercase tracking-wider border border-white/15">
              RESPONSIBLE REFERRAL PATHWAYS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              मरीज यात्रा एवं रेफरल प्रवाह (Patient Navigation Workflow)
            </h2>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              गाँव स्तर की शुरुआती जांच से लेकर सुपर-स्पेशियलिटी ऑन्कोलॉजी अस्पताल उपचार तक 4 पारदर्शी चरण।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {referralSteps.map((s, idx) => (
              <div key={idx} className="bg-white/8 border border-white/15 rounded-2xl p-6 space-y-3 backdrop-blur-sm relative">
                <span className="font-serif text-2xl font-normal text-[#E8A23A]">{s.step}</span>
                <h3 className="font-bold text-sm text-white">
                  {lang === 'hindi' ? s.titleHi : s.titleEn}
                </h3>
                <p className="text-xs text-white/75 leading-relaxed">
                  {lang === 'hindi' ? s.descHi : s.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Strategic Horizon Bento Grid ─── */}
        <section className="bg-[#FAFCF8] rounded-3xl p-8 sm:p-12 border border-[#0E3B36]/12 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-[#0E3B36]">
            <div className="w-12 h-12 rounded-2xl bg-[#C8443C]/10 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6 text-[#C8443C]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E3B36]/70">Strategic Horizon</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E3B36]">
                हमारा दीर्घकालिक विज़न (Our Long-Term Vision)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-[#EEF3EF] p-6 sm:p-8 rounded-2xl border border-[#0E3B36]/10 space-y-4">
              <h3 className="font-serif text-xl font-normal text-[#0E3B36]">
                जागरूक एवं कैंसर-सचेत ग्रामीण समाज की परिकल्पना
              </h3>
              <p className="font-serif-hindi text-sm text-[#1B2620]/80 leading-relaxed">
                एक ऐसा जागरूक समाज, जहाँ गंभीर बीमारी के संभावित संकेतों को समय रहते पहचाना जाए, लोग उचित चिकित्सकीय परामर्श लेने में अनावश्यक देरी न करें और ग्रामीण समुदायों को सही स्वास्थ्य जानकारी एवं रेफरल सहायता उपलब्ध हो।
              </p>
              <p className="text-xs text-[#1B2620]/65 leading-relaxed border-t border-[#0E3B36]/10 pt-3">
                We envision an empowered society where early warning signs of life-threatening illnesses are recognized without delay, clinical consultations are sought promptly, and rural families receive verified healthcare navigation at their doorstep.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              {[
                { title: 'Zero Delay in Medical Consultation', desc: 'Removing fear & stigma around cancer screening' },
                { title: '100% Verified Hospital Networks', desc: 'Direct tie-ups with NABH oncology institutes' },
                { title: 'Community Caseworkers in Every Block', desc: 'Trained local youth guiding patients end-to-end' }
              ].map((v, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-[#0E3B36]/10 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#0E3B36] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-[#0E3B36]">{v.title}</h4>
                    <p className="text-[11px] text-[#1B2620]/65">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4 Core Values ─── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E3B36]">हमारे 4 मूल सिद्धांत व प्रतिबद्धता</h2>
            <p className="text-xs text-[#1B2620]/65">Guided by clinical integrity, patient dignity, and transparent healthcare navigation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'नैदानिक सत्यनिष्ठा (Clinical Integrity)', desc: 'केवल प्रमाणित विशेषज्ञों और मान्यता प्राप्त अस्पतालों के साथ कार्य करना।', icon: Shield },
              { title: 'मरीज की गरिमा (Patient Dignity)', desc: 'हर ग्रामीण नागरिक के प्रति सम्मान, संवेदनशीलता और गोपनीयता।', icon: HeartPulse },
              { title: 'समयबद्ध कारवाही (Timely Action)', desc: 'लक्षण दिखाई देने से लेकर जांच तक न्यूनतम प्रतीक्षा समय।', icon: Clock },
              { title: 'निःशुल्क परामर्श (Free Assistance)', desc: 'रेफरल और मार्गदर्शन सहायता पूर्णतः पारदर्शी व निःशुल्क।', icon: Award }
            ].map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={i} className="bg-[#FAFCF8] p-5 sm:p-6 rounded-2xl border border-[#0E3B36]/12 space-y-2.5 text-center shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E3B36]/8 text-[#0E3B36] flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs text-[#0E3B36]">{val.title}</h3>
                  <p className="text-[11px] text-[#1B2620]/70 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Call to Action Footer ─── */}
        <section className="bg-gradient-to-r from-[#0E3B36] via-[#134F49] to-[#0E3B36] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              क्या आप हमारे मिशन से जुड़ना चाहते हैं?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              स्वास्थ्य जागरूकता और जिम्मेदार रेफरल के इस जनस्वास्थ्य अभियान में स्वयंसेवक बनें या अपने गाँव/क्षेत्र में निःशुल्क कैंसर स्क्रीनिंग शिविर आयोजित कराएं।
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3.5">
            <button
              onClick={onOpenVolunteer}
              className="px-6 py-3 rounded-xl bg-white hover:bg-[#F4F7F2] text-[#0E3B36] font-bold text-xs sm:text-sm shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
            >
              Become a Volunteer / स्वयंसेवक बनें
            </button>

            <button
              onClick={onOpenEnquiry}
              className="px-6 py-3 rounded-xl bg-[#E8A23A] hover:bg-[#D49129] text-[#1B2620] font-bold text-xs sm:text-sm shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
            >
              Request Screening Camp / शिविर हेतु संपर्क
            </button>
          </div>
        </section>

      </div>

    </div>
  );
}
