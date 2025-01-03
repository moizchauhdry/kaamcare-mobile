import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { onlineManager } from '@tanstack/react-query';
import { useMemo } from 'react';

import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { WeightLogList } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Weight/WeightLogList';
import { useQueryWeightLogsList } from '../../../../hooks/query/medicalLogs/weight/useQueryWeightLogsList';
import { WeightContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/Weight/WeightContent';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryWeightListAll } from '../../../../hooks/query/medicalLogs/weight/useQueryWeightListAll';

type WeightScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Weight'>;

export const WeightScreen = ({ navigation, route }: WeightScreenProps) => {
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data } = useQueryWeightLogsList(filters);
  const { data: dataAll } = useQueryWeightListAll(filters);
  const properData = useMemo(() => (isOnline ? data : dataAll), [isOnline, dataAll, data]);

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
