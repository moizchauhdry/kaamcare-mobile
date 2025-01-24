import HttpConnectorService from './HttpConnectorService';
import { UserClient } from './api/UserClient';
import { ProfileClient } from './api/ProfileClient';
import { AllergiesClient } from './api/medicalhistory/AllergiesClient';
import { MedicationsClient } from './api/medicalhistory/MedicationsClient';
import { VisionHistoryClient } from './api/medicalhistory/VisionHistoryClient';
import { DentalHistoryClient } from './api/medicalhistory/DentalHistoryClient';
import { SocialHistoryClient } from './api/medicalhistory/SocialHistoryClient';
import { SurgicalHistoryClient } from './api/medicalhistory/SurgicalHistoryClient';
import { MedicalDevicesClient } from './api/medicalhistory/MedicalDevicesClient';
import { HearingHistoryClient } from './api/medicalhistory/HearingHistoryClient';
import { AttachmentClient } from './api/AttachmentClient';
import { ImmunizationClient } from './api/primaryPrevention/ImmunizationClient';
import { ScreeningExamClient } from './api/primaryPrevention/ScreeningExamClient';
import { FamilyHistoryClient } from './api/medicalhistory/FamilyHistoryClient';
import { DiagnosisHistoryClient } from './api/medicalhistory/DiagnosisHistoryClient';
import { ADLClient } from './api/careGoals/ADLClient';
import { ACPClient } from './api/careGoals/ACPClient';
import { InsuranceClient } from './api/InsuranceClient';
import { BloodPressureClient } from './api/medicalLogs/BloodPressureClient';
import { SaturationClient } from './api/medicalLogs/SaturationClient';
import { WeightClient } from './api/medicalLogs/WeightClient';
import { HeightClient } from './api/medicalLogs/HeightClient';
import { BloodSugarClient } from './api/medicalLogs/BloodSugarClient';

export const http: HttpConnectorService = new HttpConnectorService({
  prefixUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/1.0/`,
  // prefixUrl: 'https://kaamcare.moizchauhdry.com/api/2.0',
});

export const userClient = new UserClient(http);
export const profileClient = new ProfileClient(http);
export const allergiesClient = new AllergiesClient(http);
export const medicationsClient = new MedicationsClient(http);
export const visionHistoryClient = new VisionHistoryClient(http);
export const dentalHistoryClient = new DentalHistoryClient(http);
export const socialHistoryClient = new SocialHistoryClient(http);
export const surgicalHistoryClient = new SurgicalHistoryClient(http);
export const medicalDeviceClient = new MedicalDevicesClient(http);
export const hearingHistoryClient = new HearingHistoryClient(http);
export const attachmentClient = new AttachmentClient(http);
export const immunizationClient = new ImmunizationClient(http);
export const screeningExamClient = new ScreeningExamClient(http);
export const familyHistoryClient = new FamilyHistoryClient(http);
export const diagnosisHistoryClient = new DiagnosisHistoryClient(http);
export const adlClient = new ADLClient(http);
export const acpClient = new ACPClient(http);
export const insuranceClient = new InsuranceClient(http);
export const bloodPressureClient = new BloodPressureClient(http);
export const saturationClient = new SaturationClient(http);
export const weightClient = new WeightClient(http);
export const heightClient = new HeightClient(http);
export const bloodSugarClient = new BloodSugarClient(http);
