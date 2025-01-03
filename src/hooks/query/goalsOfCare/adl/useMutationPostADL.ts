import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import { adlClient } from '../../../../services/http/ApiServices';
import type { ADLSections } from '../../../../model/api/goalsOfCare/ADLModel';

export const useMutationPostADL = (
  options?: UseMutationOptions<void, ErrorResponse, ADLSections>,
): UseMutationResult<void, ErrorResponse, ADLSections> => {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.GOALS_OF_CARE_ADL_GET];
  const navigation = useNavigation();

  return useMutation<void, ErrorResponse, ADLSections, { previousList: ADLSections }>({
    ...options,
    mutationKey: [QUERY_KEYS.GOALS_OF_CARE_ADL_POST],
    mutationFn: (values) => adlClient.postADLData(values),
    onMutate: async (values): Promise<{ previousList: ADLSections }> => {
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousList = queryClient.getQueryData<ADLSections>([queryListKey]) ?? [];

      queryClient.setQueryData<ADLSections>(queryListKey, values);

      if (!onlineManager.isOnline()) {
        navigation.goBack();
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryListKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: () => {
      showToast({
        text1: `ADL's has been successfully added.`,
      });
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryListKey });

      navigation.goBack();

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
