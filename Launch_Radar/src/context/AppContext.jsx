import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Guest User',
      plan: 'Free Tier',
      avatar: ''
    };
  });

  useEffect(() => {
    if (user && user.name !== 'Guest User' && user.name !== 'Loading...') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countsRes = await fetch(`${API_BASE_URL}/counts`);
        const countsData = await countsRes.json();
        setCartCount(countsData.cartCount);
        setNotificationsCount(countsData.notificationsCount);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
