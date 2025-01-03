import { View } from 'react-native';
import { useMemo } from 'react';

import type { SummaryData } from '../components/Summary/Summary';
import { Summary } from '../components/Summary/Summary';
import {
  determineBloodPressureStage,
  medicalLogsSummaryCalculationData,
} from '../../../../../utils/medicalLogs/summary';
import { bloodPressureModalData, graphStages } from '../../../../../constants/data/medicalLogs/bloodPressure';
import { BloodPressureList } from './BloodPressureList';
import { BloodPressureSummaryLogsStagesInfo } from '../components/Summary/components/SummaryLogsStagesInfo/BloodPressureSummaryLogsStagesInfo';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
import { useUnitsData } from '../../../../../context/UnitsContext';

type BloodPressureSummaryProps = {
  data: BloodPressureLogs;
  days?: number;
};

export const BloodPressureSummary = ({ data, days }: BloodPressureSummaryProps) => {
  const { pressure } = useUnitsData();
  const isMercury = useMemo(() => pressure === 'mmHg', [pressure]);
  const calculatedData = useMemo(
    () =>
      medicalLogsSummaryCalculationData(data, [
        'millimetersOfMercurySystolic',
        'millimetersOfMercuryDiastolic',
        'kilopascalsDiastolic',
        'kilopascalsSystolic',
        'pulse',
      ]),
    [data],
  );
  const systolicKey = isMercury ? 'millimetersOfMercurySystolic' : 'kilopascalsSystolic';
  const diastolicKey = isMercury ? 'millimetersOfMercuryDiastolic' : 'kilopascalsDiastolic';
  const graphCalculateData = useMemo(
    () => determineBloodPressureStage(calculatedData?.average, graphStages),
    [calculatedData],
  );
  const summaryData: SummaryData = useMemo(
    () => ({
      primary: [
        {
          label: `Systolic ${systolicKey === 'millimetersOfMercurySystolic' ? 'mmHg' : 'kPa'})`,
          color: 'blue',
          average: calculatedData?.average[systolicKey],
          min: calculatedData?.min[systolicKey],
          max: calculatedData?.max[systolicKey],
        },
        {
          label: `Diastolic ${diastolicKey === 'millimetersOfMercuryDiastolic' ? 'mmHg' : 'kPa'}`,
          color: 'lightBlue',
          average: calculatedData?.average[diastolicKey],
          min: calculatedData?.min[diastolicKey],
          max: calculatedData?.max[diastolicKey],
        },
      ],
      secondary: [
        {
          label: 'Pulse (bpm)',
          color: 'purple',
          average: calculatedData?.average.pulse,
          min: calculatedData?.min.pulse,
          max: calculatedData?.max.pulse,
        },
      ],
    }),
    [calculatedData, systolicKey, diastolicKey],
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
            data: graphStages,
            moreData: bloodPressureModalData,
            information: 'Not for medical purposes. Consult a qualified doctor as needed.',
            ...graphCalculateData,
            infoContentComponent: (
              <BloodPressureSummaryLogsStagesInfo min={graphCalculateData?.min} max={graphCalculateData?.max} />
            ),
          }}
        />
        <BloodPressureList data={data} days={days} />
      </View>
    </View>
  );
};
