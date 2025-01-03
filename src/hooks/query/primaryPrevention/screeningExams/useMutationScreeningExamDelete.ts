import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { screeningExamClient } from '../../../../services/http/ApiServices';
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { ScreeningExam } from '../../../../model/api/primaryPrevention/ScreeningExam';

type MutateReturnType = {
  previousObject?: ScreeningExam[];
};

export function useMutationScreeningExamDelete(
  id: string,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET];
  const singleKey = [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_GET, id];

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_DELETE],
    mutationFn: (deletionId) => screeningExamClient.deleteScreeningExam(deletionId),
    onMutate: async (): Promise<MutateReturnType> => {
      const prevData = queryClient.getQueryData<ScreeningExam[]>(listKey) ?? [];
      const newData = prevData.filter((elem) => elem.id !== id);

      queryClient.setQueryData(listKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'ScreeningExams' }] });
      }

      return { previousObject: prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your ScreeningExams List.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.removeQueries({ queryKey: singleKey });

      navigation.reset({ routes: [{ name: 'ScreeningExams' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
