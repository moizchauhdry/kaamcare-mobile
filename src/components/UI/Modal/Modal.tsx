import { TouchableOpacity, View } from 'react-native';
import { default as RNModal } from 'react-native-modal';

import { Typography } from '../Typography/Typography';
import { useModal } from './Modal.hooks';
import { styles } from './Modal.styles';
import { theme } from '../../../config/Theme';

export type ModalProps = {
  onCancel?: () => void;
  onSave?: () => void;
  isVisible?: boolean;
  title?: string;
  children?: React.ReactNode;
};

export const Modal = ({ title, children, isVisible, onCancel, onSave, ...modalProps }: ModalProps) => {
  const { modalContentHeight, onContentLayout } = useModal();

  const handleSave = () => {
    onSave?.();
    onCancel?.();
  };

  return (
    <RNModal
      {...modalProps}
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onBackdropPress={onCancel}
      swipeDirection={['down']}
      onSwipeComplete={onCancel}
      swipeThreshold={modalContentHeight / 2}
      propagateSwipe
    >
      <View style={styles.modalWrapper} onLayout={onContentLayout}>
        <View style={styles.grabberWrapper}>
          <View style={styles.grabber} />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 11,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {onCancel && (
            <TouchableOpacity style={{ position: 'absolute', left: 8, zIndex: 1 }} onPress={onCancel}>
              <Typography color="secondary">Cancel</Typography>
            </TouchableOpacity>
          )}
          <Typography style={{ textAlign: 'center', flex: 1 }} weight="semiBold">
            {title}
          </Typography>
          {onSave && (
            <TouchableOpacity style={{ position: 'absolute', right: 8 }} onPress={handleSave}>
              <Typography color="secondary">Save</Typography>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ backgroundColor: theme.colors.background, flex: 1, zIndex: 1 }}>{children}</View>
      </View>
    </RNModal>
  );
};
