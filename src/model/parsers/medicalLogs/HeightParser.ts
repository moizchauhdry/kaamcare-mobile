import type { HeightLog, NewHeightLog } from '../../api/medicalLogs/Height';
import type { HeightFormData } from '../../../schemas/forms/medicalLogs/height';
import { getDateFromSeparatedModel, getSeparatedModelFromDate } from '../../../utils/date/date';

export const parseHeightApiToFormData = (values: HeightLog): HeightFormData => ({
  heightFeet: values.currentFeet.toString() ?? '',
  heightInch: values.currentInch.toString() ?? '',
  heightCm: values.currentCentimeters.toString() ?? '',
  explanation: values.explanation ?? '',
  date: getDateFromSeparatedModel(values.date),
});

export const parseHeightFormToApiData = (
  values: HeightFormData,
  unitType: 'FeetInch' | 'Centimeter' = 'FeetInch',
): NewHeightLog => {
  const isFeetInch = unitType === 'FeetInch';
  const totalInches = isFeetInch
    ? parseInt(values.heightFeet!, 10) * 12 + parseInt(values.heightInch!, 10)
    : parseInt(values.heightCm!, 10) / 2.54;
  const feet = isFeetInch && values.heightFeet ? values.heightFeet : Math.floor(totalInches / 12);
  const inch =
    isFeetInch && values.heightInch ? values.heightInch : (typeof feet === 'string' ? parseInt(feet, 10) : feet) * 12;
  const centimeters = unitType === 'FeetInch' ? (totalInches * 2.54).toFixed(2) : values.heightCm;

  return {
    explanation: values.explanation || '',
    date: getSeparatedModelFromDate(values.date),
    currentInch: typeof inch === 'string' ? inch : Math.floor(inch).toString(),
    currentFeet: typeof feet === 'string' ? feet : Math.floor(feet).toString(),
    currentCentimeters: values.heightCm || (centimeters ?? ''),
    currentTotalInches: totalInches,
    unitType,
  };
};
