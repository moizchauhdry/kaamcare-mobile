import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Diagnosis } from '../../../../model/api/medicalHistory/Diagnosis';
import { diagnosisHistoryClient } from '../../../../services/http/ApiServices';

export const useQueryDiagnosisList = (
  options?: Omit<UseQueryOptions<Diagnosis[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<Diagnosis[], ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET],
    queryFn: () => diagnosisHistoryClient.getDiagnosisHistoryList(),
    ...options,
  });
