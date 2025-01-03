import { View } from 'react-native';

import { Typography } from '../../../../../../../UI/Typography/Typography';

type BloodPressureSummaryLogsStagesInfoProps = {
  min?: {
    systolic: number;
    diastolic: number;
  };
  max?: {
    systolic: number;
    diastolic: number;
  };
};

export const BloodPressureSummaryLogsStagesInfo = ({ min, max }: BloodPressureSummaryLogsStagesInfoProps) => {
  const renderRange = (minVal: number, maxVal: number) => {
    if (minVal === 0) {
      return `< ${maxVal}`;
    }
    if (maxVal === Infinity) {
      return `> ${minVal}`;
    }

    return `${minVal} - ${maxVal}`;
  };

  return (
    <View style={{ alignItems: 'center', marginBottom: 8 }}>
      <View style={{ gap: 2, alignItems: 'center' }}>
        <View>
          <View style={{ flexDirection: 'row', gap: 2 }}>
            <Typography numberOfLines={1} size="sm" weight="semiBold">
              Systolic:
            </Typography>
            <Typography numberOfLines={1} size="sm" weight="semiBold">
              {renderRange(min?.systolic!, max?.systolic!)}
            </Typography>
            <Typography numberOfLines={1} size="sm" weight="semiBold">
              mmHg
            </Typography>
          </View>
          <View style={{ flexDirection: 'row', gap: 2 }}>
            <Typography numberOfLines={1} size="sm" weight="semiBold">
              Diastolic:
            </Typography>
            <Typography numberOfLines={1} size="sm" weight="semiBold">
              {renderRange(min?.diastolic!, max?.diastolic!)}
            </Typography>
            <Typography numberOfLines={1} size="sm" weight="semiBold">
              mmHg
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};
