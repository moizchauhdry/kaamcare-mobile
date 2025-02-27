import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useLayoutEffect, useMemo } from 'react';
import { onlineManager } from '@tanstack/react-query';

import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { BloodSugarSummary } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodSugar/BloodSugarSummary';
import { BloodSugarContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodSugar/BloodSugarContent';
import { useQueryBloodSugarLogsList } from '../../../../hooks/query/medicalLogs/bloodSugar/useQueryBloodSugarLogsList';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryBloodSugarListAll } from '../../../../hooks/query/medicalLogs/bloodSugar/useQueryBloodSugarListAll';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';

type BloodSugarScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodSugar'>;

export const BloodSugarScreen = ({ route, navigation }: BloodSugarScreenProps) => {
  const type = route.params?.type;
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data = [] } = useQueryBloodSugarLogsList(filters);
  const { data: dataAll = [] } = useQueryBloodSugarListAll(filters);
  const properData = useMemo(() => (isOnline ? data : dataAll), [isOnline, dataAll, data]);
  const handleSelect = (type: string) => {
    switch (type) {
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
      case 'SpO2':
        navigation.replace('MedicalDataNavigation', {
          screen: 'Saturation',
          params: { type: 'Saturation', days: 1 },
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
          title="Blood Sugar"
          onPress={() => {}} // Open the bottom sheet on title press
        />
      ),
    });
  }, [navigation]);
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
