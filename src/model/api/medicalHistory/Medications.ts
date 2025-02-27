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
  medication_name: string;
  strength?: string | null;
  unit?: string | null;
  form?: string | null;
  color?: string | null;
  shape?: string | null;
  for?: string | null;
  route?: string | null;
  frequency?: string | null;
  times?: string[];
  start_date?: string | null;
  end_date?: string | null;
  explanation?: string | null;
  isCommonName?: boolean;
};


export type Medications = Medication[];
