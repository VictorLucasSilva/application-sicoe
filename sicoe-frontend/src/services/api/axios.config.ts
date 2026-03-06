import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );


    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {

          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.api;
  }

  public getBaseUrl(): string {
    return API_BASE_URL;
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.put<T>(url, data, config);
  }

  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.patch<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
export default apiService.getInstance();
