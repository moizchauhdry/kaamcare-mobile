import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { screeningExamClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { ScreeningExam } from '../../../../model/api/primaryPrevention/ScreeningExam';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: ScreeningExam[] | undefined;
};

export function useMutationScreeningExamUpdate(
  id: string,
  previousItem: ScreeningExam | null,
  options?: UseMutationOptions<void, ErrorResponse, ScreeningExam, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, ScreeningExam, MutateReturnType> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET];
  const singleKey = [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_GET, id];

  return useMutation<void, ErrorResponse, ScreeningExam, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_UPDATE],
    mutationFn: (variables) => screeningExamClient.putScreeningExam(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<ScreeningExam[]>(listKey) ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === previousItem?.id);
      const newItem = { ...previousItem, ...variables };
      newList[itemIndex] = newItem;
      queryClient.setQueryData(listKey, newList);
      queryClient.setQueryData(singleKey, newItem);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'ScreeningExams' }] });
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(listKey, context?.previousList);
      queryClient.setQueryData(singleKey, previousItem);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been successfully updated.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.invalidateQueries({ queryKey: singleKey });
      options?.onSettled?.(data, error, variables, context);
      navigation.reset({ routes: [{ name: 'ScreeningExams' }] });

      const allData = queryClient.getQueryData<ScreeningExam[]>(listKey) ?? [];
      const newElem = allData.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'primary-prevention',
        sectionName: 'screening-exams',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
