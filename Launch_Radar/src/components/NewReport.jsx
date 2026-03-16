import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Download, 
  Share2, 
  ChevronLeft, 
  Zap, 
  Target, 
  AlertCircle, 
  TrendingUp, 
  PieChart as PieChartIcon,
  Search,
  Bell
} from 'lucide-react';
import Sidebar from './Sidebar';
import NotificationDropdown from './NotificationDropdown';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Link } from 'react-router-dom';

const fundingData = [
  { name: 'JAN', value: 250 },
  { name: 'FEB', value: 380 },
  { name: 'MAR', value: 300 },
  { name: 'APR', value: 550 },
  { name: 'MAY', value: 650 },
  { name: 'JUN', value: 600 },
];

const sectorData = [
  { name: 'LLM Operations', value: 42, color: '#2b59ff' },
  { name: 'Vector Databases', value: 28, color: '#60a5fa' },
  { name: 'Compute Infra', value: 30, color: '#d1d5db' },
];

const MetricCard = ({ label, value, subtext, color, trend }) => {
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
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-2xl border border-[#eef2f6] shadow-sm transform-gpu"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2">{label}</p>
        <div className="flex items-end gap-2 mb-3">
          <h3 className="text-3xl font-black text-[#1e293b] tracking-tighter">{value}</h3>
          {trend && <span className={`text-xs font-black italic mb-1 ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-[#f1f5f9] overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full ${color}`} 
            />
          </div>
          <span className="text-[10px] font-bold text-[#64748b] tracking-wider whitespace-nowrap">{subtext}</span>
        </div>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const NewReport = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f9fc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="w-11 h-11 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center text-[#64748b] hover:text-primary transition-all shadow-sm hover:shadow-md">
              <ChevronLeft size={22} />
            </Link>
            <nav className="flex items-center gap-3 text-sm font-bold text-[#64748b]">
              <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"><Download size={16} /> Reports</span>
              <span className="opacity-30">/</span>
              <span className="text-[#1e293b] font-black italic tracking-tight">Q3 AI Infrastructure Deep-Dive</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
              <input type="text" placeholder="Search report content..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-xs focus:outline-none shadow-sm font-medium" />
            </div>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all shadow-sm border border-[#e2e8f0] relative ${showNotifications ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-[#64748b] hover:text-primary'}`}>
                <Bell size={20} className={showNotifications ? 'fill-white' : ''} />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">3</span>
              </button>
              <NotificationDropdown isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
            </div>
          </div>
        </header>

        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-10 pb-8 border-b border-[#e2e8f0]">
            <div>
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">Generative AI</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Market Leader</span>
              </div>
              <h1 className="text-4xl font-black text-[#0f172a] mb-4 tracking-tight leading-tight max-w-2xl">2024 Generative AI Infrastructure Intelligence Report</h1>
              <p className="text-[#64748b] font-medium text-lg max-w-3xl leading-relaxed italic border-l-4 border-primary pl-6 py-1">Comprehensive breakdown of venture capital flow, enterprise deployment metrics, and hardware scarcity indices.</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#e2e8f0] rounded-2xl font-black text-sm text-[#1e293b] hover:bg-slate-50 transition-all shadow-sm"><Download size={18} /> Export Intel</button>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/20 transition-all shadow-lg shadow-primary/10"><Share2 size={18} /> Share Dashboard</button>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-8 mb-12">
            <motion.div variants={itemVariants}><MetricCard label="Sector Funding" value="$4.2B" trend="+12.4%" subtext="Global VC Allocation" color="bg-primary" /></motion.div>
            <motion.div variants={itemVariants}><MetricCard label="Market Sentiment" value="Bullish" subtext="Optimal Entry Index" color="bg-emerald-500" /></motion.div>
            <motion.div variants={itemVariants}><MetricCard label="Efficiency Score" value="84.2" trend="+5.1%" subtext="Compute/Cost Ratio" color="bg-indigo-400" /></motion.div>
            <motion.div variants={itemVariants}><MetricCard label="Acquisition Velocity" value="High" trend="-2%" subtext="Market Liquidity" color="bg-amber-500" /></motion.div>
          </div>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8 space-y-12">
              <motion.div variants={itemVariants} className="bg-white p-10 rounded-3xl border border-[#eef2f6] shadow-xl shadow-slate-200/50">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-[#1e293b] tracking-tight">Funding Velocity (Quarterly)</h3>
                  <div className="flex bg-slate-100 p-1.5 rounded-xl">
                    {['6M', '1Y', 'ALL'].map(t => <button key={t} className={`px-5 py-1.5 rounded-lg text-[10px] font-black tracking-widest ${t==='1Y'?'bg-white text-primary shadow-sm':'text-[#64748b]'}`}>{t}</button>)}
                  </div>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fundingData}>
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2b59ff">
                        {fundingData.map((e,i)=><Cell key={i} fill={i>3?'#2b59ff':'#eff6ff'}/>)}
                      </Bar>
                      <XAxis hide /><Tooltip cursor={{fill:'transparent'}} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-10 rounded-3xl border border-[#eef2f6] shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-black text-xl">AI</div>
                  <div>
                    <h3 className="text-xl font-black text-[#1e293b]">Neural Intelligence Summary</h3>
                    <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Confidence Index: 94%</p>
                  </div>
                </div>
                <div className="space-y-6 text-[#475569] leading-relaxed font-medium">
                  <p className="border-l-4 border-primary pl-6">The market is shifting from base model hype to "Day 2 Operations" infrastructure. Enterprise-grade deployment tools are attracting 40% of new series B capital.</p>
                  <div className="grid grid-cols-2 gap-8 py-4">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-black text-emerald-600 uppercase mb-3 tracking-widest">Growth Driver</p>
                      <p className="text-xs font-bold leading-relaxed italic">Infrastructure Consolidation: Standardized platforms for LLM monitoring and cost optimization.</p>
                    </div>
                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                      <p className="text-[10px] font-black text-rose-600 uppercase mb-3 tracking-widest">Headwind Factor</p>
                      <p className="text-xs font-bold leading-relaxed italic">Hardware Bottlenecks: H100 scarcity remains the primary deceleration point for late-stage training cycles.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-span-4 space-y-10">
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-[#eef2f6] shadow-xl shadow-slate-200/50">
                <h3 className="text-lg font-black text-[#1e293b] mb-8 tracking-tight">Sector Allocation</h3>
                <div className="h-56 relative mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={sectorData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={8} dataKey="value">{sectorData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip /></PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-black text-[#94a3b8] uppercase">Top</span>
                    <span className="text-xl font-black text-primary">OPS</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {sectorData.map(s => (
                    <div key={s.name} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl">
                      <span className="text-xs font-bold text-[#64748b]">{s.name}</span>
                      <span className="text-xs font-black text-primary">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="bg-primary p-10 rounded-3xl shadow-2xl relative overflow-hidden text-white"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-black flex items-center gap-3 mb-6"><Target size={24} /> Radar Pick</h3>
                  <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-md border border-white/20 mb-8">
                    <p className="text-xl font-black mb-1">NeuralLayer</p>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Distributed Inference Engine</p>
                  </div>
                  <p className="text-xs font-bold opacity-80 leading-relaxed mb-10 italic">"Pioneering sub-10ms edge inference for enterprise AR. Extreme M&A target potential for Q4."</p>
                  <Link to="/predictions">
                    <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors">
                      Detailed Intelligence Deep-Dive
                    </button>
                  </Link>
                </div>
                <Zap size={140} className="absolute -bottom-10 -right-10 opacity-10 fill-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NewReport;
