import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const loadUser = async () => {
      try {
        const seccion = await AsyncStorage.getItem('current_user');
        if (seccion) {
          setUser(JSON.parse(seccion));
        }
      } catch (e) {
        console.error('Error loading user data:', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
       try {
    setUser(userData);
    await AsyncStorage.setItem('current_user', JSON.stringify(userData));
      } catch (e) {
      console.error('Error en login ❌', e);
    }
  };

  const logout = async () => {
     try {
      setUser(null);
      await AsyncStorage.removeItem('current_user');
    } catch (e) {
      console.error('Error en logout ❌', e);
    }

  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
