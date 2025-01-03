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
import type { VaccineCard } from '../../../../model/api/primaryPrevention/Immunization';

type MutateReturnType = {
  previousObject?: VaccineCard[];
};

export function useMutationVaccineCardDelete(
  id: string,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_CARD_LIST_GET];

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_DELETE],
    mutationFn: (deletionId) => immunizationClient.deleteVaccineCard(deletionId),
    onMutate: async (): Promise<MutateReturnType> => {
      const prevData = queryClient.getQueryData<VaccineCard[]>(listKey) ?? [];
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
        text1: `${itemName ?? 'Item'} has been successfully deleted from your Vaccine Cards List.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_GET, id] });

      navigation.reset({ routes: [{ name: 'Immunizations' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
