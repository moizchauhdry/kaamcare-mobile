import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { immunizationClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { NewVaccine, Vaccine } from '../../../../model/api/primaryPrevention/Immunization';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: Vaccine[] | undefined;
};

export function useMutationVaccineAdd(
  options?: UseMutationOptions<string, ErrorResponse, NewVaccine, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewVaccine, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const listKey = [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET];

  return useMutation<string, ErrorResponse, NewVaccine, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_ADD],
    mutationFn: (variables) => immunizationClient.postVaccine(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<Vaccine[]>(listKey) ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = [...previousList, newItem];
      queryClient.setQueryData(listKey, newData);

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
        text1: `${variables.vaccineName} has been added to your vaccines list.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      navigation.reset({ routes: [{ name: 'Immunizations' }] });

      const allData = queryClient.getQueryData<Vaccine[]>(listKey) ?? [];
      const newElem = allData.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'primary-prevention',
        sectionName: 'vaccine',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
