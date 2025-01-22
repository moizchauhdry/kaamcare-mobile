import { AxiosError } from 'axios';
import { Alert } from 'react-native';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorMessage =
      error.response?.data?.data?.message || error.response?.data?.message || 'An unexpected error occurred';
    Alert.alert('Error', errorMessage);
  } else {
    Alert.alert('Error', 'An unexpected error occurred');
  }
};
