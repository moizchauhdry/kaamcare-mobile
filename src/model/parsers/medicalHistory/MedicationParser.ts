import type { Medication, MedicationsApiReturnModel, NewMedication } from '../../api/medicalHistory/Medications';
import type { MedicationFormData } from '../../../schemas/forms/medicalHistory/medication';
import { parseApiToSelectDataGeneric } from './GenericParsers';

export const parseMedicationApiToFormData = (data: Medication): MedicationFormData => ({
  medicationName: data.medication_name ?? '',
  strength: data.strength?.toString() ?? '',
  unit: data.unit ?? '',
  form: data.form ?? '',
  color: data.color ?? '',
  shape: data.shape ?? '',
  for: data.for ?? '',
  route: data.route ?? '',
  frequency: data.frequency ?? '',
  times: data.times ?? [],
  start_date: data.start_date ?? '',
  end_date: data.end_date ?? '',
  explanation: data.explanation ?? '',
});

export const parseMedicationFormToApiData = (data: MedicationFormData, name: string): NewMedication => ({
  medication_name: name,
  strength: data.strength || null,
  unit: data.unit || null,
  form: data.form || null,
  color: data.color || null,
  shape: data.shape || null,
  for: data.for || null,
  route: data.route || null,
  frequency: data.frequency || null,
  times: data.times || [],
  start_date: data.start_date || null,
  end_date: data.end_date || null,
  explanation: data.explanation || null,
});

export const parseMedicationsApiData = (data: MedicationsApiReturnModel) => ({
  common: parseApiToSelectDataGeneric(data.commonMedications, 'medicationKindId', 'medicationKindName'),
  dynamic: parseApiToSelectDataGeneric(data.dynamicMedications, 'medicationKindId', 'medicationKindName'),
  custom: parseApiToSelectDataGeneric(data.customMedications, 'medicationKindId', 'medicationKindName'),
});
