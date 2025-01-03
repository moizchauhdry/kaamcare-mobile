import type { QueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query/queryKeys';
import {
  acpClient,
  adlClient,
  allergiesClient,
  bloodPressureClient,
  bloodSugarClient,
  dentalHistoryClient,
  diagnosisHistoryClient,
  familyHistoryClient,
  hearingHistoryClient,
  heightClient,
  immunizationClient,
  insuranceClient,
  medicalDeviceClient,
  medicationsClient,
  profileClient,
  saturationClient,
  screeningExamClient,
  socialHistoryClient,
  surgicalHistoryClient,
  visionHistoryClient,
  weightClient,
} from '../../services/http/ApiServices';

export const useMutationDefaults = (queryClient: QueryClient) => {
  /* Medical history */
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_ADD], {
    mutationFn: (variables) => allergiesClient.postUserAllergy(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_DELETE], {
    mutationFn: (variables) => allergiesClient.deleteUserAllergy(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_UPDATE], {
    mutationFn: (variables) => allergiesClient.putUserAllergy(variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_ADD], {
    mutationFn: (variables) => dentalHistoryClient.postDentalHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_DELETE], {
    mutationFn: (variables) => dentalHistoryClient.deleteDentalHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_UPDATE], {
    mutationFn: (variables) => dentalHistoryClient.putDentalHistory(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_ADD], {
    mutationFn: (variables) => diagnosisHistoryClient.postDiagnosisHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_DELETE], {
    mutationFn: (variables) => diagnosisHistoryClient.deleteDiagnosisHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_UPDATE], {
    mutationFn: (variables) => diagnosisHistoryClient.putDiagnosisHistory(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_ADD], {
    mutationFn: (variables) => hearingHistoryClient.postHearingHistory('diagnosis', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_ADD], {
    mutationFn: (variables) => hearingHistoryClient.postHearingHistory('aid-cochlear-implant', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_ADD], {
    mutationFn: (variables) => hearingHistoryClient.postHearingHistory('test', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_UPDATE], {
    mutationFn: (variables) => hearingHistoryClient.putHearingHistory('diagnosis', variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_UPDATE], {
    mutationFn: (variables) => hearingHistoryClient.putHearingHistory('aid-cochlear-implant', variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_UPDATE], {
    mutationFn: (variables) => hearingHistoryClient.putHearingHistory('test', variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_DELETE], {
    mutationFn: (variables) => hearingHistoryClient.deleteHearingHistory('diagnosis', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_DELETE], {
    mutationFn: (variables) => hearingHistoryClient.deleteHearingHistory('aid-cochlear-implant', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_DELETE], {
    mutationFn: (variables) => hearingHistoryClient.deleteHearingHistory('test', variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICE_ADD], {
    mutationFn: (variables) => medicalDeviceClient.postMedicalDevices(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICE_DELETE], {
    mutationFn: (variables) => medicalDeviceClient.deleteMedicalDevices(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICE_UPDATE], {
    mutationFn: (variables) => medicalDeviceClient.putMedicalDevices(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_ADD], {
    mutationFn: (variables) => medicationsClient.postUserMedication(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_DELETE], {
    mutationFn: (variables) => medicationsClient.deleteUserMedication(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_UPDATE], {
    mutationFn: (variables) => medicationsClient.putUserMedication(variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_ADD], {
    mutationFn: (variables) => socialHistoryClient.postSocialHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_DELETE], {
    mutationFn: (variables) => socialHistoryClient.deleteSocialHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_UPDATE], {
    mutationFn: (variables) => socialHistoryClient.putSocialHistory(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_ADD], {
    mutationFn: (variables) => surgicalHistoryClient.postSurgicalHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_DELETE], {
    mutationFn: (variables) => surgicalHistoryClient.deleteSurgicalHistory(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_UPDATE], {
    mutationFn: (variables) => surgicalHistoryClient.putSurgicalHistory(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_ADD], {
    mutationFn: (variables) => visionHistoryClient.postVisionHistory('eye-wear', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_DELETE], {
    mutationFn: (variables) => visionHistoryClient.deleteVisionHistory('eye-wear', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_UPDATE], {
    mutationFn: (variables) => visionHistoryClient.putVisionHistory('eye-wear', variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_ADD], {
    mutationFn: (variables) => visionHistoryClient.postVisionHistory('diagnosis', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_DELETE], {
    // mutationFn: (variables) => visionHistoryClient.deleteVisionHistory('diagnosis', variables),
    mutationFn: (variables) => visionHistoryClient.deleteVisionHistory('diagnosis', variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_UPDATE], {
    mutationFn: (variables) => visionHistoryClient.putVisionHistory('diagnosis', variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_ADD], {
    mutationFn: (variables) => familyHistoryClient.postFamilyMember(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_ADD], {
    mutationFn: (variables) => familyHistoryClient.postFamilyMemberDiagnosis(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DELETE], {
    mutationFn: (variables) => familyHistoryClient.deleteFamilyMember(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_DELETE], {
    mutationFn: (variables) => familyHistoryClient.deleteFamilyMemberDiagnosis(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_UPDATE], {
    mutationFn: (variables) => familyHistoryClient.putFamilyMember(variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_UPDATE], {
    mutationFn: (variables) => familyHistoryClient.putFamilyMemberDiagnosis(variables.id, variables),
  });

  // Goals of care
  queryClient.setMutationDefaults([QUERY_KEYS.GOALS_OF_CARE_ACP_POST], {
    mutationFn: (variables) => acpClient.postACPData(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.GOALS_OF_CARE_ACP_PUT], {
    mutationFn: (variables) => acpClient.putACPData(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.GOALS_OF_CARE_ADL_POST], {
    mutationFn: (variables) => adlClient.postADLData(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.GOALS_OF_CARE_ADL_PUT], {
    mutationFn: (variables) => adlClient.putADLData(variables),
  });

  // insurance cards
  queryClient.setMutationDefaults([QUERY_KEYS.INSURANCE_CARDS_POST], {
    mutationFn: (variables) => insuranceClient.postInsuranceCard(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.INSURANCE_CARDS_DELETE], {
    mutationFn: (variables) => insuranceClient.deleteInsuranceCard(variables),
  });

  // Profile
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_UPDATE], {
    mutationFn: (variables) => profileClient.putAddressInformation(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_ADD], {
    mutationFn: (variables) => profileClient.postAddressInformation(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_CAREGIVER_ADD], {
    mutationFn: (variables) => profileClient.postCaregiver(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_CAREGIVER_PUT], {
    mutationFn: (variables) => profileClient.putCaregiver(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_ADD], {
    mutationFn: (variables) => profileClient.postHealthcareProvider(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_UPDATE], {
    mutationFn: (variables) => profileClient.putHealthcareProvider(variables.healthcareProviderId, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_DELETE], {
    mutationFn: (variables) => profileClient.deleteHealthcareProvider(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_PHARMACY_UPDATE], {
    mutationFn: (variables) => profileClient.putPharmacy(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_ADD], {
    mutationFn: (variables) => profileClient.postPharmacy(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_INFORMATION_EMAIL_PUT], {
    mutationFn: (variables) => profileClient.putEmail(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_EMERGENCY_CONTACT_POST], {
    mutationFn: (variables) => profileClient.postEmergencyContact(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_EMERGENCY_CONTACT_PUT], {
    mutationFn: (variables) => profileClient.putEmergencyContact(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PROFILE_INFORMATION_PUT], {
    mutationFn: (variables) => profileClient.putProfileInformation(variables),
  });

  // Primary prevention
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_ADD], {
    mutationFn: (variables) => screeningExamClient.postScreeningExam(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_UPDATE], {
    mutationFn: (variables) => screeningExamClient.putScreeningExam(variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_DELETE], {
    mutationFn: (variables) => screeningExamClient.deleteScreeningExam(variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_ADD], {
    mutationFn: (variables) => immunizationClient.postVaccine(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_UPDATE], {
    mutationFn: (variables) => immunizationClient.putVaccine(variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_DELETE], {
    mutationFn: (variables) => immunizationClient.deleteVaccine(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_ADD], {
    mutationFn: (variables) => immunizationClient.postVaccineCard(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_UPDATE], {
    mutationFn: (variables) => immunizationClient.putVaccineCard(variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_DELETE], {
    mutationFn: (variables) => immunizationClient.deleteVaccineCard(variables),
  });

  // medical logs
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_ADD], {
    mutationFn: (variables) => bloodPressureClient.postBloodPressure(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_DELETE], {
    mutationFn: (variables) => bloodPressureClient.deleteBloodPressure(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_UPDATE], {
    mutationFn: (variables) => bloodPressureClient.putBloodPressure(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_ADD], {
    mutationFn: (variables) => bloodSugarClient.postBloodSugar(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_DELETE], {
    mutationFn: (variables) => bloodSugarClient.deleteBloodSugar(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_UPDATE], {
    mutationFn: (variables) => bloodSugarClient.putBloodSugar(variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_ADD], {
    mutationFn: (variables) => saturationClient.postSaturation(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_DELETE], {
    mutationFn: (variables) => saturationClient.deleteSaturation(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_UPDATE], {
    mutationFn: (variables) => saturationClient.putSaturation(variables.id, variables),
  });

  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_WEIGHT_ADD], {
    mutationFn: (variables) => weightClient.postWeight(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_WEIGHT_DELETE], {
    mutationFn: (variables) => weightClient.deleteWeight(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_WEIGHT_UPDATE], {
    mutationFn: (variables) => weightClient.putWeight(variables.id, variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_HEIGHT_ADD], {
    mutationFn: (variables) => heightClient.postHeight(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_HEIGHT_DELETE], {
    mutationFn: (variables) => heightClient.deleteHeight(variables),
  });
  queryClient.setMutationDefaults([QUERY_KEYS.MEDICAL_LOGS_HEIGHT_UPDATE], {
    mutationFn: (variables) => heightClient.putHeight(variables),
  });
};
