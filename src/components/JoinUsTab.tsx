import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  UserPlus, ShieldAlert, CheckCircle2, Heart, Users, MapPin,
  Calendar, Building2, Sparkles, AlertTriangle, Send, FileText,
  HeartHandshake, ChevronRight, Phone, Mail, Award, Target, Eye, LogIn
} from 'lucide-react';
import { ApiError, registerVolunteer } from '../api/client';

interface VolunteerRole {
  id: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  badgeHi: string;
}

const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'community_advocate',
    titleHi: 'सामुदायिक जागरूकता स्वयंसेवक',
    titleEn: 'Community Awareness Advocate',
    descHi: 'अपने क्षेत्र या गाँव में पोस्टर, लीफलेट और संवाद माध्यमों से कैंसर चेतावनी संकेतों के प्रति जागरूकता फैलाना।',
    descEn: 'Spreading early cancer detection signs through posters, leaflets, and community meets in your village.',
    badgeHi: 'जागरूकता प्रसार'
  },
  {
    id: 'camp_coordinator',
    titleHi: 'स्वास्थ्य शिविर समन्वयक',
    titleEn: 'Screening Camp Coordinator',
    descHi: 'स्थानीय क्षेत्रों में निःशुल्क मोबाइल कैंसर जांच शिविरों के स्थान चयन, प्रचार और मरीज कतार प्रबंधन में सहायता करना।',
    descEn: 'Assisting in local venue setup, registration desks, and patient flow for free mobile clinical screening camps.',
    badgeHi: 'शिविर प्रबंधन'
  },
  {
    id: 'patient_guide',
    titleHi: 'मरीज सहायता व रेफरल मार्गदर्शक',
    titleEn: 'Patient Referral & Support Guide',
    descHi: 'संदिग्ध लक्षणों वाले मरीजों को नजदीकी अनुबंधित अस्पताल तक सही मार्गदर्शन और सेकंड ओपिनियन सहायता देना।',
    descEn: 'Guiding suspected patient cases to nearby partner oncology centers for diagnostic exams.',
    badgeHi: 'मरीज मार्गदर्शन'
  },
  {
    id: 'youth_student',
    titleHi: 'युवा व छात्र स्वयंसेवक',
    titleEn: 'Youth & Student Volunteer',
    descHi: 'कॉलेज, युवा क्लबों और सोशल मीडिया माध्यमों से युवाओं को प्रिवेंटिव हेल्थ व तंबाकू निषेध अभियानों से जोड़ना।',
    descEn: 'Mobilizing student networks and youth clubs for anti-tobacco and preventive wellness campaigns.',
    badgeHi: 'युवा संबल'
  }
];

