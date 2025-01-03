import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { CardAttachments } from '../../../Attachment/CardAttachments';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';
import type { Diagnosis } from '../../../../../model/api/medicalHistory/Diagnosis';

type DiagnosisCardProps = Diagnosis & {
  onPress?: () => void;
};

export const DiagnosisCard = (props: DiagnosisCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, explanation, name, attachments, diagnosisDate } = props;

  return (
    <TouchableOpacity
      onPress={props?.onPress ?? (() => navigation.navigate('DiagnosisForm', { id, edit: true, name: name! }))}
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
