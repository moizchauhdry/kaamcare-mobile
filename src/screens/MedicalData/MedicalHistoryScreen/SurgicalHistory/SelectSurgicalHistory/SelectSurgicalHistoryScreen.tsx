import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useMutationCustomAllergyAdd } from '../../../../../hooks/query/medicalHistory/allergies/useMutationCustomAllergyAdd';
import { searchForSelectElem } from '../../../../../utils/array/array';
import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySurgicalHistoryList } from '../../../../../hooks/query/medicalHistory/surgicalHistory/useQuerySurgicalHistoryList';
import {
  commonSurgicalHistoryData,
  dynamicSurgicalHistoryData,
} from '../../../../../constants/data/medicalHistory/surgicalHistory';

type SelectSurgicalHistoryScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'SelectSurgicalHistory'
>;

export const SelectSurgicalHistoryScreen = ({ navigation }: SelectSurgicalHistoryScreenProps) => {
  const { data = { surgicalHistory: [] } } = useQuerySurgicalHistoryList();
  const { mutate, isPending } = useMutationCustomAllergyAdd({
    onSuccess: (value, variables) => handleSelectOption(value, false, variables),
  });

  const handleSelectOption = (value: string, isCustom?: boolean, name?: string) => {
    if (isCustom) {
      return;
    }

    const properName = name ?? searchForSelectElem(value, commonSurgicalHistoryData, dynamicSurgicalHistoryData);
    const existedItem = data.surgicalHistory.find((elem) => elem.name === properName);

    navigation.navigate('SurgicalHistoryForm', {
      name: properName,
      edit: Boolean(existedItem),
      id: value,
      isCommonName: Boolean(!isCustom),
    });
  };

  return (
    <ScreenModalLayout title="Add surgical history" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={commonSurgicalHistoryData}
        dynamicData={dynamicSurgicalHistoryData}
        onSelectOption={handleSelectOption}
        onSaveCustomValue={(value) => mutate(value)}
        searchInputProps={{ placeholder: 'Search your surgical history' }}
        buttonProps={{ disabled: isPending }}
      />
    </ScreenModalLayout>
  );
};
