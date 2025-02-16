import axios, { AxiosError, AxiosInstance } from 'axios';

// API için temel URL ve timeout değerleri
const API_BASE_URL = 'http://localhost:8080';
const API_TIMEOUT = 15000;

// Rate limiting için değişkenler
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Axios instance oluşturma
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // CORS için true yapıyoruz
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Token expire olmuşsa veya unauthorized ise
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    // Rate limiting veya geçici sunucu hataları için retry
    if (
      error.response?.status === 429 || // Too Many Requests
      error.response?.status === 500 || // Internal Server Error
      error.response?.status === 503    // Service Unavailable
    ) {
      let retryCount = (originalRequest?.headers['retry-count'] as number) || 0;

      if (retryCount < MAX_RETRIES) {
        retryCount++;
        originalRequest!.headers['retry-count'] = retryCount;

        // Exponential backoff
        const delay = RETRY_DELAY * Math.pow(2, retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));

        return axiosInstance(originalRequest!);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
