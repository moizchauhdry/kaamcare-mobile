import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { useOfflineQuery } from '../useOfflineQuery';
import type { Pharmacy } from '../../../model/api/ProfileInformation';
import { useToast } from '../../useToast';

export const useMutationPharmacy = (
  edit?: boolean,
  options?: UseMutationOptions<void, ErrorResponse, Pharmacy>,
): UseMutationResult<void, ErrorResponse, Pharmacy> => {
  const { showToast } = useToast();
  const mutationKey = [edit ? QUERY_KEYS.PROFILE_PHARMACY_UPDATE : QUERY_KEYS.PROFILE_PHARMACY_ADD];
  const queryKey = [QUERY_KEYS.PROFILE_PHARMACY];
  const offlineMethods = useOfflineQuery(mutationKey, queryKey, options);

  return useMutation<void, ErrorResponse, Pharmacy>({
    ...options,
    mutationKey,
    mutationFn: (values) => (edit ? profileClient.putPharmacy(values) : profileClient.postPharmacy(values)),
    ...offlineMethods,
    onSuccess: () => {
      showToast({
        text1: `Pharmacy information has been successfully ${edit ? 'updated' : 'added'}.`,
      });
    },
  });
};
