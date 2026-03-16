import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Plus, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  Heart, 
  Cpu,
  Zap,
  Bot,
  Watch,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const BrandCard = ({ name, description, status, logoColor, icon: Icon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[32px] border border-[#eef2f6] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 transform-gpu group"
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl ${logoColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} />
        </div>
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
          status === 'EMERGING' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
        }`}>
          {status}
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-black text-[#1e293b] mb-3 tracking-tight group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm font-medium text-[#64748b] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/brands/neuraledge" className="flex-1">
          <button className="w-full py-3.5 bg-primary text-white rounded-2xl font-black text-sm hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95">
            Watch
          </button>
        </Link>
        <button className="w-13 h-13 flex items-center justify-center rounded-2xl border border-[#e2e8f0] text-[#64748b] hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all active:scale-95">
          <Heart size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const Brands = () => {
  const [activeCategory, setActiveCategory] = useState('AI');
  const [viewType, setViewType] = useState('Emerging');

  const categories = [
    { name: 'AI', icon: Cpu },
    { name: 'EVs', icon: Zap },
    { name: 'Robotics', icon: Bot },
    { name: 'Wearables', icon: Watch }
  ];

  const brands = [
    {
      name: 'NeuroSync',
      description: 'Direct neural interface devices for seamless human-AI collaboration.',
      category: 'AI',
      status: 'EMERGING',
      logoColor: 'bg-indigo-950',
      icon: Cpu
    },
    {
      name: 'VoltFlow',
      description: 'Next-gen solid state battery tech for ultra-long range EV mobility.',
      category: 'EVs',
      status: 'EMERGING',
      logoColor: 'bg-emerald-950',
      icon: Zap
    },
    {
      name: 'Atlas Botics',
      description: 'Autonomous last-mile delivery robots for complex urban environments.',
      category: 'Robotics',
      status: 'EMERGING',
      logoColor: 'bg-slate-900',
      icon: Bot
    },
    {
      name: 'VisonAI',
      description: 'Industry standard computer vision platform for real-time analysis.',
      category: 'AI',
      status: 'ESTABLISHED',
      logoColor: 'bg-slate-100 text-slate-400',
      icon: Eye
    },
    {
      name: 'ZenRing',
      description: 'Unobtrusive smart rings for professional health and sleep monitoring.',
      category: 'Wearables',
      status: 'EMERGING',
      logoColor: 'bg-orange-100 text-orange-400',
      icon: Watch
    },
    {
      name: 'HyperGrid',
      description: 'Decentralized AI-managed power grids for sustainable cities.',
      category: 'Energy',
      status: 'EMERGING',
      logoColor: 'bg-slate-900',
      icon: Zap
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f9fc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 font-['Inter',_sans-serif]">
        {/* Header Bar */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-[500px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
            <input 
              type="text" 
              placeholder="Search brands, founders, or industries..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#e2e8f0] rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[#64748b] hover:text-primary transition-colors">
              <HelpCircle size={24} />
            </button>
            <Link to="/brands/new">
              <button className="px-6 py-3.5 bg-primary text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                <Plus size={20} /> Add Brand
              </button>
            </Link>
          </div>
        </header>

        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#0f172a] mb-4 tracking-tight leading-tight">Brands Directory</h1>
          <p className="text-[#64748b] font-medium text-lg max-w-2xl">Explore and track the next generation of industry leaders across the technology landscape.</p>
        </div>

        {/* Interactive Filters Bar */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  activeCategory === cat.name 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                  : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-primary/50'
                }`}
              >
                {cat.name} <ChevronDown size={14} className={activeCategory === cat.name ? 'opacity-100' : 'opacity-40'} />
              </button>
            ))}
          </div>

          <div className="flex bg-[#e2e8f0]/50 p-1 rounded-2xl border border-[#e2e8f0]/30 shadow-inner">
            <button 
              onClick={() => setViewType('Emerging')}
              className={`px-8 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all ${
                viewType === 'Emerging' ? 'bg-white text-primary shadow-md' : 'text-[#64748b]'
              }`}
            >
              Emerging
            </button>
            <button 
              onClick={() => setViewType('Established')}
              className={`px-8 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all ${
                viewType === 'Established' ? 'bg-white text-primary shadow-md' : 'text-[#64748b]'
              }`}
            >
              Established
            </button>
          </div>
        </div>

        {/* Brands Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            >
              <BrandCard {...brand} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <div className="flex justify-center pb-12">
          <button className="px-10 py-4 bg-white border border-[#e2e8f0] rounded-[24px] font-black text-[#1e293b] text-sm hover:shadow-xl hover:border-primary/20 transition-all active:scale-95 shadow-sm">
            Load More Brands
          </button>
        </div>
      </main>
    </div>
  );
};

export default Brands;
