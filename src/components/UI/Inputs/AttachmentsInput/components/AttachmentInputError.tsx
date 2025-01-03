import { View } from 'react-native';

import { Typography } from '../../../Typography/Typography';
import { useAttachmentInputDataContext } from '../../../../../context/Attachment/AttachmentInputContext';

export const AttachmentInputError = () => {
  const { validation } = useAttachmentInputDataContext();

  if (!validation?.error) {
    return null;
  }

  return (
    <View>
      <Typography color="error">{validation.error}</Typography>
    </View>
  );
};
