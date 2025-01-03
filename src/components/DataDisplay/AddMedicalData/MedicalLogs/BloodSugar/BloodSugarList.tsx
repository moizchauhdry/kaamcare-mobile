import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { View } from 'react-native';

import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { MedicalLogsCard } from '../../../../UI/MedicalLogsCard/MedicalLogsCard';
import type { BloodSugarLogs } from '../../../../../model/api/medicalLogs/BloodSugar';
import { BloodSugarCard } from './BloodSugarCard';
import { determineBloodSugarStage } from '../../../../../utils/medicalLogs/bloodSugar';
import { bloodSugarGraphStages } from '../../../../../constants/data/medicalLogs/bloodSugar';
import { useUnitsData } from '../../../../../context/UnitsContext';

type BloodSugarListProps = {
  data: BloodSugarLogs;
  days?: number;
};

export const BloodSugarList = ({ data, days }: BloodSugarListProps) => {
  const { sugar } = useUnitsData();
  const isMmolL = sugar === 'mmolL';
  const navigation = useNavigation<NativeStackNavigationProp<AddMedicalDataNavigationParamsList>>();
  if (!data) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      {data.map((elem) => {
        const calculateData = determineBloodSugarStage(
          {
            bloodSugar: isMmolL ? elem.millimolesPerLitreValue! : elem.milligramsPerMillilitresValue!,
          },
          bloodSugarGraphStages,
          isMmolL ? 'bloodSugarmmolL' : 'bloodSugarmgdL',
        );

        return (
          <MedicalLogsCard
            key={elem.id}
            cardColor={calculateData.color}
            onPress={() => navigation.navigate('BloodSugarForm', { edit: true, id: elem.id, days })}
          >
            <BloodSugarCard bloodPressureStage={calculateData.label} {...elem} />
          </MedicalLogsCard>
        );
      })}
    </View>
  );
};
