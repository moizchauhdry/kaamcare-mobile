import { View } from 'react-native';

import { AttachmentsInputElement } from './AttachmentsInputElement';
import { useAttachmentInputDataContext } from '../../../../../context/Attachment/AttachmentInputContext';
import { isAttachmentApiModel } from '../../../../../utils/file/file';
import { AttachmentApiElement } from './AttachmentApiElement';

export const AttachmentInputElementList = () => {
  const { input, modals } = useAttachmentInputDataContext();

  const handlePress = (id: string) => {
    modals?.setPreviewImage(id!);
    modals?.setShowPreview(true);
  };

  if (!input?.files || input?.files.length === 0) {
    return null;
  }

  return (
    <View style={{ paddingVertical: 8, gap: 4 }}>
      {input.files.map((elem, index) =>
        isAttachmentApiModel(elem) ? (
          <AttachmentApiElement
            onPress={handlePress}
            key={elem.id}
            attachmentId={elem.id}
            fileName={elem.fileName}
            onDelete={() => input?.handleDelete(index)}
          />
        ) : (
          <AttachmentsInputElement
            onPress={handlePress}
            key={elem.uri}
            file={elem}
            onDelete={() => input?.handleDelete(index)}
          />
        ),
      )}
    </View>
  );
};
