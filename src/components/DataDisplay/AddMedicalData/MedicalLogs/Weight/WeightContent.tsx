import { View } from 'react-native';

import { SwitchTab } from '../../../../UI/SwitchTab/SwitchTab';
import { DatePagination } from '../../../../UI/DatePagination/DatePagination';
import { medicalLogsTabsDays } from '../../../../../constants/data/medicalLogs/common';
import type { WeightLogs } from '../../../../../model/api/medicalLogs/Weight';
import { WeightChart } from './WeightChart';

type WeightContentProps = {
  days: number;
  onDaysChange: (days: number) => void;
  startDate: Date;
  onDateChange: (date: Date) => void;

  data?: WeightLogs;
};

export const WeightContent = ({ data = [], days, startDate, onDaysChange, onDateChange }: WeightContentProps) => (
  <View style={{ gap: 16 }}>
    <View>
      <SwitchTab selected={days} tabs={medicalLogsTabsDays} onSelect={onDaysChange} />
    </View>
    <View style={{ flex: 1 }}>
      <DatePagination onDateChange={onDateChange} subDays={medicalLogsTabsDays[days]!.subDays} />
    </View>
    <WeightChart days={days} data={data} startDate={startDate} />
  </View>
);
