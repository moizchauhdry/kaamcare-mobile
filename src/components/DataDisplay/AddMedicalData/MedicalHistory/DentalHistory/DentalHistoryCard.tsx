import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { DentalHistory, DentalHistoryName } from '../../../../../model/api/medicalHistory/DentalHistory';
import { CardAttachments } from '../../../Attachment/CardAttachments';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';

type DentalHistoryCardProps = DentalHistory & {
  sectionName: DentalHistoryName;
};

export const DentalHistoryCard = (props: DentalHistoryCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { sectionName, id, name, explanation, attachments, date } = props;
  console.log('props=========', props);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DentalHistoryForm', { id, edit: true, name, sectionName })}>
      <Card>
        <View style={{ gap: 12 }}>
          <View>
            <Typography style={{ fontSize: 20 }} color="secondary">
              {name}
            </Typography>
            <SeparatedDateTypography date={date} />
          </View>
          <ConditionalTypography value={explanation} />
          <CardAttachments attachment={attachments} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};
