import { Alert, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';

import pdf from 'assets/icons/pdf-icon.svg';

import { Typography } from '../../../Typography/Typography';
import { calculateFileSizeToDisplay } from '../../../../../utils/file/file';
import downloadIcon from '../../../../../assets/icons/download.svg';

export type AttachmentDocumentProps = {
  uri: string;
  name?: string | null;
  size?: number;
  isApi?: boolean;
};

export const AttachmentDocument = ({ name, size, uri, isApi = true }: AttachmentDocumentProps) => {
  const handleFileDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + name!;

      const base64Content = uri.split('base64,')[1];

      await FileSystem.writeAsStringAsync(fileUri, base64Content!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert('Download complete!', `File downloaded to: ${fileUri}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to download the file.');
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View>
          <SvgXml xml={pdf} width={48} height={48} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Typography color="black" style={{ maxWidth: 200 }} numberOfLines={1}>
            {name}
          </Typography>
          <Typography color="black" size="sm">
            {calculateFileSizeToDisplay(size)}
          </Typography>
        </View>
      </View>
      {isApi ? (
        <View>
          <TouchableOpacity onPress={handleFileDownload}>
            <View>
              <SvgXml xml={downloadIcon} />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
