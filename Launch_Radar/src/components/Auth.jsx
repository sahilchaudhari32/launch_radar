import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode')?.toUpperCase() === 'SIGNUP' ? 'SIGNUP' : 'LOGIN';
  const [mode, setMode] = useState(initialMode);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newMode = searchParams.get('mode')?.toUpperCase();
    if (newMode === 'SIGNUP' || newMode === 'LOGIN') {
      setMode(newMode);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth and redirect to dashboard
    navigate('/dashboard');
  };
  
  // --- 3D Tilt Logic for the form card ---
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden relative font-['Inter',_sans-serif]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full"></div>
      </div>

      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-text-muted hover:text-primary transition-colors cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-sm group-hover:border-primary group-hover:shadow-md transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
        <span className="font-semibold text-sm">Return Home</span>
      </motion.button>

      {/* --- FORM SIDE --- */}
      <motion.div 
        layout
        className={`flex-1 flex flex-col justify-center items-center p-8 md:p-16 z-10 transition-all duration-700 ease-in-out ${mode === 'LOGIN' ? 'order-1' : 'order-2'}`}
      >
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-[440px] perspective-1000"
        >
          <AnimatePresence mode="wait">
            {mode === 'LOGIN' ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-[#111827] mb-2">Welcome Back</h1>
                  <p className="text-text-muted">Sign in to your account to continue</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button className="flex items-center justify-center gap-3 py-3 px-4 border border-black/5 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-3 px-4 border border-black/5 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm">
                    <img src="https://www.svgrepo.com/show/441221/apple-logo.svg" className="w-5 h-5" alt="Apple" />
                    Apple
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-8">
                  <div className="absolute w-full h-[1px] bg-black/5"></div>
                  <span className="relative bg-white px-4 text-xs font-bold text-text-muted uppercase tracking-wider">or continue with email</span>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-text-main mb-2">Email Address</label>
                    <input type="email" placeholder="name@company.com" className="w-full px-5 py-3.5 rounded-xl border border-black/5 bg-[#f9fafb] focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                       <label className="text-sm font-bold text-text-main">Password</label>
                       <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-xl border border-black/5 bg-[#f9fafb] focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none" />
                      <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <input type="checkbox" id="keep" className="w-4 h-4 rounded border-black/10 text-primary focus:ring-primary" />
                    <label htmlFor="keep" className="text-sm font-semibold text-text-muted">Keep me signed in</label>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-base mt-2"
                  >
                    Sign In to Dashboard
                  </motion.button>
                </form>

                <p className="text-center mt-8 text-sm font-semibold text-text-muted">
                  Don't have an account? <button onClick={() => setMode('SIGNUP')} className="text-primary hover:underline font-bold">Start your 14-day free trial</button>
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="signup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-[#111827] mb-2">Create Account</h1>
                  <p className="text-text-muted">Step into the future of tech discovery today.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button className="flex items-center justify-center gap-3 py-3 px-4 border border-black/5 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-3 px-4 border border-black/5 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm">
                    <img src="https://www.svgrepo.com/show/353784/github-icon.svg" className="w-5 h-5" alt="GitHub" />
                    GitHub
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-8">
                  <div className="absolute w-full h-[1px] bg-black/5"></div>
                  <span className="relative bg-white px-4 text-xs font-bold text-text-muted uppercase tracking-wider">or continue with email</span>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-text-main mb-2">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </span>
                      <input type="text" placeholder="John Doe" className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-black/5 bg-[#f9fafb] focus:bg-white focus:border-primary transition-all outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-main mb-2">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      </span>
                      <input type="email" placeholder="name@company.com" className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-black/5 bg-[#f9fafb] focus:bg-white focus:border-primary transition-all outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-main mb-2">Password</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </span>
                      <input type="password" placeholder="••••••••" className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-black/5 bg-[#f9fafb] focus:bg-white focus:border-primary transition-all outline-none" />
                      <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 py-1">
                    <input type="checkbox" id="terms" className="w-4 h-4 rounded border-black/10 text-primary focus:ring-primary mt-0.5" />
                    <label htmlFor="terms" className="text-xs font-semibold text-text-muted leading-relaxed">
                      I agree to the <a href="#" className="text-primary hover:underline font-bold">Terms of Service</a> and <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>.
                    </label>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-base mt-2 flex items-center justify-center gap-2"
                  >
                    Create Account 
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </motion.button>
                </form>

                <p className="text-center mt-6 text-sm font-semibold text-text-muted">
                  Already have an account? <button onClick={() => setMode('LOGIN')} className="text-primary hover:underline font-bold">Log in</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Footer links */}
        <div className="mt-12 md:mt-auto pt-8 flex gap-6 text-[0.7rem] font-bold text-text-muted/60 uppercase tracking-widest">
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Help Center</a>
        </div>
      </motion.div>

      {/* --- VISUAL SIDE (BLUE) --- */}
      <motion.div 
        layout
        className={`flex-1 bg-indigo-950 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center text-white min-h-[400px] md:min-h-0 transition-all duration-700 ease-in-out ${mode === 'LOGIN' ? 'order-2' : 'order-1'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-900/40 to-slate-950 z-0"></div>
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-indigo-950">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-60' : 'opacity-0'}`}
          >
            <source src="https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/18c00cf7-a282-4fc1-a77c-fa60d30ee119.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 max-w-[480px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={mode === 'LOGIN' ? 'login-text' : 'signup-text'}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter">LaunchRadar</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">
              {mode === 'LOGIN' ? 'Unlock the future of tech.' : 'Discover the next frontier of tech.'}
            </h2>
            <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-medium">
              {mode === 'LOGIN' 
                ? 'Discover the next generation of startups before they hit the mainstream. Join 50,000+ investors on the world\'s most advanced discovery platform.'
                : 'Join 50,000+ pioneers tracking real-time launches, space missions, and futuristic breakthroughs.'}
            </p>
          </motion.div>

          {/* Mini Stats (Login Mode only) */}
          <AnimatePresence>
            {mode === 'LOGIN' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-4 mt-12"
              >
                <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl text-left">
                  <div className="text-2xl font-black mb-1">12k+</div>
                  <div className="text-[0.65rem] font-bold text-blue-200 uppercase tracking-widest">Startups Tracked</div>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl text-left">
                  <div className="text-2xl font-black mb-1">24/7</div>
                  <div className="text-[0.65rem] font-bold text-blue-200 uppercase tracking-widest">Live Radar Feed</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating background decorations */}
        <div className="absolute top-[20%] right-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

export default Auth;
