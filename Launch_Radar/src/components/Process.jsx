import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const StepCard = ({ step, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
      transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -10 }}
      className="glass-card p-8 md:p-12 text-left cursor-default transition-all duration-300 perspective-1000"
    >
      <motion.div 
        style={{ transform: "translateZ(50px)" }}
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        className="w-12 h-12 bg-blue-50 text-primary flex items-center justify-center rounded-xl mb-8 group-hover:bg-primary group-hover:text-white"
        dangerouslySetInnerHTML={{ __html: step.icon }}
      />

      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl mb-4 font-bold">{step.title}</h3>
        <p className="text-text-muted text-[0.95rem] leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/landing')
      .then(res => res.json())
      .then(data => {
        if (data && data.process) setSteps(data.process);
      })
      .catch(console.error);
  }, []);

  if (!steps || steps.length === 0) return <section className="py-20 md:py-32" id="how"></section>;

  return (
    <section className="py-20 md:py-32" id="how">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-[2.5rem] font-bold mb-4 leading-tight">How our prediction engine works</h2>
          <p className="text-text-muted text-lg md:text-xl max-w-[700px] mx-auto">We process millions of technical and social data points to identify the &quot;signal&quot; within the noise.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

