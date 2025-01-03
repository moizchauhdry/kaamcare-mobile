import { SvgXml } from 'react-native-svg';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';

import trash from '../../../assets/icons/trash.svg';
import { Typography } from '../Typography/Typography';
import { theme } from '../../../config/Theme';
import { useAlert } from '../../../hooks/useAlert';

interface DeletionButtonProps extends TouchableOpacityProps {
  name?: string;
  listName?: string;
  title?: string;
  description?: string;
  onProceed?: () => void;
}

export const DeletionButton = ({
  listName,
  title,
  name,
  style,
  onProceed,
  children,
  description,
  ...props
}: DeletionButtonProps) => {
  const { showDangerAlert } = useAlert();

  return (
    <TouchableOpacity
      style={[{ flexDirection: 'row', gap: 8, alignItems: 'center', paddingVertical: 12 }, style]}
      onPress={() =>
        showDangerAlert({
          title: title ?? 'Delete Item',
          description:
            description ??
            `Are you sure you want to delete ${name ?? 'this item'} from your list${listName ? ` of ${listName} ` : ' '}? This action cannot be undone.`,
          onProceed: () => onProceed?.(),
          proceed: 'Yes, delete',
          cancel: 'Cancel',
        })
      }
      {...props}
    >
      <SvgXml xml={trash} />
      <Typography style={{ color: theme.colors.danger }}>{children}</Typography>
    </TouchableOpacity>
  );
};
