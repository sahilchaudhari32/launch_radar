import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className={`sticky top-0 z-[1000] border-b border-black/5 py-4 transition-colors duration-300 ${isMenuOpen ? 'bg-white' : 'bg-white/80 backdrop-blur-xl'}`}>
      <div className="container flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 30L16 24L30 30L16 2Z" fill="#2B59FF" stroke="#2B59FF" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <span className="text-[1.2rem] md:text-[1.4rem] font-extrabold text-text-main tracking-tight">Launch<span className="text-primary">Radar</span></span>
        </motion.div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10">
          {['Discover', 'Predictions', 'How it Works', 'Pricing'].map((item) => (
            <motion.a
              key={item}
              whileHover={{ y: -2, color: '#2B59FF' }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
              className="font-medium text-text-muted text-[0.95rem] transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center bg-[#f1f4f9] px-4 py-2 rounded-full gap-2 text-text-muted w-[240px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search startups..." className="bg-transparent border-none outline-none text-[0.9rem] w-full" />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth?mode=signup')}
            className="btn btn-primary !px-5 !py-2 !text-[0.9rem]"
          >
            Sign Up
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth?mode=login')}
            className="btn !bg-primary !text-white hover:!bg-primary/90 !px-5 !py-2 !text-[0.9rem]"
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.span 
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
            className="w-6 h-0.5 bg-text-main"
          ></motion.span>
          <motion.span 
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-text-main"
          ></motion.span>
          <motion.span 
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
            className="w-6 h-0.5 bg-text-main"
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-[73px] bg-white z-[10000] p-8 flex flex-col gap-8 shadow-2xl overflow-y-auto h-[calc(100vh-73px)]"
          >
            <div className="flex flex-col gap-6">
              {['Discover', 'Predictions', 'How it Works', 'Pricing'].map((item) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-bold text-text-main no-underline"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 pt-8 border-t border-black/5"
            >
              <div className="flex items-center bg-[#f1f4f9] px-6 py-4 rounded-xl gap-3 text-text-muted mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" placeholder="Search startups..." className="bg-transparent border-none outline-none text-lg w-full" />
              </div>
              <button 
                onClick={() => { navigate('/auth?mode=signup'); setIsMenuOpen(false); }}
                className="btn btn-primary w-full !py-4 text-lg"
              >
                Sign Up
              </button>
              <button 
                onClick={() => { navigate('/auth?mode=login'); setIsMenuOpen(false); }}
                className="btn !bg-primary !text-white w-full !py-4 text-lg"
              >
                Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

