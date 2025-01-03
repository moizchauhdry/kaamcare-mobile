import { View } from 'react-native';

import { Typography } from '../../../../UI/Typography/Typography';
import type { SaturationApiLog } from '../../../../../model/api/medicalLogs/Saturation';
import { formatDate, getDateFromSeparatedModel } from '../../../../../utils/date/date';

type SaturationCardProps = SaturationApiLog & {
  saturationStage?: string;
};

export const SaturationCard = ({ date, spO2Value, saturationStage }: SaturationCardProps) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <Typography weight="bolder" color="secondary" style={{ fontSize: 22 }}>
          {spO2Value}
        </Typography>
        <Typography weight="semiBold" size="sm">
          %
        </Typography>
      </View>
    </View>
    <View style={{ gap: 4 }}>
      {saturationStage ? (
        <Typography size="sm" weight="semiBold" style={{ textAlign: 'right' }}>
          {saturationStage}
        </Typography>
      ) : null}
      {date ? (
        <Typography color="gray" size="sm" style={{ textAlign: 'right' }}>
          {formatDate(getDateFromSeparatedModel(date), 'datetime')}
        </Typography>
      ) : null}
    </View>
  </View>
);
