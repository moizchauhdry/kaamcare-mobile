import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { default as RNModal } from 'react-native-modal';
import { BlurView } from 'expo-blur';

import { styles } from '../../../Modal/Modal.styles';
import closeIcon from '../../../../../assets/icons/circle-close.svg';
import { Typography } from '../../../Typography/Typography';
import { theme } from '../../../../../config/Theme';
import fileIcon from '../../../../../assets/icons/file.svg';
import imageIcon from '../../../../../assets/icons/image.svg';
import { useModal } from '../../../Modal/Modal.hooks';
import { useAttachmentInputDataContext } from '../../../../../context/Attachment/AttachmentInputContext';

export const AttachmentsInputMenu = () => {
  const { modalContentHeight, onContentLayout } = useModal();
  const { modals, menu } = useAttachmentInputDataContext();

  return (
    <RNModal
      isVisible={modals?.showMenu}
      style={styles.modal}
      backdropOpacity={0.2}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onBackdropPress={() => modals?.setShowMenu(false)}
      swipeDirection={['down']}
      onSwipeComplete={() => modals?.setShowMenu(false)}
      swipeThreshold={modalContentHeight / 2}
      propagateSwipe
      onModalHide={() => (modals?.name === 'camera' ? modals.setShowCamera(true) : undefined)}
    >
      <View
        style={{
          height: 300,
          width: '100%',
          bottom: 0,
          position: 'absolute',
          overflow: 'hidden',
          borderRadius: 10,
          backgroundColor: '#999999F7',
        }}
        onLayout={onContentLayout}
      >
        <BlurView
          intensity={90}
          tint="systemThickMaterialLight"
          style={{ width: '100%', height: 300, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        >
          <View style={{ width: '100%', alignItems: 'center', paddingTop: 5, paddingBottom: 4 }}>
            <View style={{ width: 36, height: 5, backgroundColor: '#3C3C434D', borderRadius: 20 }} />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 11,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              position: 'relative',
              gap: 16,
            }}
          >
            <View style={{ width: '100%', borderBottomColor: '#3C3C435C', borderBottomWidth: 1, paddingBottom: 8 }}>
              <View style={{ position: 'absolute', right: 16, top: 0, zIndex: 1 }}>
                <TouchableOpacity onPress={() => modals?.setShowMenu(false)}>
                  <SvgXml xml={closeIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography color="black" weight="semiBold">
                  Choose File
                </Typography>
                <Typography style={{ color: '#5E5C7D' }}>Send files up to 4 MB in size</Typography>
              </View>
            </View>
            <View style={{ width: '100%', paddingHorizontal: 16 }}>
              <View
                style={{ backgroundColor: theme.colors.white, paddingHorizontal: 16, borderRadius: 10, width: '100%' }}
              >
                <TouchableWithoutFeedback onPress={menu?.handleChooseFile}>
                  <View
                    style={{
                      paddingVertical: 14,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      borderBottomColor: '#3C3C435C',
                      borderBottomWidth: 1,
                    }}
                  >
                    <Typography color="black">Choose from Files</Typography>
                    <SvgXml xml={fileIcon} />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={menu?.handleChooseImage}>
                  <View
                    style={{
                      paddingVertical: 14,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // borderBottomColor: '#3C3C435C',
                      // borderBottomWidth: 1,
                    }}
                  >
                    <Typography color="black">Choose Photo</Typography>
                    <SvgXml xml={imageIcon} />
                  </View>
                </TouchableWithoutFeedback>
                {/* <TouchableWithoutFeedback onPress={menu?.handleTakePhoto}> */}
                {/*  <View style={{ paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between' }}> */}
                {/*    <Typography color="black">Take Photo</Typography> */}
                {/*    <SvgXml xml={imageIcon} /> */}
                {/*  </View> */}
                {/* </TouchableWithoutFeedback> */}
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </RNModal>
  );
};
