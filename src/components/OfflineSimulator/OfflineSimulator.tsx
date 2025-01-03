import { useState } from 'react';
import { onlineManager } from '@tanstack/react-query';
import { View } from 'react-native';

import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';

export const OfflineSimulator = () => {
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());
  return (
    <View>
      <View style={{ flexDirection: 'column', gap: 4 }}>
        <Button
          onPress={() => {
            onlineManager.setOnline(true);
            setIsOnline(onlineManager.isOnline());
          }}
        >
          Online
        </Button>
        <Button
          onPress={() => {
            onlineManager.setOnline(false);
            setIsOnline(onlineManager.isOnline());
          }}
        >
          Offline
        </Button>
      </View>
      <Typography>{isOnline ? 'ONLINE' : 'OFFLINE'}</Typography>
    </View>
  );
};
