import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Typography } from '../../../../UI/Typography/Typography';
import { Card } from '../../../../UI/Card/Card';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import type { SurgicalHistory } from '../../../../../model/api/medicalHistory/SurgicalHistory';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';
import { CardAttachments } from '../../../Attachment/CardAttachments';
import { findMatch } from '../../../../UI/Inputs/Custom/CustomSelect.utils';
import {
  commonSurgicalHistoryData,
  dynamicSurgicalHistoryData,
} from '../../../../../constants/data/medicalHistory/surgicalHistory';

type SurgicalHistoryCardProps = SurgicalHistory;

export const SurgicalHistoryCard = (props: SurgicalHistoryCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, name, explanation, attachments, diagnosisDate } = props;
  const isMatch = findMatch(name, [...commonSurgicalHistoryData, ...dynamicSurgicalHistoryData]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SurgicalHistoryForm', { id, edit: true, name, isCommonName: Boolean(isMatch) })
      }
    >
      <Card>
        <View style={{ gap: 12 }}>
          <View>
            <Typography style={{ fontSize: 20 }} color="secondary">
              {name}
            </Typography>
            <SeparatedDateTypography date={diagnosisDate} />
          </View>
          <ConditionalTypography value={explanation} />
          <CardAttachments attachment={attachments} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};
