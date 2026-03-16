import { useState } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Info, 
  ChevronLeft,
  Zap,
  Briefcase
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const CheckoutDelivery = () => {
  const navigate = useNavigate();
  const [formData] = useState({
    fullName: 'Johnathan Doe',
    address1: 'Spaceport Sector 7G, Dock 42',
    address2: 'Apt, Suite, Unit',
    city: 'Neo Tokyo',
    state: 'CA',
    zip: '90210',
    phone: '(555) 000-0000'
  });

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Header - Stepper */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
             <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
             <ChevronRight size={14} className="opacity-40" />
             <span className="text-[#1e293b]">Checkout</span>
          </div>
          
          <div className="flex items-center gap-12">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg shadow-primary/30 scale-110">1</div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1 italic">Location</span>
                   <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest leading-none">Shipping Info</span>
                </div>
             </div>
             <div className="w-48 h-px bg-slate-200" />
             <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center font-black text-sm">2</div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest leading-none mb-1">Payment</span>
                   <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest leading-none">Final Step</span>
                </div>
             </div>
          </div>

          <div className="w-10 h-10 bg-indigo-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
          </div>
        </header>

        {/* Form Area */}
        <div className="flex gap-12 px-2 pb-20 max-w-7xl mx-auto">
           {/* Left: Shipping Form */}
           <div className="flex-[2] bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <MapPin size={24} className="fill-white" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Delivery Location</h2>
                    <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] italic">Specify where your orbital payload should be deployed.</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName} 
                      className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                    />
                 </div>
                 
                 <div className="col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Address Line 1</label>
                    <input 
                      type="text" 
                      value={formData.address1} 
                      className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                    />
                 </div>

                 <div className="col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Address Line 2 (Optional)</label>
                    <input 
                      type="text" 
                      placeholder={formData.address2} 
                      className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">City</label>
                    <input 
                      type="text" 
                      value={formData.city} 
                      className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">State</label>
                       <div className="relative">
                          <select className="w-full px-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-inner">
                             <option>CA</option>
                             <option>NY</option>
                             <option>TX</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Zip Code</label>
                       <input 
                         type="text" 
                         value={formData.zip} 
                         className="w-full px-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner text-center" 
                       />
                    </div>
                 </div>

                 <div className="col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Phone Number</label>
                    <div className="flex gap-4">
                       <div className="w-24 px-6 py-5 bg-slate-100 border border-[#e2e8f0] rounded-2xl text-sm font-black text-[#1e293b] flex items-center justify-center">+1</div>
                       <input 
                         type="text" 
                         value={formData.phone} 
                         className="flex-1 px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                       />
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex items-center gap-4">
                 <input type="checkbox" id="save-default" className="w-6 h-6 rounded-lg accent-primary border-[#e2e8f0]" checked />
                 <label htmlFor="save-default" className="text-[11px] font-black text-[#64748b] uppercase tracking-widest cursor-pointer">Save as default fleet destination</label>
              </div>

              <div className="mt-20 pt-10 border-t border-[#f1f5f9] flex items-center justify-between">
                 <Link to="/cart" className="flex items-center gap-3 text-xs font-black text-[#94a3b8] uppercase tracking-[0.2em] group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                 </Link>
                 <button 
                   onClick={() => navigate('/checkout/payment')}
                   className="px-14 py-6 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 flex items-center gap-4 group"
                 >
                    Continue to Payment <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>

           {/* Right: Mission Summary */}
           <div className="flex-1 space-y-10">
              <div className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
                 <h2 className="text-2xl font-black text-[#1e293b] mb-12 tracking-tight">Order Summary</h2>
                 <div className="flex items-center gap-6 mb-12 bg-[#f8fafc] p-6 rounded-[32px] border border-[#eef2f6]">
                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                       <Zap size={40} className="fill-primary" />
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-[#1e293b] leading-tight mb-1">StarLink-9 Payload</h3>
                       <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest italic leading-none mb-1">Heavy Lift Rocket (HLR-1)</p>
                       <span className="text-xl font-black text-primary italic">$2,400</span>
                    </div>
                 </div>

                 <div className="space-y-6 mb-12">
                    <div className="flex justify-between items-center text-xs font-bold text-[#64748b]">
                       <span className="uppercase tracking-widest">Base Launch Fee</span>
                       <span className="text-[#1e293b] font-black">$2,400.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#64748b]">
                       <span className="uppercase tracking-widest">Orbital Tax</span>
                       <span className="text-[#1e293b] font-black">$142.50</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#64748b]">
                       <span className="uppercase tracking-widest">Fuel Surcharge</span>
                       <span className="text-emerald-500 font-black italic">FREE</span>
                    </div>
                    <div className="h-px bg-[#f1f5f9] w-full" />
                    <div className="flex justify-between items-end">
                       <span className="text-[11px] font-black text-[#0f172a] uppercase tracking-[0.2em] mb-2 leading-none">Total Amount</span>
                       <span className="text-4xl font-black text-primary italic">$2,542.50</span>
                    </div>
                 </div>

                 {/* Mission Insight Callout */}
                 <div className="bg-indigo-50/80 backdrop-blur-md p-8 rounded-[32px] border border-indigo-100 relative group cursor-help overflow-hidden transition-all hover:bg-indigo-100/80">
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                       <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                          <Info size={20} />
                       </div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-700">Mission Insight</h4>
                    </div>
                    <p className="text-[11px] font-bold text-indigo-800/70 leading-relaxed mb-8 relative z-10">
                       Delivery to Neo Tokyo typically occurs within 4 orbital cycles after launch confirmation.
                    </p>
                    <div className="flex -space-x-4 relative z-10 mb-3 ml-2">
                       {[...Array(3)].map((_, i) => (
                          <div key={i} className={`w-10 h-10 rounded-full border-4 border-white overflow-hidden shadow-lg ${['bg-indigo-900', 'bg-teal-700', 'bg-emerald-600'][i]}`} />
                       ))}
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] italic relative z-10 ml-2">Trusted by 2,000+ logistics companies</p>
                    <Briefcase className="absolute -bottom-10 -right-10 w-48 h-48 text-indigo-200/20 group-hover:scale-110 transition-transform" />
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const ChevronDown = ({ className, size }) => (
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
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default CheckoutDelivery;
