import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { DocumentPickerAsset } from 'expo-document-picker';

import pdfIcon from '../../../../../assets/icons/pdf-icon.svg';
import { Typography } from '../../../Typography/Typography';
import { calculateFileSizeToDisplay } from '../../../../../utils/file/file';
import downloadIcon from '../../../../../assets/icons/download.svg';
import { theme } from '../../../../../config/Theme';
import closeIcon from '../../../../../assets/icons/delete.svg';

type AttachmentInputsDocumentElementProps = {
  document: DocumentPickerAsset;
  onDelete?: () => void;
};

export const AttachmentInputsDocumentElement = ({ document, onDelete }: AttachmentInputsDocumentElementProps) => {
  const handleFileDownload = async () => {};

  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 8, flex: 1 }}>
        {document.mimeType?.includes('pdf') ? (
          <View style={{ width: 48, height: 48 }}>
            <SvgXml xml={pdfIcon} />
          </View>
        ) : null}
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Typography color="black" numberOfLines={1} ellipsizeMode="tail">
            {document.name}
          </Typography>
          <Typography color="black" size="sm">
            {calculateFileSizeToDisplay(document.size)}
          </Typography>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity onPress={handleFileDownload}>
          <View>
            <SvgXml xml={downloadIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete?.()}>
          <View>
            <SvgXml color={theme.colors.danger} stroke={theme.colors.danger} xml={closeIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
