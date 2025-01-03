import { useQueryClient } from '@tanstack/react-query';

import type { FamilyMemberModel } from '../../../../model/api/medicalHistory/FamilyHistory';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

export function useQueryFamilyMember(id?: string, enabled?: boolean): FamilyMemberModel | null {
  const queryClient = useQueryClient();

  if (!id || !enabled) {
    return null;
  }

  const data = queryClient.getQueryData<FamilyMemberModel[]>([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_LIST]) ?? [];

  return data.find((elem) => elem.id === id) ?? null;
}
