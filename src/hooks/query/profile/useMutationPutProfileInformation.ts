import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { useOfflineQuery } from '../useOfflineQuery';
import type { ProfileInformation } from '../../../model/api/ProfileInformation';
import { useToast } from '../../useToast';

export const useMutationPutProfileInformation = (
  options?: UseMutationOptions<void, ErrorResponse, ProfileInformation>,
): UseMutationResult<void, ErrorResponse, ProfileInformation> => {
  const { showToast } = useToast();
  const mutationKey = [QUERY_KEYS.PROFILE_INFORMATION_PUT];
  const queryKey = [QUERY_KEYS.PROFILE_INFORMATION_GET];
  const offlineMethods = useOfflineQuery(mutationKey, queryKey, options);

  return useMutation<void, ErrorResponse, ProfileInformation>({
    ...options,
    mutationKey,
    mutationFn: (values) => profileClient.putProfileInformation(values),
    ...offlineMethods,
    onSuccess: () => {
      showToast({
        text1: `Profile information has been successfully updated.`,
      });
    },
  });
};
