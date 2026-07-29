import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { store } from '../app/store';
import { logout } from '../features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach JWT to every request automatically and preserve multipart headers
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData && config.headers) {
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
  }

  return config;
});

// Global error handling — one place for the whole app
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    if (status === 401) {
      // Token invalid/expired — force logout, but don't spam toast if it's a login attempt itself
      if (!error.config?.url?.includes('/auth/login')) {
        toast.error('Session expired. Please log in again.');
        store.dispatch(logout());
      }
    } else if (status === 403) {
      toast.error('You don\'t have permission to do that.');
    } else if (status && status >= 500) {
      toast.error('Server error. Please try again shortly.');
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;