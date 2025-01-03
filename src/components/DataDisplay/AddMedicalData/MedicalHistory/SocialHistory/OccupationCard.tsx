import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalSentencedTypography } from '../../../../UI/Typography/ConditionalSentencedTypography/ConditionalSentencedTypography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { SocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type SocialHistoryOccupationCardProps = SocialHistory;

export const SocialHistoryOccupationCard = (props: SocialHistoryOccupationCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, type, explanation, ...rest } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SocialHistoryOccupationForm', { id, edit: true })}>
      <Card>
        <View style={{ gap: 12 }}>
          <Typography style={{ fontSize: 20 }} color="secondary">
            {type}
          </Typography>
          <ConditionalSentencedTypography data={rest} sorted={['duration', 'status']} />
          {explanation ? <Typography>{explanation}</Typography> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
