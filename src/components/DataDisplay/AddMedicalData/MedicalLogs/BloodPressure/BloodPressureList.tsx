import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { determineBloodPressureStage } from '../../../../../utils/medicalLogs/summary';
import { graphStages } from '../../../../../constants/data/medicalLogs/bloodPressure';
import { MedicalLogsCard } from '../../../../UI/MedicalLogsCard/MedicalLogsCard';
import { BloodPressureCard } from '../components/BloodPressureCard/BloodPressureCard';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';

type BloodPressureListProps = {
  data: BloodPressureLogs;
  days?: number;
};

export const BloodPressureList = ({ data, days }: BloodPressureListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AddMedicalDataNavigationParamsList>>();
  if (!data) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      {data.map((elem) => {
        const calculateData = determineBloodPressureStage(
          {
            millimetersOfMercurySystolic: elem.millimetersOfMercurySystolic,
            millimetersOfMercuryDiastolic: elem.millimetersOfMercuryDiastolic,
            pulse: elem.pulse,
          },
          graphStages,
        );

        return (
          <MedicalLogsCard
            key={elem.id}
            cardColor={calculateData.color}
            onPress={() => navigation.navigate('BloodPressureForm', { edit: true, id: elem.id, days })}
          >
            <BloodPressureCard bloodPressureStage={calculateData.label} {...elem} />
          </MedicalLogsCard>
        );
      })}
    </View>
  );
};
