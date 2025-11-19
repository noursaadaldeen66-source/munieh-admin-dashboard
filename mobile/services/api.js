import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

const request = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['x-auth-token'] = token;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.msg || 'Something went wrong');
  }
  return response.json();
};

const api = {
  auth: {
    login: (credentials) => request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    getMe: () => request('/api/auth/me'),
  },
  users: {
    register: (userData) => request('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
  },
  products: {
    list: () => request('/api/products'),
    getMyProducts: () => request('/api/my/products'),
  },
  services: {
    list: () => request('/api/services'),
  },
  stories: {
    list: () => request('/api/stories'),
  },
  orders: {
    create: (order) => request('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }),
  },
  upgradeRequests: {
    create: (data) => request('/api/upgrade-requests', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
  },
};

export { api };
