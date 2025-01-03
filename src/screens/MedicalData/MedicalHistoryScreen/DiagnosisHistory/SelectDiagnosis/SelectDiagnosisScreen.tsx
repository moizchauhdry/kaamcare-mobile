import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { searchForSelectElem } from '../../../../../utils/array/array';
import { commonDiagnosis, dynamicDiagnosis } from '../../../../../constants/data/medicalHistory/diagnosis';
import { useQueryDiagnosisList } from '../../../../../hooks/query/medicalHistory/diagnosis/useQueryDiagnosisList';

type SelectDiagnosisScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SelectDiagnosis'>;

export const SelectDiagnosisScreen = ({ navigation }: SelectDiagnosisScreenProps) => {
  const { data = [] } = useQueryDiagnosisList();
  const dynamicData = [...dynamicDiagnosis];

  const handleSelectOption = (value: string, isCustom?: boolean) => {
    const properName = value ?? searchForSelectElem(value, commonDiagnosis, dynamicData);
    const existedItem = data?.find((elem) => elem.name === properName);

    navigation.navigate('DiagnosisForm', {
      name: properName,
      edit: Boolean(existedItem),
      id: existedItem?.id,
      isCommonName: Boolean(!isCustom),
    });
  };

  return (
    <ScreenModalLayout title="Add diagnosis" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={commonDiagnosis}
        dynamicData={dynamicData}
        onSelectOption={handleSelectOption}
        onSaveCustomValue={(value) => handleSelectOption(value)}
        searchInputProps={{ placeholder: 'Search your diagnosis' }}
      />
    </ScreenModalLayout>
  );
};
