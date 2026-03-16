import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const CheckoutPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('RADAR20');

  const paymentOptions = [
    { id: 'card', name: 'Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Globe },
    { id: 'apple', name: 'Apple', icon: AppleIcon },
    { id: 'cash', name: 'Cash', icon: Banknote }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Header - Stepper */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
             <Link to="/checkout/delivery" className="hover:text-primary transition-colors">Checkout</Link>
             <ChevronRight size={14} className="opacity-40" />
             <span className="text-[#1e293b]">Payment</span>
          </div>
          
          <div className="flex items-center gap-12">
             <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center text-primary font-black text-sm">
                   <CheckCircle2 size={20} className="text-primary" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest leading-none mb-1">Plan</span>
                   <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest leading-none">Shipping Info</span>
                </div>
             </div>
             <div className="w-48 h-px bg-slate-200" />
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg shadow-primary/30 scale-110">2</div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1 italic">Payment</span>
                   <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest leading-none">Final Step</span>
                </div>
             </div>
          </div>

          <div className="w-10 h-10 bg-indigo-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex gap-12 px-2 pb-20 max-w-7xl mx-auto">
           {/* Left: Payment Form */}
           <div className="flex-[2] bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-[#0f172a] mb-2 tracking-tight">Checkout</h2>
                <p className="text-sm font-bold text-[#64748b]">Securely complete your subscription to the Pro Plan.</p>
              </div>

              {/* Payment Methods Selector */}
              <div className="bg-[#f1f5f9] p-1.5 rounded-[22px] flex gap-2 mb-12">
                 {paymentOptions.map((opt) => (
                   <button 
                     key={opt.id}
                     onClick={() => setPaymentMethod(opt.id)}
                     className={`flex-1 py-3 px-4 rounded-[18px] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                       paymentMethod === opt.id 
                       ? 'bg-white text-[#0f172a] shadow-xl shadow-slate-200' 
                       : 'text-[#64748b] hover:text-[#0f172a]'
                     }`}
                   >
                      <opt.icon size={16} />
                      {opt.name}
                   </button>
                 ))}
              </div>

              {/* Form Grid */}
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Name on Card</label>
                    <input type="text" value="Alex Chen" className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Card Number</label>
                    <div className="relative">
                       <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2 opacity-40">
                          <div className="w-8 h-5 bg-slate-200 rounded-sm" />
                          <div className="w-8 h-5 bg-slate-300 rounded-sm" />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Expiry Date</label>
                       <input type="text" placeholder="MM/YY" className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">CVV</label>
                       <div className="relative">
                          <input type="text" placeholder="***" className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
                          <Info size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] cursor-help" />
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 pt-4">
                    <div className="relative cursor-pointer">
                       <input type="checkbox" id="save-card" className="peer hidden" />
                       <div className="w-6 h-6 border-2 border-[#e2e8f0] rounded-lg peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center text-white">
                          <CheckCircle2 size={16} />
                       </div>
                    </div>
                    <label htmlFor="save-card" className="text-xs font-bold text-[#64748b] cursor-pointer">Save card information for future purchases</label>
                 </div>
              </div>

              <div className="mt-16 flex items-center gap-4 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest italic opacity-60">
                 <ShieldCheck size={18} className="text-emerald-500" /> SSL Secure Checkout
              </div>
           </div>

           {/* Right: Summary & Promo */}
           <div className="flex-1 space-y-8">
              <div className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                 <h2 className="text-xl font-black text-[#1e293b] mb-12 tracking-tight">Order Summary</h2>
                 
                 <div className="space-y-8 mb-12">
                    <div className="flex justify-between items-start">
                       <div>
                          <h4 className="text-sm font-black text-[#1e293b]">Pro Monthly Plan</h4>
                          <p className="text-[10px] font-bold text-[#94a3b8]">Billed monthly. Cancel anytime.</p>
                       </div>
                       <span className="text-sm font-black text-[#1e293b]">$49.00</span>
                    </div>
                    <div className="flex justify-between items-start">
                       <h4 className="text-sm font-bold text-[#64748b]">Advanced Analytics Add-on</h4>
                       <span className="text-sm font-black text-[#1e293b]">$12.00</span>
                    </div>

                    <div className="h-px bg-[#f1f5f9] w-full" />

                    <div className="flex justify-between items-center text-xs font-bold text-[#64748b]">
                       <span className="uppercase tracking-widest">Subtotal</span>
                       <span className="text-[#1e293b] font-black">$61.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#64748b]">
                       <span className="uppercase tracking-widest">Tax (0%)</span>
                       <span className="text-[#1e293b] font-black">$0.00</span>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex justify-between items-center">
                       <span className="text-xl font-black text-[#0f172a] italic">Total</span>
                       <span className="text-4xl font-black text-primary italic">$61.00</span>
                    </div>
                 </div>

                 <button className="w-full py-6 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-4 mb-8 group">
                    Confirm Order & Pay <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                 </button>

                 <p className="text-[10px] font-bold text-[#94a3b8] text-center leading-relaxed">
                   By completing this purchase, you agree to <br />
                   LaunchRadar&apos;s <span className="text-[#1e293b] underline cursor-pointer">Terms of Service</span> and <br />
                   <span className="text-[#1e293b] underline cursor-pointer">Privacy Policy</span>.
                 </p>

                 <div className="mt-12 bg-slate-900 -mx-12 -mb-12 p-8 flex items-center gap-4 text-white">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                       <ShieldCheck size={20} className="text-emerald-400" />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest">Safe & Secure</h4>
                       <p className="text-[9px] font-bold opacity-60">Multiple Payment Options</p>
                    </div>
                 </div>
              </div>

              {/* Promo Code Card */}
              <div className="bg-white p-8 rounded-[32px] border border-[#eef2f6] shadow-sm flex flex-col gap-6">
                 <div className="flex items-center gap-3">
                    <TagIcon size={20} className="text-primary" />
                    <h3 className="text-xs font-black text-[#1e293b] uppercase tracking-widest">Promo Code</h3>
                 </div>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={promoCode} 
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-6 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none shadow-inner" 
                    />
                    <button className="px-8 py-4 bg-slate-100 text-[#1e293b] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all opacity-60">Apply</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom Profile Info (as seen in screenshot 2) */}
        <div className="fixed bottom-12 left-6 w-52 z-50">
           <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/40">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-indigo-100 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
                 </div>
                 <div>
                    <h4 className="text-xs font-black text-[#1e293b] leading-tight mb-1">Alex Chen</h4>
                    <p className="text-[10px] font-bold text-[#94a3b8] italic lowercase leading-none">alex@launchradar.io</p>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-[9px] font-black text-[#94a3b8] uppercase tracking-widest">
                    <span>Credit Limit</span>
                    <span className="text-primary">85%</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-primary" 
                    />
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const AppleIcon = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 20.94c1.88-1.06 3.95-1.06 5.82 0a1.5 1.5 0 0 0 2.18-2c-1.54-1.54-1.54-4.04 0-5.58a1.5 1.5 0 0 0-2.18-2c-1.87 1.06-3.94 1.06-5.82 0a1.5 1.5 0 0 0-2.18 2c1.54 1.54 1.54 4.04 0 5.58a1.5 1.5 0 0 0 2.18 2z"/>
    <path d="M12 11.5v-4"/>
    <path d="M12 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>
);

const Banknote = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="12" x="2" y="6" rx="2"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M6 12h.01M18 12h.01"/>
  </svg>
);

const Globe = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const TagIcon = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

export default CheckoutPayment;
