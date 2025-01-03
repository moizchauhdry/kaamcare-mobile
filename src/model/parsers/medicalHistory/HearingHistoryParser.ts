import type { HearingHistory, NewHearingHistory } from '../../api/medicalHistory/HearingHistory';
import type { HearingHistoryFormData } from '../../../schemas/forms/medicalHistory/hearingHistory';

export const parseHearingHistoryApiToFormData = (data: HearingHistory): HearingHistoryFormData => ({
  explanation: data.explanation ?? '',
  day: data.diagnosisDate?.day?.toString() ?? '',
  month: data.diagnosisDate?.month?.toString() ?? '',
  year: data.diagnosisDate?.year?.toString() ?? '',
  location: Array.isArray(data.location) ? data.location[0] : data.location ?? '',
  attachment: data.attachments ?? [],
});

export const parseHearingHistoryFormToApiData = (data: HearingHistoryFormData, name: string): NewHearingHistory => ({
  diagnosisDate: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  explanation: data.explanation || null,
  location: data.location || null,
  name,
});
