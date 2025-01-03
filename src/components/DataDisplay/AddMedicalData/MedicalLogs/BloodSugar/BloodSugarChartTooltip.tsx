import { View } from 'react-native';

import { theme } from '../../../../../config/Theme';
import { Typography } from '../../../../UI/Typography/Typography';
import { getFullHourFromDate } from '../../../../../utils/date/date';

type BloodSugarChartTooltipProps = {
  date: Date;
  color?: string;
  minBloodSugar?: number;
  maxBloodSugar?: number;
  minCarbs?: number;
  maxCarbs?: number;
  averageBloodSugar?: number;
  averageCarbs?: number;
  isSingleDay?: boolean;
};

export const BloodSugarChartTooltip = ({
  date,
  color,
  minBloodSugar,
  maxBloodSugar,
  minCarbs,
  maxCarbs,
  averageBloodSugar,
  averageCarbs,
  isSingleDay,
}: BloodSugarChartTooltipProps) => {
  const ColorLabelComponent = <View style={{ width: 10, height: 10, backgroundColor: color, borderRadius: 6 }} />;
  const CommonColorLabelComponent = (
    <View style={{ width: 10, height: 10, backgroundColor: theme.colors.summaryBlueLight, borderRadius: 6 }} />
  );
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
      <View style={{ gap: 16, flexDirection: 'row' }}>
        <View style={{ gap: 8, alignSelf: 'flex-end' }}>
          {!isSingleDay ? (
            <View>
              <Typography size="xs" style={{ opacity: 0 }}>
                H.
              </Typography>
            </View>
          ) : null}
          <View>
            <Typography size="xs">Blood Sugar</Typography>
          </View>
          <View>
            <Typography size="xs">Carbs</Typography>
          </View>
        </View>
        {!isSingleDay ? (
          <View style={{ gap: 8 }}>
            <View style={{ flex: 0.3 }}>
              <Typography color="gray" style={{ fontSize: 11 }}>
                Min
              </Typography>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              {ColorLabelComponent}
              <Typography size="sm">{minBloodSugar}</Typography>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              {CommonColorLabelComponent}
              <Typography size="sm">{minCarbs}</Typography>
            </View>
          </View>
        ) : null}
        {!isSingleDay ? (
          <View style={{ gap: 8 }}>
            <View style={{ flex: 0.3 }}>
              <Typography color="gray" style={{ fontSize: 11 }}>
                Max
              </Typography>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              {ColorLabelComponent}
              <Typography size="sm">{maxBloodSugar}</Typography>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              {CommonColorLabelComponent}
              <Typography size="sm">{maxCarbs}</Typography>
            </View>
          </View>
        ) : null}
        <View style={{ gap: 8 }}>
          {!isSingleDay ? (
            <View style={{ flex: 0.3 }}>
              <Typography color="gray" style={{ fontSize: 11 }}>
                Average
              </Typography>
            </View>
          ) : null}
          <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
            {ColorLabelComponent}
            <Typography size="sm">{averageBloodSugar}</Typography>
          </View>
          <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
            {CommonColorLabelComponent}
            <Typography size="sm">{averageCarbs}</Typography>
          </View>
        </View>
      </View>
    </View>
  );
};
