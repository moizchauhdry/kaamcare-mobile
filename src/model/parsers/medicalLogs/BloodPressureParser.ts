import type {
  BloodPressureLog,
  NewBloodPressureLog,
  VariablerBloodPressureLog,
} from '../../api/medicalLogs/BloodPressure';
import type { BloodPressureFormData } from '../../../schemas/forms/medicalLogs/bloodPressure';
import { getDateFromSeparatedModel, getSeparatedModelFromDate } from '../../../utils/date/date';

export const parseBloodPressureFormToApiData = (
  values: BloodPressureFormData,
  unitType: 'mmHg' | 'kPa',
): NewBloodPressureLog => ({
  diastolic: values.diastolic,
  systolic: values.systolic,
  pulse: parseFloat(values.pulse),
  side: values.measurementSide || null,
  position: values.measurementPosition || null,
  date: getSeparatedModelFromDate(values.date),
  explanation: values.explanation,
  unitType,
});

export const parseBloodPressureApiToFormData = (value: BloodPressureLog, unit = 'mmHg'): BloodPressureFormData => ({
  diastolic: unit === 'mmHg' ? value.millimetersOfMercuryDiastolic.toString() : value.kilopascalsDiastolic.toFixed(2),
  systolic: unit === 'mmHg' ? value.millimetersOfMercurySystolic.toString() : value.kilopascalsSystolic.toFixed(2),
  pulse: value.pulse.toString(),
  explanation: value.explanation,
  measurementPosition: value.position ?? '',
  measurementSide: value.side ?? '',
  date: getDateFromSeparatedModel(value.date),
});

export const parseBloodPressureToDisplayData = (value: VariablerBloodPressureLog): BloodPressureLog => {
  const CHANGE_NUMBER = 0.133322387415;
  const systolicMercury =
    value.unitType === 'mmHg' ? value.systolic : (parseInt(value.systolic, 10) / CHANGE_NUMBER).toFixed(0);
  const systolicKiloPascal =
    value.unitType === 'kPa' ? value.systolic : (parseInt(value.systolic, 10) * CHANGE_NUMBER).toFixed(2);
  const diastolicMercury =
    value.unitType === 'mmHg' ? value.diastolic : (parseInt(value.diastolic, 10) / CHANGE_NUMBER).toFixed(0);
  const diastolicKiloPascal =
    value.unitType === 'kPa' ? value.diastolic : (parseInt(value.diastolic, 10) * CHANGE_NUMBER).toFixed(2);

  return {
    id: value.id,
    position: value.position ?? '',
    side: value.side ?? '',
    date: value.date,
    explanation: value.explanation ?? '',
    unitType: value.unitType,
    pulse: value.pulse,

    kilopascalsSystolic: parseFloat(systolicKiloPascal),
    kilopascalsDiastolic: parseFloat(diastolicKiloPascal),
    millimetersOfMercurySystolic: parseInt(systolicMercury, 10),
    millimetersOfMercuryDiastolic: parseInt(diastolicMercury, 10),
  };
};
