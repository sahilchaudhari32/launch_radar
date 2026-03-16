import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Process from './components/Process';
import Startups from './components/Startups';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import NewReport from './components/NewReport';
import AIPredictions from './components/AIPredictions';
import Brands from './components/Brands';
import BrandIntelligence from './components/BrandIntelligence';
import CreateBrand from './components/CreateBrand';
import BrandDetail from './components/BrandDetail';
import MarketIntelligence from './components/MarketIntelligence';
import SectorReport from './components/SectorReport';
import Store from './components/Store';
import Cart from './components/Cart';
import CheckoutDelivery from './components/CheckoutDelivery';
import CheckoutPayment from './components/CheckoutPayment';
import AdminConsole from './components/AdminConsole';
import AddProduct from './components/AddProduct';
import Settings from './components/Settings';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: 15, rotateX: 2 }}
    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
    exit={{ opacity: 0, scale: 1.04, y: -15, rotateX: -2 }}
    transition={{ 
      type: "spring",
      stiffness: 180,
      damping: 25,
      mass: 0.8
    }}
    style={{ transformStyle: "preserve-3d", perspective: 1200 }}
  >
    {children}
  </motion.div>
);

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <Stats />
    <Process />
    <Startups />
    <CTA />
    <Footer />
  </>
);

function App() {
  const location = useLocation();
  
  return (
    <div className="app overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/report" element={<PageWrapper><NewReport /></PageWrapper>} />
          <Route path="/predictions" element={<PageWrapper><AIPredictions /></PageWrapper>} />
          <Route path="/brands" element={<PageWrapper><Brands /></PageWrapper>} />
          <Route path="/brands/intelligence" element={<PageWrapper><BrandIntelligence /></PageWrapper>} />
          <Route path="/brands/new" element={<PageWrapper><CreateBrand /></PageWrapper>} />
          <Route path="/brands/neuraledge" element={<PageWrapper><BrandDetail /></PageWrapper>} />
          <Route path="/market-intelligence" element={<PageWrapper><MarketIntelligence /></PageWrapper>} />
          <Route path="/reports/ai" element={<PageWrapper><SectorReport /></PageWrapper>} />
          <Route path="/store" element={<PageWrapper><Store /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path="/checkout/delivery" element={<PageWrapper><CheckoutDelivery /></PageWrapper>} />
          <Route path="/checkout/payment" element={<PageWrapper><CheckoutPayment /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminConsole /></PageWrapper>} />
          <Route path="/admin/products/new" element={<PageWrapper><AddProduct /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
          
          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

const AppWrapper = () => (
  <AppProvider>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </AppProvider>
);

export default AppWrapper;

