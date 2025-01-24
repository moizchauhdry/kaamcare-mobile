import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const validatedApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

validatedApi.interceptors.request.use((request) => {
  const token = SecureStore.getItem('id-token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

validatedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export enum QueryKeys {
  AUTH_LOGIN = 'AUTH_LOGIN',
  WORKORDERID_OF_PACKAGE = 'WORKORDERID_OF_PACKAGE',
}
