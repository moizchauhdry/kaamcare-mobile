import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitList } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import medicalDevice from '../../../../assets/icons/medicalDevice.svg';
import { useQueryMedicalDevices } from '../../../../hooks/query/medicalHistory/medicalDevices/useQueryMedicalDevices';
import { MedicalDeviceCard } from '../../../../components/DataDisplay/AddMedicalData/MedicalHistory/MedicalDeviceCard/MedicalDeviceCard';

type MedicalDevicesScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'MedicalDevices'>;

export const MedicalDevicesScreen = ({ navigation }: MedicalDevicesScreenProps) => {
  const { data = { medicalDevices: [] } } = useQueryMedicalDevices();

  return (
    <MedicalHistoryUnitLayout title="Medical devices">
      {data.medicalDevices.length > 0 ? (
        <MedicalHistoryUnitList
          data={data.medicalDevices}
          renderItem={({ item }) => <MedicalDeviceCard {...item} />}
          onAddButtonPress={() => navigation.navigate('SelectMedicalDevice')}
          additionButtonText="Add medical device"
        />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start adding medical devices"
          description="Your medical devices section is empty. Tap the button to add your first medical device"
          buttonText="Add medical device"
          onButtonPress={() => navigation.navigate('SelectMedicalDevice')}
          icon={medicalDevice}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
