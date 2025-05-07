import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  const login = async (email, password) => {
    const response = await axios.post('/token/', { email, password });
    const { access } = response.data;

    const profileRes = await axios.get('/users/me/', {
      headers: { Authorization: `Bearer ${access}` }
    });

    setToken(access);
    setUser(profileRes.data);
    localStorage.setItem('token', access);
    localStorage.setItem('user', JSON.stringify(profileRes.data));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const authAxios = axios.create();
  authAxios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
