import { Dimensions, StyleSheet, View } from 'react-native';
import type { AVPlaybackSource } from 'expo-av';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';

import { Typography } from '../../UI/Typography/Typography';

type IntroItemProps = {
  title: string;
  description: string;
  media: AVPlaybackSource;
  isActive: boolean;
  id?: string;
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    height: 507,
    gap: 4,
    paddingHorizontal: 24,
  },
  video: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
});

export const IntroItem = ({ isActive = false, title, description, media }: IntroItemProps) => {
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'stretch' }}>
        <Typography size="xl" weight="bolder" style={{ textAlign: 'center' }}>
          {title}
        </Typography>
      </View>
      <Video
        ref={video}
        style={{ flex: 1, height: 182 }}
        videoStyle={styles.video}
        source={media}
        useNativeControls={false}
        shouldPlay={isActive}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <Typography style={{ textAlign: 'center' }}>{description}</Typography>
      </View>
    </View>
  );
};
