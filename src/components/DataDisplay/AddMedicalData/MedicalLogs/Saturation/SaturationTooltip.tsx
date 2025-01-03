import { View } from 'react-native';

import { theme } from '../../../../../config/Theme';
import { Typography } from '../../../../UI/Typography/Typography';
import { formatDate, getFullHourFromDate } from '../../../../../utils/date/date';

type SaturationChartTooltipProps = {
  date: Date;
  minSat?: number;
  maxSat?: number;
  averageSat?: number;
  color?: string;
  variant?: 'single' | 'multiple';
};

export const SaturationChartTooltip = ({
  date,
  minSat,
  maxSat,
  averageSat,
  color,
  variant,
}: SaturationChartTooltipProps) => {
  const ColorLabelComponent = <View style={{ width: 10, height: 10, backgroundColor: color, borderRadius: 6 }} />;
  const renderSingle = () => (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Typography size="sm" color="gray">
          SpO2
        </Typography>
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          {ColorLabelComponent}
          <Typography size="sm">{minSat}</Typography>
        </View>
      </View>
    </View>
  );

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
          {variant === 'single' ? getFullHourFromDate(date) : formatDate(date)}
        </Typography>
      </View>
      <View>
        {variant === 'single' ? (
          renderSingle()
        ) : (
          <View style={{ gap: 16, flexDirection: 'row' }}>
            <View style={{ gap: 8, alignSelf: 'flex-end' }}>
              <View>
                <Typography size="xs" style={{ opacity: 0 }}>
                  H.
                </Typography>
              </View>
              <View>
                <Typography size="xs">SpO2</Typography>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flex: 0.3 }}>
                <Typography color="gray" style={{ fontSize: 11 }}>
                  Min
                </Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm">{minSat}</Typography>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flex: 0.3 }}>
                <Typography color="gray" style={{ fontSize: 11 }}>
                  Max
                </Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm">{maxSat}</Typography>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flex: 0.3 }}>
                <Typography color="gray" style={{ fontSize: 11 }}>
                  Average
                </Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm" style={{ textAlign: 'center' }}>
                  {averageSat}
                </Typography>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
