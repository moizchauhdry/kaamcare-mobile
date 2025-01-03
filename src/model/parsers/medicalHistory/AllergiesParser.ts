import type { AllergiesApiReturnModel } from '../../api/medicalHistory/Allergies';
import { parseApiToSelectDataGeneric } from './GenericParsers';

export const parseAllergiesApiData = (data: AllergiesApiReturnModel) => ({
  common: parseApiToSelectDataGeneric(data.commonAllergies, 'allergyId', 'allergyKindName'),
  dynamic: parseApiToSelectDataGeneric(data.dynamicAllergies, 'allergyId', 'allergyKindName'),
  custom: parseApiToSelectDataGeneric(data.customAllergies, 'allergyId', 'allergyKindName'),
});
