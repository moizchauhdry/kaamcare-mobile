import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { immunizationClient } from '../../../../services/http/ApiServices';
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Vaccine } from '../../../../model/api/primaryPrevention/Immunization';

type MutateReturnType = {
  previousObject?: Vaccine[];
};

export function useMutationVaccineDelete(
  id: string,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET];

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_DELETE],
    mutationFn: (deletionId) => immunizationClient.deleteVaccine(deletionId),
    onMutate: async (): Promise<MutateReturnType> => {
      const prevData = queryClient.getQueryData<Vaccine[]>(listKey) ?? [];
      const newData = prevData.filter((elem) => elem.id !== id);

      queryClient.setQueryData(listKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Immunizations' }] });
      }

      return { previousObject: prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your Vaccines List.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_GET, id] });

      navigation.reset({ routes: [{ name: 'Immunizations' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
