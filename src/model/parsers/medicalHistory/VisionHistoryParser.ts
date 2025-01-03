import type { NewVisionHistoryModel, VisionHistoryModel } from '../../api/medicalHistory/VisionHistory';
import type { VisionHistoryFormData } from '../../../schemas/forms/medicalHistory/visionHistory';

export const parseVisionHistoryApiToFormData = (data: VisionHistoryModel): VisionHistoryFormData => ({
  explanation: data.explanation ?? '',
  day: data.diagnosisDate?.day?.toString() ?? '',
  month: data.diagnosisDate?.month?.toString() ?? '',
  year: data.diagnosisDate?.year?.toString() ?? '',
  attachment: data.attachments ?? [],
  location: (Array.isArray(data.location) ? data.location?.[0] : data.location) ?? '',
  supportingToggle: data.extraInformation === 'true',
  area: data.area ?? [],
  toggle: data.extraInformation === 'true',
  dueTo: data.dueTo ?? [],
});

export const parseVisionHistoryFormToApiData = (data: VisionHistoryFormData, name: string): NewVisionHistoryModel => ({
  diagnosisDate: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  explanation: data.explanation || null,
  location: data.location || null,
  extraInformation: (data.supportingToggle?.toString() || data.toggle?.toString()) ?? null,
  area: data.area && data.area?.length > 0 ? data.area : null,
  dueTo: data.dueTo && data.dueTo?.length > 0 ? data.dueTo : null,
  name,
});
