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
import type { Vaccine } from '../../../../model/api/primaryPrevention/Immunization';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: Vaccine[] | undefined;
};

export function useMutationVaccineUpdate(
  id: string,
  previousItem: Vaccine | null,
  options?: UseMutationOptions<void, ErrorResponse, Vaccine, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, Vaccine, MutateReturnType> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET];

  return useMutation<void, ErrorResponse, Vaccine, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_UPDATE],
    mutationFn: (variables) => immunizationClient.putVaccine(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<Vaccine[]>(listKey) ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === previousItem?.id);
      const newItem = { ...previousItem, ...variables };
      newList[itemIndex] = newItem;
      queryClient.setQueryData(listKey, newList);
      queryClient.setQueryData([QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_GET, id], newItem);

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
        text1: `${variables.vaccineName} has been successfully updated.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      navigation.reset({ routes: [{ name: 'Immunizations' }] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_GET, id] });
      options?.onSettled?.(data, error, variables, context);

      const allData = queryClient.getQueryData<Vaccine[]>(listKey) ?? [];
      const newElem = allData.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'primary-prevention',
        sectionName: 'vaccine',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
