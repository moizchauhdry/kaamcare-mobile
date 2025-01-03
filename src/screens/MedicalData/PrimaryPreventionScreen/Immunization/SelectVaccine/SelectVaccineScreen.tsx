import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { commonVaccinesData, dymamicVaccinesData } from 'constants/data/primaryPrevention/immunizations';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { searchForSelectFullElem } from '../../../../../utils/array/array';

type SelectVaccineScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SelectVaccine'>;

export const SelectVaccineScreen = ({ navigation }: SelectVaccineScreenProps) => {
  const handleSelectOption = (value: string, isCustom?: boolean, name?: string) => {
    if (isCustom) {
      return;
    }

    const elem = searchForSelectFullElem(value, commonVaccinesData, dymamicVaccinesData) ?? {
      value,
      subLabel: 'Other',
    };
    const properName = name ?? elem!.value;

    navigation.navigate('VaccineForm', {
      name: properName,
      edit: false,
      subName: elem?.subLabel!,
      isCommonName: true,
    });
  };

  return (
    <ScreenModalLayout title="Add immunization" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        secondaryButtonProps={{
          display: true,
          text: 'Upload Complete Vaccine Card',
          onPress: () => navigation.navigate('VaccineCardForm', { id: undefined, edit: false }),
        }}
        commonData={commonVaccinesData}
        dynamicData={dymamicVaccinesData}
        onSelectOption={handleSelectOption}
        onSaveCustomValue={(value) => handleSelectOption(value, false)}
        searchInputProps={{ placeholder: 'Search your immunization' }}
      />
    </ScreenModalLayout>
  );
};
