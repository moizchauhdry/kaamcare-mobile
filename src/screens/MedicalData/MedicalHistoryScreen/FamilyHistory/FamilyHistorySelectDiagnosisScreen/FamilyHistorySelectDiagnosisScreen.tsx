import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useMemo } from 'react';

import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import {
  commonHearingHistoryDiagnosisData,
  dynamicHearingHistoryDiagnosisData,
} from '../../../../../constants/data/medicalHistory/hearingHistory';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { commonDiagnosis, dynamicDiagnosis } from '../../../../../constants/data/medicalHistory/diagnosis';
import type {
  FamilyHistoryApiDiagnosisType,
  FamilyMemberDiagnosisModelValues,
} from '../../../../../model/api/medicalHistory/FamilyHistory';
import type { CustomSelectData } from '../../../../../components/UI/Inputs/Custom/CustomSelect';
import {
  commonDentalHistoryDiagnosisData,
  dynamicDentalHistoryDiagnosisData,
} from '../../../../../constants/data/medicalHistory/dentalHistory';
import {
  commonVisionHistoryDiagnosis,
  dynamicVisionHistoryDiagnosis,
} from '../../../../../constants/data/medicalHistory/visionHistory';
import { useQueryFamilyMemberData } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMemberData';

type FamilyHistorySelectDiagnosisScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'FamilyHistorySelectDiagnosis'
>;

const DIAGNOSIS_DATA: {
  [key in FamilyHistoryApiDiagnosisType]: { common: CustomSelectData[]; dynamic: CustomSelectData[] };
} = {
  StandardDiagnosis: {
    common: commonDiagnosis,
    dynamic: dynamicDiagnosis,
  },
  DentalDiagnosis: {
    common: commonDentalHistoryDiagnosisData,
    dynamic: dynamicDentalHistoryDiagnosisData,
  },
  VisionDiagnosis: {
    common: commonVisionHistoryDiagnosis,
    dynamic: dynamicVisionHistoryDiagnosis,
  },
  HearingDiagnosis: {
    common: commonHearingHistoryDiagnosisData,
    dynamic: dynamicHearingHistoryDiagnosisData,
  },
};

const TITLE: { [key in FamilyHistoryApiDiagnosisType]: string } = {
  StandardDiagnosis: 'Add diagnosis',
  DentalDiagnosis: 'Add dental diagnosis',
  HearingDiagnosis: 'Add hearing diagnosis',
  VisionDiagnosis: 'Add vision diagnosis',
};

export const FamilyHistorySelectDiagnosisScreen = ({ route }: FamilyHistorySelectDiagnosisScreenProps) => {
  const { id, type } = route.params;
  const properData = useMemo(() => DIAGNOSIS_DATA[type], [type]);
  const data = useQueryFamilyMemberData(id, undefined, type);
  const dataWithName = useMemo(
    () =>
      data.map((elem) => ({
        ...elem,
        name: Array.isArray(elem.values)
          ? elem.values.find((value) => value.key === 'Name').value
          : (elem.values as FamilyMemberDiagnosisModelValues).name,
      })),
    [data],
  );
  const title = TITLE[type];

  return (
    <MedicalHistoryCustomSelectLayout
      title={title}
      navigationScreen="FamilyHistoryDiagnosisForm"
      userData={dataWithName}
      navigationParams={{
        userId: id,
        type,
      }}
      selectProps={{
        commonData: properData.common,
        dynamicData: properData.dynamic,
        searchInputProps: {
          placeholder: 'Search your diagnosis',
        },
      }}
    />
  );
};
