import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { getDentalHistoryKeys } from '../../../../constants/query/dentalHistory';
import type {
  DentalHistory,
  DentalHistoryAllApiModel,
  DentalHistoryName,
} from '../../../../model/api/medicalHistory/DentalHistory';
import { dentalHistoryClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

type MutateReturnType = {
  previousList: DentalHistoryAllApiModel | undefined;
};

export function useMutationDentalHistoryUpdate(
  id: string,
  dentalHistoryName: DentalHistoryName,
  previousItem: DentalHistory | null,
  options?: UseMutationOptions<void, ErrorResponse, DentalHistory, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, DentalHistory, MutateReturnType> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getDentalHistoryKeys(id);

  return useMutation<void, ErrorResponse, DentalHistory, MutateReturnType>({
    ...options,
    mutationKey: keys.mutation,
    mutationFn: (variables) => dentalHistoryClient.putDentalHistory(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<DentalHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[dentalHistoryName] ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === previousItem?.id);
      newList[itemIndex] = { ...previousItem, ...variables };
      const newData = {
        ...previousObject,
        [dentalHistoryName]: newList,
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
        text1: `${variables.name} has been successfully updated.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: keys.list });
      navigation.reset({ routes: [{ name: 'DentalHistory' }] });
      options?.onSettled?.(data, error, variables, context);

      const allData = queryClient.getQueryData<DentalHistoryAllApiModel>([
        QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_LIST_GET,
      ]);
      const newElem = allData?.[dentalHistoryName].find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'dental-history',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
