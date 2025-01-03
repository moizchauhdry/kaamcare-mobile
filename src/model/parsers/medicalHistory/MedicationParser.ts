import type { Medication, MedicationsApiReturnModel, NewMedication } from '../../api/medicalHistory/Medications';
import type { MedicationFormData } from '../../../schemas/forms/medicalHistory/medication';
import { parseApiToSelectDataGeneric } from './GenericParsers';

export const parseMedicationApiToFormData = (data: Medication): MedicationFormData => ({
  form: data.form ?? '',
  dose: data.dose?.toString() ?? '',
  units: data.units ?? '',
  frequency: data.frequency ?? '',
  explanation: data.explanation ?? '',
  route: data.route ?? '',
});

export const parseMedicationFormToApiData = (data: MedicationFormData, name: string): NewMedication => ({
  form: data.form || null,
  dose: data.dose || null,
  units: data.units || null,
  frequency: data.frequency || null,
  explanation: data.explanation || null,
  route: data.route || null,
  medicationName: name,
});

export const parseMedicationsApiData = (data: MedicationsApiReturnModel) => ({
  common: parseApiToSelectDataGeneric(data.commonMedications, 'medicationKindId', 'medicationKindName'),
  dynamic: parseApiToSelectDataGeneric(data.dynamicMedications, 'medicationKindId', 'medicationKindName'),
  custom: parseApiToSelectDataGeneric(data.customMedications, 'medicationKindId', 'medicationKindName'),
});
