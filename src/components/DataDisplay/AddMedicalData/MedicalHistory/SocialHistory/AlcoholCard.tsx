import { TouchableOpacity, View } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalSentencedTypography } from '../../../../UI/Typography/ConditionalSentencedTypography/ConditionalSentencedTypography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { SocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type SocialHistoryAlcoholCardProps = SocialHistory;

export const SocialHistoryAlcoholCard = (props: SocialHistoryAlcoholCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  /* eslint-disable-next-line */
  const { id, type, explanation, group, ...rest } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SocialHistoryAlcoholForm', { edit: true, id })}>
      <Card>
        <View style={{ gap: 12 }}>
          <Typography style={{ fontSize: 20 }} color="secondary">
            {type}
          </Typography>
          <ConditionalSentencedTypography
            data={rest}
            type="alcohol"
            sorted={['quantity', 'frequency', 'duration', 'status']}
          />
          {explanation ? <Typography>{explanation}</Typography> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
