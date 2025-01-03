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

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { HearingHistoryName } from '../../../../constants/query/hearingHistory';
import { getHearingHistoryKeys } from '../../../../constants/query/hearingHistory';
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import { hearingHistoryClient } from '../../../../services/http/ApiServices';
import { hearingHistoryApiNames } from '../../../../constants/data/medicalHistory/hearingHistory';
import type { HearingHistoryAllApiModel } from '../../../../model/api/medicalHistory/HearingHistory';

type MutateReturnType = {
  previousObject?: HearingHistoryAllApiModel;
};

export function useMutationHearingHistoryDelete(
  id: string,
  hearingHistoryName: HearingHistoryName,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const keys = getHearingHistoryKeys(id)[hearingHistoryName];
  const mutationKey = keys.delete;
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey,
    mutationFn: (hearingId) =>
      hearingHistoryClient.deleteHearingHistory(hearingHistoryApiNames[hearingHistoryName], hearingId),
    onMutate: async (): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.mutation });
      const prevData = queryClient.getQueryData<HearingHistoryAllApiModel>(keys.list);
      const newData = {
        ...prevData,
        [hearingHistoryName]: prevData?.[hearingHistoryName].filter((elem) => elem.id !== id),
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'HearingHistory' }] });
      }

      return { previousObject: prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your Hearing History list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(keys.list, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });

      navigation.reset({ routes: [{ name: 'HearingHistory' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
