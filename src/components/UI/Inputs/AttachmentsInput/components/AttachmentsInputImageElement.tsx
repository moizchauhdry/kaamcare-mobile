import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { ImagePickerAsset } from 'expo-image-picker';

import { Typography } from '../../../Typography/Typography';
import { calculateFileSizeToDisplay } from '../../../../../utils/file/file';
import eyeIcon from '../../../../../assets/icons/eye.svg';
import { theme } from '../../../../../config/Theme';
import closeIcon from '../../../../../assets/icons/delete.svg';

type AttachmentsInputImageElementProps = {
  image: ImagePickerAsset;
  onDelete?: () => void;
  onPress?: (id?: string | null) => void;
};

export const AttachmentsInputImageElement = ({ image, onDelete, onPress }: AttachmentsInputImageElementProps) => {
  const handleImagePress = () => {
    onPress?.(image?.assetId);
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleImagePress}>
        <View style={{ flexDirection: 'row', gap: 8, flex: 1 }}>
          <View>
            <Image source={{ uri: image.uri }} style={{ width: 48, height: 48 }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Typography color="black">{image.fileName}</Typography>
            <Typography color="black" size="sm">
              {calculateFileSizeToDisplay(image.fileSize)}
            </Typography>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableWithoutFeedback onPress={handleImagePress}>
          <View>
            <SvgXml xml={eyeIcon} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => onDelete?.()}>
          <View>
            <SvgXml color={theme.colors.danger} stroke={theme.colors.danger} xml={closeIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
