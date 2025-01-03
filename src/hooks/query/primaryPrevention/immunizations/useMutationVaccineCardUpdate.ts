import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { immunizationClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { VaccineCard, Vaccine } from '../../../../model/api/primaryPrevention/Immunization';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: VaccineCard[] | undefined;
};

export function useMutationVaccineCardUpdate(
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, VaccineCard, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, VaccineCard, MutateReturnType> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_CARD_LIST_GET];

  return useMutation<void, ErrorResponse, VaccineCard, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_UPDATE],
    mutationFn: (variables) => immunizationClient.putVaccineCard(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<VaccineCard[]>(listKey) ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === variables.id);
      const newItem = { ...newList[itemIndex], ...variables };
      newList[itemIndex] = newItem;
      queryClient.setQueryData(listKey, newList);
      queryClient.setQueryData([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_GET, id], newItem);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Immunizations' }] });
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
        text1: `${variables.title} has been successfully updated.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_GET, id] });
      navigation.reset({ routes: [{ name: 'Immunizations' }] });
      options?.onSettled?.(data, error, variables, context);

      const allData = queryClient.getQueryData<Vaccine[]>(listKey) ?? [];
      const newElem = allData.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'primary-prevention',
        sectionName: 'vaccine-card',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
