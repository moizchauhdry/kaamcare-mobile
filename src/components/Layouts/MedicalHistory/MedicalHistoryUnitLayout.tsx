import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import edit from 'assets/icons/edit.svg';

import { theme } from '../../../config/Theme';
import { Typography } from '../../UI/Typography/Typography';

type MedicalHistoryContentProps = {
  title: string;
  children: React.ReactNode;
  editable?: boolean;
  onEditablePress?: () => void;
};

export const MedicalHistoryUnitLayout = ({
  title,
  editable,
  children,
  onEditablePress,
}: MedicalHistoryContentProps) => (
  <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.colors.background }}>
    <View style={editable ? { flexDirection: 'row', justifyContent: 'space-between' } : undefined}>
      <Typography size="lg" weight="bolder">
        {title}
      </Typography>
      {editable ? (
        <TouchableOpacity onPress={onEditablePress}>
          <SvgXml xml={edit} />
        </TouchableOpacity>
      ) : null}
    </View>
    {children}
  </View>
);
