import { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';

export const useModal = () => {
  const [modalContentHeight, setModalContentHeight] = useState<number>(0);

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setModalContentHeight(height);
  }, []);
  return { modalContentHeight, onContentLayout };
};
