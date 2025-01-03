import type { DefaultSectionT, SectionListData } from 'react-native';

import { SectionList } from 'components/DataDisplay/List/SectionList/SectionList';

import type { HearingHistory } from '../../../../../model/api/medicalHistory/HearingHistory';
import { HearingHistoryCard } from '../../../AddMedicalData/MedicalHistory/HearingHistory/HearingHistoryCard';

type HearingHistoryListProps = {
  diagnosis: HearingHistory[];
  aids: HearingHistory[];
  tests: HearingHistory[];
};

export const HearingHistoryList = ({ aids, diagnosis, tests }: HearingHistoryListProps) => {
  const sections: SectionListData<HearingHistory, DefaultSectionT>[] = [
    {
      title: 'Hearing Diagnosis',
      data: diagnosis,
      component: HearingHistoryCard,
      screen: 'HearingHistorySelectDiagnosis',
      additionalProps: { sectionName: 'hearingDiagnosis' },
      params: { sectionName: 'hearingDiagnosis' },
    },
    {
      title: 'Hearing Aids & Cochlear Implants',
      data: aids,
      component: HearingHistoryCard,
      screen: 'HearingHistorySelectAids',
      additionalProps: { sectionName: 'hearingAidsCochlearImplants' },
      params: { sectionName: 'hearingAidsCochlearImplants' },
    },
    {
      title: 'Hearing Tests',
      data: tests,
      component: HearingHistoryCard,
      screen: 'HearingHistorySelectTests',
      additionalProps: { sectionName: 'hearingTests' },
      params: { sectionName: 'hearingTests' },
    },
  ];

  return <SectionList sections={sections} />;
};
