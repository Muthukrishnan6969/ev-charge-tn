import axios from 'axios';

const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL = baseApiUrl.endsWith('/api') ? baseApiUrl : `${baseApiUrl}/api`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStations = async (params: any) => {
  const { data } = await api.get('/stations', { params });
  return data;
};

export const getStationById = async (id: string) => {
  const { data } = await api.get(`/stations/${id}`);
  return data;
};

export const toggleFavorite = async (id: string) => {
  const { data } = await api.post(`/auth/favorites/${id}`);
  return data;
};
