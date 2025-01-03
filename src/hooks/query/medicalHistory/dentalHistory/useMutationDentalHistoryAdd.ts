import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { getDentalHistoryKeys } from '../../../../constants/query/dentalHistory';
import { dentalHistoryClient } from '../../../../services/http/ApiServices';
import type {
  DentalHistoryAllApiModel,
  DentalHistoryName,
  NewDentalHistory,
} from '../../../../model/api/medicalHistory/DentalHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { sortByName } from '../../../../utils/array/array';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: DentalHistoryAllApiModel | undefined;
};

export function useMutationDentalHistoryAdd(
  dentalHistoryName: DentalHistoryName,
  options?: UseMutationOptions<string, ErrorResponse, NewDentalHistory, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewDentalHistory, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getDentalHistoryKeys();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<string, ErrorResponse, NewDentalHistory, MutateReturnType>({
    ...options,
    mutationKey: keys.add,
    mutationFn: (variables) => dentalHistoryClient.postDentalHistory(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<DentalHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[dentalHistoryName] ?? [];
      const newItem = { id: 'foo', ...variables };
      const newData = {
        ...previousObject,
        [dentalHistoryName]: sortByName([...previousList, newItem], 'name'),
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'DentalHistory' }] });
      }

      return { previousList: previousObject };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(keys.list, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been added to your dental history list.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: keys.list });

      const allData = queryClient.getQueryData<DentalHistoryAllApiModel>([
        QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_LIST_GET,
      ]);
      const newElem = allData?.[dentalHistoryName].find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'dental-history',
        photoType: undefined,
        typeName: undefined,
      });

      navigation.reset({ routes: [{ name: 'DentalHistory' }] });
    },
  });
}
