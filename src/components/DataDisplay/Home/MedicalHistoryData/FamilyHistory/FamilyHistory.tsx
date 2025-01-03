import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';

import type { HomeCardDataType } from '../../../../../model/common/HomeData';
import { useQueryFamilyMembersList } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMembersList';
import { useQueryFamilyMembersDiagnosisList } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMembersDiagnosisList';
import { FamilyHistoryMemberContent } from './FamilyHistoryMemberContent';

export const FamilyHistory = memo((props: HomeCardDataType) => {
  const { data = [], isLoading, isError } = useQueryFamilyMembersList();
  const { data: diagnosis = [] } = useQueryFamilyMembersDiagnosisList();
  const isSomeFilled = diagnosis.length > 0;

  const renderContent = () => (
    <View style={{ gap: 12 }}>
      {data.map((member) => (
        <FamilyHistoryMemberContent
          key={member.id}
          id={member.id}
          name={member.familyMemberName || member.relationshipName}
        />
      ))}
    </View>
  );

  return (
    <DataCard
      title={props.title}
      navigationData={{
        navigationScreen: 'MedicalDataNavigation',
        navigationProps: {
          listScreenName: props.listNavigation,
          addNewScreenName: props.addNavigation,
        },
      }}
      dataProps={{
        isLoading,
        data: isSomeFilled ? data : null,
        isError,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
