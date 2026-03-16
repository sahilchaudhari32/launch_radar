import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  ChevronRight, 
  Star, 
  Zap,
  Filter,
  ChevronDown,
  RefreshCw,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useApp();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] border border-[#eef2f6] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group overflow-hidden flex flex-col h-full"
    >
      {/* Product Image Area */}
      <div className={`relative h-56 w-full ${product.bgClass} flex items-center justify-center p-8 overflow-hidden`}>
         <div className="absolute top-4 left-4 z-10">
            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white ${product.tagClass}`}>
               {product.tag}
            </span>
         </div>
         <button className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white hover:text-rose-500 transition-all shadow-sm">
            <Heart size={18} />
         </button>
         
         <motion.div 
           whileHover={{ scale: 1.1, rotate: 5 }}
           className="relative z-0"
         >
            {product.icon && <product.icon size={120} className="text-white opacity-80 drop-shadow-2xl" />}
            {!product.icon && (
               <div className="w-32 h-16 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center">
                  <div className="w-24 h-4 bg-white/40 rounded-full" />
               </div>
            )}
         </motion.div>
      </div>

      {/* Product Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-[#1e293b] tracking-tight">{product.name}</h3>
          <span className="text-lg font-black text-primary italic">${product.price}</span>
        </div>
        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] mb-6">
          {product.category} / {product.type}
        </p>

        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
             <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
          ))}
          <span className="text-[10px] font-black text-[#94a3b8] ml-2">({product.reviews} Reviews)</span>
        </div>

        <div className="bg-[#f8fafc] p-4 rounded-2xl border border-[#eef2f6] mb-8">
           <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2 leading-none">Market Demand</p>
           <div className="flex items-center justify-between gap-4">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${product.demand}%` }}
                    transition={{ duration: 1, ease: "circOut", delay: 0.5 + index * 0.1 }}
                    className="h-full bg-primary" 
                 />
              </div>
              <span className="text-[11px] font-black text-[#1e293b]">{product.demand}% Yes</span>
           </div>
        </div>

        <div className="mt-auto space-y-3">
           <div className="flex gap-4">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-black text-[#64748b] uppercase tracking-widest">
                   {spec.icon && <spec.icon size={12} className="text-primary opacity-60" />}
                   {spec.label}
                </div>
              ))}
           </div>
           
           <button 
             onClick={handleAddToCart}
             className={`w-full py-4 rounded-[18px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 group ${added ? 'bg-emerald-500 text-white' : 'bg-[#0f172a] text-white hover:bg-primary'}`}
           >
              {added ? (
                <>
                  <CheckCircle2 size={18} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} className="group-hover:translate-x-1 transition-transform" /> Add to Cart
                </>
              )}
           </button>
        </div>
      </div>
    </motion.div>
  );
};

const Store = () => {
  const { cartCount, user } = useApp();
  const [products, setProducts] = useState([]);
  const categories = ['All Products', 'Hardware', 'SaaS Platforms', 'AI Modules', 'Neural Gear'];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Header Actions */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="relative w-[500px]">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
             <input type="text" placeholder="Search marketplace for tech, saas, or hardware..." className="w-full pl-16 pr-6 py-4 bg-white border border-[#e2e8f0] rounded-[24px] text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
          </div>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-6 pr-8 border-r border-[#e2e8f0]">
                <button className="relative p-2 text-[#64748b] hover:text-primary transition-colors">
                   <ShoppingCart size={26} />
                   {cartCount > 0 && (
                     <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                       {cartCount}
                     </span>
                   )}
                </button>
             </div>
             <div className="flex items-center gap-4 bg-white p-1.5 pr-4 rounded-2xl border border-[#e2e8f0] shadow-sm cursor-pointer hover:border-primary transition-all">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl overflow-hidden border-2 border-white">
                   <img src={user.avatar} alt="User" />
                </div>
                <div>
                   <h4 className="text-xs font-black text-[#1e293b] leading-none mb-1">{user.name}</h4>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none italic">{user.plan}</p>
                </div>
             </div>
          </div>
        </header>

        {/* Hero Area */}
        <div className="flex justify-between items-end mb-16 px-2">
           <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary mb-5">
                 <Zap size={20} className="fill-current" />
                 <span className="text-xs font-black uppercase tracking-[0.2em]">Marketplace</span>
              </div>
              <h1 className="text-6xl font-black text-[#0f172a] mb-8 tracking-tighter leading-tight font-['Outfit',_sans-serif]">Discover Tomorrow</h1>
              <p className="text-lg font-medium text-[#64748b] leading-relaxed">
                 Curated futuristic tech, high-performance software, and infrastructure tools for elite growth teams.
              </p>
           </div>
           
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="bg-white p-8 px-10 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 flex items-center gap-8 group cursor-pointer"
           >
              <div>
                 <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-2 italic">Your Cart</p>
                 <h4 className="text-xl font-black text-primary italic">{cartCount} Items • ${ (cartCount * 299).toLocaleString() }.00</h4>
              </div>
              <Link to="/cart">
                <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:shadow-primary/40 transition-all active:scale-95 group-hover:px-10">
                   Checkout <ChevronRight size={18} />
                </button>
              </Link>
           </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-16 px-2">
           <div className="flex gap-4">
              {categories.map((cat, i) => (
                 <button key={i} className={`px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${i === 0 ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-primary/50'}`}>
                    {cat}
                 </button>
              ))}
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-3.5 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                 <Filter size={16} /> Filters
              </button>
              <button className="px-6 py-3.5 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                 Sort: Popular <ChevronDown size={16} />
              </button>
           </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20 px-2">
           {products.map((p, i) => (
              <ProductCard key={i} product={p} index={i} />
           ))}
        </div>

        {/* Load More Section */}
        <div className="flex justify-center pb-20">
           <button 
             className="px-12 py-5 bg-white border-2 border-[#eef2f6] text-[#1e293b] rounded-[32px] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4 hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95 group"
           >
              Load More Products <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
           </button>
        </div>

        {/* New Feature Sidebar Callout - Absolute Pos (Mocking the UI layout) */}
        <div className="fixed bottom-12 left-6 w-52 z-50">
           <div className="bg-blue-50/80 backdrop-blur-xl p-6 rounded-[28px] border border-blue-100 shadow-2xl shadow-blue-200/40">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-3 block italic">New Feature</span>
              <p className="text-[11px] font-bold text-slate-700 leading-relaxed mb-6">
                Check out our new AI-driven market prediction tool.
              </p>
              <Link to="/predictions">
                <button className="w-full py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">Explore Now</button>
              </Link>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Store;
