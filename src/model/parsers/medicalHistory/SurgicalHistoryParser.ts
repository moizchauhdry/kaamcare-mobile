import type { SurgicalHistoryFormData } from '../../../schemas/forms/medicalHistory/surgicalHistory';
import type { NewSurgicalHistory, SurgicalHistory } from '../../api/medicalHistory/SurgicalHistory';

export const parseSurgicalHistoryApiToFormData = (data: SurgicalHistory): SurgicalHistoryFormData => ({
  explanation: data.explanation ?? '',
  day: data.diagnosisDate?.day?.toString() ?? '',
  month: data.diagnosisDate?.month?.toString() ?? '',
  year: data.diagnosisDate?.year?.toString() ?? '',
  attachment: data.attachments ?? [],
});

export const parseSurgicalHistoryFormToApiData = (data: SurgicalHistoryFormData, name: string): NewSurgicalHistory => ({
  diagnosisDate: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  explanation: data.explanation || null,
  name,
});
