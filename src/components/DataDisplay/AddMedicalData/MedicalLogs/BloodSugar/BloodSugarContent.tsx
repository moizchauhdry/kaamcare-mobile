import { View } from 'react-native';
import { useState } from 'react';

import { SwitchTab } from '../../../../UI/SwitchTab/SwitchTab';
import { DatePagination } from '../../../../UI/DatePagination/DatePagination';
import { bloodSugarTabsType, medicalLogsTabsDays } from '../../../../../constants/data/medicalLogs/common';
import type { BloodSugarLogs } from '../../../../../model/api/medicalLogs/BloodSugar';
import { BloodSugarChart } from './BloodSugarChart';

type BloodSugarContentProps = {
  days: number;
  onDaysChange: (days: number) => void;
  startDate: Date;
  onDateChange: (date: Date) => void;

  data: BloodSugarLogs;

  initialType?: string;
};

export const BloodSugarContent = ({
  initialType,
  data,
  days,
  onDaysChange,
  onDateChange,
  startDate,
}: BloodSugarContentProps) => {
  const [type, setType] = useState(initialType ?? 'sugar');

  return (
    <View style={{ gap: 16 }}>
      <View>
        <SwitchTab selected={type} tabs={bloodSugarTabsType} onSelect={setType} type="normal" />
      </View>
      <View>
        <SwitchTab selected={days} tabs={medicalLogsTabsDays} onSelect={onDaysChange} />
      </View>
      <View style={{ flex: 1 }}>
        <DatePagination onDateChange={onDateChange} subDays={medicalLogsTabsDays[days]!.subDays} />
      </View>
      <BloodSugarChart data={data} type={type} days={days} startDate={startDate} />
    </View>
  );
};
