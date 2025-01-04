import type { NewWeightLog, WeightApiLog } from '../../api/medicalLogs/Weight';
import type { WeightFormData } from '../../../schemas/forms/medicalLogs/weight';
import { getDateFromSeparatedModel, getSeparatedModelFromDate } from '../../../utils/date/date';

export const parseWeightApiToFormData = (values: WeightApiLog, unitType: 'Pound' | 'Kilogram'): WeightFormData => ({
  weight:
    unitType === 'Pound'
      ? values.currentPounds.toString()
      : (values.currentKilograms?.toString() ?? values.currentKilogram?.toString()),
  explanation: values.explanation ?? '',
  date: getDateFromSeparatedModel(values.date),
});

export const parseWeightFormToApiData = (values: WeightFormData, unitType: 'Pound' | 'Kilogram'): NewWeightLog => {
  const pounds = unitType === 'Pound' ? values.weight : (parseInt(values.weight, 10) * 2.20462).toFixed(2);
  const kilogram = unitType === 'Kilogram' ? values.weight : (parseInt(values.weight, 10) * 0.453592).toFixed(2);

  return {
    explanation: values.explanation || '',
    date: getSeparatedModelFromDate(values.date),
    currentPounds: pounds,
    currentKilograms: kilogram,
    unitType,
  };
};
