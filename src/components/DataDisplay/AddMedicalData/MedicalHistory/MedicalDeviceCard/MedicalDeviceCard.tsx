import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Typography } from '../../../../UI/Typography/Typography';
import { Card } from '../../../../UI/Card/Card';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { MedicalDevice } from '../../../../../model/api/medicalHistory/MedicalDevices';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';
import { CardAttachments } from '../../../Attachment/CardAttachments';
import { findMatch } from '../../../../UI/Inputs/Custom/CustomSelect.utils';
import { commonMedicalDevices } from '../../../../../constants/data/medicalHistory/medicalDevices';

type MedicalDeviceCardProps = MedicalDevice;

export const MedicalDeviceCard = (props: MedicalDeviceCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, name, explanation, attachments, diagnosisDate } = props;
  const isMatch = findMatch(name, commonMedicalDevices);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MedicalDeviceForm', { id, edit: true, name, isCommonName: Boolean(isMatch) })}
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
