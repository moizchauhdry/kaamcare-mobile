import { AxiosError } from 'axios';
import { Alert } from 'react-native';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
    Alert.alert(errorMessage);
  } else {
    Alert.alert('An unexpected error occurred');
  }
};
