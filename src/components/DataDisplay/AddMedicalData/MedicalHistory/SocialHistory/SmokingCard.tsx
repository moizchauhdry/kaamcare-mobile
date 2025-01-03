import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Typography } from '../../../../UI/Typography/Typography';
import { Card } from '../../../../UI/Card/Card';
import { ConditionalSentencedTypography } from '../../../../UI/Typography/ConditionalSentencedTypography/ConditionalSentencedTypography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { SocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type SocialHistorySmokingCardProps = SocialHistory;

export const SocialHistorySmokingCard = (props: SocialHistorySmokingCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, type, explanation, ...rest } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SocialHistorySmokingForm', { id, edit: true })}>
      <Card>
        <View style={{ gap: 12 }}>
          <Typography style={{ fontSize: 20 }} color="secondary">
            {type}
          </Typography>
          <ConditionalSentencedTypography data={rest} sorted={['frequency', 'duration', 'status']} />
          {explanation ? <Typography>{explanation}</Typography> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
