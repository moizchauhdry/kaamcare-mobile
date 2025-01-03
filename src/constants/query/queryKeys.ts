import type { QueryKey } from '@tanstack/react-query/build/modern';

export type MutationKeys = {
  list: QueryKey;
  add: QueryKey;
  mutation: QueryKey;
  single: QueryKey;
  delete: QueryKey;
};

export const QUERY_KEYS = {
  USER_ACCOUNT_DELETE: 'user-account-delete',

  PROFILE_INFORMATION_GET: 'profile-information-get',
  PROFILE_INFORMATION_PUT: 'profile-information-put',
  PROFILE_INFORMATION_EMAIL_PUT: 'profile-information-email-put',
  PROFILE_ADDRESS_INFORMATION_GET: 'profile-address-information-get',
  PROFILE_ADDRESS_INFORMATION_UPDATE: 'profile-address-information-update',
  PROFILE_ADDRESS_INFORMATION_ADD: 'profile-address-information-add',
  PROFILE_PHARMACY: 'profile-pharmacy-get',
  PROFILE_PHARMACY_UPDATE: 'profile-pharmacy-update',
  PROFILE_PHARMACY_ADD: 'profile-pharmacy-add',
  PROFILE_EMERGENCY_CONTACT_GET: 'profile-emergency-contact-get',
  PROFILE_EMERGENCY_CONTACT_POST: 'profile-emergency-contact-post',
  PROFILE_EMERGENCY_CONTACT_PUT: 'profile-emergency-contact-put',
  PROFILE_CAREGIVER_GET: 'profile-caregiver-get',
  PROFILE_CAREGIVER_PUT: 'profile-caregiver-put',
  PROFILE_CAREGIVER_ADD: 'profile-caregiver-add',
  PROFILE_HEALTHCARE_PROVIDER_GET: 'profile-healthcare-provider-get',
  PROFILE_HEALTHCARE_PROVIDER_UPDATE: 'profile-healthcare-provider-update',
  PROFILE_HEALTHCARE_PROVIDER_ADD: 'profile-healthcare-provider-add',
  PROFILE_HEALTHCARE_PROVIDER_DELETE: 'profile-healthcare-provider-delete',
  PROFILE_HEALTHCARE_PROVIDER_LIST: 'profile-healthcare-provider-list',

  CUSTOM_SPECIALIZATION_GET: 'custom-specialization-get',
  CUSTOM_SPECIALIZATION_POST: 'custom-specialization-post',
  SPECIALIZATION_KINDS_GET: 'get-specialization-kinds',
  CUSTOM_RELATIONSHIP_GET: 'custom-relationship-get',
  CUSTOM_RELATIONSHIP_POST: 'custom-relationship-post',

  MEDICAL_HISTORY_ALLERGIES_GET: 'medical-history-allergies-get',
  MEDICAL_HISTORY_CUSTOM_ALLERGIES_GET: 'medical-history-custom-allergies-get',
  MEDICAL_HISTORY_COMMON_ALLERGIES_GET: 'medical-history-common-allergies-get',
  MEDICAL_HISTORY_ALLERGY_GET: 'medical-history-allergies-get',
  MEDICAL_HISTORY_ALLERGY_UPDATE: 'medical-history-allergies-update',
  MEDICAL_HISTORY_ALLERGY_DELETE: 'medical-history-allergies-delete',
  MEDICAL_HISTORY_ALLERGY_ADD: 'medical-history-allergies-add',
  MEDICAL_HISTORY_CUSTOM_ALLERGIES_ADD: 'medical-history-custom-allergies-add',
  MEDICAL_HISTORY_MEDICATIONS_GET: 'medical-history-medications-get',
  MEDICAL_HISTORY_MEDICATION_GET: 'medical-history-medication-get',
  MEDICAL_HISTORY_MEDICATION_UPDATE: 'medical-history-medications-update',
  MEDICAL_HISTORY_MEDICATION_DELETE: 'medical-history-medications-delete',
  MEDICAL_HISTORY_MEDICATION_ADD: 'medical-history-medication-add',
  MEDICAL_HISTORY_CUSTOM_MEDICATION_ADD: 'medical-history-custom-medication-add',
  MEDICAL_HISTORY_CUSTOM_MEDICATIONS_GET: 'medical-history-custom-medications-get',

  MEDICAL_HISTORY_SOCIAL_HISTORY_ADD: 'medical-history-social-history-add',
  MEDICAL_HISTORY_SOCIAL_HISTORY_LIST_GET: 'medical-history-social-history-list-get',
  MEDICAL_HISTORY_SOCIAL_HISTORY_GET: 'medical-history-social-history-get',
  MEDICAL_HISTORY_SOCIAL_HISTORY_UPDATE: 'medical-history-social-history-update',
  MEDICAL_HISTORY_SOCIAL_HISTORY_DELETE: 'medical-history-social-history-delete',

  MEDICAL_HISTORY_MEDICAL_DEVICES_GET: 'medical-history-medical-devices-get',
  MEDICAL_HISTORY_MEDICAL_DEVICE_GET: 'medical-history-medical-device-get',
  MEDICAL_HISTORY_MEDICAL_DEVICE_ADD: 'medical-history-medical-device-add',
  MEDICAL_HISTORY_MEDICAL_DEVICE_UPDATE: 'medical-history-medical-device-update',
  MEDICAL_HISTORY_MEDICAL_DEVICE_DELETE: 'medical-history-medical-device-delete',
  MEDICAL_HISTORY_DENTAL_HISTORY_ADD: 'medical-history-dental-history-add',
  MEDICAL_HISTORY_DENTAL_HISTORY_LIST_GET: 'medical-history-dental-history-list-get',
  MEDICAL_HISTORY_DENTAL_HISTORY_GET: 'medical-history-dental-history-get',
  MEDICAL_HISTORY_DENTAL_HISTORY_UPDATE: 'medical-history-dental-history-update',
  MEDICAL_HISTORY_DENTAL_HISTORY_DELETE: 'medical-history-dental-history-delete',
  MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_ADD: 'medical-history-vision-history-vision-diagnosis-add',
  MEDICAL_HISTORY_VISION_HISTORY_ALL_LIST_GET: 'medical-history-vision-history-all-list-get',
  MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_GET: 'medical-history-vision-history-vision-diagnosis-get',
  MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_UPDATE: 'medical-history-vision-history-vision-diagnosis-update',
  MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_DELETE: 'medical-history-vision-history-vision-diagnosis-delete',
  MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_ADD: 'medical-history-vision-history-eyewear-add',
  MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_GET: 'medical-history-vision-history-eyewear-get',
  MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_UPDATE: 'medical-history-vision-history-eyewear-update',
  MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_DELETE: 'medical-history-vision-history-eyewear-delete',
  MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET: 'medical-history-surgical-history-list-get',
  MEDICAL_HISTORY_SURGICAL_HISTORY_GET: 'medical-history-surgical-history-get',
  MEDICAL_HISTORY_SURGICAL_HISTORY_UPDATE: 'medical-history-surgical-history-update',
  MEDICAL_HISTORY_SURGICAL_HISTORY_DELETE: 'medical-history-surgical-history-delete',
  MEDICAL_HISTORY_SURGICAL_HISTORY_ADD: 'medical-history-surgical-history-add',
  MEDICAL_HISTORY_HEARING_HISTORY_ALL_LIST_GET: 'medical-history-hearing-history-all-list-get',
  MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_ADD: 'medical-history-hearing-history-diagnosis-add',
  MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_LIST_GET: 'medical-history-hearing-history-diagnosis-list-get',
  MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_GET: 'medical-history-hearing-history-diagnosis-get',
  MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_UPDATE: 'medical-history-hearing-history-diagnosis-update',
  MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_DELETE: 'medical-history-hearing-history-diagnosis-delete',
  MEDICAL_HISTORY_HEARING_HISTORY_AIDS_ADD: 'medical-history-hearing-history-aids-add',
  MEDICAL_HISTORY_HEARING_HISTORY_AIDS_LIST_GET: 'medical-history-hearing-history-aids-list-get',
  MEDICAL_HISTORY_HEARING_HISTORY_AIDS_GET: 'medical-history-hearing-history-aids-get',
  MEDICAL_HISTORY_HEARING_HISTORY_AIDS_UPDATE: 'medical-history-hearing-history-aids-update',
  MEDICAL_HISTORY_HEARING_HISTORY_AIDS_DELETE: 'medical-history-hearing-history-aids-delete',
  MEDICAL_HISTORY_HEARING_HISTORY_TESTS_ADD: 'medical-history-hearing-history-tests-add',
  MEDICAL_HISTORY_HEARING_HISTORY_TESTS_LIST_GET: 'medical-history-hearing-history-tests-list-get',
  MEDICAL_HISTORY_HEARING_HISTORY_TESTS_GET: 'medical-history-hearing-history-tests-get',
  MEDICAL_HISTORY_HEARING_HISTORY_TESTS_UPDATE: 'medical-history-hearing-history-tests-update',
  MEDICAL_HISTORY_HEARING_HISTORY_TESTS_DELETE: 'medical-history-hearing-history-tests-delete',

  MEDICAL_HISTORY_DIAGNOSIS_GET: 'medical-history-diagnosis-get',
  MEDICAL_HISTORY_DIAGNOSIS_ADD: 'medical-history-diagnosis-add',
  MEDICAL_HISTORY_DIAGNOSIS_UPDATE: 'medical-history-diagnosis-update',
  MEDICAL_HISTORY_DIAGNOSIS_LIST_GET: 'medical-history-diagnosis-list_get',
  MEDICAL_HISTORY_DIAGNOSIS_DELETE: 'medical-history-diagnosis-delete',

  MEDICAL_HISTORY_FAMILY_MEMBER_LIST: 'medical-history-family-member-list-get',
  MEDICAL_HISTORY_FAMILY_MEMBER_GET: 'medical-history-family-member-get',
  MEDICAL_HISTORY_FAMILY_MEMBER_DELETE: 'medical-history-family-member-delete',
  MEDICAL_HISTORY_FAMILY_MEMBER_ADD: 'medical-history-family-member-add',
  MEDICAL_HISTORY_FAMILY_MEMBER_UPDATE: 'medical-history-family-member-update',

  MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET: 'medical-history-family-history-diagnosis-list-get',
  MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_ADD: 'medical-history-family-member-diagnosis-add',
  MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_UPDATE: 'medical-history-family-member-diagnosis-update',
  MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_DELETE: 'medical-history-family-member-diagnosis-delete',

  MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_GET: 'medical-logs-blood-pressure-logs-list-get',
  MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_ALL_GET: 'medical-logs-blood-pressure-logs-list-all-get',
  MEDICAL_LOGS_BLOOD_PRESSURE_LOG_SINGLE_GET: 'medical-logs-blood-pressure-log-single-get',
  MEDICAL_LOGS_BLOOD_PRESSURE_LOG_ADD: 'medical-logs-blood-pressure-log-add',
  MEDICAL_LOGS_BLOOD_PRESSURE_LOG_UPDATE: 'medical-logs-blood-pressure-log-update',
  MEDICAL_LOGS_BLOOD_PRESSURE_LOG_DELETE: 'medical-logs-blood-pressure-log-delete',

  MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_GET: 'medical-logs-blood-sugar-logs-list-get',
  MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_ALL_GET: 'medical-logs-blood-sugar-logs-list-all-get',
  MEDICAL_LOGS_BLOOD_SUGAR_LOG_SINGLE_GET: 'medical-logs-blood-sugar-log-single-get',
  MEDICAL_LOGS_BLOOD_SUGAR_LOG_ADD: 'medical-logs-blood-sugar-log-add',
  MEDICAL_LOGS_BLOOD_SUGAR_LOG_UPDATE: 'medical-logs-blood-sugar-log-update',
  MEDICAL_LOGS_BLOOD_SUGAR_LOG_DELETE: 'medical-logs-blood-sugar-log-delete',

  ATTACHMENT_GET: 'attachment-get',
  ATTACHMENT_DELETE: 'attachment_delete',

  MEDICAL_LOGS_WEIGHT_LIST_GET: 'medical-logs-weight-logs-list-get',
  MEDICAL_LOGS_WEIGHT_LIST_ALL_GET: 'medical-logs-weight-logs-list-all-get',
  MEDICAL_LOGS_WEIGHT_GET: 'medical-logs-weight-get',
  MEDICAL_LOGS_WEIGHT_ADD: 'medical-logs-weight-add',
  MEDICAL_LOGS_WEIGHT_UPDATE: 'medical-logs-weight-update',
  MEDICAL_LOGS_WEIGHT_DELETE: 'medical-logs-weight-delete',

  MEDICAL_LOGS_HEIGHT_LIST_GET: 'medical-logs-height-logs-list-get',
  MEDICAL_LOGS_HEIGHT_LIST_ALL_GET: 'medical-logs-height-logs-list-all-get',
  MEDICAL_LOGS_HEIGHT_GET: 'medical-logs-height-get',
  MEDICAL_LOGS_HEIGHT_ADD: 'medical-logs-height-add',
  MEDICAL_LOGS_HEIGHT_UPDATE: 'medical-logs-height-update',
  MEDICAL_LOGS_HEIGHT_DELETE: 'medical-logs-height-delete',

  MEDICAL_LOGS_SATURATION_LOGS_LIST_GET: 'medical-logs-saturation-logs-list-get',
  MEDICAL_LOGS_SATURATION_LOGS_LIST_ALL_GET: 'medical-logs-saturation-logs-list-all-get',
  MEDICAL_LOGS_SATURATION_LOG_SINGLE_GET: 'medical-logs-saturation-log-single-get',
  MEDICAL_LOGS_SATURATION_LOG_ADD: 'medical-logs-saturation-log-add',
  MEDICAL_LOGS_SATURATION_LOG_UPDATE: 'medical-logs-saturation-log-update',
  MEDICAL_LOGS_SATURATION_LOG_DELETE: 'medical-logs-saturation-log-delete',

  PRIMARY_PREVENTION_VACCINES_LIST_GET: 'primary-prevention-vaccines-list-get',
  PRIMARY_PREVENTION_VACCINE_GET: 'primary-prevention-vaccine-get',
  PRIMARY_PREVENTION_VACCINE_ADD: 'primary-prevention-vaccine-add',
  PRIMARY_PREVENTION_VACCINE_UPDATE: 'primary-prevention-vaccine-update',
  PRIMARY_PREVENTION_VACCINE_DELETE: 'primary-prevention-vaccine-delete',

  PRIMARY_PREVENTION_VACCINES_CARD_LIST_GET: 'primary-prevention-vaccines-card-list-get',
  PRIMARY_PREVENTION_VACCINE_CARD_GET: 'primary-prevention-vaccine-card-get',
  PRIMARY_PREVENTION_VACCINE_CARD_ADD: 'primary-prevention-vaccine-card-add',
  PRIMARY_PREVENTION_VACCINE_CARD_UPDATE: 'primary-prevention-vaccine-card-update',
  PRIMARY_PREVENTION_VACCINE_CARD_DELETE: 'primary-prevention-vaccine-card-delete',

  PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET: 'primary-prevention-screening-exams-list-get',
  PRIMARY_PREVENTION_SCREENING_EXAM_GET: 'primary-prevention-screening-exam-get',
  PRIMARY_PREVENTION_SCREENING_EXAM_ATTACHMENT_GET: 'primary-prevention-screening-exam-attachment-get',
  PRIMARY_PREVENTION_SCREENING_EXAM_ADD: 'primary-prevention-screening-exam-add',
  PRIMARY_PREVENTION_SCREENING_EXAM_UPDATE: 'primary-prevention-screening-exam-update',
  PRIMARY_PREVENTION_SCREENING_EXAM_DELETE: 'primary-prevention-screening-exam-delete',

  GOALS_OF_CARE_ADL_GET: 'goals-of-care-adl-get',
  GOALS_OF_CARE_ADL_POST: 'goals-of-care-adl-post',
  GOALS_OF_CARE_ADL_PUT: 'goals-of-care-adl-put',
  GOALS_OF_CARE_ACP_GET: 'goals-of-care-acp-get',
  GOALS_OF_CARE_ACP_POST: 'goals-of-care-acp-post',
  GOALS_OF_CARE_ACP_PUT: 'goals-of-care-acp-put',

  INSURANCE_CARDS_GET: 'insurance-cards-get',
  INSURANCE_CARDS_POST: 'insurance-cards-post',
  INSURANCE_CARDS_DELETE: 'insurance-cards-delete',

  DASHBOARD_BLOOD_PRESSURE: 'dashboard-blood-pressure',
  DASHBOARD_BLOOD_SUGAR: 'dashboard-blood-sugar',
  DASHBOARD_WEIGHT: 'dashboard-weight',
  DASHBOARD_HEIGHT: 'dashboard-height',
  DASHBOARD_SATURATION: 'dashboard-saturation',
};
