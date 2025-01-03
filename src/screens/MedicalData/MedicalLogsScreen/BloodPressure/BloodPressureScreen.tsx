import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { onlineManager } from '@tanstack/react-query';
import { useMemo } from 'react';

import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { BloodPressureContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodPressure/BloodPressureContent';
import { BloodPressureSummary } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodPressure/BloodPressureSummary';
import { useQueryBloodPressureLogsList } from '../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureLogsList';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryBloodPressureListAll } from '../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureListAll';

type BloodPressureScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodPressure'>;

export const BloodPressureScreen = ({ route, navigation }: BloodPressureScreenProps) => {
  const type = route.params?.type;
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data: dataAll = [] } = useQueryBloodPressureListAll(filters);
  const { data = [] } = useQueryBloodPressureLogsList(filters, { enabled: isOnline });
  const properData = useMemo(() => (isOnline ? data : dataAll), [isOnline, dataAll, data]);

  return (
    <MedicalLogsMainLayout title="Blood Pressure & Pulse">
      <View style={{ flex: 1, paddingBottom: 64 }}>
        <View style={{ paddingVertical: 12 }}>
          <AdditionButton onPress={() => navigation.navigate('BloodPressureForm', { days, edit: false })}>
            Add blood pressure
          </AdditionButton>
        </View>
        <View style={{ gap: 16 }}>
          <BloodPressureContent
            initialType={type}
            displayDays={days}
            onDisplayDaysChange={onDaysChange}
            data={properData}
            startDate={startDate}
            onStartDateChange={onDateChange}
          />
          <BloodPressureSummary data={properData} days={days} />
        </View>
      </View>
    </MedicalLogsMainLayout>
  );
};
