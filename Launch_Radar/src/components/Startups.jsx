import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const StartupCard = ({ startup, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  return (
    <motion.div 
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, type: 'spring', stiffness: 80 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col sm:flex-row bg-white rounded-[20px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 border border-black/[0.02] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] cursor-default perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)", background: startup.color }}
        className="w-full sm:w-[180px] flex items-center justify-center text-white min-h-[140px] sm:min-h-[240px]"
      >
        <motion.div
          whileHover={{ scale: 1.5, rotate: 360 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          dangerouslySetInnerHTML={{ __html: startup.icon }}
        />
      </div>
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="flex-1 p-6 md:p-8 flex flex-col"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl md:text-2xl font-bold">{startup.name}</h3>
          <div className="bg-[#ecfdf5] text-[#10b981] px-3 py-1.5 rounded-lg font-extrabold text-sm md:text-base flex flex-col items-center leading-none">
            {startup.score} <span className="text-[0.6rem] font-bold mt-1">SCORE</span>
          </div>
        </div>
        <p className="text-text-muted text-[0.9rem] md:text-[0.95rem] mb-6">{startup.description}</p>
        <div className="flex flex-wrap gap-2">
          {startup.tags.map(tag => (
            <span key={tag} className="bg-[#f1f5f9] px-2.5 py-1 rounded-md text-[0.7rem] md:text-[0.75rem] font-semibold text-text-muted">{tag}</span>
          ))}
        </div>
        <div className="mt-6 sm:mt-auto flex justify-between items-center pt-6 border-t border-black/5 sm:border-t-0">
           <span className="flex items-center gap-2 text-primary font-bold text-[0.8rem] md:text-[0.85rem]">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            {startup.growth}
           </span>
           <motion.button 
            whileHover={{ scale: 1.2, color: '#fbbf24' }}
            whileTap={{ scale: 0.8 }}
            className="bg-transparent border-none text-[#cbd5e1] p-2 rounded-full transition-all duration-200 hover:bg-[#fffbeb] cursor-pointer"
           >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
           </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Startups = () => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/landing')
      .then(res => res.json())
      .then(data => {
        if (data && data.startups) setStartups(data.startups);
      })
      .catch(console.error);
  }, []);

  if (!startups || startups.length === 0) return <section className="py-16 md:py-32 bg-[#f8fafc]" id="predictions"></section>;

  return (
    <section className="py-16 md:py-32 bg-[#f8fafc]" id="predictions">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 md:gap-0"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-[2.5rem] mb-2 font-bold leading-tight">High-Velocity Startups</h2>
            <p className="text-text-muted">Predicted breakout candidates for Q4 2024</p>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05, x: 5 }}
            href="#all" 
            className="flex items-center gap-2 text-primary font-semibold text-[0.9rem] md:text-[0.95rem] no-underline"
          >
            View all predictions 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
        </motion.div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {startups.map((startup, index) => (
            <StartupCard key={index} startup={startup} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Startups;

