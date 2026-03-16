import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Download, 
  ChevronDown, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Zap,
  Target,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const IconMap = {
  Target, Zap, BarChart2
};

const IntelligenceCard = ({ name, ticker, price, change, sector, logo: Logo, forecast, probability, sentiment }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-[32px] border border-[#eef2f6] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
            {Logo && <Logo size={24} className="text-slate-900" />}
          </div>
          <div>
            <h3 className="text-xl font-black text-[#1e293b] leading-tight mb-1">{name}</h3>
            <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">{sector}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-[#1e293b] tracking-wider">{ticker}</p>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-lg font-black text-[#0f172a]">${price}</span>
            <span className={`text-[11px] font-bold flex items-center ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {change >= 0 ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
              {Math.abs(change)}%
            </span>
          </div>
        </div>
      </div>

      {/* AI Forecast Section */}
      <div className="bg-[#f8fafc] p-6 rounded-3xl border border-[#f1f5f9] mb-8 relative overflow-hidden">
        <div className="flex items-center gap-2 text-primary mb-3 relative z-10">
          <Zap size={16} className="fill-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest">AI Forecast</span>
        </div>
        <p className="text-sm font-bold text-[#1e293b] leading-relaxed mb-4 relative z-10">
          {forecast}
        </p>
        <Zap className="absolute -bottom-6 -right-6 text-primary/5 w-24 h-24 rotate-12" />
      </div>

      {/* Probability and Sentiment */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Launch Prob.</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{probability}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${probability}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Sentiment</span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{sentiment}% Positive</span>
          </div>
          <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${sentiment}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.5, ease: "circOut" }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-8 pt-8 border-t border-[#f1f5f9] flex items-center justify-between">
        <p className="text-[10px] font-medium text-[#94a3b8]">12 AI Updates today</p>
        <button className="text-sm font-black text-primary flex items-center gap-2 hover:gap-3 transition-all">
          View Intelligence <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const BrandIntelligence = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/brand-intelligence')
      .then(res => res.json())
      .then(result => {
        if (result && result.brands) setData(result.brands);
      })
      .catch(console.error);
  }, []);


  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Header Navigation */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4 text-primary bg-white px-5 py-3 rounded-2xl shadow-sm border border-[#eef2f6]">
            <BarChart2 size={24} />
            <h2 className="text-xl font-black text-[#0f172a] tracking-tight">Famous Brands Directory</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
              <input 
                type="text" 
                placeholder="Quick find..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm font-medium focus:outline-none transition-all shadow-sm"
              />
            </div>
            <button className="p-3 bg-white border border-[#e2e8f0] rounded-xl text-[#64748b] hover:text-primary transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <div className="w-11 h-11 bg-orange-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Hero Section with Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black text-[#0f172a] mb-6 tracking-tighter leading-tight">Global Brand Intelligence</h1>
            <p className="text-lg font-medium text-[#64748b] leading-relaxed">
              Track real-time performance and AI-predicted product cycles for the world&apos;s most influential companies.
            </p>
          </div>
          <button className="px-8 py-4 bg-white border border-[#e2e8f0] rounded-2xl font-black text-sm text-[#1e293b] flex items-center gap-3 hover:shadow-xl hover:border-primary/20 transition-all active:scale-95 shadow-sm">
            <Download size={18} className="text-primary" /> Export Dataset
          </button>
        </div>

        {/* Global Search and Filters */}
        <div className="bg-white p-6 rounded-[32px] border border-[#eef2f6] shadow-xl shadow-slate-200/50 mb-16 flex items-center gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={22} />
            <input 
              type="text" 
              placeholder="Search brands by name, ticker, or industry..." 
              className="w-full pl-16 pr-6 py-5 bg-[#f8fafc] border-none rounded-2xl text-base font-bold text-[#1e293b] focus:ring-0 placeholder:text-[#94a3b8]/70"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-5 bg-[#f8fafc] rounded-2xl text-sm font-bold text-[#475569] flex items-center gap-3 border border-transparent hover:border-[#e2e8f0] transition-all">
              Technology <ChevronDown size={18} />
            </button>
            <button className="px-6 py-5 bg-[#f8fafc] rounded-2xl text-sm font-bold text-[#475569] flex items-center gap-3 border border-transparent hover:border-[#e2e8f0] transition-all">
              Market Cap <ChevronDown size={18} />
            </button>
            <button className="px-6 py-5 bg-[#f8fafc] rounded-2xl text-sm font-bold text-primary flex items-center gap-3 border border-primary/10 hover:bg-primary/5 transition-all">
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 px-1">
          {data.map((item, index) => {
            const LogoComponent = IconMap[item.logo] || Target;
            return (
              <Link key={item.ticker} to={item.name === 'NeuralEdge AI' || index === 0 ? '/brands/neuraledge' : '#'}>
                <IntelligenceCard {...item} logo={LogoComponent} />
              </Link>
            );
          })}
        </div>

        {/* Load More Area */}
        <div className="flex flex-col items-center gap-12 pb-20">
          <button className="px-12 py-5 bg-primary text-white rounded-3xl font-black text-base shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95">
            Load More Brands
          </button>
          
          <div className="w-full max-w-7xl pt-12 border-t border-[#eef2f6] flex justify-between items-center text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em]">
            <div className="flex gap-8">
              <button className="hover:text-primary transition-colors">Documentation</button>
              <button className="hover:text-primary transition-colors">API Access</button>
              <button className="hover:text-primary transition-colors">Privacy</button>
            </div>
            <p>© 2024 LaunchRadar Intelligence. All data refreshed every 15 minutes.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandIntelligence;
