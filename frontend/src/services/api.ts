import axios from 'axios';

const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL = baseApiUrl.endsWith('/api') ? baseApiUrl : `${baseApiUrl}/api`;

console.log(`[Frontend Config] Active Base API URL: ${API_URL}`);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60s timeout to account for Render free-tier cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStations = async (params: any) => {
  console.log(`[Frontend API] Fetching stations with params:`, params);
  try {
    const { data } = await api.get('/stations', { params });
    console.log(`[Frontend API] Received ${data?.length || 0} stations from server:`, data);
    return data;
  } catch (error: any) {
    console.error(`[Frontend API Error] GET /stations failed:`, error.response?.data || error.message);
    throw error;
  }
};

export const getStationById = async (id: string) => {
  const { data } = await api.get(`/stations/${id}`);
  return data;
};

export const seedStations = async () => {
  console.log(`[Frontend API] Triggering manual database seed...`);
  const { data } = await api.post('/stations/seed');
  return data;
};

export const toggleFavorite = async (id: string) => {
  const { data } = await api.post(`/auth/favorites/${id}`);
  return data;
};
