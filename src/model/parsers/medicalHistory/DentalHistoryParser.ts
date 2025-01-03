import type { DentalHistory, DentalHistoryType, NewDentalHistory } from '../../api/medicalHistory/DentalHistory';
import type { DentalHistoryFormData } from '../../../schemas/forms/medicalHistory/dentalHistory';

export const parseDentalHistoryApiToFormData = (data: DentalHistory): DentalHistoryFormData => ({
  explanation: data.explanation ?? '',
  day: data.date?.day?.toString() ?? '',
  month: data.date?.month?.toString() ?? '',
  year: data.date?.year?.toString() ?? '',
  attachment: data.attachments,
});

export const parseDentalHistoryFormToApiData = (
  data: DentalHistoryFormData,
  name: string,
  type: DentalHistoryType,
): NewDentalHistory => ({
  date: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  explanation: data.explanation || null,
  name,
  type,
});
