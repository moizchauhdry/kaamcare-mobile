import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const validatedApi = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_API_URL,
  baseURL: 'https://kaamcare.moizchauhdry.com/api/2.0',
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
    if (error?.request?.status === 401) {
      Alert.alert('Error', `${error.response.data.message}. Please login again to continue`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('LoggedOut');
          },
        },
      ]);
      return;
    }
    return Promise.reject(error);
  },
);

export enum QueryKeys {
  AUTH_LOGIN = 'AUTH_LOGIN',
  WORKORDERID_OF_PACKAGE = 'WORKORDERID_OF_PACKAGE',
}
