import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { useOfflineQuery } from '../useOfflineQuery';
import type { Caregiver } from '../../../model/api/ProfileInformation';
import { useToast } from '../../useToast';

export const useMutationCaregiver = (
  edit?: boolean,
  options?: UseMutationOptions<void, ErrorResponse, Caregiver>,
): UseMutationResult<void, ErrorResponse, Caregiver> => {
  const { showToast } = useToast();
  const mutationKey = [edit ? QUERY_KEYS.PROFILE_CAREGIVER_PUT : QUERY_KEYS.PROFILE_CAREGIVER_ADD];
  const queryKey = [QUERY_KEYS.PROFILE_CAREGIVER_GET];
  const offlineMethods = useOfflineQuery(mutationKey, queryKey, options);

  return useMutation<void, ErrorResponse, Caregiver>({
    ...options,
    mutationKey,
    mutationFn: (values) => (edit ? profileClient.putCaregiver(values) : profileClient.postCaregiver(values)),
    ...offlineMethods,
    onSuccess: () => {
      showToast({
        text1: `Caregiver information has been successfully ${edit ? 'updated' : 'added'}.`,
      });
    },
  });
};
