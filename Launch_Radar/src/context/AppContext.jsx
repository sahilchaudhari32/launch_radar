import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(3);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [user, setUser] = useState({
    name: 'Alex Rivers',
    plan: 'Enterprise Elite',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const addToCart = () => setCartCount(prev => prev + 1);
  const clearNotifications = () => setNotificationsCount(0);

  return (
    <AppContext.Provider value={{ 
      cartCount, 
      setCartCount, 
      addToCart, 
      notificationsCount, 
      setNotificationsCount,
      clearNotifications,
      user,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
