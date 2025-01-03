import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type { SurgicalHistoryAllApiModel } from '../../../../model/api/medicalHistory/SurgicalHistory';
import { surgicalHistoryClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';

export const useMutationSurgicalHistoryDelete = (
  id: string,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_DELETE];
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET];

  return useMutation<void, ErrorResponse, string, { prevData?: SurgicalHistoryAllApiModel }>({
    ...options,
    mutationKey,
    mutationFn: (deletionId) => surgicalHistoryClient.deleteSurgicalHistory(deletionId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<SurgicalHistoryAllApiModel>(listKey);
      const prevList = prevData?.surgicalHistory ?? [];
      const newData = prevList.filter((elem) => elem.id !== id);
      queryClient.setQueryData(listKey, { surgicalHistory: newData });
      options?.onMutate?.(variables);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'SurgicalHistory' }] });
      }

      return { prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.prevData);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });

      navigation.reset({ routes: [{ name: 'SurgicalHistory' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
