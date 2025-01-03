import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

export const useOnlineManager = () => {
  useEffect(
    () =>
      NetInfo.addEventListener((state) => {
        const status = !!state.isConnected;
        onlineManager.setOnline(status);
      }),
    [],
  );
};
