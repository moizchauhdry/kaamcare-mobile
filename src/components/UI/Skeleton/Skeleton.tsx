import { Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';
import { useEffect, useRef } from 'react';

import { styles } from 'components/UI/Skeleton/Skeleton.styles';

type SkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = ({ style }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.linear,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.1,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);

  return <Animated.View style={[{ opacity: opacity.current }, styles.skeleton, style]} />;
};
