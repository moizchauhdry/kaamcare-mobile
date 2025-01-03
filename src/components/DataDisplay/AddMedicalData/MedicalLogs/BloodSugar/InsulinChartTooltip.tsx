import { View } from 'react-native';

import { theme } from '../../../../../config/Theme';
import { Typography } from '../../../../UI/Typography/Typography';
import { getFullHourFromDate } from '../../../../../utils/date/date';

type InsulinChartTooltipProps = {
  date: Date;
  rapid?: number;
  intermediate?: number;
  long?: number;
};

export const InsulinChartTooltip = ({ date, rapid, long, intermediate }: InsulinChartTooltipProps) => {
  const properDate = new Date(date);
  properDate.setMinutes(0);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.textPrimary,
        borderRadius: 16,
        gap: 8,
        shadowColor: theme.colors.textPrimary,
        shadowOpacity: 0.3,
        shadowRadius: 9,
        shadowOffset: { width: 0, height: 3 },
        zIndex: 999,
      }}
    >
      <View>
        <Typography size="sm" style={{ textAlign: 'center' }}>
          {getFullHourFromDate(properDate)}
        </Typography>
      </View>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <Typography color="gray">Rapid (u)</Typography>
          <View style={{ width: 4, height: 8, borderRadius: 8, backgroundColor: theme.colors.summaryPurple }} />
          <Typography style={{ width: 30, textAlign: 'right' }}>{rapid ?? 0}</Typography>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <Typography color="gray">Intermediate (u)</Typography>
          <View style={{ width: 4, height: 8, borderRadius: 8, backgroundColor: theme.colors.summaryGreen }} />
          <Typography style={{ width: 30, textAlign: 'right' }}>{intermediate ?? 0}</Typography>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <Typography color="gray">Long (u)</Typography>
          <View style={{ width: 4, height: 8, borderRadius: 8, backgroundColor: theme.colors.summaryPink }} />
          <Typography style={{ width: 30, textAlign: 'right' }}>{long ?? 0}</Typography>
        </View>
      </View>
    </View>
  );
};
