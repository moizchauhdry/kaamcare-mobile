import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import type { ToastConfig } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

import { Toast as UIToast } from './components/UI/Toast/Toast';
import { AppNavigation } from './components/Navigation/AppNavigation';
import { AuthProvider } from './context/AuthContext';
import { useOnlineManager } from './hooks/useOnlineManager';
import { UnitsContextProvider } from './context/UnitsContext';
import { useMutationDefaults } from './hooks/query/useMutationDefaults';

const toastConfig: ToastConfig = {
  infoToast: (params) => <UIToast {...params} />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const persistAsyncStorage = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

const newQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: Infinity,
    },
    mutations: {
      gcTime: Infinity,
    },
  },
});

export default function App() {
  const [queryClient] = useState(newQueryClient);
  useOnlineManager();
  useMutationDefaults(queryClient);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: persistAsyncStorage }}
      onSuccess={() => {
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      <View style={[styles.container]}>
        <StatusBar />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <UnitsContextProvider>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </UnitsContextProvider>
          </AuthProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </View>
    </PersistQueryClientProvider>
  );
}
