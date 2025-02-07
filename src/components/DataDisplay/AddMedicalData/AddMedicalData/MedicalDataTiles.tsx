import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import medicalLogs from 'assets/icons/medical-logs.svg';
import medicalHistory from 'assets/icons/medical-history.svg';
import primaryPrevention from 'assets/icons/primary-prevention.svg';
import pillTrackerIcon from 'assets/icons/pill-icon.svg';
import goalsOfCare from 'assets/icons/goals-of-care.svg';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { MedicalDataTile } from './components/MedicalDataTile';

export const MedicalDataTiles = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

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
        <MedicalDataTile title="Medical Logs" onPress={() => navigation.navigate('MedicalLogs')} icon={medicalLogs} />
        <MedicalDataTile
          title="Primary Prevention"
          onPress={() => navigation.navigate('PrimaryPrevention')}
          icon={primaryPrevention}
        />
        <MedicalDataTile
          title="Pill Tracker"
          onPress={() => navigation.navigate('PillTrackerIntro')}
          icon={pillTrackerIcon}
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
        <MedicalDataTile
          title="Medical History"
          onPress={() => navigation.navigate('MedicalHistory')}
          icon={medicalHistory}
        />

        <MedicalDataTile title="Goals of Care" onPress={() => navigation.navigate('GoalsOfCare')} icon={goalsOfCare} />
      </View>
    </View>
  );
};
