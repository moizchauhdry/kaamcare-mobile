import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Typography } from '../../../Typography/Typography';
import { calculateFileSizeToDisplay } from '../../../../../utils/file/file';
import eyeIcon from '../../../../../assets/icons/eye.svg';

export type AttachmentImageProps = {
  uri: string;
  fileName?: string | null;
  fileSize?: number | string;
  onPress?: () => void;
};

export const AttachmentImage = ({ uri, fileName, fileSize, onPress }: AttachmentImageProps) => (
  <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <View>
        <Image source={{ uri }} style={{ width: 48, height: 48 }} />
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Typography color="black" numberOfLines={1} style={{ maxWidth: 150 }}>
          {fileName}
        </Typography>
        <Typography color="black" size="sm">
          {calculateFileSizeToDisplay(fileSize)}
        </Typography>
      </View>
    </View>
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <SvgXml xml={eyeIcon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>
);
