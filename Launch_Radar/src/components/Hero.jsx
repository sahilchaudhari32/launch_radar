import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  // --- Dynamic Graph Logic ---
  const [graphData, setGraphData] = useState([40, 60, 50, 80, 100]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(prev => prev.map(() => Math.floor(Math.random() * 60) + 40));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-12 md:py-24 overflow-hidden relative">
      {/* Floating 3D-like Background Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-2xl blur-xl z-0"
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [360, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10"
      >
        <div className="flex-1 max-w-full lg:max-w-[600px] text-center lg:text-left">
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <span className="tag tag-blue">✨ AI Predictions Live</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl mb-4 md:mb-6 text-text-main leading-tight font-bold">
            Predict the <span className="text-primary">Next Unicorn</span> before it happens
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-muted mb-8 md:mb-12 max-w-[500px] mx-auto lg:mx-0">
            LaunchRadar uses advanced neural networks to scan millions of signals, identifying high-potential startups before they hit the mainstream.
          </motion.p>
          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center bg-white p-2 sm:pl-6 rounded-2xl sm:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.05)] gap-3 border border-[#e3e8ee] max-w-full sm:max-w-[500px] mx-auto lg:mx-0">
              <div className="hidden sm:flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input type="email" placeholder="Enter your work email" className="w-full sm:flex-1 border-none outline-none text-base px-4 py-2 sm:p-0 text-center sm:text-left" />
              <motion.button 
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth?mode=signup')}
                className="btn btn-primary w-full sm:w-auto"
              >
                Get Early Access
              </motion.button>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-text-muted text-[0.9rem]">
            <div className="flex">
              <img src="https://i.pravatar.cc/150?u=1" alt="Investor" className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 shadow-sm" />
              <img src="https://i.pravatar.cc/150?u=2" alt="Investor" className="w-8 h-8 rounded-full border-2 border-white -ml-2 shadow-sm" />
              <img src="https://i.pravatar.cc/150?u=3" alt="Investor" className="w-8 h-8 rounded-full border-2 border-white -ml-2 shadow-sm" />
            </div>
            <span>Trusted by 2,000+ early-stage investors</span>
          </motion.div>
        </div>
        
        {/* 3D Dashboard Card */}
        <motion.div 
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.4 }}
          className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end perspective-1000"
        >
          <div 
            style={{ transform: "translateZ(75px)" }}
            className="glass-card w-full max-w-[450px] aspect-square p-6 md:p-10 flex flex-col justify-between bg-gradient-to-br from-blue-50/50 to-blue-100/50 relative shadow-2xl"
          >
            <div className="flex justify-between items-center" style={{ transform: "translateZ(50px)" }}>
              <span className="tag-blue tag">GROWTH FORECAST</span>
              <span className="text-[1.5rem] md:text-[2rem] font-extrabold text-primary">+482%</span>
            </div>
            
            <div className="h-[150px] md:h-[200px] flex items-end gap-3 md:gap-4" style={{ transform: "translateZ(40px)" }}>
              {graphData.map((height, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: `${height}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                  className={`flex-1 rounded-md ${i === graphData.length - 1 ? 'bg-primary shadow-[0_0_20px_rgba(43,89,255,0.4)]' : 'bg-slate-300/60'}`}
                ></motion.div>
              ))}
            </div>

            {/* Float child element internally for more 3D depth */}
            <div 
              style={{ transform: "translateZ(60px)" }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-text-main">LIVE SIGNALS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};





export default Hero;
