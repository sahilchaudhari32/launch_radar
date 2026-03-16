import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Search, 
  Bell, 
  ChevronRight, 
  Zap, 
  Clock, 
  TrendingUp,
  BarChart3,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationDropdown from './NotificationDropdown';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const chartData = [
  { name: 'MON', value: 45 },
  { name: 'TUE', value: 65 },
  { name: 'WED', value: 55 },
  { name: 'THU', value: 75 },
  { name: 'FRI', value: 95 },
  { name: 'SAT', value: 85 },
  { name: 'SUN', value: 70 },
];

const PredictionCard = ({ title, status, prob, date, image, type }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl border border-[#eef2f6] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 transform-gpu"
    >
      <div className="relative h-44 overflow-hidden" style={{ transform: "translateZ(50px)" }}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${
            type === 'high' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fff7ed] text-[#9a3412]'
          }`}>
            {type === 'high' ? 'High Confidence' : 'Speculative'}
          </span>
        </div>
      </div>
      <div className="p-5" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-[#1e293b] text-base">{title}</h3>
          <span className="text-[10px] font-semibold text-[#64748b]">Launch: {date}</span>
        </div>
        <p className="text-xs text-[#64748b] leading-relaxed mb-4 line-clamp-2">
          Probability of release based on supply chain movements and patent filings.
        </p>
        <div className="flex items-center justify-between border-t border-[#f1f5f9] pt-4">
          <div>
            <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-0.5">Launch Prob.</p>
            <span className="text-lg font-extrabold text-primary">{prob}%</span>
          </div>
          <button 
            onClick={() => navigate('/predictions')}
            className="px-4 py-2 bg-[#f1f5f9] text-[#1e293b] rounded-lg font-bold text-xs hover:bg-primary hover:text-white transition-colors"
          >
            Analyze
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BrandSignal = ({ name, description, time, icon: Icon, category, color }) => (
  <div className="flex items-center justify-between p-4 hover:bg-[#f8fafc] rounded-xl transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <h4 className="font-bold text-sm text-[#1e293b]">{name}</h4>
        <p className="text-xs text-[#64748b]">{description}</p>
      </div>
    </div>
    <div className="text-right">
      <span className="text-[10px] font-bold text-[#94a3b8] block mb-1">{time}</span>
      <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#475569] rounded-md text-[9px] font-bold uppercase tracking-wider group-hover:bg-white transition-colors">
        {category}
      </span>
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const Dashboard = () => {
  const { user, notificationsCount } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f9fc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-[500px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
            <input 
              type="text" 
              placeholder="Search 12,000+ startups, emerging products, or venture trends..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#e2e8f0] rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all shadow-sm border border-[#e2e8f0] relative ${
                  showNotifications ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-[#64748b] hover:text-primary'
                }`}
              >
                <Bell size={22} className={showNotifications ? 'fill-white' : ''} />
                {notificationsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {notificationsCount}
                  </span>
                )}
              </button>
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>
            <div className="flex items-center gap-4 pl-4 border-l border-[#e2e8f0]">
              <div className="text-right">
                <p className="text-sm font-black text-[#1e293b]">{user.name}</p>
                <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">{user.plan}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-md overflow-hidden bg-slate-200">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl font-black text-[#0f172a] mb-3 tracking-tight">Market Intelligence Radar</h1>
            <p className="text-[#64748b] font-medium text-lg">Predicting the next generation of category leaders with 89% accuracy.</p>
          </motion.div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main Column */}
            <div className="col-span-8 space-y-12">
              {/* Predictions */}
              <motion.section variants={itemVariants}>
                <div className="flex justify-between items-center mb-8">
                  <Link to="/predictions" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Zap size={22} className="fill-primary group-hover:fill-white" />
                    </div>
                    <h2 className="text-2xl font-black text-[#1e293b] group-hover:text-primary transition-colors">Trending Predictions</h2>
                  </Link>
                  <Link to="/predictions" className="text-primary font-black text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    View Comprehensive Feed <ChevronRight size={18} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <PredictionCard 
                    title="QuantumWatch Series 3"
                    date="Q4 2024"
                    prob="94"
                    type="high"
                    image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  />
                  <PredictionCard 
                    title="Zenith Fold Pro"
                    date="Mid 2025"
                    prob="68"
                    type="spec"
                    image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  />
                </div>
              </motion.section>

              {/* Live Signals */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Clock size={22} />
                  </div>
                  <h2 className="text-2xl font-black text-[#1e293b]">Live Brand Signals</h2>
                </div>
                <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-xl shadow-slate-200/50 overflow-hidden divide-y divide-[#f1f5f9]">
                  <BrandSignal 
                    name="Terraform Apparel"
                    description="Detected sustainable activewear trademark filing in US & EU."
                    time="2h ago"
                    icon={Zap}
                    category="Apparel"
                    color="bg-indigo-600"
                  />
                  <BrandSignal 
                    name="Volt Mobility"
                    description="Registration of 4 domain names relating to sub-10k EV charging."
                    time="5h ago"
                    icon={Zap}
                    category="Mobility"
                    color="bg-amber-500"
                  />
                  <BrandSignal 
                    name="BioSynch Systems"
                    description="LinkedIn hiring surge detected in 'Neural-Link' division."
                    time="8h ago"
                    icon={Zap}
                    category="Health"
                    color="bg-emerald-500"
                  />
                  <div className="p-5 text-center bg-slate-50/50">
                    <button className="text-sm font-black text-[#64748b] hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto">
                      Access Unlimited Signal Feed <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 space-y-8">
              {/* Analytics Card */}
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-[#eef2f6] shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-primary">
                    <BarChart3 size={22} />
                    <h3 className="font-black text-[#1e293b]">Hype Delta</h3>
                  </div>
                  <MoreHorizontal className="text-[#94a3b8] cursor-pointer" size={20} />
                </div>
                <div className="h-48 w-full mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 4 ? '#2b59ff' : '#eff6ff'} />
                        ))}
                      </Bar>
                      <XAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }} 
                        content={({ active, payload }) => active && (
                          <div className="bg-[#1e293b] text-white px-4 py-2 rounded-xl font-black text-xs shadow-2xl">
                            {payload?.[0]?.value}% VELOCITY
                          </div>
                        )} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 pt-6 border-t border-[#f1f5f9]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#64748b]">Sentiment Score</span>
                    <span className="text-base font-black text-emerald-500 italic">BULLISH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#64748b]">Signal Strength</span>
                    <span className="text-base font-black text-primary italic">OPTIMAL</span>
                  </div>
                </div>
              </motion.div>

              {/* Performance Indicator */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-primary p-8 rounded-3xl shadow-2xl shadow-primary/30 relative overflow-hidden group cursor-pointer"
              >
                <div className="relative z-10 text-white">
                  <p className="text-xs font-black opacity-70 mb-2 uppercase tracking-widest">Active Predictions</p>
                  <h3 className="text-5xl font-black mb-6">428</h3>
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest">
                    <TrendingUp size={14} /> +18 Today
                  </div>
                </div>
                <Zap size={140} className="absolute -bottom-6 -right-6 opacity-10 fill-white transition-transform group-hover:scale-110" />
              </motion.div>

              {/* Accuracy Card */}
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-[#eef2f6] shadow-xl shadow-slate-200/50 text-center">
                <p className="text-xs font-black text-[#94a3b8] uppercase tracking-widest mb-2">Algorithm Accuracy</p>
                <h3 className="text-5xl font-black text-[#1e293b] mb-4">89.2%</h3>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "89.2%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(43,89,255,0.4)]"
                  />
                </div>
                <p className="text-xs font-bold text-emerald-500 uppercase">+2.1% Performance Increase</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
