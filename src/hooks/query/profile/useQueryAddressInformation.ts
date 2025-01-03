import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { AddressInformation } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueryAddressInformation = (
  options?: Omit<UseQueryOptions<AddressInformation, ErrorResponse>, 'queryKey'>,
): UseQueryResult<AddressInformation, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_GET],
    queryFn: () => profileClient.getAddressInformation(),
    ...options,
  });
