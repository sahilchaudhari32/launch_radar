import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Cpu, 
  Headphones, 
  Monitor,
  ChevronRight,
  Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white p-8 rounded-[32px] border border-[#eef2f6] shadow-sm flex items-center gap-10 group hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-28 h-28 ${item.bgClass} rounded-2xl flex items-center justify-center border border-white/20 relative overflow-hidden shrink-0`}>
         {item.icon && <item.icon size={50} className="text-white opacity-80" />}
         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1">
         <div className="flex justify-between items-start mb-2">
            <div>
               <h3 className="text-xl font-black text-[#1e293b] tracking-tight">{item.name}</h3>
               <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest italic">{item.model}</p>
            </div>
            <button 
              onClick={() => onRemove(item.id)}
              className="p-2 text-[#94a3b8] hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
               <Trash2 size={20} />
            </button>
         </div>
      </div>

      <div className="w-40 text-center font-black text-lg text-[#1e293b]">
         ${item.price.toLocaleString()}
      </div>

      <div className="flex items-center gap-4 bg-[#f8fafc] p-2 rounded-2xl border border-[#eef2f6]">
         <button 
           onClick={() => onUpdateQuantity(item.id, -1)}
           className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center text-[#64748b] hover:text-primary transition-all shadow-sm active:scale-95"
         >
            <Minus size={16} />
         </button>
         <span className="w-8 text-center font-black text-sm text-[#1e293b]">{item.quantity}</span>
         <button 
           onClick={() => onUpdateQuantity(item.id, 1)}
           className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center text-[#64748b] hover:text-primary transition-all shadow-sm active:scale-95"
         >
            <Plus size={16} />
         </button>
      </div>

      <div className="w-44 text-right">
         <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-1">Total</p>
         <span className="text-2xl font-black text-[#1e293b] italic">${(item.price * item.quantity).toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Quantum Processor X1', model: 'Model: QX-2024', price: 1200, quantity: 1, icon: Cpu, bgClass: 'bg-gradient-to-br from-blue-600/80 to-indigo-700/80' },
    { id: 2, name: 'Neural Interface v2', model: 'BioSync Tech', price: 850, quantity: 2, icon: Headphones, bgClass: 'bg-gradient-to-br from-slate-700 to-slate-900' },
    { id: 3, name: 'Holographic Display', model: '4K Projection Unit', price: 450, quantity: 1, icon: Monitor, bgClass: 'bg-gradient-to-br from-teal-600/80 to-emerald-700/80' }
  ]);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Breadcrumb & Nav */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="flex items-center gap-6 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
             <Link to="/store" className="hover:text-primary transition-colors">Store</Link>
             <ChevronRight size={14} className="opacity-40" />
             <span className="text-[#1e293b]">Shopping Cart</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative w-64">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
               <input type="text" placeholder="Search gear..." className="w-full pl-10 pr-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-[10px] font-bold focus:outline-none shadow-sm" />
             </div>
             <div className="w-10 h-10 bg-indigo-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
             </div>
          </div>
        </header>

        {/* Title Area */}
        <div className="mb-12 px-2">
           <h1 className="text-5xl font-black text-[#0f172a] mb-5 tracking-tighter leading-tight font-['Outfit',_sans-serif]">Shopping Cart</h1>
           <p className="text-[#64748b] font-medium text-lg leading-relaxed">Review and manage your futuristic tech hardware acquisitions.</p>
        </div>

        {/* Main Cart Layout */}
        <div className="flex gap-10 px-2 pb-20">
           {/* Left: Items List */}
           <div className="flex-[2] space-y-6">
              <div className="flex items-center justify-between text-[11px] font-black text-[#94a3b8] uppercase tracking-[0.2em] px-8 mb-4">
                 <span className="flex-1">Product Details</span>
                 <span className="w-40 text-center">Unit Price</span>
                 <span className="w-40 text-center">Quantity</span>
                 <span className="w-44 text-right">Total</span>
              </div>
              
              <AnimatePresence>
                 {items.map(item => (
                   <CartItem 
                     key={item.id} 
                     item={item} 
                     onUpdateQuantity={updateQuantity}
                     onRemove={removeItem}
                   />
                 ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="py-20 text-center">
                   <p className="text-xl font-black text-[#94a3b8] mb-8">Your cart is empty.</p>
                   <Link to="/store">
                     <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-primary/30 transition-all">Back to Store</button>
                   </Link>
                </div>
              )}

              <div className="pt-10 flex items-center justify-between">
                 <Link to="/store" className="flex items-center gap-3 text-sm font-black text-primary uppercase tracking-widest hover:gap-5 transition-all">
                    <ArrowLeft size={20} /> Continue Shopping
                 </Link>
                 <div className="flex items-center gap-3 text-xs font-black text-[#94a3b8] uppercase tracking-widest italic">
                    <ShieldCheck size={18} className="text-emerald-500" /> Secure checkout with encrypted data transfer
                 </div>
              </div>
           </div>

           {/* Right: Summary Card */}
           <div className="flex-1">
              <div className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 sticky top-12">
                 <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                       <FileText size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-[#1e293b] tracking-tight">Order Summary</h2>
                 </div>

                 <div className="space-y-6 mb-12">
                    <div className="flex justify-between items-center text-sm font-bold text-[#64748b]">
                       <span>Subtotal</span>
                       <span className="text-[#1e293b] font-black">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-[#64748b]">
                       <span>Est. Shipping</span>
                       <span className="text-emerald-500 font-black uppercase tracking-widest italic">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-[#64748b]">
                       <span>Tax (8%)</span>
                       <span className="text-[#1e293b] font-black">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="h-px bg-[#f1f5f9] w-full" />
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-1">Total Amount</p>
                          <span className="text-4xl font-black text-primary italic">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                       </div>
                       <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2 leading-none">USD Currency</span>
                    </div>
                 </div>

                 <button 
                   onClick={() => navigate('/checkout/delivery')}
                   className="w-full py-6 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-4 mb-10 leading-none group"
                 >
                    Proceed to Checkout <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                 </button>

                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-4">Coupon Code</p>
                       <div className="flex gap-2">
                          <input type="text" placeholder="RADAR20" className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-inner" />
                          <button className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg">Apply</button>
                       </div>
                    </div>

                    <div className="flex justify-center gap-6 opacity-30">
                       <CreditCard size={28} />
                       <Bot size={28} />
                       <Globe size={28} />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const FileText = ({ size }) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const CreditCard = ({ size }) => (
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
    <rect width="20" height="14" x="2" y="5" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const Bot = ({ size, className }) => (
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
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
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

export default Cart;
