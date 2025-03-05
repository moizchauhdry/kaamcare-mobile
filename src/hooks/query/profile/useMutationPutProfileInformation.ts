import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

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
  const localUserData = JSON.parse(SecureStore.getItem('user-data') ?? '{}');

  return useMutation<void, ErrorResponse, ProfileInformation>({
    ...options,
    mutationKey,
    mutationFn: (values) => profileClient.putProfileInformation(values),
    ...offlineMethods,
    onSuccess: (data) => {
      const updatedUserData = {
        ...localUserData,
        ...data,
      };
      SecureStore.setItem('user-data', JSON.stringify(updatedUserData));
      showToast({
        text1: `Profile information has been successfully updated.`,
      });
    },
  });
};
