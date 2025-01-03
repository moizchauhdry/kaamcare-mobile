import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { useOfflineQuery } from '../useOfflineQuery';
import type { EmergencyContact } from '../../../model/api/ProfileInformation';
import { useToast } from '../../useToast';

export const useMutationPutEmergencyContact = (
  edit?: boolean,
  options?: UseMutationOptions<void, ErrorResponse, EmergencyContact>,
): UseMutationResult<void, ErrorResponse, EmergencyContact> => {
  const { showToast } = useToast();
  const mutationKey = [edit ? QUERY_KEYS.PROFILE_EMERGENCY_CONTACT_PUT : QUERY_KEYS.PROFILE_EMERGENCY_CONTACT_POST];
  const queryKey = [QUERY_KEYS.PROFILE_EMERGENCY_CONTACT_GET];
  const offlineMethods = useOfflineQuery(mutationKey, queryKey, options);

  return useMutation<void, ErrorResponse, EmergencyContact>({
    ...options,
    mutationKey,
    mutationFn: (values) =>
      edit ? profileClient.putEmergencyContact(values) : profileClient.postEmergencyContact(values),
    ...offlineMethods,
    onSuccess: () => {
      showToast({
        text1: `Emergency contact information has been successfully ${edit ? 'updated' : 'added'}.`,
      });
    },
  });
};
