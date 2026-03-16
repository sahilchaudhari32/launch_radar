import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  Zap, 
  TrendingUp, 
  Target, 
  Cpu, 
  Plus,
  RefreshCw,
  FileText,
  Globe,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const IconMap = {
  FileText, Target, Globe
};

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

const SectorPerformanceCard = ({ name, icon: Icon, percentage, values }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[32px] border border-[#eef2f6] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black text-[#1e293b] mb-1">{name}</h3>
          <p className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest leading-none">Generative, LLM, Computer Vision</p>
        </div>
        <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center border border-blue-100 shadow-sm">
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex items-end gap-3 mb-6">
        <span className="text-3xl font-black text-[#0f172a]">+{percentage}%</span>
        <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 italic">Growth Index</span>
      </div>

      <div className="flex items-end gap-1.5 h-16">
        {values.map((v, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${v}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
            className={`flex-1 rounded-t-md ${i === values.length - 1 ? 'bg-primary' : i > values.length - 4 ? 'bg-primary/40' : 'bg-primary/20'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const MarketIntelligence = () => {
  const [email, setEmail] = useState('');
  const [marketData, setMarketData] = useState({ momentumItems: [], distribution: [] });

  useEffect(() => {
    fetch('http://localhost:5000/api/market-intelligence')
      .then(res => res.json())
      .then(data => setMarketData(data))
      .catch(console.error);
  }, []);



  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Navigation */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="relative w-[500px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
            <input 
              type="text" 
              placeholder="Search sectors, companies, or trends..." 
              className="w-full pl-16 pr-6 py-4 bg-white border border-[#e2e8f0] rounded-[22px] text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[#64748b] hover:text-primary transition-colors">
              <HelpCircle size={26} />
            </button>
            <Link to="/report">
              <button className="px-8 py-4 bg-primary text-white rounded-[20px] font-black text-sm flex items-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 leading-none">
                <Plus size={20} /> New Report
              </button>
            </Link>
          </div>
        </header>

        {/* Hero Title Area */}
        <div className="mb-12 px-2">
          <h1 className="text-5xl font-black text-[#0f172a] mb-5 tracking-tighter leading-tight">Market Intelligence</h1>
          <p className="text-[#64748b] font-medium text-lg leading-relaxed">Real-time insights and predictive data across emerging sectors.</p>
        </div>

        {/* Predictive Forecast & Feed Section */}
        <div className="flex gap-10 mb-16 px-2">
          {/* Main Chart Area */}
          <div className="flex-1 bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">AI & Deep Tech</span>
                  <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-emerald-100">
                    <TrendingUp size={12} /> +42% Upside
                  </div>
                </div>
                <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Predictive Forecast</h2>
              </div>
            </div>
            
            <p className="text-sm font-bold text-[#64748b] max-w-xl leading-relaxed mb-16 relative z-10">
              Projected market growth for Q4 across high-velocity sectors. Data indicates a significant consolidation phase beginning next month.
            </p>

            <div className="flex items-end gap-3 h-56 relative z-10 px-4">
              {[35, 62, 48, 75, 55, 68, 88].map((v, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${v}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1.5, ease: "circOut" }}
                  className={`flex-1 rounded-xl shadow-inner relative overflow-hidden ${i === 6 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/30'}`}
                >
                   {i === 6 && (
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                   )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Momentum Feed */}
          <div className="w-[420px] bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-[#1e293b] tracking-tight">Global Momentum Feed</h3>
              <RefreshCw size={18} className="text-[#94a3b8] hover:rotate-180 transition-transform cursor-pointer" />
            </div>

            <div className="space-y-8">
              {marketData.momentumItems.map((item, idx) => {
                const IconComponent = IconMap[item.icon] || FileText;
                return (
                  <div key={idx} className="flex gap-6 group cursor-pointer">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconColor} flex items-center justify-center shrink-0 border border-current opacity-70 group-hover:opacity-100 transition-opacity`}>
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1e293b] leading-relaxed mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">{item.time} • {item.category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sector Performance Grid */}
        <section className="mb-16 px-2">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-[#1e293b] tracking-tighter leading-tight">Sector Performance</h2>
            <div className="flex bg-[#eef2f6] p-1 rounded-xl">
              {['All', 'Tech', 'Energy'].map((cat, idx) => (
                <button 
                  key={cat} 
                  className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${idx === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-[#64748b] hover:text-[#1e293b]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Link to="/reports/ai">
              <SectorPerformanceCard name="Artificial Intelligence" icon={Cpu} percentage="14.2" trend="up" values={[40, 60, 50, 70, 85, 100]} />
            </Link>
            <SectorPerformanceCard name="Electric Vehicles" icon={Zap} percentage="8.7" trend="up" values={[30, 45, 65, 55, 75, 90]} />
            <SectorPerformanceCard name="Advanced Robotics" icon={Bot} percentage="11.5" trend="up" values={[50, 40, 70, 65, 80, 95]} />
          </div>
        </section>

        {/* Distribution and Digest Section */}
        <div className="flex gap-10 pb-20 px-2">
          {/* Market Distribution */}
          <div className="flex-1 bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 flex items-center gap-16">
            <div className="w-48 h-48 relative shrink-0">
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eef2f6" strokeWidth="12" />
                 <motion.circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#1e40af" 
                    strokeWidth="12" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * 0.65) }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "circOut" }}
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-[#1e293b]">65%</span>
                 <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest leading-none">High Tech</span>
               </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-black text-[#1e293b] mb-6">Market Distribution</h3>
              <div className="space-y-4">
                 {marketData.distribution.length > 0 ? marketData.distribution.map((d, i) => (
                   <div key={i} className="flex justify-between items-center text-sm font-bold text-[#64748b]">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${d.color}`} />
                        <span>{d.label}</span>
                      </div>
                      <span className="text-[#1e293b] font-black">{d.val}%</span>
                   </div>
                 )) : (
                   <div className="text-sm text-slate-400">Loading distribution...</div>
                 )}
              </div>
            </div>
          </div>

          {/* Weekly Digest Newsletter */}
          <div className="flex-1 bg-primary p-12 rounded-[40px] relative overflow-hidden shadow-2xl shadow-primary/40 text-white flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">Weekly Digest</h3>
              <p className="text-sm font-bold opacity-80 leading-relaxed mb-10 max-w-sm">
                Get custom sector analysis sent to your inbox every Monday. Over 50k+ pro analysts onboard.
              </p>
            </div>
            
            <div className="relative z-10 flex gap-4 bg-white/10 p-2 rounded-[24px] backdrop-blur-md border border-white/20">
              <input 
                type="email" 
                placeholder="email@company.com" 
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm font-bold placeholder:text-white/60 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="px-10 py-3 bg-white text-primary rounded-[18px] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-xl">
                Join
              </button>
            </div>
            <Mail size={160} className="absolute -bottom-10 -right-10 opacity-10 fill-white" />
          </div>
        </div>

        {/* Bottom Credits / Branding */}
        <footer className="pt-20 pb-10 border-t border-[#f1f5f9] flex justify-between items-center text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] px-2">
            <p>Built with LaunchRadar Platform Engine v4.0</p>
            <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center opacity-40">
              <Zap size={18} />
            </div>
        </footer>
      </main>
    </div>
  );
};

export default MarketIntelligence;
