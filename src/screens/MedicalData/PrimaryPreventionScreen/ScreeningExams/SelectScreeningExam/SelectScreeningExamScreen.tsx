import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../../../../components/UI/Inputs/Custom/components/CustomSelectView';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { searchForSelectFullElem } from '../../../../../utils/array/array';
import {
  commonScreeningExamsData,
  dymamicScreeningExamsData,
} from '../../../../../constants/data/primaryPrevention/screeningExams';

type SelectScreeningExamProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SelectScreeningExam'>;

export const SelectScreeningExamScreen = ({ navigation }: SelectScreeningExamProps) => {
  const handleSelectOption = (value: string, isCustom?: boolean, name?: string) => {
    if (isCustom) {
      return;
    }

    const elem = searchForSelectFullElem(value, commonScreeningExamsData, dymamicScreeningExamsData) ?? {
      value,
      subLabel: 'Other',
    };
    const properName = name ?? elem!.value;

    navigation.navigate('ScreeningExamForm', {
      name: properName,
      edit: false,
    });
  };

  return (
    <ScreenModalLayout title="Add screening exams" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={commonScreeningExamsData}
        dynamicData={dymamicScreeningExamsData}
        onSelectOption={handleSelectOption}
        onSaveCustomValue={(value) => handleSelectOption(value, false)}
        searchInputProps={{ placeholder: 'Search your screening exam' }}
      />
    </ScreenModalLayout>
  );
};
