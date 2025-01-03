import { View } from 'react-native';
import { useMemo } from 'react';

import type { SummaryData } from '../components/Summary/Summary';
import { Summary } from '../components/Summary/Summary';
import { determineSaturationStage, medicalLogsSummaryCalculationData } from '../../../../../utils/medicalLogs/summary';
import { saturationGraphStages } from '../../../../../constants/data/medicalLogs/saturation';
import { SaturationList } from './SaturationList';
import type { SaturationApiLog } from '../../../../../model/api/medicalLogs/Saturation';

type SaturationSummaryProps = {
  data: SaturationApiLog[];
  days?: number;
};

export const SaturationSummary = ({ data, days }: SaturationSummaryProps) => {
  const calculatedData = useMemo(() => medicalLogsSummaryCalculationData(data, ['spO2Value']), [data]);
  const graphCalculateData = useMemo(
    () => determineSaturationStage(calculatedData?.average, saturationGraphStages),
    [calculatedData],
  );
  const summaryData: SummaryData = useMemo(
    () => ({
      primary: [
        {
          label: 'SpO2 (%)',
          color: 'blue',
          average: calculatedData?.average.spO2Value,
          min: calculatedData?.min.spO2Value,
          max: calculatedData?.max.spO2Value,
        },
      ],
    }),
    [calculatedData],
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <View>
      <View style={{ gap: 16 }}>
        <Summary
          dataLength={data.length}
          data={summaryData}
          graphData={{
            data: saturationGraphStages,
            ...graphCalculateData,
          }}
        />
        <SaturationList data={data} days={days} />
      </View>
    </View>
  );
};
