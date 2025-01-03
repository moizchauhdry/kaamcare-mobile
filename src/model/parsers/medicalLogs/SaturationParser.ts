import type { NewSaturationLog, SaturationApiLog } from '../../api/medicalLogs/Saturation';
import type { SaturationFormData } from '../../../schemas/forms/medicalLogs/saturation';
import { getDateFromSeparatedModel, getSeparatedModelFromDate } from '../../../utils/date/date';

export const parseSaturationFormToApiData = (values: SaturationFormData): NewSaturationLog => ({
  spO2Value: values.spo2,
  date: getSeparatedModelFromDate(values.date),
  explanation: values.explanation,
});

export const parseSaturationApiToFormData = (value: SaturationApiLog): SaturationFormData => ({
  explanation: value.explanation ?? '',
  spo2: value.spO2Value.toString() ?? '',
  date: getDateFromSeparatedModel(value.date),
});
