import axios from 'axios';
import { Alert } from 'react-native';

export const validatedApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

validatedApi.interceptors.request.use((request) => {
  const token = '';
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
