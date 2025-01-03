import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
  onlineManager,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { HearingHistoryName } from '../../../../constants/query/hearingHistory';
import { getHearingHistoryKeys } from '../../../../constants/query/hearingHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { hearingHistoryClient } from '../../../../services/http/ApiServices';
import { hearingHistoryApiNames } from '../../../../constants/data/medicalHistory/hearingHistory';
import type { HearingHistory, HearingHistoryAllApiModel } from '../../../../model/api/medicalHistory/HearingHistory';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: HearingHistoryAllApiModel | undefined;
};

export function useMutationHearingHistoryUpdate(
  id: string,
  hearingHistoryName: HearingHistoryName,
  currentItem: HearingHistory | null,
  options?: UseMutationOptions<void, ErrorResponse, HearingHistory, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, HearingHistory, MutateReturnType> {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getHearingHistoryKeys(id)[hearingHistoryName];
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<void, ErrorResponse, HearingHistory, MutateReturnType>({
    ...options,
    mutationKey: keys.mutation,
    mutationFn: (variables) =>
      hearingHistoryClient.putHearingHistory(hearingHistoryApiNames[hearingHistoryName], variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<HearingHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[hearingHistoryName] ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === currentItem?.id);
      newList[itemIndex] = { ...currentItem, ...variables };
      const newData = {
        ...previousObject,
        [hearingHistoryName]: newList,
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'HearingHistory' }] });
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
        text1: `${variables.name} has been successfully updated`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: keys.list });
      options?.onSettled?.(data, error, variables, context);
      navigation.reset({ routes: [{ name: 'HearingHistory' }] });
      const allData = queryClient.getQueryData<HearingHistoryAllApiModel>(keys.list);
      const previousList = allData?.[hearingHistoryName] ?? [];
      const newElem = previousList.find((elem) => elem.id === variables.id);
      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'hearing',
        photoType: undefined,
        typeName: hearingHistoryApiNames[hearingHistoryName],
      });
    },
  });
}
