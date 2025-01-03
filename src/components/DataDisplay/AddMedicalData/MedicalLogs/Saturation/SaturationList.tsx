import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { determineSaturationStage } from '../../../../../utils/medicalLogs/summary';
import { saturationGraphStages } from '../../../../../constants/data/medicalLogs/saturation';
import { MedicalLogsCard } from '../../../../UI/MedicalLogsCard/MedicalLogsCard';
import type { SaturationApiLog } from '../../../../../model/api/medicalLogs/Saturation';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { SaturationCard } from './SaturationCard';

type SaturationListProps = {
  data: SaturationApiLog[];
  days?: number;
};

export const SaturationList = ({ data, days }: SaturationListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AddMedicalDataNavigationParamsList>>();
  if (!data) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      {data.map((elem) => {
        const calculateData = determineSaturationStage(
          {
            spO2Value: elem.spO2Value,
          },
          saturationGraphStages,
        );

        return (
          <MedicalLogsCard
            key={elem.id}
            cardColor={calculateData.color}
            onPress={() => navigation.navigate('SaturationForm', { edit: true, id: elem.id, days })}
          >
            <SaturationCard saturationStage={calculateData.label} {...elem} />
          </MedicalLogsCard>
        );
      })}
    </View>
  );
};
