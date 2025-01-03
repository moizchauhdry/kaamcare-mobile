import { View } from 'react-native';

import { Typography } from '../../Typography/Typography';
import { theme } from '../../../../config/Theme';
import type { AttachmentApiSmallModel, AttachmentModel } from '../../../../model/api/common/Attachment';
import { AttachmentInputProvider } from '../../../../context/Attachment/AttachmentInputContext';
import { AttachmentInputModals } from './components/AttachmentInputsModals';
import { AttachmentInputHeader } from './components/AttachmentInputHeader';
import { AttachmentInputElementList } from './components/AttachmentInputElementList';

export type AttachmentsInputProps = {
  errorMessage?: string;
  description?: string;
  onChoose?: (files: (AttachmentModel | AttachmentApiSmallModel)[]) => void;
  onErrorOccur?: (error: string) => void;
  onDelete?: (id: string) => void;
  initialValues?: (AttachmentModel | AttachmentApiSmallModel)[];
  allowMultipleSelection?: boolean;
  photoType?: string;
};

export const AttachmentsInput = ({ description, ...rest }: AttachmentsInputProps) => (
  <AttachmentInputProvider {...rest}>
    <View style={{ gap: 8 }}>
      <View style={{ padding: 16, backgroundColor: theme.colors.white, borderRadius: 10 }}>
        <AttachmentInputHeader />
        <AttachmentInputElementList />
      </View>
      {description ? (
        <View>
          <Typography size="sm" style={{ fontStyle: 'italic' }}>
            {description}
          </Typography>
        </View>
      ) : null}
      {/* <AttachmentInputError /> */}
    </View>
    <AttachmentInputModals />
  </AttachmentInputProvider>
);
