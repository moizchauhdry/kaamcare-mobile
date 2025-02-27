import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { onlineManager } from '@tanstack/react-query';
import { useLayoutEffect, useMemo } from 'react';

import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { WeightLogList } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Weight/WeightLogList';
import { useQueryWeightLogsList } from '../../../../hooks/query/medicalLogs/weight/useQueryWeightLogsList';
import { WeightContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Weight/WeightContent';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryWeightListAll } from '../../../../hooks/query/medicalLogs/weight/useQueryWeightListAll';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';

type WeightScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Weight'>;

export const WeightScreen = ({ navigation, route }: WeightScreenProps) => {
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data } = useQueryWeightLogsList(filters);
  const { data: dataAll } = useQueryWeightListAll(filters);
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
      case 'Height':
        navigation.replace('MedicalDataNavigation', {
          screen: 'Height',
          params: { type: 'Height', days: 1 },
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
          title="Weight"
          onPress={() => {}} // Open the bottom sheet on title press
        />
      ),
    });
  }, [navigation]);
  return (
    <MedicalLogsMainLayout title="Weight">
      <View style={{ flex: 1, paddingBottom: 24 }}>
        <View style={{ paddingVertical: 12 }}>
          <AdditionButton onPress={() => navigation.navigate('WeightForm', { edit: false, days })}>
            Add weight
          </AdditionButton>
        </View>
        <View style={{ gap: 16 }}>
          <WeightContent
            data={properData}
            days={days}
            startDate={startDate}
            onDateChange={(date: Date) => onDateChange(date)}
            onDaysChange={(value) => onDaysChange(value)}
          />
          <WeightLogList data={properData} days={days} />
        </View>
      </View>
    </MedicalLogsMainLayout>
  );
};
