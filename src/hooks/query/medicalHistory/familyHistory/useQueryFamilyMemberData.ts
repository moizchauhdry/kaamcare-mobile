import { useQueryClient } from '@tanstack/react-query';

import type {
  FamilyHistoryApiDiagnosisType,
  FamilyMemberDiagnosisModel,
} from '../../../../model/api/medicalHistory/FamilyHistory';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

export function useQueryFamilyMemberData(
  id: string,
  initialData?: FamilyMemberDiagnosisModel[],
  type?: FamilyHistoryApiDiagnosisType,
): FamilyMemberDiagnosisModel[] {
  const queryClient = useQueryClient();

  const data =
    initialData ??
    queryClient.getQueryData<FamilyMemberDiagnosisModel[]>([
      QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET,
    ]) ??
    [];

  const memberData = data.filter((elem) => elem.familyMemberId === id) ?? [];

  if (type && memberData.length > 0) {
    return memberData.filter((elem) => elem.formType === type);
  }

  return memberData;
}
