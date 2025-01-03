import { useQueryFamilyMemberData } from './useQueryFamilyMemberData';
import type { FamilyHistoryApiDiagnosisType } from '../../../../model/api/medicalHistory/FamilyHistory';

export const useQueryFamilyMemberSingleDiagnosis = (
  userId: string,
  elemId: string,
  type: FamilyHistoryApiDiagnosisType,
) => {
  const data = useQueryFamilyMemberData(userId, undefined, type);

  return data.find((elem) => elem.id === elemId);
};
