import type { MedicalDevice, NewMedicalDevice } from '../../api/medicalHistory/MedicalDevices';
import type { MedicalDeviceFormData } from '../../../schemas/forms/medicalHistory/medicalDevice';

export const parseMedicalDeviceApiToFormData = (data: MedicalDevice): MedicalDeviceFormData => ({
  explanation: data.explanation ?? '',
  day: data.diagnosisDate?.day?.toString() ?? '',
  month: data.diagnosisDate?.month?.toString() ?? '',
  year: data.diagnosisDate?.year?.toString() ?? '',
  attachment: data.attachments ?? [],
});

export const parseMedicalDeviceFormToApiData = (data: MedicalDeviceFormData, name: string): NewMedicalDevice => ({
  diagnosisDate: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  explanation: data.explanation || null,
  name,
});
