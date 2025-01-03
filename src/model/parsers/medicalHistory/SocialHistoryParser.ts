import type { SocialHistorySmokingFormData } from '../../../schemas/forms/medicalHistory/socialHistory/smoking';
import type { SocialHistoryAlcoholFormData } from '../../../schemas/forms/medicalHistory/socialHistory/alcohol';
import type { SocialHistoryOccupationFormData } from '../../../schemas/forms/medicalHistory/socialHistory/occupation';
import type { SocialHistoryDrugUseFormData } from '../../../schemas/forms/medicalHistory/socialHistory/drugUse';
import type { NewSocialHistory, SocialHistory } from '../../api/medicalHistory/SocialHistory';

export const parseSocialHistorySmokingApiToFormData = (data: SocialHistory): SocialHistorySmokingFormData => ({
  type: data.type,
  status: data.status ?? '',
  duration: data.dateLength ?? '',
  frequency: data.frequency ?? '',
  explanation: data.explanation ?? '',
});

export const parseSocialHistorySmokingFormToApiData = (data: SocialHistorySmokingFormData): NewSocialHistory => ({
  type: data.type,
  status: data.status || null,
  dateLength: data.duration || null,
  frequency: data.frequency || null,
  explanation: data.explanation || null,
});

export const parseSocialHistoryAlcoholApiToFormData = (data: SocialHistory): SocialHistoryAlcoholFormData => ({
  type: data.type,
  status: data.status ?? '',
  duration: data.dateLength ?? '',
  frequency: data.frequency ?? '',
  explanation: data.explanation ?? '',
  quantity: data.quantity ?? '',
});

export const parseSocialHistoryAlcoholFormToApiData = (data: SocialHistoryAlcoholFormData): NewSocialHistory => ({
  type: data.type,
  status: data.status || null,
  dateLength: data.duration,
  frequency: data.frequency,
  explanation: data.explanation,
  quantity: data.quantity,
});

export const parseSocialHistoryOccupationFormToApiData = (data: SocialHistoryOccupationFormData): NewSocialHistory => ({
  type: data.type,
  status: data.status || null,
  dateLength: data.duration,
  explanation: data.explanation,
});

export const parseSocialHistoryOccupationApiToFormData = (data: SocialHistory): SocialHistoryOccupationFormData => ({
  type: data.type,
  status: data.status ?? '',
  duration: data.dateLength ?? '',
  explanation: data.explanation ?? '',
});

export const parseSocialHistoryDrugUseApiToFormData = (data: SocialHistory): SocialHistoryDrugUseFormData => ({
  type: data.type,
  status: data.status ?? '',
  duration: data.dateLength ?? '',
  frequency: data.frequency ?? '',
  explanation: data.explanation ?? '',
});

export const parseSocialHistoryDrugUseFormToApiData = (data: SocialHistoryDrugUseFormData): NewSocialHistory => ({
  type: data.type,
  route: data.route,
  status: data.status || null,
  dateLength: data.duration,
  frequency: data.frequency,
  explanation: data.explanation,
});
