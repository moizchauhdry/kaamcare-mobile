import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { isAttachmentApiModel } from '../../../utils/file/file';
import paperclip from '../../../assets/icons/paperclip.svg';
import { Typography } from '../../UI/Typography/Typography';
import type { AttachmentApiSmallModel, AttachmentModel } from '../../../model/api/common/Attachment';

type CardAttachmentProps = {
  attachment?: (AttachmentModel | AttachmentApiSmallModel)[] | null;
};

export const CardAttachments = ({ attachment }: CardAttachmentProps) => {
  if (!attachment || attachment.length === 0) {
    return null;
  }
  console.log('attachment====', attachment);

  return (
    <View>
      {attachment?.map((elem) => {
        const properNameField = isAttachmentApiModel(elem) ? elem.fileName : elem.name;

        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} key={properNameField}>
            <SvgXml xml={paperclip} />
            <Typography size="sm" style={{ fontStyle: 'italic' }}>
              {properNameField}
            </Typography>
          </View>
        );
      })}
    </View>
  );
};
