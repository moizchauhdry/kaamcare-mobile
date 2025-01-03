import type { Diagnosis, NewDiagnosis } from '../../api/medicalHistory/Diagnosis';
import type { DiagnosisFormType } from '../../../schemas/forms/medicalHistory/diagnosis';
import type { DentalHistoryFormData } from '../../../schemas/forms/medicalHistory/dentalHistory';

export const parseDiagnosisHistoryApiToFormData = (data: Diagnosis): DiagnosisFormType => ({
  explanation: data.explanation ?? '',
  day: data.diagnosisDate?.day?.toString() ?? '',
  month: data.diagnosisDate?.month?.toString() ?? '',
  year: data.diagnosisDate?.year?.toString() ?? '',
  attachment: data.attachments,
});

export const parseDiagnosisHistoryFormToApiData = (data: DentalHistoryFormData, name: string): NewDiagnosis => ({
  diagnosisDate: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  explanation: data.explanation || null,
  name,
});
