import type { SaturationLogs } from '../../model/api/medicalLogs/Saturation';
import type { BloodSugarLogs } from '../../model/api/medicalLogs/BloodSugar';
import type { BloodPressureLogs } from '../../model/api/medicalLogs/BloodPressure';
import type { WeightLogs } from '../../model/api/medicalLogs/Weight';
import type { HeightLogs } from '../../model/api/medicalLogs/Height';

export const getHomePageMedicalLogsData = (
  data: (SaturationLogs | BloodSugarLogs | BloodPressureLogs | WeightLogs | HeightLogs | undefined)[],
) =>
  [...data]
    .filter((log) => log && log.length > 0)
    .flatMap((elem) => {
      const sampleLog = elem?.[0];
      if (sampleLog === undefined) {
        return [];
      }

      if (
        'millimetersOfMercurySystolic' in sampleLog &&
        'millimetersOfMercuryDiastolic' in sampleLog &&
        'pulse' in sampleLog
      ) {
        return [
          { type: 'BloodPressure', logs: elem, chart: 'pressure', screen: 'BloodPressure', title: 'Blood pressure' },
          { type: 'BloodPressure', logs: elem, chart: 'pulse', screen: 'BloodPressure', title: 'Pulse' },
        ];
      }
      if ('milligramsPerMillilitresValue' in sampleLog && 'carbs' in sampleLog && 'insulin' in sampleLog) {
        return [
          { type: 'BloodSugar', logs: elem, chart: 'sugar', screen: 'BloodSugar', title: 'Blood sugar' },
          { type: 'BloodSugar', logs: elem, chart: 'insulin', screen: 'BloodSugar', title: 'Insulin' },
        ];
      }
      if ('spO2Value' in sampleLog) {
        return [{ type: 'Saturation', logs: elem, screen: 'Saturation', title: 'SpO2' }];
      }
      if ('currentPounds' in sampleLog) {
        return [{ type: 'Weight', logs: elem, screen: 'Weight', title: 'Weight' }];
      }
      if ('currentTotalInches' in sampleLog) {
        return [{ type: 'Height', logs: elem, screen: 'Height', title: 'Height' }];
      }
      return [];
    });
