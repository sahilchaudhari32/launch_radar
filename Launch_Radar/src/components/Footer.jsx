import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 bg-white border-t border-black/5">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12"
        >
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L2 30L16 24L30 30L16 2Z" fill="#2B59FF" stroke="#2B59FF" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <span className="text-[1.2rem] md:text-[1.4rem] font-extrabold text-text-main tracking-tight">Launch<span className="text-primary">Radar</span></span>
            </div>
            <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[320px]">
              The intelligence layer for the startup economy. Discover trends, track signals, and find the next unicorn.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold mb-2">Product</h4>
            {['Radar Engine', 'Startup Index', 'API Access'].map(link => (
              <motion.a 
                key={link}
                whileHover={{ x: 5, color: '#2B59FF' }}
                href="#" 
                className="text-text-muted transition-colors no-underline text-sm md:text-base"
              >{link}</motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold mb-2">Resources</h4>
            {['Research Lab', 'Weekly Blog', 'Documentation'].map(link => (
              <motion.a 
                key={link}
                whileHover={{ x: 5, color: '#2B59FF' }}
                href="#" 
                className="text-text-muted transition-colors no-underline text-sm md:text-base"
              >{link}</motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold mb-2">Social</h4>
            <div className="flex gap-4">
               <motion.a 
                whileHover={{ y: -5, scale: 1.2, color: '#2B59FF' }}
                href="#" 
                className="text-text-muted transition-all duration-300"
               >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
               </motion.a>
               <motion.a 
                whileHover={{ y: -5, scale: 1.2, color: '#2B59FF' }}
                href="#" 
                className="text-text-muted transition-all duration-300"
               >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </motion.a>
            </div>
          </div>
        </motion.div>
        <div className="mt-16 md:mt-20 pt-8 border-t border-black/5 text-center text-text-muted text-[0.8rem] md:text-sm">
          <p>© 2024 LaunchRadar Intelligence Platforms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};




export default Footer;
