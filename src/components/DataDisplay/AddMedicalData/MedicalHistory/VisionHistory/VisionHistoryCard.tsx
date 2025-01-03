import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';

import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import { CardAttachments } from '../../../Attachment/CardAttachments';
import type { VisionHistoryKeys } from '../../../../../constants/query/visionHistory';
import {
  locationFieldDataPrimary,
  locationFieldDataSecondary,
} from '../../../../../constants/data/medicalHistory/visionHistory';
import type { VisionHistoryModel } from '../../../../../model/api/medicalHistory/VisionHistory';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';

type VisionHistoryCardProps = VisionHistoryModel & {
  sectionName: keyof VisionHistoryKeys;
};

export const VisionHistoryCard = (props: VisionHistoryCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { kind, location, sectionName, id, name, explanation, attachments, diagnosisDate } = props;
  const locationLabel = [...locationFieldDataPrimary, ...locationFieldDataSecondary].find(
    (elem) => elem.value === (Array.isArray(location) ? location?.[0] : location),
  )?.label;
  const properName = kind ?? name;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('VisionHistoryForm', { id, edit: true, name: properName!, sectionName })}
    >
      <Card>
        <View>
          <View style={{ gap: 4 }}>
            <Typography style={{ fontSize: 20 }} color="secondary">
              {properName}
            </Typography>
            <SeparatedDateTypography date={diagnosisDate} />
            <ConditionalTypography value={locationLabel} typographyProps={{ weight: 'semiBold' }} />
          </View>
          {explanation || (attachments && attachments?.length > 0) ? (
            <View style={{ paddingTop: 12 }}>
              <ConditionalTypography value={explanation} />
              <CardAttachments attachment={attachments} />
            </View>
          ) : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
