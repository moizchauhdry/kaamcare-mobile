import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import { useQueryMedicalDevices } from '../../../../../hooks/query/medicalHistory/medicalDevices/useQueryMedicalDevices';
import { commonMedicalDevices } from '../../../../../constants/data/medicalHistory/medicalDevices';

type SelectMedicalDeviceScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SelectMedicalDevice'>;

export const SelectMedicalDeviceScreen = ({ navigation }: SelectMedicalDeviceScreenProps) => {
  const { data = { medicalDevices: [] } } = useQueryMedicalDevices();
  const handleSelectOption = (value: string, isCustom?: boolean) => {
    const name = commonMedicalDevices.find((elem) => elem.value === value)?.label ?? value;
    const existingRecord = data.medicalDevices.find((elem) => elem.name === name);

    navigation.navigate('MedicalDeviceForm', {
      name,
      edit: Boolean(existingRecord),
      id: existingRecord ? existingRecord.id : undefined,
      isCommonName: Boolean(!isCustom),
    });
  };

  return (
    <ScreenModalLayout title="Add medical devices" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={commonMedicalDevices}
        dynamicData={[]}
        onSelectOption={handleSelectOption}
        searchInputProps={{ placeholder: 'Search your medical devices' }}
      />
    </ScreenModalLayout>
  );
};
