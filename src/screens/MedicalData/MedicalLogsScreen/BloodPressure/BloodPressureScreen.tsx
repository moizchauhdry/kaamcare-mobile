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
import { SwitchSelector2oComponent } from 'components/UI/Inputs/SwitchSelector/SwitchSelector2o';
import { theme } from 'config/Theme';

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
  const [selectedType, setSelectedType] = useState<string>('Blood pressure');
  const handleSelect = (selectedType: string) => {
    setSwitchType(selectedType === 'Heart Rate' ? 'heart rate' : 'pressure');
  };
  const handleTypeChange = (selectedType: string) => {
    setSelectedType(selectedType);
  };

  console.log('typetypetypetype', type);

  return (
    <View style={{ flex: 1 }}>
      <MedicalLogsMainLayout onSelect={(type) => handleSelect(type)} title="Blood Pressure">
        <View style={{ flex: 1, paddingBottom: 64, zIndex: 10 }}>
          <View style={{ gap: 16 }}>
            <SwitchSelector2oComponent
              value={selectedType}
              onPress={(value) => handleTypeChange(value)}
              options={[
                {
                  value: 'Blood pressure',
                  label: 'Blood pressure',
                },
                { value: 'Pulse', label: 'Pulse' },
              ]}
              style={{ borderWidth: 0, marginTop: 10 }}
              textStyle={{ fontSize: 20, color: theme.colors.textGray }}
              selectedTextStyle={{ fontSize: 20, color: theme.colors.textPrimary, fontWeight: '500' }}
            />
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
          name="plus-circle-button"
          size={60}
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
