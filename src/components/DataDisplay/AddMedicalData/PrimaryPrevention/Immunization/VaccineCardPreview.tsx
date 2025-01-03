import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';

import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import type { VaccineCard } from '../../../../../model/api/primaryPrevention/Immunization';

type VaccineCardPreviewProps = VaccineCard;

export const VaccineCardPreview = (props: VaccineCardPreviewProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, title } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('VaccineCardForm', { id, edit: true })}>
      <Card>
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <Typography style={{ fontSize: 20 }} weight="semiBold" color="secondary">
            {title}
          </Typography>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
