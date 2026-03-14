import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Process from './components/Process';
import Startups from './components/Startups';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Auth from './components/Auth';

function App() {
  const [view, setView] = useState({ type: 'LANDING', initialAuthMode: 'LOGIN' });

  const navigateToAuth = (mode = 'LOGIN') => {
    setView({ type: 'AUTH', initialAuthMode: mode });
  };

  const navigateToLanding = () => {
    setView({ type: 'LANDING' });
  };

  if (view.type === 'AUTH') {
    return <Auth initialMode={view.initialAuthMode} onBack={navigateToLanding} />;
  }

  return (
    <div className="app">
      <Navbar onAuthOpen={navigateToAuth} />
      <main>
        <Hero />
        <Stats />
        <Process />
        <Startups />
        <CTA onAuthOpen={navigateToAuth} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

