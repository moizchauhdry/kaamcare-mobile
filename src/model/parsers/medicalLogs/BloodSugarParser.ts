import type { BloodSugarFormData } from '../../../schemas/forms/medicalLogs/bloodSugar';
import type { BloodSugarLog, NewBloodSugarLog } from '../../api/medicalLogs/BloodSugar';
import { getDateFromSeparatedModel, getSeparatedModelFromDate } from '../../../utils/date/date';

export const parseBloodSugarFormToApiData = (
  values: BloodSugarFormData,
  unitType: 'mgdL' | 'mmolL',
): NewBloodSugarLog => {
  const isMillimoles = unitType === 'mmolL';
  const bloodSugar = parseFloat(values.bloodSugar);

  return {
    date: getSeparatedModelFromDate(values.date),
    explanation: values.explanation,
    carbs: values.carbs || null,
    millimolesPerLitreValue: isMillimoles ? bloodSugar : parseFloat(parseToMillimoles(bloodSugar)),
    milligramsPerMillilitresValue: !isMillimoles ? bloodSugar : parseFloat(parseToMilligrams(bloodSugar)),
    bloodPressureUnitType: unitType,
    mealType: values.meal || undefined,
    mealTime: values.when || undefined,
    insulin: values.insulin?.map((elem) => ({ ...elem, dose: parseFloat(elem.dose) })),
  };
};

export const parseBloodSugarApiToFormData = (value: BloodSugarLog, unitType: 'mgdL' | 'mmolL'): BloodSugarFormData => ({
  explanation: value.explanation,
  date: getDateFromSeparatedModel(value.date),
  carbs: value.carbs ? value.carbs.toString() : '',
  bloodSugar:
    unitType === 'mmolL' ? value.millimolesPerLitreValue!.toString() : value.milligramsPerMillilitresValue!.toString(),
  meal: value.mealType || '',
  when: value.mealTime || '',
  insulin: value.insulin?.map((elem) => ({ ...elem, dose: elem.dose.toString() })),
});

export const parseToMillimoles = (value: number) => (parseFloat(value.toString()) / 18.0182).toFixed(2);

export const parseToMilligrams = (value: number) => (parseFloat(value.toString()) * 18.0182).toFixed(2);

export const parseBloodSugarToDisplay = (value: BloodSugarLog) => {
  const millimolesPerLitreValue = value.millimolesPerLitreValue
    ? value.millimolesPerLitreValue
    : parseToMillimoles(value.milligramsPerMillilitresValue!);
  const milligramsPerMillilitresValue = value.milligramsPerMillilitresValue
    ? value.milligramsPerMillilitresValue
    : parseToMilligrams(value.millimolesPerLitreValue!);

  return {
    ...value,
    milligramsPerMillilitresValue,
    millimolesPerLitreValue,
  };
};
