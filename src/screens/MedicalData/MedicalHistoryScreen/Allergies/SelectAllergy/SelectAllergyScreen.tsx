import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryAllergies } from '../../../../../hooks/query/medicalHistory/allergies/useQueryAllergies';
import { useQueryCommonAllergies } from '../../../../../hooks/query/medicalHistory/allergies/useQueryCommonAllergies';
import { useMutationCustomAllergyAdd } from '../../../../../hooks/query/medicalHistory/allergies/useMutationCustomAllergyAdd';
import { searchForSelectElem } from '../../../../../utils/array/array';
import { commonAllergies, dynamicAllergies } from '../../../../../constants/data/medicalHistory/allergies';

type SelectAllergyScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SelectAllergy'>;

export const SelectAllergyScreen = ({ navigation }: SelectAllergyScreenProps) => {
  const { data = [] } = useQueryAllergies();
  const {
    data: allergies = {
      dynamic: [],
      common: [],
      custom: [],
    },
  } = useQueryCommonAllergies();
  const { mutate, isPending } = useMutationCustomAllergyAdd({
    onSuccess: (value, variables) => handleSelectOption(value, false, variables),
  });
  const dynamicData = [...dynamicAllergies, ...allergies.custom];

  const handleSelectOption = (value: string, isCustom?: boolean, name?: string) => {
    if (isCustom) {
      return;
    }

    const properName = name ?? searchForSelectElem(value, commonAllergies, dynamicData);
    const existedAllergy = data?.find((elem) => elem.allergyName === properName);

    navigation.navigate('AddAllergy', {
      name: properName,
      edit: Boolean(existedAllergy),
      isCommonName: Boolean(!isCustom),
    });
  };

  return (
    <ScreenModalLayout title="Add allergy" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={commonAllergies}
        dynamicData={dynamicData}
        onSelectOption={handleSelectOption}
        onSaveCustomValue={(value) => mutate(value)}
        searchInputProps={{ placeholder: 'Search your allergies' }}
        buttonProps={{ disabled: isPending }}
      />
    </ScreenModalLayout>
  );
};
