import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { screeningExamClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { NewScreeningExam, ScreeningExam } from '../../../../model/api/primaryPrevention/ScreeningExam';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: ScreeningExam[] | undefined;
};

export function useMutationScreeningExamAdd(
  options?: UseMutationOptions<string, ErrorResponse, NewScreeningExam, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewScreeningExam, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET];

  return useMutation<string, ErrorResponse, NewScreeningExam, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_ADD],
    mutationFn: (variables) => screeningExamClient.postScreeningExam(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<ScreeningExam[]>(listKey) ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = [...previousList, newItem];
      queryClient.setQueryData(listKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'ScreeningExams' }] });
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(listKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been successfully added.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      navigation.reset({ routes: [{ name: 'ScreeningExams' }] });

      const allData = queryClient.getQueryData<ScreeningExam[]>(listKey) ?? [];
      const newElem = allData.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'primary-prevention',
        sectionName: 'screening-exams',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
