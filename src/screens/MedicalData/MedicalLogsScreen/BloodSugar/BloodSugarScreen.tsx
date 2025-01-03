import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useMemo } from 'react';
import { onlineManager } from '@tanstack/react-query';

import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { BloodSugarSummary } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodSugar/BloodSugarSummary';
import { BloodSugarContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodSugar/BloodSugarContent';
import { useQueryBloodSugarLogsList } from '../../../../hooks/query/medicalLogs/bloodSugar/useQueryBloodSugarLogsList';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryBloodSugarListAll } from '../../../../hooks/query/medicalLogs/bloodSugar/useQueryBloodSugarListAll';

type BloodSugarScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodSugar'>;

export const BloodSugarScreen = ({ route, navigation }: BloodSugarScreenProps) => {
  const type = route.params?.type;
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data = [] } = useQueryBloodSugarLogsList(filters);
  const { data: dataAll = [] } = useQueryBloodSugarListAll(filters);
  const properData = useMemo(() => (isOnline ? data : dataAll), [isOnline, dataAll, data]);

  return (
    <MedicalLogsMainLayout title="Blood Sugar">
      <View style={{ flex: 1, paddingBottom: 24 }}>
        <View style={{ paddingVertical: 12 }}>
          <AdditionButton onPress={() => navigation.navigate('BloodSugarForm', { edit: false, days })}>
            Add blood sugar
          </AdditionButton>
        </View>
        <View style={{ gap: 16 }}>
          <BloodSugarContent
            initialType={type}
            data={properData}
            days={days}
            startDate={startDate}
            onDateChange={onDateChange}
            onDaysChange={onDaysChange}
          />
          <BloodSugarSummary data={properData} days={days} />
        </View>
      </View>
    </MedicalLogsMainLayout>
  );
};
