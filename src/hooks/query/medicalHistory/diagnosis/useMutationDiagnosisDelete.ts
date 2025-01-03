import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query/build/modern/index';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { Diagnosis } from '../../../../model/api/medicalHistory/Diagnosis';
import { diagnosisHistoryClient } from '../../../../services/http/ApiServices';

export const useMutationDiagnosisDelete = (
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_DELETE];
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET];

  return useMutation<void, ErrorResponse, string, { prevData?: Diagnosis[] }>({
    ...options,
    mutationKey,
    mutationFn: (diagnosisId) => diagnosisHistoryClient.deleteDiagnosisHistory(diagnosisId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<Diagnosis[]>(listKey);
      const newData = prevData?.filter((elem) => elem.id !== id);
      queryClient.setQueryData(listKey, newData);
      options?.onMutate?.(variables);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Diagnosis' }] });
      }

      return { prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: 'This diagnosis has been successfully deleted from your list.',
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.prevData);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_GET, id] });

      navigation.reset({ routes: [{ name: 'Diagnosis' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
