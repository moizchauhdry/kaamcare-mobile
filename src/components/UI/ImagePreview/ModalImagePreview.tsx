import { View } from 'react-native';
import { default as RNModal } from 'react-native-modal';

import { styles } from '../Modal/Modal.styles';
import { useModal } from '../Modal/Modal.hooks';
import type { ImagePreviewProps } from './ImagePreview';
import { ImagePreview } from './ImagePreview';

type ModalImagePreviewProps = {
  isOpen: boolean;
  imagePreviewProps: ImagePreviewProps;
  onClose?: () => void;
};

export const ModalImagePreview = ({ isOpen, imagePreviewProps, onClose }: ModalImagePreviewProps) => {
  const { onContentLayout } = useModal();

  return (
    <RNModal
      isVisible={isOpen}
      style={styles.modal}
      backdropOpacity={0.4}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onBackdropPress={onClose}
    >
      <View onLayout={onContentLayout} style={{ width: '100%', height: '50%' }}>
        <ImagePreview {...imagePreviewProps} />
      </View>
    </RNModal>
  );
};
