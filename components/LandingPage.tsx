import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, MessageCircle, CheckCircle2, Star, UploadCloud, Cpu, FileSpreadsheet, Zap, Briefcase, Ruler, Calculator, Globe, CreditCard, ChevronDown, Check, X } from 'lucide-react';
import { Logo } from './Logo';
import { TermsModal, PrivacyModal } from './LegalModals';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void; 
  onTryDemo: () => void; 
  onOpenGuide: () => void;
}

const FAQS = [
  { q: "Is the AI accurate enough for tenders?", a: "Yes. ConstructAI uses the latest Gemini 2.5 Vision models, trained on SMM7 and CESMM4 standards. However, like any tool, we recommend a final human review. The output includes formulas, making it easy to check and adjust." },
  { q: "What file formats do you support?", a: "We support PDF (Vector & Scanned), DWG/DXF (AutoCAD), and High-Res Images (JPG/PNG). You can also upload ZIP files containing multiple drawings." },
  { q: "Do I need a monthly subscription?", a: "No! We operate on a 'Pay-As-You-Go' credit system. You buy credits (via Card or Mobile Money) and use them only when you export a project. Previewing analysis is free." },
  { q: "Does it work for High-Rise buildings?", a: "Absolutely. You can define the number of floors (timesing factor), and the AI will multiply the typical floor quantities automatically." },
];

type Currency = 'USD' | 'EUR' | 'ETB';

