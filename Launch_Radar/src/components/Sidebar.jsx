import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Zap, 
  Briefcase, 
  BarChart3, 
  Store, 
  UserCog, 
  Settings, 
  PlusCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { cartCount, user } = useApp();
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'AI Predictions', icon: Zap, path: '/predictions' },
    { name: 'Brands', icon: Briefcase, path: '/brands' },
    { name: 'Market Insights', icon: BarChart3, path: '/market-intelligence' },
    { name: 'Store', icon: Store, path: '/store' },
    { name: 'Admin', icon: UserCog, path: '/admin' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#e2e8f0] flex flex-col z-50">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <Zap className="fill-current" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0f172a] leading-tight">LaunchRadar</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">{user.plan}</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <div className={`sidebar-item ${isActive(item.path) ? 'sidebar-item-active' : ''} relative`}>
              <item.icon size={20} />
              <span className="font-semibold text-sm">{item.name}</span>
              {item.name === 'Store' && cartCount > 0 && (
                <span className="absolute right-4 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Credits Card */}
      <div className="p-4 mx-3 mb-4 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Credits</span>
          <span className="text-[10px] font-bold text-[#1e293b]">1,240 / 2,000</span>
        </div>
        <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '62%' }}
            className="h-full bg-primary"
          />
        </div>
        <Link to="/report">
          <button className="w-full mt-4 py-2.5 bg-primary text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-hover transition-all active:scale-95 shadow-md shadow-primary/20">
            <PlusCircle size={14} />
            New Report
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
