import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Search, 
  Bell, 
  MoreHorizontal, 
  Plus, 
  Filter,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Monitor,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const StatCard = ({ title, value, trend, icon: Icon, trendColor, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[32px] border border-[#eef2f6] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${title === 'Net Loss' ? 'bg-rose-50 text-rose-500' : 'bg-primary/10 text-primary'}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black italic ${trendColor === 'green' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>
        {trendColor === 'green' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-2">{title}</p>
      <h3 className="text-3xl font-black text-[#1e293b] tracking-tighter italic font-['Outfit',_sans-serif]">{value}</h3>
    </div>
  </motion.div>
);

const AdminConsole = () => {
  const navigate = useNavigate();
  const data = [
    { name: 'JAN', value: 2400 }, { name: 'FEB', value: 2100 }, { name: 'MAR', value: 3200 },
    { name: 'APR', value: 4500 }, { name: 'MAY', value: 2800 }, { name: 'JUN', value: 2400 },
    { name: 'JUL', value: 4800 }, { name: 'AUG', value: 5200 }, { name: 'SEP', value: 2100 },
    { name: 'OCT', value: 6200 }, { name: 'NOV', value: 3400 }, { name: 'DEC', value: 7200 }
  ];

  const regions = [
    { label: 'North America', percent: 88 },
    { label: 'Europe', percent: 72 },
    { label: 'Asia Pacific', percent: 94 },
    { label: 'Latin America', percent: 45 }
  ];

  const products = [
    { name: 'Titan Engine v4', category: 'Core Infrastructure', status: 'ACTIVE', sales: '2,451', revenue: '$42,800', rating: 5, icon: Cpu },
    { name: 'Cloud Sentinel', category: 'Security Suite', status: 'MAINTENANCE', sales: '1,120', revenue: '$21,340', rating: 4, icon: ShieldCheck },
    { name: 'Insight Analytics', category: 'Business Intelligence', status: 'ACTIVE', sales: '5,630', revenue: '$94,200', rating: 5, icon: BarChart3 }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Header Actions */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="flex items-center gap-4">
             <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Account Overview</h1>
             <span className="px-3 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-100 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
             </span>
          </div>
          <div className="flex items-center gap-8">
             <div className="relative w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
                <input type="text" placeholder="Search analytics..." className="w-full pl-12 pr-4 py-3 bg-white border border-[#e2e8f0] rounded-[18px] text-[11px] font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
             </div>
             <button className="relative w-12 h-12 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center text-[#64748b] hover:text-primary transition-all shadow-sm">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full" />
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 px-2">
          <StatCard title="Total Earnings" value="$128,430.00" trend="+12.5%" icon={DollarSign} trendColor="green" index={0} />
          <StatCard title="Net Loss" value="-$4,210.50" trend="-2.1%" icon={TrendingDown} trendColor="red" index={1} />
          <StatCard title="Active Orders" value="1,240" trend="+8.4%" icon={ShoppingBag} trendColor="green" index={2} />
          <StatCard title="Total Users" value="45.2k" trend="+4.2%" icon={Users} trendColor="green" index={3} />
        </div>

        {/* Charts Section */}
        <div className="flex gap-8 mb-12 px-2">
           {/* Revenue Chart */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="flex-[2.5] bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-sm"
           >
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-xl font-black text-[#1e293b] tracking-tight">Sales & Popularity Trends</h3>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mt-1">Monthly revenue performance</p>
                 </div>
                 <div className="flex gap-2">
                    <select className="px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1e293b] appearance-none cursor-pointer pr-10 relative">
                       <option>Last 12 Months</option>
                    </select>
                 </div>
              </div>
              
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} 
                       dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                       contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                       labelStyle={{ fontWeight: 900, fontSize: '10px', color: '#94a3b8', marginBottom: '4px' }}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="value" 
                       stroke="#2563eb" 
                       strokeWidth={4} 
                       fillOpacity={1} 
                       fill="url(#colorValue)" 
                       animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </motion.div>

           {/* Regional Stats */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="flex-1 bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-sm flex flex-col"
           >
              <h3 className="text-xl font-black text-[#1e293b] tracking-tight mb-2">Regional Popularity</h3>
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-10">Growth by territory</p>
              
              <div className="space-y-8 flex-1">
                 {regions.map((region, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[11px] font-black text-[#64748b]">{region.label}</span>
                         <span className="text-[11px] font-black text-[#1e293b]">{region.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${region.percent}%` }}
                           transition={{ duration: 1.5, ease: "circOut", delay: 0.5 + i * 0.1 }}
                           className="h-full bg-primary" 
                         />
                      </div>
                   </div>
                 ))}
              </div>

              <button className="mt-10 w-full py-4 bg-[#f8fafc] border border-[#e2e8f0] text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:text-white transition-all">
                 View Full Report
              </button>
           </motion.div>
        </div>

        {/* Featured Products Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[40px] border border-[#eef2f6] shadow-sm p-10 px-12 mb-20"
        >
           <div className="flex justify-between items-center mb-12">
              <div>
                 <h3 className="text-2xl font-black text-[#1e293b] tracking-tight mb-2">Featured Products</h3>
                 <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest italic">Manage and monitor product performance</p>
              </div>
              <div className="flex gap-4">
                 <button className="px-6 py-3.5 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter size={16} /> Filter
                 </button>
                 <Link to="/admin/products/new">
                   <button className="px-8 py-3.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                      <Plus size={20} /> New Product
                   </button>
                 </Link>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                    <tr className="text-left text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] border-b border-[#f1f5f9]">
                       <th className="pb-6">Product Name</th>
                       <th className="pb-6">Status</th>
                       <th className="pb-6">Sales</th>
                       <th className="pb-6">Revenue</th>
                       <th className="pb-6">Popularity</th>
                       <th className="pb-6 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#f1f5f9]">
                    {products.map((product, i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                         <td className="py-8">
                            <div className="flex items-center gap-5">
                               <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-[#94a3b8] group-hover:bg-white group-hover:shadow-lg transition-all">
                                  {product.icon && <product.icon size={28} />}
                               </div>
                               <div>
                                  <h4 className="text-sm font-black text-[#1e293b] mb-1">{product.name}</h4>
                                  <p className="text-[10px] font-bold text-[#94a3b8]">{product.category}</p>
                               </div>
                            </div>
                         </td>
                         <td className="py-8">
                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${product.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 'bg-indigo-50 text-indigo-500 border border-indigo-100'}`}>
                               {product.status}
                            </span>
                         </td>
                         <td className="py-8 font-black text-sm text-[#1e293b]">{product.sales}</td>
                         <td className="py-8 font-black text-sm text-[#1e293b] italic">{product.revenue}</td>
                         <td className="py-8">
                            <div className="flex gap-1">
                               {[...Array(5)].map((_, j) => (
                                 <Zap key={j} size={14} className={j < product.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                               ))}
                            </div>
                         </td>
                         <td className="py-8 text-right">
                            <button className="p-2 text-[#94a3b8] hover:text-[#1e293b] transition-colors">
                               <MoreHorizontal size={20} />
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </motion.div>

        {/* Floating Mini Profile (as seen in screenshot) */}
        <div className="fixed bottom-12 left-6 w-52 z-50">
           <div className="bg-blue-50/90 backdrop-blur-xl p-6 rounded-[28px] border border-blue-100 shadow-2xl shadow-blue-200/40">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-indigo-200 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
                 </div>
                 <div>
                    <h4 className="text-xs font-black text-[#1e293b] leading-tight mb-1">Alex Chen</h4>
                    <p className="text-[10px] font-bold text-[#94a3b8] italic lowercase leading-none">System Admin</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminConsole;
