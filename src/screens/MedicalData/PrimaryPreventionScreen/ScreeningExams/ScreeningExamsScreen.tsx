import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import exam from '../../../../assets/icons/exam.svg';
import { useQueryScreeningExamsList } from '../../../../hooks/query/primaryPrevention/screeningExams/useQueryScreeningExamsList';
import { ScreeningExamList } from '../../../../components/DataDisplay/List/PrimaryPrevention/ScreeningExamsList/ScreeningExamsList';
import { groupByScreeningExamName } from '../../../../utils/primaryPrevention/screeningExams';

type ScreeningExamsScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'ScreeningExams'>;

export const ScreeningExamsScreen = ({ navigation }: ScreeningExamsScreenProps) => {
  const { data = [] } = useQueryScreeningExamsList();
  const groupedData = groupByScreeningExamName(data);
  return (
    <MedicalHistoryUnitLayout title="Screening exams">
      {data.length > 0 ? (
        <ScreeningExamList screeningExams={groupedData} />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start screening exams"
          description={`Your screening exams list is empty.\nTap the button to add your screening exam.`}
          buttonText="Add screening exam"
          onButtonPress={() => navigation.navigate('SelectScreeningExam')}
          icon={exam}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
