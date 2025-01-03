import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = (params: ToastShowParams) =>
    Toast.show({
      type: 'infoToast',
      ...params,
    });

  return {
    showToast,
  };
};
