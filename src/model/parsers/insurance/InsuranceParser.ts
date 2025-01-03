import type { InsuranceFormData } from '../../../schemas/forms/insurance';
import type { InsuranceCard, NewInsuranceCard } from '../../api/insurance/Insurance';

export const parseInsuranceFormToApi = (
  data: InsuranceFormData,
  category: 'Dental' | 'Vision' | 'Medical',
): NewInsuranceCard => ({
  frontPhotos: data.front,
  backPhotos: data.back,
  explanation: data.explanation ?? '',
  cardCategory: category,
});

export const parseInsuranceApiToForm = (data: InsuranceCard): InsuranceFormData => ({
  front: data.frontPhotos,
  back: data.backPhotos,
  explanation: data.explanation ?? '',
});
