import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000, // optional, can be adjusted
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  return config;
});

// Add a response interceptor for global error handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
