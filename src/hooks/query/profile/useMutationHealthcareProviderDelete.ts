import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { HealthcareProvider } from '../../../model/api/ProfileInformation';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';
import { profileClient } from '../../../services/http/ApiServices';

type HealthcareProviderQueryParams = {
  id?: string;
};

export const useMutationHealthcareProviderDelete = (
  { id }: HealthcareProviderQueryParams,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string, { prevData: HealthcareProvider[] }> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_DELETE, id];
  const listKey = [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_LIST];

  return useMutation<void, ErrorResponse, string, { prevData: HealthcareProvider[] }>({
    ...options,
    mutationKey,
    mutationFn: (deletionId) => profileClient.deleteHealthcareProvider(deletionId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const healthcareProviderList = queryClient.getQueryData<HealthcareProvider[]>(listKey) ?? [];
      const healthcareProviderListCp = [...healthcareProviderList].filter((elem) => elem.healthcareProviderId !== id);

      queryClient.setQueryData(listKey, healthcareProviderListCp);
      options?.onMutate?.(variables);

      return { prevData: healthcareProviderList };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      showToast({
        text1: 'The Healthcare provider has been successfully deleted from your list.',
      });
      queryClient.invalidateQueries({ queryKey: listKey });
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      onErrorCommon();
      queryClient.setQueryData(listKey, context?.prevData);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_GET, id] });
      queryClient.invalidateQueries({ queryKey: mutationKey });

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
