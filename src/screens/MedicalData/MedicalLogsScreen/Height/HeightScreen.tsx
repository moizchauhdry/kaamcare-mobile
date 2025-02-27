import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { onlineManager } from '@tanstack/react-query';
import { useLayoutEffect, useMemo } from 'react';

import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryHeightLogsList } from '../../../../hooks/query/medicalLogs/height/useQueryHeightLogsList';
import { HeightLogList } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Height/HeightLogList';
import { HeightContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Height/HeightContent';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryHeightListAll } from '../../../../hooks/query/medicalLogs/height/useQueryHeightListAll';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';

type HeightScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Height'>;

export const HeightScreen = ({ navigation, route }: HeightScreenProps) => {
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data: dataAll = [] } = useQueryHeightListAll(filters);
  const { data } = useQueryHeightLogsList(filters);
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
      case 'Blood sugar':
        navigation.replace('MedicalDataNavigation', {
          screen: 'BloodSugar',
          params: { type: 'sugar', days: 1 },
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
          title="Height"
          onPress={() => {}} // Open the bottom sheet on title press
        />
      ),
    });
  }, [navigation]);
  return (
    <MedicalLogsMainLayout title="Height">
      <View style={{ flex: 1, paddingBottom: 24 }}>
        <View style={{ paddingVertical: 12 }}>
          <AdditionButton onPress={() => navigation.navigate('HeightForm', { edit: false, days })}>
            Add height
          </AdditionButton>
        </View>
        <View style={{ gap: 16 }}>
          <HeightContent
            data={properData}
            days={days}
            startDate={startDate}
            onDateChange={onDateChange}
            onDaysChange={onDaysChange}
          />
          <HeightLogList data={properData} days={days} />
        </View>
      </View>
    </MedicalLogsMainLayout>
  );
};
