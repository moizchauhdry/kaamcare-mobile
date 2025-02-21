import { TouchableOpacity, View } from 'react-native';
import { styles } from './ModalGrabber.styles';
import { Typography } from '../Typography/Typography';

export const ModalGrabber = ({ title, onPress }: { title?: string; onPress: any }) => {
  // Format title to replace camel case or Pascal case with spaces
  const formattedTitle = title
    ? title.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
    : '';

  return (
    <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
      {title && (
        <Typography size="lg" style={{ fontSize: 24, fontWeight: '600', lineHeight: 36 }} weight="semiBold">
          {formattedTitle}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
