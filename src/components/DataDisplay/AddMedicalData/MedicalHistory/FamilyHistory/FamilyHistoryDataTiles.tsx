import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import hearingHistoryIcon from 'assets/icons/hearing.svg';
import dentalIcon from 'assets/icons/dental.svg';
import diagnosis from 'assets/icons/standard-diagnosis.svg';
import vision from 'assets/icons/vision.svg';

import { MedicalDataTile } from '../../AddMedicalData/components/MedicalDataTile';
import type { FamilyHistoryApiDiagnosisType } from '../../../../../model/api/medicalHistory/FamilyHistory';

type FamilyHistoryDataTilesProps = {
  id: string;
};

export const FamilyHistoryDataTiles = ({ id }: FamilyHistoryDataTilesProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  const handlePress = (type: FamilyHistoryApiDiagnosisType) =>
    navigation.navigate('FamilyHistorySelectDiagnosis', { id, type });

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: 16,
          flex: 1,
        }}
      >
        <MedicalDataTile title="Standard Diagnosis" onPress={() => handlePress('StandardDiagnosis')} icon={diagnosis} />
        <MedicalDataTile
          title="Hearing Diagnosis"
          onPress={() => handlePress('HearingDiagnosis')}
          icon={hearingHistoryIcon}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: 16,
          flex: 1,
        }}
      >
        <MedicalDataTile title="Dental Diagnosis" onPress={() => handlePress('DentalDiagnosis')} icon={dentalIcon} />

        <MedicalDataTile title="Vision Diagnosis" onPress={() => handlePress('VisionDiagnosis')} icon={vision} />
      </View>
    </View>
  );
};
