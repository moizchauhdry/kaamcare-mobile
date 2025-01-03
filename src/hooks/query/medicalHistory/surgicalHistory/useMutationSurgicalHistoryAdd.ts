import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
  onlineManager,
} from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import type {
  NewSurgicalHistory,
  SurgicalHistoryAllApiModel,
} from '../../../../model/api/medicalHistory/SurgicalHistory';
import { surgicalHistoryClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { sortByName } from '../../../../utils/array/array';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: SurgicalHistoryAllApiModel | undefined;
};

export const useMutationSurgicalHistoryAdd = (
  options?: UseMutationOptions<string, ErrorResponse, NewSurgicalHistory>,
): UseMutationResult<string, ErrorResponse, NewSurgicalHistory> => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET];
  const addKey = [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_ADD];

  return useMutation<string, ErrorResponse, NewSurgicalHistory, MutateReturnType>({
    ...options,
    mutationKey: addKey,
    mutationFn: (variables) => surgicalHistoryClient.postSurgicalHistory(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousObject = queryClient.getQueryData<SurgicalHistoryAllApiModel>(listKey);
      const previousList = previousObject?.surgicalHistory ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = {
        surgicalHistory: sortByName([...previousList, newItem], 'name'),
      };
      queryClient.setQueryData(listKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'SurgicalHistory' }] });
      }

      return { previousList: previousObject };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(listKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been added to your surgical history list.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      navigation.reset({ routes: [{ name: 'SurgicalHistory' }] });

      const allData = queryClient.getQueryData<SurgicalHistoryAllApiModel>(listKey);
      const previousList = allData?.surgicalHistory ?? [];
      const newElem = previousList.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'surgical-history',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
};
