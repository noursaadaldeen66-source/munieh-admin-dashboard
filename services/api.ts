import { IUser, IProduct, IService, IStory } from '../types';

const API_BASE_URL = '/api'; // Using a proxy for development

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as any)['x-auth-token'] = token;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.msg || 'Something went wrong');
  }
  return response.json();
};

export interface IStats {
  users: number;
  products: number;
  services: number;
  sales: number;
}

const api = {
  auth: {
    login: (credentials: {email: string, password: string}): Promise<{ token: string }> => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  },
  stats: {
    get: (): Promise<IStats> => request<IStats>('/stats'),
  },
  users: {
    list: (): Promise<IUser[]> => request<IUser[]>('/users'),
    get: (id: string): Promise<IUser> => request<IUser>(`/users/${id}`),
    create: (data: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> => request<IUser>('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<IUser>): Promise<IUser> => request<IUser>(`/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    delete: (id: string): Promise<{ msg: string }> => request(`/users/${id}`, {
      method: 'DELETE',
    }),
  },
  products: {
    list: (): Promise<IProduct[]> => request<IProduct[]>('/products'),
    create: (data: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt' | 'seller'> & { seller: string }): Promise<IProduct> => request<IProduct>('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    delete: (id: string): Promise<{ msg: string }> => request(`/products/${id}`, {
      method: 'DELETE',
    }),
    update: (id: string, data: Partial<IProduct>): Promise<IProduct> => request<IProduct>(`/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    // ... other methods
  },
  services: {
    list: (): Promise<IService[]> => request<IService[]>('/services'),
    create: (data: Omit<IService, '_id' | 'createdAt' | 'updatedAt' | 'provider'> & { provider: string }): Promise<IService> => request<IService>('/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<IService>): Promise<IService> => request<IService>(`/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    delete: (id: string): Promise<{ msg: string }> => request(`/services/${id}`, {
      method: 'DELETE',
    }),
  },
  stories: {
    list: (): Promise<IStory[]> => request<IStory[]>('/stories'),
    create: (data: Omit<IStory, '_id' | 'createdAt' | 'updatedAt' | 'author'> & { author: string }): Promise<IStory> => request<IStory>('/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<IStory>): Promise<IStory> => request<IStory>(`/stories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    delete: (id: string): Promise<{ msg: string }> => request(`/stories/${id}`, {
      method: 'DELETE',
    }),
  },
  orders: {
    list: (): Promise<IOrder[]> => request('/orders'),
    updateStatus: (id: string, status: string): Promise<IOrder> => request(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    }),
    confirmPayment: (id: string): Promise<IOrder> => request(`/orders/${id}/confirm-payment`, {
        method: 'PUT',
    }),
  },
  upgradeRequests: {
    list: (): Promise<IUpgradeRequest[]> => request('/upgrade-requests'),
    process: (id: string, status: 'approved' | 'rejected'): Promise<IUpgradeRequest> => request(`/upgrade-requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    }),
  },
};

export { api };