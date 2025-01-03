import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { useOfflineQuery } from '../useOfflineQuery';
import type { AddressInformation } from '../../../model/api/ProfileInformation';
import { useToast } from '../../useToast';

export const useMutationAddressInformation = (
  edit?: boolean,
  options?: UseMutationOptions<void, ErrorResponse, AddressInformation>,
): UseMutationResult<void, ErrorResponse, AddressInformation> => {
  const { showToast } = useToast();
  const mutationKey = [
    edit ? QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_UPDATE : QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_ADD,
  ];
  const queryKey = [QUERY_KEYS.PROFILE_ADDRESS_INFORMATION_GET];
  const offlineMethods = useOfflineQuery(mutationKey, queryKey, options);

  return useMutation<void, ErrorResponse, AddressInformation>({
    ...options,
    mutationKey,
    mutationFn: (values) =>
      edit ? profileClient.putAddressInformation(values) : profileClient.postAddressInformation(values),
    ...offlineMethods,
    onSuccess: () => {
      showToast({
        text1: `Address information has been successfully ${edit ? 'updated' : 'added'}.`,
      });
    },
  });
};
