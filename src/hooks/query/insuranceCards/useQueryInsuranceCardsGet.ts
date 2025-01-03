import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { InsuranceCards } from '../../../model/api/insurance/Insurance';
import { insuranceClient } from '../../../services/http/ApiServices';

export function useQueryInsuranceCardsGet(
  options?: Omit<UseQueryOptions<InsuranceCards, ErrorResponse>, 'queryKey'>,
): UseQueryResult<InsuranceCards, ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.INSURANCE_CARDS_GET],
    queryFn: () => insuranceClient.getInsuranceCards(),
    retry: false,
    ...options,
  });
}
