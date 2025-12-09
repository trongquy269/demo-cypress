// src/lib/api/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookie-based auth
});

// =====================
// Response Interceptor
// =====================
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API ERROR:', error.response?.data);

    if (error.response?.status === 401) {
      // Redirect to login on unauthorized, but avoid infinite loop
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/auth/login')
      ) {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error.response?.data || error);
  },
);

export default axiosClient;
