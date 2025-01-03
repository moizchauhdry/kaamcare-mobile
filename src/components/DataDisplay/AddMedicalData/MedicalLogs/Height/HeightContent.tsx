import { View } from 'react-native';

import { SwitchTab } from '../../../../UI/SwitchTab/SwitchTab';
import { DatePagination } from '../../../../UI/DatePagination/DatePagination';
import { medicalLogsTabsDays } from '../../../../../constants/data/medicalLogs/common';
import type { HeightLogs } from '../../../../../model/api/medicalLogs/Height';
import { HeightChart } from './HeightChart';

type HeightContentProps = {
  days: number;
  onDaysChange: (days: number) => void;
  startDate: Date;
  onDateChange: (date: Date) => void;

  data?: HeightLogs;
};

export const HeightContent = ({ days, onDaysChange, onDateChange, startDate, data = [] }: HeightContentProps) => (
  <View style={{ gap: 16 }}>
    <View>
      <SwitchTab selected={days} tabs={medicalLogsTabsDays} onSelect={onDaysChange} />
    </View>
    <View style={{ flex: 1 }}>
      <DatePagination onDateChange={onDateChange} subDays={medicalLogsTabsDays[days]!.subDays} />
    </View>
    <HeightChart startDate={startDate} data={data} days={days} />
  </View>
);
