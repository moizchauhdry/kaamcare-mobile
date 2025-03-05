import { TouchableOpacity } from 'react-native';
import { Typography } from '../Typography/Typography';
import { styles } from './ModalGrabber.styles';

export const ModalGrabber1o = ({
  title,
}: {
  title?: string;
  // Optional prop
}) => {
  // Format title to replace camel case or Pascal case with spaces
  const formattedTitle = title
    ? title.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
    : '';

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('hhhh');
      }}
      style={styles.headerContainer}
    >
      {title && (
        <Typography size="lg" style={{ fontSize: 24, fontWeight: '600', lineHeight: 36 }} weight="semiBold">
          {formattedTitle}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
