import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { onlineManager } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { AdditionButton } from '../../../../components/UI/Button/AdditionButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalLogsMainLayout } from '../../../../components/Layouts/MedicalLogs/MedicalLogsMainLayout';
import { BloodPressureContent } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodPressure/BloodPressureContent';
import { BloodPressureSummary } from '../../../../components/DataDisplay/AddMedicalData/MedicalLogs/BloodPressure/BloodPressureSummary';
import { useQueryBloodPressureLogsList } from '../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureLogsList';
import { useMedicalLogsDateFilter } from '../../../../hooks/useMedicalLogsDateFilter';
import { useQueryBloodPressureListAll } from '../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureListAll';
import { TabNavigationCustomIcon } from 'components/Navigation/components/TabNavigationIcon/TabNavigationCustomIcon';

type BloodPressureScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodPressure'>;

export const BloodPressureScreen = ({ route, navigation }: BloodPressureScreenProps) => {
  const type = route.params?.type;
  const initialDays = route.params.days;
  const isOnline = onlineManager.isOnline();
  const { filters, days, startDate, onDateChange, onDaysChange } = useMedicalLogsDateFilter(initialDays);
  const { data: dataAll = [] } = useQueryBloodPressureListAll(filters);
  const { data = [] } = useQueryBloodPressureLogsList(filters, { enabled: isOnline });
  const properData = useMemo(() => (isOnline ? data : dataAll), [isOnline, dataAll, data]);
  const [switchType, setSwitchType] = useState(type === 'Heart Rate' ? 'heart rate' : 'pressure');

  const handleSelect = (selectedType: string) => {
    setSwitchType(selectedType === 'Heart Rate' ? 'heart rate' : 'pressure');
  };

  console.log('typetypetypetype', type);

  return (
    <View style={{ flex: 1 }}>
      <MedicalLogsMainLayout onSelect={(type) => handleSelect(type)} title="Blood Pressure">
        <View style={{ flex: 1, paddingBottom: 64 }}>
          <View style={{ gap: 16 }}>
            <BloodPressureContent
              initialType={switchType}
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

      <View style={styles.floatingButtonContainer}>
        <TabNavigationCustomIcon
          onPress={() => navigation.navigate('BloodPressureForm', { days, edit: false })}
          name="circle-button"
          size={81}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100, // Ensure it stays above everything
  },
});
