import { View } from 'react-native';

import { SwitchTab } from '../../../../UI/SwitchTab/SwitchTab';
import { DatePagination } from '../../../../UI/DatePagination/DatePagination';
import { medicalLogsTabsDays } from '../../../../../constants/data/medicalLogs/common';
import type { SaturationApiLog } from '../../../../../model/api/medicalLogs/Saturation';
import { SaturationChart } from './SaturationChart';

type SaturationContentProps = {
  days: number;
  onDaysChange: (days: number) => void;
  startDate: Date;
  onDateChange: (date: Date) => void;

  data: SaturationApiLog[];
};

export const SaturationContent = ({ data, startDate, onDateChange, onDaysChange, days }: SaturationContentProps) => (
  <View style={{ gap: 16 }}>
    <View>
      <SwitchTab selected={days} tabs={medicalLogsTabsDays} onSelect={onDaysChange} />
    </View>
    <View style={{ flex: 1 }}>
      <DatePagination onDateChange={onDateChange} subDays={medicalLogsTabsDays[days]!.subDays} />
    </View>
    <SaturationChart data={data} days={days} startDate={startDate} />
  </View>
);
