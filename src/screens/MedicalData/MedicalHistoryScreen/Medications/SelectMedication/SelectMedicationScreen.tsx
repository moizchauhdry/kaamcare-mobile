import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import { useQueryMedications } from '../../../../../hooks/query/medicalHistory/medication/useQueryMedications';
import { useQueryCommonMedications } from '../../../../../hooks/query/medicalHistory/medication/useQueryCommonMedications';
import { useMutationCustomMedicationAdd } from '../../../../../hooks/query/medicalHistory/medication/useMutationCustomMedicationAdd';
import { searchForSelectElem } from '../../../../../utils/array/array';
import { commonMedications, dynamicMedications } from '../../../../../constants/data/medicalHistory/medications';

type SelectMedicationScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SelectMedication'>;

export const SelectMedicationScreen = ({ navigation }: SelectMedicationScreenProps) => {
  const { data = [] } = useQueryMedications();
  const {
    data: medications = {
      dynamic: [],
      common: [],
      custom: [],
    },
  } = useQueryCommonMedications();
  const { mutate, isPending } = useMutationCustomMedicationAdd({
    onSuccess: (value, variables) => handleSelectOption(value, false, variables),
  });
  const dynamicData = [...dynamicMedications, ...medications.custom];

  const handleSelectOption = (value: string, isCustom?: boolean, name?: string) => {
    if (isCustom) {
      return;
    }

    const properName = name ?? searchForSelectElem(value, commonMedications, dynamicData);
    const existedItem = data?.find((elem) => elem.medicationName === properName);

    navigation.navigate('MedicationForm', {
      name: properName,
      edit: Boolean(existedItem),
      id: value,
      isCommonName: Boolean(!isCustom),
    });
  };

  return (
    <ScreenModalLayout title="Add medication" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={commonMedications}
        dynamicData={dynamicData}
        onSelectOption={handleSelectOption}
        onSaveCustomValue={(value) => mutate(value)}
        searchInputProps={{ placeholder: 'Search your medications' }}
        buttonProps={{ disabled: isPending }}
      />
    </ScreenModalLayout>
  );
};
