import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { onlineManager } from '@tanstack/react-query';
import { useLayoutEffect, useMemo } from 'react';

import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { useQuerySaturationLogsList } from '../../../../hooks/query/medicalLogs/saturation/useQuerySaturationLogsList';
import { SaturationContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Saturation/SaturationContent';
import { SaturationSummary } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Saturation/SaturationSummary';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQuerySaturationListAll } from '../../../../hooks/query/medicalLogs/saturation/useQuerySaturationListAll';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';

type SaturationScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Saturation'>;

export const SaturationScreen = ({ route, navigation }: SaturationScreenProps) => {
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data = [] } = useQuerySaturationLogsList(filters);
  const { data: dataAll = [] } = useQuerySaturationListAll(filters);
  const properData = useMemo(() => (isOnline ? data : dataAll), [isOnline, dataAll, data]);
  const handleSelect = (selectedType: string) => {
    switch (selectedType) {
      case 'Blood Pressure':
        navigation.replace('MedicalDataNavigation', {
          screen: 'BloodPressure',
          params: { type: 'pressure', days: 1 },
        } as any);
        break;
      case 'Heart Rate':
        navigation.replace('MedicalDataNavigation', {
          screen: 'BloodPressure',
          params: { type: 'pulse', days: 1 },
        } as any);
        break;
      case 'Blood sugar':
        navigation.replace('MedicalDataNavigation', {
          screen: 'BloodSugar',
          params: { type: 'sugar', days: 1 },
        } as any);
        break;
      case 'Height':
        navigation.replace('MedicalDataNavigation', {
          screen: 'Height',
          params: { type: 'Height', days: 1 },
        } as any);
        break;
      case 'Weight':
        navigation.replace('MedicalDataNavigation', {
          screen: 'Weight',
          params: { type: 'Weight', days: 1 },
        } as any);
        break;
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ModalGrabber
          showDropDown={true}
          onSelect={(type) => handleSelect(type)}
          title="SpO2"
          onPress={() => {}} // Open the bottom sheet on title press
        />
      ),
    });
  }, [navigation]);
  return (
    <MedicalLogsMainLayout title="SpO2">
      <View style={{ flex: 1, paddingBottom: 16 }}>
        <View style={{ paddingVertical: 12 }}>
          <AdditionButton onPress={() => navigation.navigate('SaturationForm')}>Add SpO2</AdditionButton>
        </View>
        <View style={{ gap: 16 }}>
          <SaturationContent
            data={properData}
            days={days}
            startDate={startDate}
            onDateChange={(date: Date) => onDateChange(date)}
            onDaysChange={(value) => onDaysChange(value)}
          />
          <SaturationSummary data={properData} days={days} />
        </View>
      </View>
    </MedicalLogsMainLayout>
  );
};
