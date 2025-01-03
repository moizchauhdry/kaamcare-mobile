import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { CardAttachments } from '../../../Attachment/CardAttachments';
import type { HearingHistory } from '../../../../../model/api/medicalHistory/HearingHistory';
import type { HearingHistoryName } from '../../../../../constants/query/hearingHistory';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';
import { hearingHistoryLocationData } from '../../../../../constants/data/medicalHistory/hearingHistory';

type DentalHistoryCardProps = HearingHistory & {
  sectionName: HearingHistoryName;
};

export const HearingHistoryCard = (props: DentalHistoryCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { sectionName, id, name, location, explanation, attachments, diagnosisDate } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('HearingHistoryForm', { id, edit: true, name, sectionName })}>
      <Card>
        <View style={{ gap: 12 }}>
          <View>
            <Typography style={{ fontSize: 20 }} color="secondary">
              {name}
            </Typography>
            <SeparatedDateTypography date={diagnosisDate} />
            {location ? (
              <Typography style={{ fontSize: 16 }} weight="bolder">
                {
                  hearingHistoryLocationData.find(
                    (item) => item.value === (Array.isArray(location) ? location[0] : location),
                  )?.label
                }
              </Typography>
            ) : null}
          </View>
          <ConditionalTypography value={explanation} />
          <CardAttachments attachment={attachments} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};
