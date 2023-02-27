import Axios from 'axios';
import { AUTH_TOKEN_KEY } from '@/pages/auth/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

Axios.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      config.headers.Authorization = token ? `Bearer ${token}` : undefined;
      config.baseURL = apiUrl;
      return config;
   },
   (error) => Promise.reject(error),
);
