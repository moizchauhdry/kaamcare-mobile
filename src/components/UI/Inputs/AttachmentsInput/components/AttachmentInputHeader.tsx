import { TouchableOpacity, View } from 'react-native';

import { Typography } from '../../../Typography/Typography';
import { useAttachmentInputDataContext } from '../../../../../context/Attachment/AttachmentInputContext';
import { theme } from '../../../../../config/Theme';

export const AttachmentInputHeader = () => {
  const { input, modals } = useAttachmentInputDataContext();
  const additionStyle =
    input?.files && input?.files.length > 0
      ? { paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: theme.colors.lightBlue }
      : null;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...additionStyle }}>
      <Typography>Attachment</Typography>
      <TouchableOpacity onPress={() => modals?.setShowMenu(true)}>
        <Typography color="secondary">Choose file</Typography>
      </TouchableOpacity>
    </View>
  );
};
