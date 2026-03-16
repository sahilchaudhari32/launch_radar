import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Bell, 
  UserCircle2, 
  Cpu, 
  Globe, 
  Users, 
  Zap,
  Target,
  BarChart2,
  Calendar,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  ExternalLink,
  Laptop
} from 'lucide-react';
import Sidebar from './Sidebar';

const BrandDetail = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const stats = [
    { label: 'Hype Meter', value: '98.4', change: '+12%', icon: Zap, color: 'text-blue-500' },
    { label: 'Global Rank', value: '#12', change: '+2%', icon: Globe, color: 'text-indigo-500' },
    { label: 'Followers', value: '12.5k', change: '+15%', icon: Users, color: 'text-blue-600' }
  ];

  const products = [
    {
      name: 'NeuralCore X1',
      price: '$299',
      status: 'BEST SELLER',
      description: 'Ultra-efficient neural processing unit optimized for real-time edge inference and...',
      image: 'https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=400',
      action: 'Buy Now'
    },
    {
      name: 'EdgeVault Pro',
      price: '$450',
      status: 'PRE-ORDER',
      description: 'Military-grade encrypted hardware storage specifically designed for sensitive neural...',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
      action: 'Pre-order Now'
    },
    {
      name: 'NeuralSync SDK',
      price: '$0/mo',
      status: 'FREE TIER',
      description: 'Open-source development kit for seamlessly deploying models across multiple...',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=400',
      action: 'Get Started'
    }
  ];

  const predictions = [
    {
      title: 'Market Dominance in Edge Computing',
      description: 'NeuralEdge is predicted to capture 15% of the niche edge-AI hardware market within Q4 2024 based on current pre-order trajectories.',
      confidence: 'HIGH CONFIDENCE',
      source: 'LaunchRadar Insight Engine',
      type: 'prediction'
    },
    {
      title: 'Tier 1 Cloud Integration',
      description: 'Rumors suggest a major partnership with AWS or Google Cloud for hybrid edge-cloud infrastructure support.',
      confidence: 'SPECULATIVE',
      source: 'Sentiment analysis based on recent social signals',
      type: 'speculative'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col font-['Inter',_sans-serif]">
        {/* Navigation Bar */}
        <header className="h-20 bg-white border-b border-[#f1f5f9] flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-md bg-white/80">
          <div className="flex bg-[#f8fafc] p-1 rounded-xl">
            {['Profile', 'Products', 'Community'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-xs font-black tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-[#94a3b8] hover:text-[#64748b]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
              <input 
                type="text" 
                placeholder="Search brands..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs font-bold focus:outline-none"
              />
            </div>
            <button className="text-[#64748b] hover:text-primary transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 bg-orange-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="User" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-10">
          {/* Brand Profile Hero Card */}
          <section className="bg-white rounded-[40px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 p-12 mb-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-8">
                  <div className="w-32 h-32 bg-primary rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-primary/40 ring-8 ring-primary/5">
                    <Cpu size={64} />
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-[#0f172a] mb-3 tracking-tighter">NeuralEdge AI</h1>
                    <div className="flex items-center gap-4">
                      <button className="px-6 py-2.5 bg-slate-50 border border-[#e2e8f0] text-[#64748b] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm">
                        Follow Brand
                      </button>
                      <button className="px-8 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <p className="text-xl font-medium text-[#475569] leading-relaxed italic mb-6">
                  "Pioneering the future of edge computing with neural architectures."
                </p>
                <div className="flex items-center gap-8 pt-6 border-t border-[#f1f5f9]">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-4 py-2 rounded-full">
                    Artificial Intelligence
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
                    <Calendar size={14} /> Founded Oct 2023
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
                    <Globe size={14} /> San Francisco, CA
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#f8fafc] p-8 rounded-3xl border border-[#f1f5f9] group hover:bg-white hover:shadow-xl hover:border-primary/10 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">{stat.label}</p>
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-black text-[#0f172a]">{stat.value}</span>
                      <span className="text-xs font-black text-emerald-500 mb-1 flex items-center gap-0.5">
                        <TrendingUp size={14} /> {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          </section>

          {/* Featured Products */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-[#1e293b] flex items-center gap-3">
                Featured Products
              </h2>
              <button className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                View All Products <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-10">
              {products.map((product, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[32px] border border-[#eef2f6] shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-56 group overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        product.status === 'BEST SELLER' ? 'bg-blue-600 text-white' : product.status === 'PRE-ORDER' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-black text-[#1e293b]">{product.name}</h4>
                      <span className="text-lg font-black text-primary">{product.price}</span>
                    </div>
                    <p className="text-xs font-medium text-[#64748b] leading-relaxed mb-8 line-clamp-2">
                      {product.description}
                    </p>
                    <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
                      {product.action}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Upcoming Predictions */}
          <section className="pb-12">
            <div className="flex items-center gap-3 mb-10">
              <Zap size={24} className="text-primary fill-primary" />
              <h2 className="text-2xl font-black text-[#1e293b]">Upcoming Predictions</h2>
            </div>
            
            <div className="bg-indigo-50/50 p-10 rounded-[40px] border border-primary/10 space-y-6">
              {predictions.map((p, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white p-8 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all flex items-start gap-6 group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    p.type === 'prediction' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-[#94a3b8]'
                  }`}>
                    {p.type === 'prediction' ? <BarChart2 size={24} /> : <Users size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-4 items-center mb-3">
                      <h4 className="text-base font-black text-[#1e293b]">{p.title}</h4>
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter border ${
                        p.confidence === 'HIGH CONFIDENCE' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {p.confidence}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#64748b] leading-relaxed mb-4">{p.description}</p>
                    <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">{p.source}</p>
                  </div>
                  <button className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={18} className="text-[#94a3b8]" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer Branding */}
          <footer className="pt-20 pb-10 border-t border-[#f1f5f9] flex flex-col items-center gap-6 text-[#94a3b8] font-bold text-xs uppercase tracking-widest">
            <p>© 2024 LaunchRadar Platform. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Brand Guidelines</button>
            </div>
          </footer>
        </div>

        {/* Floating Action Button Mockup (Simplified from Sidebar interaction) */}
        <div className="fixed bottom-10 left-6 z-[60]">
            <button className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/40 hover:translate-x-2 transition-all">
               <Plus size={18} /> Submit Startup
            </button>
        </div>
      </main>
    </div>
  );
};

export default BrandDetail;
