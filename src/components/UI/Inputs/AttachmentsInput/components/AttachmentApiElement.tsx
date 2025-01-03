import { View } from 'react-native';
import { useEffect } from 'react';

import { useQueryAttachmentsGet } from '../../../../../hooks/query/attachments/useQueryAttachmentsGet';
import { Typography } from '../../../Typography/Typography';
import { AttachmentImage } from './AttachmentImage';
import { AttachmentDeleteButton } from './AttachmentDeleteButton';
import { useMutationAttachmentDelete } from '../../../../../hooks/query/attachments/useMutationAttachmentDelete';
import { useElementWithAttachmentData } from '../../../../../context/ElementWithAttachmentDataContext';
import { useAttachmentInputDataContext } from '../../../../../context/Attachment/AttachmentInputContext';
import { AttachmentDocument } from './AttachmentDocument';
import { Skeleton } from '../../../Skeleton/Skeleton';

type AttachmentApiElementProps = {
  attachmentId: string;
  fileName: string;
  onDelete?: () => void;
  onPress?: (id: string) => void;
};

export const AttachmentApiElement = ({ attachmentId, fileName, onDelete, onPress }: AttachmentApiElementProps) => {
  const { sectionName, elementId, keySingle, keyList, sectionTypeName, name } = useElementWithAttachmentData();
  const { input } = useAttachmentInputDataContext();
  const { data, isSuccess, isLoading } = useQueryAttachmentsGet({
    attachmentId,
    attachmentName: fileName,
    requestData: {
      typeName: sectionTypeName,
      sectionName,
      name,
      id: elementId,
      photoType: input?.photoType,
    },
  });

  const mutationDelete = useMutationAttachmentDelete(
    { sectionName, id: elementId, name, keySingle, keyList, typeName: sectionTypeName, photoType: input?.photoType },
    {
      onSuccess: () => {
        onDelete?.();
      },
    },
  );

  useEffect(() => {
    if (data && isSuccess) {
      input?.replaceApiAttachmentModel(attachmentId, data);
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  if (data) {
    return (
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
        {data.type === 'image' ? (
          <AttachmentImage
            uri={data.uri}
            fileName={data.name}
            fileSize={data.size}
            onPress={() => onPress?.(data.id!)}
          />
        ) : (
          <AttachmentDocument uri={data.uri} name={data.name} size={data.size} key={data.id} />
        )}
        <AttachmentDeleteButton
          disabled={mutationDelete.isPending}
          onDelete={() => mutationDelete.mutate(attachmentId)}
        />
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <View style={{ justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
        {isLoading ? <Skeleton style={{ width: 48, height: 48, borderRadius: 8 }} /> : null}
        <Typography color="black">{fileName}</Typography>
      </View>
    </View>
  );
};
