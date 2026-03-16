import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-32" id="cta">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
          className="bg-primary rounded-[24px] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between text-white relative overflow-hidden shadow-[0_20px_40px_rgba(43,89,255,0.2)]"
        >
          <div className="max-w-full lg:max-w-[600px] relative z-[2] text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-[3rem] font-bold mb-6 leading-tight"
            >Ready to spot the next industry leader?</motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl opacity-90 mb-10 md:mb-12 leading-relaxed"
            >Join the exclusive waitlist and get first access to our prediction dashboard and weekly high-velocity reports.</motion.p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth?mode=signup')}
                className="btn bg-white text-primary hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
              >Join the Waitlist</motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-300 w-full sm:w-auto"
              >View Enterprise Plans</motion.button>
            </div>
          </div>
          <motion.div 
            animate={{ 
              rotate: [-15, -10, -15],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -right-5 -bottom-5 opacity-20 hidden sm:block pointer-events-none"
          >
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 16.5C4.5 16.5 2 15 2 12C2 9 4.5 7.5 4.5 7.5L8 2L15 4.5L13.5 10.5L17.5 10.5C17.5 10.5 22 10.5 22 14.5C22 18.5 17.5 18.5 17.5 18.5H13.5L15 24.5L8 22L4.5 16.5Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
              <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="white"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};





export default CTA;
