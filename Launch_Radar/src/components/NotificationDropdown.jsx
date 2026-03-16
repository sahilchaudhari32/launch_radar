import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'LAUNCHES',
    title: 'New Brand Launch: NovaTech just unveiled AI Smart Glasses for 2026',
    time: '2m ago',
    unread: true,
    icon: Sparkles,
    iconColor: 'bg-primary/10 text-primary',
    category: 'Launches'
  },
  {
    id: 2,
    type: 'PREDICTIONS',
    title: 'AI Prediction Update: New patent filing suggests Apple is working on AR Glasses',
    time: '45m ago',
    unread: true,
    icon: Lightbulb,
    iconColor: 'bg-[#f0f9ff] text-[#0ea5e9]',
    category: 'Predictions'
  },
  {
    id: 3,
    type: 'HYPE ALERT',
    title: 'Hype Alert: Tesla Smart Home system is trending',
    time: '3h ago',
    unread: false,
    icon: Zap,
    iconColor: 'bg-[#fff1f2] text-[#e11d48]',
    category: 'All'
  }
];

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredNotifications = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: -20, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -20, y: 10 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              opacity: { duration: 0.2 }
            }}
            style={{ perspective: 1000, transformOrigin: "top right" }}
            className="absolute right-0 mt-3 w-[380px] bg-white rounded-[24px] shadow-2xl border border-[#eef2f6] z-50 overflow-hidden shadow-primary/10"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1e293b]">Notifications</h3>
                <span className="bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
              <button className="text-xs font-bold text-primary hover:underline transition-all">
                Mark all as read
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 py-3 flex items-center gap-6 border-b border-[#f1f5f9]">
              {['All', 'Launches', 'Predictions'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold transition-all relative pb-1 ${
                    activeTab === tab ? 'text-primary' : 'text-[#94a3b8] hover:text-[#475569]'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="notifTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto py-2">
              {filteredNotifications.map((notif) => (
                <div key={notif.id} className="px-5 py-4 hover:bg-[#f8fafc] cursor-pointer transition-colors relative group">
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.iconColor}`}>
                      <notif.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
                          {notif.type}
                        </span>
                        <span className="text-[10px] font-bold text-[#94a3b8]">{notif.time}</span>
                      </div>
                      <p className="text-[13px] font-bold text-[#334155] leading-snug mb-2 group-hover:text-primary transition-colors">
                        {notif.title}
                      </p>
                      <button className="text-[11px] font-black text-primary flex items-center gap-1 hover:gap-2 transition-all">
                        View Details <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                  {notif.unread && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(43,89,255,0.6)]" />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#f8fafc] border-t border-[#f1f5f9] text-center">
              <button className="text-sm font-bold text-[#64748b] hover:text-[#1e293b] transition-colors">
                See all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
