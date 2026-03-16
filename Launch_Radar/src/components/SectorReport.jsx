import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Share2, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  MessageSquare,
  ChevronRight,
  Search,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

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

const MetricStat = ({ label, value, change, color, barWidth, isTrend = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl border border-[#eef2f6] shadow-sm flex-1 group hover:shadow-xl transition-all duration-300"
  >
    <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-4 leading-none">{label}</p>
    <div className="flex items-end gap-3 mb-6">
      <span className={`text-3xl font-black text-[#0f172a] ${isTrend ? 'italic' : ''}`}>{value}</span>
      {change && (
        <span className={`text-xs font-black mb-1.5 flex items-center gap-0.5 ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {change}
        </span>
      )}
    </div>
    <div className="w-full h-1 bg-[#f1f5f9] rounded-full overflow-hidden">
       <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: barWidth }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={`h-full ${color}`} 
       />
    </div>
  </motion.div>
);

const SectorReport = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Header - Breadcrumbs & Actions */}
        <header className="flex justify-between items-center mb-12 px-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
            <FileText size={14} className="opacity-60" />
            <Link to="/market-intelligence" className="hover:text-primary transition-colors">Reports</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#1e293b]">Q3 AI Sector Analysis</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
              <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-[10px] font-bold focus:outline-none shadow-sm" />
            </div>
            <button className="p-2.5 bg-white border border-[#e2e8f0] rounded-xl text-[#64748b] hover:text-primary transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 bg-indigo-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Hero Report Header */}
        <div className="flex justify-between items-end mb-16 px-2">
          <div className="max-w-3xl">
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100 italic">Generative AI</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 italic">High Growth</span>
            </div>
            <h1 className="text-5xl font-black text-[#0f172a] mb-6 tracking-tighter leading-tight font-['Outfit',_sans-serif]">Q3 2024 Generative AI Infrastructure Report</h1>
            <p className="text-lg font-medium text-[#64748b] leading-relaxed max-w-2xl">
              A comprehensive breakdown of venture capital flow, model efficiency metrics, and competitive landscape within the infrastructure layer.
            </p>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="px-8 py-4 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-95 group">
              <Download size={18} className="text-primary group-hover:translate-y-0.5 transition-transform" /> Export PDF
            </button>
            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all active:scale-95 group">
              <Share2 size={18} className="group-hover:rotate-12 transition-transform" /> Share Insights
            </button>
          </div>
        </div>

        {/* Top Analytics Metrics */}
        <div className="flex gap-8 mb-16 px-2">
          <MetricStat label="Total Sector Funding" value="$4.2B" change="+12.4%" color="bg-primary" barWidth="65%" />
          <MetricStat label="Market Sentiment" value="Bullish" change="Strong" color="bg-emerald-500" barWidth="85%" isTrend />
          <MetricStat label="Efficiency Index" value="84.2" change="+5.1%" color="bg-indigo-500" barWidth="70%" />
          <MetricStat label="Acquisition Velocity" value="High" change="-2%" color="bg-orange-500" barWidth="40%" isTrend />
        </div>

        {/* Main Charts Distribution */}
        <div className="flex gap-10 mb-16 px-2">
          {/* Large Area Chart / Bar Chart */}
          <div className="flex-[2] bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h3 className="text-2xl font-black text-[#1e293b] tracking-tight mb-2">Funding Trends Over Time</h3>
                <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest">Quarterly venture capital investment ($M)</p>
              </div>
              <div className="flex bg-[#f8fafc] p-1 rounded-xl">
                {['6M', '1Y', 'All'].map((t, i) => (
                  <button key={i} className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${i === 0 ? 'bg-white text-primary shadow-sm' : 'text-[#94a3b8] hover:text-[#64748b]'}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="flex items-end gap-6 h-80 px-4 relative">
              {[45, 65, 40, 85, 78, 62].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${v}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 2, ease: "circOut" }}
                    className={`w-full rounded-xl shadow-inner relative overflow-hidden flex items-end justify-center ${i === 4 ? 'bg-primary' : 'bg-primary/20'}`}
                  >
                     {i === 4 && <div className="absolute top-2 w-full h-1 bg-white/30" />}
                  </motion.div>
                  <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                </div>
              ))}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-24 select-none">
                 {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-[#94a3b8]" />)}
              </div>
            </div>
          </div>

          {/* Sub-Sector Allocation */}
          <div className="flex-1 bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 flex flex-col items-center">
            <h3 className="text-2xl font-black text-[#1e293b] tracking-tight mb-16 w-full text-center lg:text-left">Sub-Sector Allocation</h3>
            
            <div className="w-64 h-64 relative mb-16 shrink-0">
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eef2f6" strokeWidth="6" />
                 <motion.circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#1d4ed8" 
                    strokeWidth="7" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * 0.42) }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "circOut" }}
                 />
                 <motion.circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#60a5fa" 
                    strokeWidth="7" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * 0.28) }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 2, ease: "circOut" }}
                    className="rotate-[151deg]"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest opacity-60">Leader</span>
                 <span className="text-xl font-black text-[#1e293b]">LLM Ops</span>
               </div>
            </div>

            <div className="w-full space-y-6">
               {[
                 { label: 'LLM Operations', val: 42, color: 'bg-blue-700' },
                 { label: 'Vector Databases', val: 28, color: 'bg-blue-400' },
                 { label: 'Compute Infra', val: 30, color: 'bg-slate-300' }
               ].map((d, i) => (
                 <div key={i} className="flex justify-between items-center text-xs font-bold text-[#64748b]">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${d.color}`} />
                      <span>{d.label}</span>
                    </div>
                    <span className="text-[#1e293b] font-black">{d.val}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="flex gap-10 pb-20 px-2">
          {/* AI Analysis Rationale */}
          <div className="flex-[2] bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
             <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                 <Zap size={24} className="fill-white" />
               </div>
               <div>
                 <h3 className="text-2xl font-black text-[#1e293b] tracking-tight leading-none mb-1">AI Analysis Rationale</h3>
                 <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Updated 4 hours ago • Confidence Level: 94%</p>
               </div>
             </div>

             <div className="space-y-10">
               <p className="text-base font-medium text-[#475569] leading-relaxed">
                 The current market sentiment for the <span className="text-primary font-black">Generative AI Infrastructure</span> sector remains decidedly bullish, driven by the decoupling of base model development and enterprise-grade deployment tools. We observed a significant 12.4% uptick in Q3 funding specifically targeting "Day 2 Operations" (monitoring, compliance, and cost management).
               </p>

               <div className="grid grid-cols-2 gap-8">
                 <div className="bg-[#f8fafc] p-8 rounded-3xl border-l-[6px] border-l-primary border border-transparent group hover:border-[#e2e8f0] transition-all">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Key Driver: Infrastructure Consolidation</h4>
                    <p className="text-xs font-bold text-[#64748b] leading-relaxed">Smaller, specialized LLM tools are being absorbed into unified "OS-style" platforms, reducing integration friction for Fortune 500 adopters.</p>
                 </div>
                 <div className="bg-[#f8fafc] p-8 rounded-3xl border-l-[6px] border-l-emerald-500 border border-transparent group hover:border-[#e2e8f0] transition-all">
                    <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Risk Factor: GPU Scarcity</h4>
                    <p className="text-xs font-bold text-[#64748b] leading-relaxed">While software demand is surging, the physical layer remains bottle-necked by H100 availability, slowing down model iteration cycles for Series A startups.</p>
                 </div>
               </div>

               <p className="text-base font-medium text-[#475569] leading-relaxed italic border-l-4 border-slate-100 pl-8">
                Our predictive models suggest that the "Vector Database" frenzy is beginning to stabilize as standardized incumbents emerge. Investors should now pivot focus towards <span className="text-primary font-black">Custom Hardware Interoperability</span> and <span className="text-primary font-black">On-Premise Private LLM Deployment</span>, which are projected to lead Q4 growth metrics by up to 18%.
               </p>
             </div>
          </div>

          {/* Radar Pick & Competitors Side */}
          <div className="flex-1 space-y-10">
            {/* Radar Pick Card */}
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="bg-primary p-12 rounded-[40px] shadow-2xl shadow-primary/40 text-white relative overflow-hidden group"
            >
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-10">
                   <Target size={24} className="fill-white" />
                   <h3 className="text-xl font-black uppercase tracking-widest italic">Radar Pick</h3>
                 </div>
                 
                 <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-xl">
                      <span className="text-3xl font-black italic">N</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black leading-none mb-1">NeuralLayer.ai</h4>
                      <p className="text-[10px] font-bold opacity-80 italic uppercase tracking-widest leading-none">Series A • $24M Raised</p>
                    </div>
                 </div>

                 <p className="text-sm font-bold opacity-80 leading-relaxed mb-12">
                   NeuralLayer is pioneering distributed inference for edge devices. Our models indicate an 88% probability of acquisition within 12 months.
                 </p>

                 <button className="w-full py-5 bg-white text-primary rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-50 transition-all active:scale-95 leading-none">
                   View Deep-Dive
                 </button>
               </div>
               <Zap className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 fill-white" />
            </motion.div>

            {/* Top Competitors Leaderboard */}
            <div className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50">
               <h3 className="text-xl font-black text-[#1e293b] tracking-tight mb-10">Top Competitors</h3>
               <div className="space-y-10">
                 {[
                   { id: '01', name: 'Anthropic', val: 92 },
                   { id: '02', name: 'Cohere', val: 84 },
                   { id: '03', name: 'Mistral AI', val: 78 }
                 ].map((c, i) => (
                   <div key={i} className="group cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-4">
                           <span className="text-xs font-black text-[#94a3b8] italic group-hover:text-primary transition-colors">{c.id}</span>
                           <span className="text-base font-black text-[#1e293b] tracking-tight">{c.name}</span>
                         </div>
                         <ChevronRight size={16} className="text-[#e2e8f0] group-hover:text-primary transition-all group-hover:translate-x-1" />
                      </div>
                      <div className="w-full h-1 bg-[#f1f5f9] rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${c.val}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 1.5, ease: "circOut" }}
                            className="h-full bg-primary" 
                         />
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA / Action Bar */}
        <div className="w-full max-w-7xl mx-auto pb-12 flex justify-center">
            <button className="px-12 py-5 bg-[#0f172a] text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-4 leading-none group">
               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" /> Start New Analysis
            </button>
        </div>
      </main>
    </div>
  );
};

export default SectorReport;
