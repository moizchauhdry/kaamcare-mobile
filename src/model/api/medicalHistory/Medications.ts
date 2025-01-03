export type MedicationsApiReturnModel = {
  commonMedications: CommonMedicationApi[];
  dynamicMedications: CommonMedicationApi[];
  customMedications: CommonMedicationApi[];
};

export type MedicationsSelectModels = {
  common: CommonMedication[];
  dynamic: CommonMedication[];
  custom: CommonMedication[];
};

export type CommonMedicationApi = {
  medicationKindName: string;
  medicationKindId: string;
  isCommon: boolean;
};

export type CommonMedication = {
  value: string;
  label: string;
};

export type CustomMedicationApi = CommonMedicationApi & {
  userId: string;
};

export interface Medication extends NewMedication {
  userMedicationId: string;
}

export type NewMedication = {
  form?: string | null;
  dose?: string | null;
  units?: string | null;
  route?: string | null;
  frequency?: string | null;
  explanation?: string | null;
  medicationName: string;
  isCommonName?: boolean;
};

export type Medications = Medication[];