const PRICING_TIERS = [
  { 
    title: "Single Project", 
    credits: 1, 
    prices: { USD: 49, EUR: 45, ETB: 5000 },
    features: ["1 Full Project Export", "PDF & DWG Support", "Excel BOQ Download", "7-Day Cloud Storage"] 
  },
  { 
    title: "Starter Pack", 
    credits: 3, 
    popular: true, 
    prices: { USD: 129, EUR: 119, ETB: 20000 },
    features: ["3 Full Project Exports", "Priority Processing", "Rebar Schedule Generation", "30-Day Cloud Storage"] 
  },
  { 
    title: "Pro Bundle", 
    credits: 10, 
    prices: { USD: 399, EUR: 369, ETB: 50000 },
    features: ["10 Full Project Exports", "Team Access", "Dedicated Support", "Unlimited Storage"] 
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onTryDemo, onOpenGuide }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<Currency>('ETB'); // Default to ETB for local market context
  const [showBanner, setShowBanner] = useState(true);

  const whatsappUrl = "https://wa.me/251927942534";

  const getPriceDisplay = (prices: { USD: number, EUR: number, ETB: number }) => {
    if (currency === 'USD') return `$${prices.USD}`;
    if (currency === 'EUR') return `€${prices.EUR}`;
    return `${prices.ETB.toLocaleString()} ETB`;
  };

  return (
    <div className="bg-white font-sans relative selection:bg-brand-500 selection:text-white overflow-x-hidden">
      
      {/* LAUNCH BANNER */}
      {showBanner && (
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white text-xs font-bold py-2 px-4 text-center relative z-50">
           <span className="opacity-90">🚀 GRAND LAUNCH OFFER: Sign up today and get </span>
           <span className="bg-white text-brand-700 px-2 py-0.5 rounded mx-1 shadow-sm">1 FREE CREDIT</span>
           <span className="opacity-90">to export your first project!</span>
           <button onClick={() => setShowBanner(false)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-brand-200">
             <X className="w-3 h-3" />
           </button>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center animate-bounce duration-[2000ms]"
      >
        <div className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transition-all hover:scale-110">
           <MessageCircle className="w-8 h-8 fill-current" />
        </div>
      </a>

      {/* --- HERO SECTION (SPLIT LAYOUT) --- */}
      <div className="relative isolate bg-slate-900 min-h-[90vh] flex flex-col">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-950"></div>
        
        {/* TOP NAV */}
        <div className="w-full px-6 py-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
                 <Logo className="w-8 h-8 text-brand-400" />
                 <span className="text-white font-bold text-xl tracking-tight">ConstructAI</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={onLogin}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={onGetStarted}
                className="px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-all shadow-lg hover:shadow-brand-500/25"
              >
                Try for Free
              </button>
            </div>
        </div>

        {/* HERO CONTENT */}
        <div className="flex-1 flex items-center justify-center px-6 pb-20 pt-10">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* LEFT: COPY */}
                <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Globe className="w-3 h-3" /> Built for Africa & The World
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                        The AI Quantity Surveyor that <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">Does the Math.</span>
                    </h1>
                    
                    <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                        Stop measuring PDFs by hand. Upload drawings and get a detailed <strong>Excel Bill of Quantities</strong> with formulas in minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button 
                            onClick={onGetStarted}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-brand-50 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Start Estimation <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button 
                            onClick={onTryDemo}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-800/50 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center"
                        >
                            <PlayCircle className="mr-2 w-5 h-5 text-brand-400" /> View Demo
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 font-medium">
                        <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> SMM7/CESMM4</div>
                        <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Telebirr & Chapa</div>
                    </div>
                </div>

                {/* RIGHT: UI MOCKUP (The "Trust Builder") */}
                <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                    
                    {/* App Window Mockup */}
                    <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="ml-4 h-4 w-40 bg-slate-700 rounded-full opacity-50"></div>
                        </div>
                        <div className="p-1">
                             {/* Fake UI Content */}
                             <div className="bg-slate-950 rounded-lg p-4 space-y-3 font-mono text-xs">
                                 <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-2">
                                     <span>ITEM DESCRIPTION</span>
                                     <span>QTY</span>
                                 </div>
                                 <div className="flex justify-between text-brand-300 animate-in slide-in-from-left-2 duration-700">
                                     <span>1. Substructure Concrete (C25)</span>
                                     <span className="font-bold">142.50 m3</span>
                                 </div>
                                 <div className="flex justify-between text-green-300 animate-in slide-in-from-left-2 duration-700 delay-100">
                                     <span>2. Formwork to Sides</span>
                                     <span className="font-bold">450.00 m2</span>
                                 </div>
                                 <div className="flex justify-between text-purple-300 animate-in slide-in-from-left-2 duration-700 delay-200">
                                     <span>3. Rebar (Y16 High Yield)</span>
                                     <span className="font-bold">2,400 kg</span>
                                 </div>
                                 <div className="flex justify-between text-slate-300 animate-in slide-in-from-left-2 duration-700 delay-300 border-t border-slate-800 pt-2 mt-2">
                                     <span>4. Masonry Walls (200mm)</span>
                                     <span className="font-bold">850.00 m2</span>
                                 </div>
                                 <div className="mt-4 p-3 bg-brand-900/30 border border-brand-500/30 rounded text-center text-brand-200">
                                     <Zap className="w-4 h-4 inline-block mr-2" />
                                     AI Analysis Complete (4.2s)
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* --- TRUST & LOGOS --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-8 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Compatible with Industry Standards</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2 font-black text-slate-800 text-lg"><Briefcase className="w-6 h-6" /> SMM7</div>
                <div className="flex items-center gap-2 font-black text-slate-800 text-lg"><Ruler className="w-6 h-6" /> CESMM4</div>
                <div className="flex items-center gap-2 font-black text-green-600 text-lg"><FileSpreadsheet className="w-6 h-6" /> Excel</div>
                <div className="flex items-center gap-2 font-black text-slate-800 text-lg"><CreditCard className="w-6 h-6" /> Chapa</div>
            </div>
         </div>
      </div>

      {/* --- VALUE PROPOSITION (Why Us?) --- */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Stop Manual Takeoffs.</h2>
                <p className="text-slate-600 text-lg">Traditional estimating takes days. ConstructAI takes minutes. We combine Google's latest Vision AI with strict Quantity Surveying logic.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-brand-600">
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload Anything</h3>
                    <p className="text-slate-500">PDFs, Images, or DWGs. Even photos of plans work. We extract the data you need.</p>
                </div>
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-brand-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2. AI Measures It</h3>
                    <p className="text-slate-500">Our engine identifies walls, beams, and finishes, applying standard deduction rules automatically.</p>
                </div>
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-brand-600">
                        <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">3. Download Excel</h3>
                    <p className="text-slate-500">Get a clean BOQ with <strong className="text-slate-700">live formulas</strong>. Easy to price, easy to check, easy to win.</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- PRICING --- */}
      <div className="py-24 bg-slate-900 text-white" id="pricing">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-black mb-4">Pay As You Go. No Subscriptions.</h2>
                  <p className="text-slate-400 mb-8">Purchase credits using Telebirr, CBE, or Card. Use them whenever you have a project.</p>
                  
                  <div className="inline-flex items-center p-1 bg-slate-800 rounded-lg border border-slate-700">
                      {(['USD', 'EUR', 'ETB'] as Currency[]).map(curr => (
                          <button
                            key={curr}
                            onClick={() => setCurrency(curr)}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                                currency === curr 
                                ? 'bg-brand-600 text-white shadow' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                              {curr}
                          </button>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRICING_TIERS.map((plan, idx) => (
                      <div key={idx} className={`relative bg-slate-800 rounded-2xl p-8 border ${plan.popular ? 'border-brand-500 shadow-[0_0_30px_rgba(14,165,233,0.2)]' : 'border-slate-700'} flex flex-col`}>
                          {plan.popular && (
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                  Best Value
                              </div>
                          )}
                          <div className="mb-4">
                              <h3 className="text-lg font-bold">{plan.title}</h3>
                              <div className="flex items-baseline gap-1 mt-2">
                                  <span className="text-4xl font-black animate-in fade-in">
                                      {getPriceDisplay(plan.prices)}
                                  </span>
                              </div>
                              <div className="mt-2 inline-block bg-white/10 px-3 py-1 rounded text-xs font-bold text-brand-300">
                                  {plan.credits} Credits
                              </div>
                          </div>
                          <ul className="space-y-4 mb-8 flex-1">
                              {plan.features.map((feat, fIdx) => (
                                  <li key={fIdx} className="flex items-center text-sm text-slate-300">
                                      <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" /> {feat}
                                  </li>
                              ))}
                          </ul>
                          <button onClick={onLogin} className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-brand-600 hover:bg-brand-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
                              Get Started
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* --- FAQ --- */}
      <div className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
              <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                          <button 
                              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                              className="w-full flex justify-between items-center p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                          >
                              <span className="font-bold text-slate-800">{faq.q}</span>
                              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                          </button>
                          {openFaq === idx && (
                              <div className="p-5 text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-200 animate-in slide-in-from-top-2">
                                  {faq.a}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>
      
      {/* Footer */}
       <div className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Logo className="w-6 h-6 text-slate-600" />
                    <span className="text-white font-bold text-lg">ConstructAI</span>
                </div>
                <p className="text-xs text-slate-500">© 2025 ConstructAI Solutions. Addis Ababa, Ethiopia.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                <button onClick={() => setShowTerms(true)} className="text-xs text-slate-500 hover:text-brand-400 transition-colors">Terms</button>
                <button onClick={() => setShowPrivacy(true)} className="text-xs text-slate-500 hover:text-brand-400 transition-colors">Privacy</button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-[#25D366] transition-colors">Contact Support</a>
            </div>
        </div>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};
