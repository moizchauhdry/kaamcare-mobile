import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { HearingHistoryName } from '../../../../constants/query/hearingHistory';
import { getHearingHistoryKeys } from '../../../../constants/query/hearingHistory';
import type { HearingHistoryAllApiModel, NewHearingHistory } from '../../../../model/api/medicalHistory/HearingHistory';
import { hearingHistoryClient } from '../../../../services/http/ApiServices';
import { hearingHistoryApiNames } from '../../../../constants/data/medicalHistory/hearingHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { sortByName } from '../../../../utils/array/array';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: HearingHistoryAllApiModel | undefined;
};

export function useMutationHearingHistoryAdd(
  hearingHistoryName: HearingHistoryName,
  options?: UseMutationOptions<string, ErrorResponse, NewHearingHistory, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewHearingHistory, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getHearingHistoryKeys()[hearingHistoryName];
  const sectionName = hearingHistoryApiNames[hearingHistoryName];
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<string, ErrorResponse, NewHearingHistory, MutateReturnType>({
    ...options,
    mutationKey: keys.add,
    mutationFn: (variables) => hearingHistoryClient.postHearingHistory(sectionName, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<HearingHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[hearingHistoryName] ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = {
        ...previousObject,
        [hearingHistoryName]: sortByName([...previousList, newItem], 'name'),
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
        text1: `${variables.name} has been added to your hearing history list.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: keys.list });

      navigation.reset({ routes: [{ name: 'HearingHistory' }] });

      const allData = queryClient.getQueryData<HearingHistoryAllApiModel>(keys.list);
      const previousList = allData?.[hearingHistoryName] ?? [];
      const newElem = previousList.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'hearing',
        photoType: undefined,
        typeName: sectionName,
      });
    },
  });
}
