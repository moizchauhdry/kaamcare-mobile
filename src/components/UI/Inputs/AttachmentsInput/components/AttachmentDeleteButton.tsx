import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { theme } from '../../../../../config/Theme';
import closeIcon from '../../../../../assets/icons/delete.svg';

type AttachmentDeleteButtonProps = {
  onDelete?: () => void;
  disabled?: boolean;
};

export const AttachmentDeleteButton = ({ onDelete, disabled }: AttachmentDeleteButtonProps) => (
  <TouchableOpacity onPress={() => onDelete?.()} disabled={disabled}>
    <View>
      <SvgXml
        color={disabled ? theme.colors.gray : theme.colors.danger}
        stroke={disabled ? theme.colors.gray : theme.colors.danger}
        xml={closeIcon}
      />
    </View>
  </TouchableOpacity>
);
