import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Globe, 
  Edit3, 
  Camera, 
  Search,
  Zap,
  CheckCircle2
} from 'lucide-react';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';

const TabButton = ({ label, icon: Icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${isActive ? 'text-primary' : 'text-[#64748b] hover:text-[#1e293b]'}`}
  >
    <Icon size={18} />
    {label}
    {isActive && (
      <motion.div 
        layoutId="activeTab" 
        className="absolute bottom-0 left-6 right-6 h-0.5 bg-primary rounded-full" 
      />
    )}
  </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const { user } = useApp();
  
  const tabs = [
    { label: 'Account', icon: User },
    { label: 'Security', icon: Shield },
    { label: 'Notifications', icon: Bell },
    { label: 'Appearance', icon: Monitor },
    { label: 'Language', icon: Globe }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#64748b]">
                <SettingsIcon size={22} />
             </div>
             <h1 className="text-[10px] font-black text-[#1e293b] uppercase tracking-[0.3em]">Settings</h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                <input type="text" placeholder="Search settings..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-[11px] font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
             </div>
             <button className="relative w-10 h-10 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center text-[#64748b] hover:text-primary transition-all shadow-sm">
                <Bell size={18} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
             </button>
             <div className="w-10 h-10 bg-indigo-100 rounded-xl overflow-hidden border-2 border-white shadow-md">
                <img src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="User" />
             </div>
          </div>
        </header>

        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-sm mb-12 px-12 relative overflow-hidden flex justify-between items-center"
        >
           <div className="flex items-center gap-10">
              <div className="relative">
                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                    <img src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="Avatar" />
                 </div>
                 <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-primary/30 hover:scale-110 transition-all">
                    <Camera size={18} />
                 </button>
              </div>
              <div>
                 <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">{user?.name || 'Your Name'}</h2>
                    <CheckCircle2 size={24} className="text-primary fill-primary/10" />
                 </div>
                 <div className="flex items-center gap-6 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest italic">
                    <span className="flex items-center gap-2 text-primary">
                       <Zap size={14} className="fill-current" /> {user?.plan || 'Free Tier'}
                    </span>
                    <span>â€¢ Since Jan 2023</span>
                 </div>
              </div>
           </div>
           
           <button className="px-8 py-4 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
              <Edit3 size={18} /> Edit Profile
           </button>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 border-b border-[#f1f5f9] mb-12 px-2">
           {tabs.map((tab) => (
             <TabButton 
               key={tab.label}
               label={tab.label}
               icon={tab.icon}
               isActive={activeTab === tab.label}
               onClick={() => setActiveTab(tab.label)}
             />
           ))}
        </div>

        {/* Settings Content Area */}
        <div className="space-y-10 pb-20 max-w-6xl">
           
           {/* Section 1: Personal Information */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-sm"
           >
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xl font-black text-[#1e293b] tracking-tight">Personal Information</h3>
                 <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline italic">Update</button>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Full Name</label>
                    <input type="text" defaultValue={user?.name || ''} className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none shadow-inner" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Email Address</label>
                    <input type="email" defaultValue={user?.email || ''} className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none shadow-inner" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Job Title</label>
                    <input type="text" value="Product Launch Manager" className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none shadow-inner" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">Location</label>
                    <input type="text" value="San Francisco, CA" className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none shadow-inner" />
                 </div>
              </div>
           </motion.section>

           {/* Section 2: Planning & Billing */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white p-10 rounded-[40px] border border-[#eef2f6] shadow-sm"
           >
              <h3 className="text-xl font-black text-[#1e293b] tracking-tight mb-10">Plan & Billing</h3>
              
              <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-[32px] flex justify-between items-center mb-10 group overflow-hidden relative">
                 <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-primary text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-primary/20">
                       <Zap size={32} className="fill-current" />
                    </div>
                    <div>
                       <h4 className="text-lg font-black text-[#1e293b] mb-1">Pro Monthly Plan</h4>
                       <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Next billing date: Feb 12, 2024</p>
                    </div>
                 </div>
                 <div className="text-right relative z-10">
                    <p className="text-3xl font-black text-[#1e293b] italic leading-tight mb-1">$29.00/mo</p>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Manage Subscription</button>
                 </div>
                 <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-primary/5 group-hover:rotate-12 transition-transform duration-1000" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <button className="w-full py-5 bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:border-primary transition-all shadow-sm">
                    View Invoices
                 </button>
                 <button className="w-full py-5 bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:border-primary transition-all shadow-sm">
                    Change Method
                 </button>
              </div>
           </motion.section>

           {/* Section 3: Danger Zone */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-rose-50/50 border border-rose-100 p-10 rounded-[40px] shadow-sm"
           >
              <h3 className="text-xl font-black text-rose-500 tracking-tight mb-10">Danger Zone</h3>
              
              <div className="bg-white p-10 rounded-[32px] border border-rose-100 flex justify-between items-center group">
                 <div className="max-w-md">
                    <h4 className="text-lg font-black text-[#1e293b] mb-2 leading-tight">Delete Account</h4>
                    <p className="text-[11px] font-bold text-[#64748b] italic leading-relaxed">Once you delete your account, there is no going back. Please be certain.</p>
                 </div>
                 <button className="px-10 py-5 bg-white border-2 border-rose-100 text-rose-500 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm active:scale-95">
                    Deactivate Account
                 </button>
              </div>
           </motion.section>

           {/* Footer info */}
           <footer className="pt-12 flex flex-col items-center">
              <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-4">
                 LaunchRadar v2.4.1 â€¢ Â© 2024 LaunchRadar Inc. All rights reserved.
              </p>
              <div className="flex gap-8 text-[10px] font-black text-primary uppercase tracking-widest italic">
                 <button className="hover:underline">Privacy Policy</button>
                 <button className="hover:underline">Terms of Service</button>
                 <button className="hover:underline">Status</button>
              </div>
           </footer>
        </div>

        {/* Floating Mini Storage (as seen in screenshot side) */}
        <div className="fixed bottom-12 left-6 w-52 z-50">
           <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/40">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] mb-4">Storage</p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '75%' }}
                   transition={{ duration: 1.5, ease: "circOut" }}
                   className="h-full bg-primary" 
                 />
              </div>
              <p className="text-[10px] font-bold text-[#1e293b] mb-6 italic">7.5 GB of 10 GB used</p>
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">Upgrade Plan</button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;


