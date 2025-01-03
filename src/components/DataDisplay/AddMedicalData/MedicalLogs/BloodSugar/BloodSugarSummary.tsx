import { View } from 'react-native';
import { useMemo } from 'react';

import type { SummaryData } from '../components/Summary/Summary';
import { Summary } from '../components/Summary/Summary';
import { BloodSugarList } from './BloodSugarList';
import { bloodSugarGraphStages } from '../../../../../constants/data/medicalLogs/bloodSugar';
import { calculateBloodSugarSummaryStats, determineBloodSugarStage } from '../../../../../utils/medicalLogs/bloodSugar';
import type { BloodSugarLogs } from '../../../../../model/api/medicalLogs/BloodSugar';
import { useUnitsData } from '../../../../../context/UnitsContext';

type BloodSugarSummaryProps = {
  data: BloodSugarLogs;
  days?: number;
};

export const BloodSugarSummary = ({ data, days }: BloodSugarSummaryProps) => {
  const { sugar } = useUnitsData();
  const calculatedData = useMemo(() => calculateBloodSugarSummaryStats(data, sugar), [data, sugar]);
  const graphCalculateData = useMemo(
    () =>
      determineBloodSugarStage(
        { bloodSugar: calculatedData.bloodSugarStats.average },
        bloodSugarGraphStages,
        sugar === 'mmolL' ? 'bloodSugarmmolL' : 'bloodSugarmgdL',
      ),
    [calculatedData, sugar],
  );
  const summaryData: SummaryData = useMemo(
    () => ({
      primary: [
        {
          label: `Blood sugar (${sugar === 'mmolL' ? 'mmol/L' : 'mg/dL'})`,
          color: 'blue',
          average: calculatedData.bloodSugarStats.average,
          min: calculatedData.bloodSugarStats.min,
          max: calculatedData.bloodSugarStats.max,
        },
        {
          label: 'Carbs (g)',
          color: 'lightBlue',
          average: calculatedData?.carbsStats.average,
          min: calculatedData?.carbsStats.min,
          max: calculatedData?.carbsStats.max,
        },
      ],
      secondary: [
        {
          label: 'Rapid (u)',
          color: 'purple',
          total: calculatedData?.insulinStats.rapid.total,
          average: calculatedData.insulinStats.rapid.average,
        },
        {
          label: 'Intermediate (u)',
          color: 'green',
          total: calculatedData?.insulinStats.intermediate.total,
          average: calculatedData.insulinStats.intermediate.average,
        },
        {
          label: 'Long (u)',
          color: 'pink',
          total: calculatedData?.insulinStats.long.total,
          average: calculatedData.insulinStats.long.average,
        },
      ],
    }),
    [calculatedData, sugar],
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
            data: bloodSugarGraphStages,
            information:
              'Glycemic Range For Non-Diabetic (Fasting). Not for medical purposes. Consult a qualified doctor as needed.',
            ...graphCalculateData,
          }}
        />
        <BloodSugarList data={data} days={days} />
      </View>
    </View>
  );
};
