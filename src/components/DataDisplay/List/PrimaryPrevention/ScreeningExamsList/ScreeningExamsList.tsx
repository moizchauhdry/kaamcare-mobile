import type { DefaultSectionT, SectionListData } from 'react-native';

import { SectionList } from 'components/DataDisplay/List/SectionList/SectionList';
import { ScreeningExamCard as ScreeningExamCardComponent } from 'components/DataDisplay/AddMedicalData/PrimaryPrevention/ScreeningExam/ScreeningExamCard';

import type {
  GroupedScreeningExamData,
  ScreeningExam,
  ScreeningExamCard,
} from '../../../../../model/api/primaryPrevention/ScreeningExam';

type ScreeningExamListProps = {
  screeningExams: GroupedScreeningExamData[];
};

export const ScreeningExamList = ({ screeningExams }: ScreeningExamListProps) => {
  const sections: SectionListData<ScreeningExam | ScreeningExamCard, DefaultSectionT>[] = [
    ...screeningExams.map((elem) => ({
      title: elem.name,
      data: elem.data,
      component: ScreeningExamCardComponent,
      screen: 'SelectScreeningExam',
    })),
  ];
  return <SectionList sections={sections} />;
};
