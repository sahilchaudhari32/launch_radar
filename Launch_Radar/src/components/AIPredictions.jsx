import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Bell, 
  Share2, 
  Paperclip, 
  Image as ImageIcon, 
  Send,
  Zap,
  Target,
  Sparkles,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import Sidebar from './Sidebar';

const PredictionCard = ({ icon: Icon, title, confidence, launch, features, rationale, color }) => {
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
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl border border-[#eef2f6] shadow-sm overflow-hidden mb-4 transform-gpu"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${color.bg} ${color.text} rounded-xl flex items-center justify-center`}>
              <Icon size={20} />
            </div>
            <h3 className="font-black text-[#1e293b] text-lg tracking-tight">{title}</h3>
          </div>
          <span className={`px-3 py-1 ${color.badgeBg} ${color.badgeText} rounded-lg text-[10px] font-black uppercase tracking-widest border ${color.badgeBorder}`}>
            {confidence}% Confidence
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2">Expected Launch</p>
            <p className="text-sm font-bold text-[#1e293b]">{launch}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2">Key Features</p>
            <p className="text-sm font-bold text-[#1e293b] leading-tight">{features}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2">AI Rationale</p>
          <p className="text-xs font-medium text-[#64748b] leading-relaxed italic border-l-2 border-[#e2e8f0] pl-4">
            "{rationale}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const AIPredictions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex overflow-hidden">
        {/* Secondary Sidebar - History */}
        <div className="w-80 border-r border-[#f1f5f9] flex flex-col bg-[#fafbfc]">
          <div className="p-6">
            <button className="w-full py-4 bg-white border-2 border-dashed border-[#e2e8f0] rounded-2xl text-[#64748b] font-bold text-sm flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all">
              <Plus size={18} /> New Prediction
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 space-y-2">
            <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-4">Recent Queries</p>
            
            <div className="p-4 bg-white rounded-2xl border border-[#eef2f6] shadow-sm cursor-pointer border-l-4 border-l-primary">
              <h4 className="font-bold text-sm text-[#1e293b] mb-1">Apple AR Glasses Timeline</h4>
              <p className="text-[10px] font-medium text-[#94a3b8]">2 hours ago</p>
            </div>

            <div className="p-4 hover:bg-white rounded-2xl transition-all cursor-pointer group">
              <h4 className="font-bold text-sm text-[#64748b] group-hover:text-[#1e293b] mb-1">Tesla Home Energy AI</h4>
              <p className="text-[10px] font-medium text-[#94a3b8]">Yesterday</p>
            </div>

            <div className="p-4 hover:bg-white rounded-2xl transition-all cursor-pointer group">
              <h4 className="font-bold text-sm text-[#64748b] group-hover:text-[#1e293b] mb-1">SpaceX Starship Commercial</h4>
              <p className="text-[10px] font-medium text-[#94a3b8]">Oct 12, 2023</p>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Header */}
          <header className="h-20 border-b border-[#f1f5f9] flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Sparkles size={22} />
              </div>
              <h2 className="text-xl font-black text-[#0f172a] tracking-tight">AI Prediction Engine</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                System Online: v4.2-Lighthouse
              </div>
              <button className="p-2 text-[#64748b] hover:text-primary transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </header>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-12 space-y-10 scrollbar-hide">
            {/* User Message */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-end gap-4"
            >
              <div className="max-w-2xl bg-primary p-6 rounded-3xl rounded-tr-none text-white shadow-xl shadow-primary/20">
                <p className="text-sm font-bold leading-relaxed">
                  What's the latest prediction on Apple's upcoming wearable tech and Tesla's ecosystem expansion?
                </p>
                <p className="text-[9px] font-black opacity-60 mt-4 text-right uppercase tracking-widest">10:42 AM</p>
              </div>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" className="w-10 h-10 rounded-2xl shadow-md border-2 border-white" />
            </motion.div>

            {/* AI Message */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-2xl flex items-center justify-center text-primary border border-[#e2e8f0] shadow-sm">
                <Sparkles size={20} />
              </div>
              <div className="max-w-3xl space-y-6">
                <p className="text-sm font-bold text-[#475569] leading-relaxed">
                  Based on current patent filings, supply chain logistics in Shenzhen, and historical release cycles, here are my top-tier predictions for the upcoming quarters:
                </p>
                
                <PredictionCard 
                  title="Apple AR Glasses (Project Iris)"
                  icon={Target}
                  confidence="92"
                  launch="Q4 2024 / Early Q1 2025"
                  features="Micro-LED Displays, Spatial Audio, RealityOS integration, Prescription Lens support."
                  rationale="Recent pivots in TSMC production schedules suggest a 3nm chip dedicated to low-power optical computing has entered mass production."
                  color={{ 
                    bg: 'bg-blue-50', 
                    text: 'text-blue-600', 
                    badgeBg: 'bg-emerald-50', 
                    badgeText: 'text-emerald-600', 
                    badgeBorder: 'border-emerald-100' 
                  }}
                />

                <PredictionCard 
                  title="Tesla Home Energy AI"
                  icon={Zap}
                  confidence="84"
                  launch="Mid 2025"
                  features="Autonomous Power-Grid arbitrage, Predictive solar charging, V2H (Vehicle-to-Home) bi-directional AI."
                  rationale="Integration of Dojo computing nodes into residential battery clusters is the logical next step for Tesla's distributed energy vision."
                  color={{ 
                    bg: 'bg-indigo-50', 
                    text: 'text-indigo-600', 
                    badgeBg: 'bg-indigo-50', 
                    badgeText: 'text-indigo-600', 
                    badgeBorder: 'border-indigo-100' 
                  }}
                />
                
                <p className="text-[9px] font-black text-[#94a3b8] uppercase tracking-widest mt-4">10:43 AM</p>
              </div>
            </motion.div>
          </div>

          {/* Chat Input */}
          <div className="px-8 pb-8 pt-4 bg-white/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex items-center gap-3 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] shadow-lg shadow-slate-200/50">
              <button className="p-3 text-[#94a3b8] hover:text-primary transition-colors">
                <Paperclip size={20} />
              </button>
              <button className="p-3 text-[#94a3b8] hover:text-primary transition-colors mr-2">
                <ImageIcon size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Ask about future tech, company timelines, or market shifts..." 
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[#1e293b] placeholder:text-[#94a3b8]"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <Send size={20} />
              </motion.button>
            </div>
            <div className="flex items-center justify-between max-w-4xl mx-auto mt-4 px-2">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest hover:text-primary transition-colors">
                  <Target size={12} /> View Prediction Accuracy
                </button>
                <button className="flex items-center gap-1 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest hover:text-primary transition-colors">
                  <Plus size={12} /> Data Sources
                </button>
              </div>
              <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
                Powered by L-Radar Neural Engine
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIPredictions;
