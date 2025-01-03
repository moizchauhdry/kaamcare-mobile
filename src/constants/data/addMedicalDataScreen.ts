import type { HomeCardDataType } from '../../model/common/HomeData';
import type { AddMedicalDataNavigationParamsList } from '../../components/Navigation/AddMedicalDataNavigation';

type GoalsOfCareScreenData = {
  id: string;
  title: string;
  listNavigation: 'ADL' | 'ACP';
  addNavigation: 'ACP' | 'ADL';
};

export const medicalLogsScreenData = [
  {
    id: 1,
    title: 'Blood Pressure & Pulse',
    listNavigation: 'BloodPressure',
    addNavigation: 'BloodPressureForm',
  },
  {
    id: 2,
    title: 'Blood Sugar',
    listNavigation: 'BloodSugar',
    addNavigation: 'BloodSugarForm',
  },
  {
    id: 3,
    title: 'Height',
    listNavigation: 'Height',
    addNavigation: 'HeightForm',
  },
  {
    id: 5,
    title: 'SpO',
    lowerIndex: '2',
    listNavigation: 'Saturation',
    addNavigation: 'SaturationForm',
  },
  {
    id: 6,
    title: 'Weight',
    listNavigation: 'Weight',
    addNavigation: 'WeightForm',
  },
];

export const medicalHistoryScreenData = [
  {
    id: 'a0e5a0cf-b3f7-4e78-95cb-b1a1b7ac2d18',
    title: 'Allergies',
    listNavigation: 'Allergies',
    addNavigation: 'SelectAllergy',
  },
  {
    id: 'f00a15a1-24cf-4b97-bd6e-f22d8e19c10f',
    title: 'Diagnosis',
    listNavigation: 'Diagnosis',
    addNavigation: 'SelectDiagnosis',
  },
  {
    id: '862cf2d9-9e26-4d09-9431-d0c7f2178a86',
    title: 'Vision History',
    listNavigation: 'VisionHistory',
    addNavigation: 'VisionHistory',
  },
  {
    id: '70b1d2c8-7c0b-45d6-9048-6d4b5e6ff29b',
    title: 'Dental History',
    listNavigation: 'DentalHistory',
    addNavigation: 'DentalHistory',
  },
  {
    id: 'af0d1b57-8766-4092-8d95-4a1dc3e4777e',
    title: 'Hearing History',
    listNavigation: 'HearingHistory',
    addNavigation: 'HearingHistory',
  },
  {
    id: '35f74d2a-3d4b-4e37-b268-098f08abf730',
    title: 'Medications',
    listNavigation: 'Medications',
    addNavigation: 'SelectMedication',
  },
  {
    id: 'e4ecf0e4-eb44-4527-afec-f7363d1cc620',
    title: 'Surgical History',
    listNavigation: 'SurgicalHistory',
    addNavigation: 'SelectSurgicalHistory',
  },
  {
    id: '6a9cb896-3820-4637-9864-7fc992d5cb07',
    title: 'Medical Devices',
    listNavigation: 'MedicalDevices',
    addNavigation: 'SelectMedicalDevice',
  },
  {
    id: 'ff35a735-449f-42bc-9512-f99e7202f5a7',
    title: 'Social History',
    listNavigation: 'SocialHistory',
    addNavigation: 'SocialHistory',
  },
  {
    id: 'bd095a25-44a9-4726-a6d0-26bc0fb4af47',
    title: 'Family History',
    listNavigation: 'FamilyHistory',
    addNavigation: 'FamilyHistory',
  },
];
export const primaryPreventionScreenData: {
  id: string;
  title: string;
  listNavigation: keyof AddMedicalDataNavigationParamsList;
  addNavigation: keyof AddMedicalDataNavigationParamsList;
}[] = [
  {
    id: '862cf2d9-9e26-4d09-9431-d0c7f2178a86',
    title: 'Immunizations',
    listNavigation: 'Immunizations',
    addNavigation: 'SelectVaccine',
  },
  {
    id: 'e4ecf0e4-eb44-4527-afec-f7363d1cc620',
    title: 'Screening exams',
    listNavigation: 'ScreeningExams',
    addNavigation: 'SelectScreeningExam',
  },
];

export const goalsOfCareScreenData: GoalsOfCareScreenData[] = [
  {
    id: '2eac1f10-23bf-4fd6-a29d-11c60c5a3021',
    title: 'Activities of Daily Living (ADL’s)',
    listNavigation: 'ADL',
    addNavigation: 'ADL',
  },
  {
    id: '6e9f233e-16f6-42a1-b45f-0f5b25123f18',
    title: 'Advanced Care Planning',
    listNavigation: 'ACP',
    addNavigation: 'ACP',
  },
];

export const homeData: HomeCardDataType[][] = [
  medicalHistoryScreenData,
  primaryPreventionScreenData,
  goalsOfCareScreenData,
];
