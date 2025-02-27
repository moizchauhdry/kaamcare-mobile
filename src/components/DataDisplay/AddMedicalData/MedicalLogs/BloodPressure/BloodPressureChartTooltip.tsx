import { View } from 'react-native';

import { theme } from '../../../../../config/Theme';
import { Typography } from '../../../../UI/Typography/Typography';
import { formatDate, getFullHourFromDate } from '../../../../../utils/date/date';

type BloodPressureChartTooltipProps = {
  date: Date;
  type: 'pressure' | 'pulse';
  minSys?: number;
  maxSys?: number;
  minDias?: number;
  maxDias?: number;
  averageSys?: number;
  averageDias?: number;
  pulse?: number;
  color?: string;
  variant?: 'single' | 'multiple';
  stage?: string;
};

export const BloodPressureChartTooltip = ({
  date,
  minSys,
  maxSys,
  maxDias,
  minDias,
  averageDias,
  averageSys,
  color,
  pulse,
  type,
  variant = 'multiple',
  stage,
}: BloodPressureChartTooltipProps) => {
  const ColorLabelComponent = <View style={{ width: 10, height: 10, backgroundColor: color, borderRadius: 6 }} />;
  const renderSingle = () => (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Typography size="sm" color="gray">
          Sys.
        </Typography>
        {ColorLabelComponent}
        <Typography size="sm">{minSys}</Typography>
      </View>
      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Typography size="sm" color="gray">
          Dias.
        </Typography>
        {ColorLabelComponent}
        <Typography size="sm">{minDias}</Typography>
      </View>
    </View>
  );

  const renderPulse = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Typography size="xs" color="gray">
        Pulse
      </Typography>
      {ColorLabelComponent}
      <Typography size="xs">{pulse}</Typography>
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
        <Typography size="sm" style={{ textAlign: 'center' }}>
          {stage}
        </Typography>
      </View>
      <View>
        {type === 'pulse' ? (
          renderPulse()
        ) : variant === 'single' ? (
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
                <Typography size="xs">Sys.</Typography>
              </View>
              <View>
                <Typography size="xs">Dias.</Typography>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flex: 0.3 }}>
                <Typography color="gray" style={{ fontSize: 11 }}>
                  Min
                </Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm">{minSys}</Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm">{minDias}</Typography>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flex: 0.3 }}>
                <Typography color="gray" style={{ fontSize: 11 }}>
                  Max
                </Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm">{maxSys}</Typography>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                {ColorLabelComponent}
                <Typography size="sm">{maxDias}</Typography>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flex: 0.3 }}>
                <Typography color="gray" style={{ fontSize: 11 }}>
                  Average
                </Typography>
              </View>
              <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <Typography size="sm" style={{ textAlign: 'center' }}>
                  {averageSys}
                </Typography>
              </View>
              <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <Typography size="sm" style={{ textAlign: 'center' }}>
                  {averageDias}
                </Typography>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
