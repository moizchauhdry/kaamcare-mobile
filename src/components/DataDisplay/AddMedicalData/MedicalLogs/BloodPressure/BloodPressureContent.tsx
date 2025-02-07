import { View } from 'react-native';
import { useState, useEffect } from 'react';

import { SwitchTab } from '../../../../UI/SwitchTab/SwitchTab';
import { DatePagination } from '../../../../UI/DatePagination/DatePagination';
import { bloodPressureTabsType, medicalLogsTabsDays } from '../../../../../constants/data/medicalLogs/common';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
import { BloodPressureChart } from './BloodPressureChart';

type BloodPressureContentProps = {
  data: BloodPressureLogs;

  startDate: Date;
  onStartDateChange: (data: Date) => void;

  displayDays: number;
  onDisplayDaysChange: (days: number) => void;

  initialType?: string; // Receiving from BloodPressureScreen
};

export const BloodPressureContent = ({
  data,
  startDate,
  onStartDateChange,
  displayDays,
  onDisplayDaysChange,
  initialType,
}: BloodPressureContentProps) => {
  const [type, setType] = useState(initialType ?? 'pressure');

  useEffect(() => {
    setType(initialType ?? 'pressure');
  }, [initialType]);

  return (
    <View style={{ gap: 16 }}>
      <View>{/* <SwitchTab selected={type} tabs={bloodPressureTabsType} onSelect={setType} type="normal" /> */}</View>
      <View>
        <SwitchTab selected={displayDays} tabs={medicalLogsTabsDays} onSelect={onDisplayDaysChange} />
      </View>
      <View style={{ flex: 1 }}>
        <DatePagination onDateChange={onStartDateChange} subDays={medicalLogsTabsDays[displayDays]!.subDays} />
      </View>
      <BloodPressureChart data={data} type={type} days={displayDays} startDate={startDate} />
    </View>
  );
};
