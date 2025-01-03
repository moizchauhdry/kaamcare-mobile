import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Typography } from '../../../../UI/Typography/Typography';
import { Card } from '../../../../UI/Card/Card';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';

type AllergyCardProps = {
  userAllergyId: string;
  allergyName: string;
  explanation?: string;
};

export const AllergyCard = ({ allergyName, explanation }: AllergyCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddAllergy', { edit: true, name: allergyName })}>
      <Card>
        <View style={{ gap: 12 }}>
          <Typography style={{ fontSize: 20 }} color="secondary">
            {allergyName}
          </Typography>
          {explanation ? <Typography>{explanation}</Typography> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