export default function JoinUsTab() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>('community_advocate');
  const [lang, setLang] = useState<'hindi' | 'english'>('hindi');

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [districtState, setDistrictState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName || !phone || !districtState || !email || !password) {
      setFormError('कृपया सभी आवश्यक फ़ील्ड भरें। (Please fill in all required fields.)');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('पासवर्ड मेल नहीं खाते। (Passwords do not match.)');
      return;
    }
    if (password.length < 8) {
      setFormError('पासवर्ड कम से कम 8 अक्षरों का होना चाहिए। (Password must be at least 8 characters.)');
      return;
    }

    setIsSubmitting(true);
    try {
      const roleTitle = VOLUNTEER_ROLES.find(r => r.id === selectedRole)?.titleEn ?? selectedRole;
      const volunteer = await registerVolunteer({
        name: fullName,
        email: email.trim(),
        phone,
        password,
        area: districtState,
        motivation: notes ? `${roleTitle} -- ${notes}` : roleTitle,
      });
      setRefId(volunteer.volunteerId);
      setIsSubmitted(true);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें। (Unable to reach the server. Please try again.)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F3F6F1] text-[#1B2620] min-h-screen">
      
      {/* ─── Sunrise Arc Hero Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAEFE9] via-[#F4F7F2] to-[#F3F6F1] border-b border-[#0E3B36]/10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8A23A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0E3B36]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E3B36]/8 border border-[#0E3B36]/15 text-[#0E3B36] text-xs font-bold tracking-wider uppercase">
              <Users className="w-3.5 h-3.5 text-[#E8A23A]" />
              <span>VOLUNTEER PORTAL / स्वयंसेवक पंजीकरण</span>
            </div>

            {/* Language & Login Toggle */}
            <div className="flex flex-wrap items-center gap-3">
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

              <button
                onClick={() => navigate('/volunteer/login')}
                className="px-4 py-2 rounded-xl bg-white border border-[#0E3B36]/15 text-[#0E3B36] font-bold text-xs hover:bg-[#EEF3EF] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#E8A23A]" />
                <span>Volunteer Login</span>
              </button>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0E3B36] tracking-tight leading-[1.12]">
              {lang === 'hindi' ? (
                <>
                  स्वेच्छा से जुड़ें और <br />
                  <span className="italic font-serif text-[#C8443C]">कैंसर-सचेत भारत का निर्माण करें।</span>
                </>
              ) : (
                <>
                  Join Our Grassroots Mission as a <br />
                  <span className="italic font-serif text-[#C8443C]">Volunteer Advocate.</span>
                </>
              )}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#1B2620]/80 leading-relaxed max-w-3xl">
              {lang === 'hindi' ? (
                'स्वास्थ्य जागरूकता केवल चिकित्सकों का कार्य नहीं—जिम्मेदार समुदाय सहभागिता भी इसकी महत्वपूर्ण शक्ति है। यदि आप अपनी स्वेच्छा (Free Will) से अपने गाँव या शहर में सही स्वास्थ्य जानकारी और जिम्मेदार रेफरल जागरूकता बढ़ाने में योगदान देना चाहते हैं, तो स्वयंसेवक के रूप में अपनी रुचि दर्ज करें।'
              ) : (
                'Healthcare awareness is powered by compassionate community volunteers. If you wish to dedicate your time and effort out of your own free will to guide families, spread early screening awareness, and support patients, join us today.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content Container ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        
        {/* Statutory Declaration Box */}
        <section className="bg-[#E8A23A]/10 border border-[#E8A23A]/30 rounded-2xl p-5 sm:p-7 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E8A23A] text-[#1B2620] flex items-center justify-center shrink-0 font-bold mt-0.5 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-[#0E3B36] uppercase tracking-wider flex items-center gap-2">
                <span>IMPORTANT STATUTORY DECLARATION / वैधानिक घोषणा</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#1B2620]/90 leading-relaxed font-medium">
                "मिशन से जुड़ना किसी व्यक्ति को ‘डॉक्टर’, ‘चिकित्सक’ या independent medical practitioner का दर्जा अथवा चिकित्सा अभ्यास का अधिकार प्रदान नहीं करता। भूमिका, प्रशिक्षण और गतिविधियाँ निर्धारित SOP, योग्यता और लागू कानून के अधीन होंगी।"
              </p>
              <p className="text-[11px] text-[#1B2620]/70 leading-relaxed italic">
                Joining the mission as a volunteer does NOT grant any individual the title, status, or right to practice medicine. All volunteer roles strictly adhere to non-clinical health awareness SOPs.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Choose Volunteer Role ─── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0E3B36]/8 text-[#0E3B36] text-xs font-bold uppercase tracking-wider border border-[#0E3B36]/15">
              VOLUNTEER ROLES / स्वयंसेवक की भूमिकाएं
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#0E3B36]">
              अपनी इच्छानुसार भूमिका चुनें
            </h2>
            <p className="text-xs sm:text-sm text-[#1B2620]/70">
              अपनी रुचि और सामर्थ्य के अनुसार स्वयंसेवक की भूमिका का चयन करें।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VOLUNTEER_ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`bg-[#FAFCF8] rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'border-[#0E3B36] ring-2 ring-[#0E3B36]/20 shadow-lg bg-white'
                      : 'border-[#0E3B36]/12 hover:border-[#0E3B36]/40 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#0E3B36]/8 text-[#0E3B36] text-[10px] font-bold uppercase tracking-wider">
                        {role.badgeHi}
                      </span>
                      <input
                        type="radio"
                        name="volunteerRole"
                        checked={isSelected}
                        onChange={() => setSelectedRole(role.id)}
                        className="w-4 h-4 text-[#0E3B36] focus:ring-[#0E3B36] cursor-pointer"
                      />
                    </div>

                    <h3 className="font-serif text-lg font-normal text-[#0E3B36] group-hover:text-[#C8443C] transition-colors">
                      {lang === 'hindi' ? role.titleHi : role.titleEn}
                    </h3>

                    <p className="text-xs text-[#1B2620]/75 leading-relaxed">
                      {lang === 'hindi' ? role.descHi : role.descEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#0E3B36]/10 flex items-center justify-between text-xs font-bold text-[#0E3B36]">
                    <span>{isSelected ? '✓ चयनित भूमिका (Selected)' : 'चुनने के लिए क्लिक करें'}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-[#E8A23A]' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Volunteer Registration Form ─── */}
        <section className="bg-[#FAFCF8] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#0E3B36]/12 shadow-md space-y-8 max-w-4xl mx-auto">
          <div className="border-b border-[#0E3B36]/10 pb-6 text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0E3B36]/8 text-[#0E3B36] text-xs font-bold uppercase tracking-wider border border-[#0E3B36]/15">
              APPLICATION FORM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E3B36]">
              स्वयंसेवक अभिरुचि फॉर्म (Volunteer Registration)
            </h2>
            <p className="text-xs text-[#1B2620]/70">
              चयनित भूमिका: <strong className="text-[#0E3B36]">{VOLUNTEER_ROLES.find(r => r.id === selectedRole)?.titleHi}</strong>
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#EEF3EF] border border-[#0E3B36]/15 rounded-2xl p-8 text-center space-y-4 text-[#0E3B36]">
              <div className="w-16 h-16 rounded-full bg-[#0E3B36] text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-[#E8A23A]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0E3B36]">
                बधाई! आपका स्वयंसेवक आवेदन सबमिट हो गया है!
              </h3>
              <p className="text-xs sm:text-sm text-[#1B2620]/80 max-w-md mx-auto leading-relaxed">
                आपका आवेदन प्रशासन की स्वीकृति हेतु लंबित है (Pending Approval)। स्वीकृति मिलने पर Cancer Aware Bharat की टीम आपसे संपर्क कर ओरिएंटेशन और स्वयंसेवक गाइड साझा करेगी।
              </p>
              <div className="inline-block bg-white px-5 py-2.5 rounded-xl border border-[#0E3B36]/15 font-mono text-xs font-bold text-[#0E3B36] shadow-xs">
                स्वयंसेवक ID: <span className="text-[#C8443C]">{refId}</span>
              </div>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => navigate('/volunteer/login')}
                  className="px-6 py-2.5 bg-[#0E3B36] text-white font-bold text-xs rounded-xl hover:bg-[#0E3B36]/90 cursor-pointer shadow-md"
                >
                  Go to Volunteer Login
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#0E3B36]">
                    पूरा नाम (Full Name) <span className="text-[#C8443C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. अमित शर्मा"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#0E3B36]">
                    मोबाइल नंबर (Mobile Number) <span className="text-[#C8443C]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="उदा. 9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                  />
                </div>

                {/* District & State */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#0E3B36]">
                    जिला एवं राज्य (District & State) <span className="text-[#C8443C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. पुणे, महाराष्ट्र / द्वारका, नई दिल्ली"
                    value={districtState}
                    onChange={e => setDistrictState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#0E3B36]">
                    ईमेल पता (Email Address) <span className="text-[#C8443C]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="amit@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#0E3B36]">
                    पासवर्ड बनाएं (Create Password) <span className="text-[#C8443C]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="कम से कम 8 अक्षर"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#0E3B36]">
                    पासवर्ड की पुष्टि करें (Confirm Password) <span className="text-[#C8443C]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="पासवर्ड दोबारा लिखें"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                  />
                </div>

              </div>

              {formError && (
                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {formError}
                </p>
              )}

              {/* Past Experience / Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0E3B36]">
                  सामाजिक कार्य / स्वयंसेवक अनुभव या संदेश (Experience / Notes - Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="यदि आपने पहले किसी एनजीओ, एनएसएस (NSS) या स्वास्थ्य अभियान में काम किया है तो संक्षेप में लिखें..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#0E3B36]/20 focus:border-[#0E3B36] focus:ring-2 focus:ring-[#0E3B36]/20 outline-none text-xs bg-white text-[#1B2620] transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0E3B36] hover:bg-[#0E3B36]/90 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>स्वयंसेवक फॉर्म जमा किया जा रहा है...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#E8A23A]" />
                      <span>स्वेच्छा से स्वयंसेवक बनें (Register as Volunteer Advocate)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

      </div>

    </div>
  );
}
