import { View } from 'react-native';

import { AttachmentImage } from './AttachmentImage';
import { AttachmentDocument } from './AttachmentDocument';
import { AttachmentDeleteButton } from './AttachmentDeleteButton';
import type { AttachmentModel } from '../../../../../model/api/common/Attachment';

type AttachmentsInputElementProps = {
  file: AttachmentModel;
  onPress: (id: string) => void;
  onDelete?: () => void;
};

export const AttachmentsInputElement = ({ file, onDelete, onPress }: AttachmentsInputElementProps) => {
  const renderContent = () => {
    if (file.type === 'image') {
      return renderImage(file);
    }

    return renderDocument(file);
  };

  const renderImage = (image: AttachmentModel) => (
    <AttachmentImage
      uri={image.uri}
      fileName={image.name}
      fileSize={image.size}
      onPress={() => onPress(image.id ?? image.uri)}
    />
  );

  const renderDocument = (document: AttachmentModel) => (
    <AttachmentDocument name={document.name} size={document.size} uri={document.uri} isApi={false} />
  );

  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
      {renderContent()}
      <AttachmentDeleteButton onDelete={onDelete} />
    </View>
  );
};
