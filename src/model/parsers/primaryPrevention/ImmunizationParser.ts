import type { VaccineCardFormData, VaccineFormData } from '../../../schemas/forms/primaryPrevention/immunization';
import type { NewVaccine, NewVaccineCard, Vaccine, VaccineCard } from '../../api/primaryPrevention/Immunization';

export const parseVaccineFormToApiData = (
  data: VaccineFormData,
  name: string,
  illness: string,
  isCommonName?: boolean,
): NewVaccine => ({
  lotNumber: data.lot || null,
  brandName: data.brand || null,
  date: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  illness,
  explanation: data.explanation || null,
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  dose: data.dose ? parseInt(data.dose, 10) : null,
  vaccineFacility: data.facility || null,
  vaccineName: name,
  isCommonName: Boolean(isCommonName),
});

export const parseVaccineApiToFormData = (data: Vaccine): VaccineFormData => ({
  lot: data.lotNumber || '',
  brand: data.brandName || '',
  dose: data.dose ? data.dose.toString() : '',
  facility: data.vaccineFacility || '',
  day: data.diagnosisDate?.day?.toString() ?? data.date?.day?.toString() ?? '',
  month: data.diagnosisDate?.month?.toString() ?? data.date?.month?.toString() ?? '',
  year: data.diagnosisDate?.year?.toString() ?? data?.date?.year?.toString() ?? '',
  explanation: data.explanation || '',
  attachment: data.attachments,
});

export const parseVaccineCardFormToApiData = (data: VaccineCardFormData): NewVaccineCard => ({
  explanation: data.explanation || null,
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  title: data.title,
});

export const parseVaccineCardApiToFormData = (data: VaccineCard): VaccineCardFormData => ({
  explanation: data.explanation || '',
  attachment: data.attachments,
  title: data.title || '',
});
