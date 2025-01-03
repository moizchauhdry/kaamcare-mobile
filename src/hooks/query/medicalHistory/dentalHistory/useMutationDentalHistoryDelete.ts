import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { getDentalHistoryKeys } from '../../../../constants/query/dentalHistory';
import type { DentalHistoryAllApiModel, DentalHistoryName } from '../../../../model/api/medicalHistory/DentalHistory';
import { dentalHistoryClient } from '../../../../services/http/ApiServices';
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';

type MutateReturnType = {
  previousObject?: DentalHistoryAllApiModel;
};

export function useMutationDentalHistoryDelete(
  id: string,
  dentalHistoryName: DentalHistoryName,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const keys = getDentalHistoryKeys(id);
  const mutationKey = keys.delete;
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey,
    mutationFn: (dentalId: string) => dentalHistoryClient.deleteDentalHistory(dentalId),
    onMutate: async (): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.mutation });
      const prevData = queryClient.getQueryData<DentalHistoryAllApiModel>(keys.list);
      const newData = {
        ...prevData,
        [dentalHistoryName]: prevData?.[dentalHistoryName].filter((elem) => elem.id !== id),
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'DentalHistory' }] });
      }

      return { previousObject: prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your Dental History list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(keys.list, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });
      queryClient.invalidateQueries({ queryKey: keys.delete });

      navigation.reset({ routes: [{ name: 'DentalHistory' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
