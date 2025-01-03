import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import type { ImagePickerAsset } from 'expo-image-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';
// import { Alert } from 'react-native';

type UseAttachmentMenuType = {
  onChooseImage: (files: ImagePickerAsset[]) => void;
  onChooseFile: (files: DocumentPickerAsset[]) => void;
  onClose: () => void;
  allowMultipleSelection?: boolean;
};

export const useAttachmentMenu = ({
  onChooseImage,
  onChooseFile,
  onClose,
  allowMultipleSelection,
}: UseAttachmentMenuType) => {
  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: allowMultipleSelection !== undefined ? allowMultipleSelection : true,
    });

    if (!result.canceled) {
      onChooseImage?.(result.assets);
    }

    onClose?.();
  };

  const handleChooseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      onChooseFile?.(result.assets);
    }

    onClose?.();
  };

  // const handleTakePhoto = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  //
  //   if (permissionResult.granted === false) {
  //     Alert.alert('Permission to access camera is required!');
  //     return;
  //   }
  //
  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //
  //   if (!result.canceled) {
  //     onChooseImage?.(result.assets);
  //   }
  //
  //   onClose?.();
  // };

  return {
    handleChooseFile,
    // handleTakePhoto,
    handleChooseImage,
  };
};
