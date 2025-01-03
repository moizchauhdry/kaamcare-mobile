import type { DefaultSectionT, SectionListData } from 'react-native';

import { SectionList } from 'components/DataDisplay/List/SectionList/SectionList';

import type { VisionHistoryModel } from '../../../../../model/api/medicalHistory/VisionHistory';
import { VisionHistoryCard } from '../../../AddMedicalData/MedicalHistory/VisionHistory/VisionHistoryCard';

type SocialHistoryListProps = {
  visionDiagnosis: VisionHistoryModel[];
  eyeWear: VisionHistoryModel[];
};

export const VisionHistoryList = ({ visionDiagnosis, eyeWear }: SocialHistoryListProps) => {
  const sections: SectionListData<VisionHistoryModel, DefaultSectionT>[] = [
    {
      title: 'Vision Diagnosis',
      data: visionDiagnosis,
      component: VisionHistoryCard,
      screen: 'VisionHistorySelectDiagnosis',
      additionalProps: { sectionName: 'visionDiagnosis' },
      params: { sectionName: 'visionDiagnosis' },
    },
    {
      title: 'Eye Wear',
      data: eyeWear,
      component: VisionHistoryCard,
      screen: 'VisionHistorySelectEyeWear',
      additionalProps: { sectionName: 'eyeWears' },
      params: { sectionName: 'eyeWears' },
    },
  ];

  return <SectionList sections={sections} />;
};
