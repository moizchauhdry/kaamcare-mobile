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
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import type { SurgicalHistory, SurgicalHistoryAllApiModel } from '../../../../model/api/medicalHistory/SurgicalHistory';
import { surgicalHistoryClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

export const useMutationSurgicalHistoryUpdate = (
  currentItem: SurgicalHistory | null,
  options?: UseMutationOptions<void, ErrorResponse, SurgicalHistory>,
): UseMutationResult<void, ErrorResponse, SurgicalHistory> => {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET];
  const queryElemKey = QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_GET;

  return useMutation<
    void,
    ErrorResponse,
    SurgicalHistory,
    { previousItem?: SurgicalHistory; previousObject?: SurgicalHistoryAllApiModel }
  >({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_UPDATE],
    mutationFn: (variables) => surgicalHistoryClient.putSurgicalHistory(variables.id, variables),
    onMutate: async (
      values,
    ): Promise<{ previousItem?: SurgicalHistory; previousObject?: SurgicalHistoryAllApiModel }> => {
      await queryClient.cancelQueries({ queryKey: [queryElemKey, values.id] });
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousObject = queryClient.getQueryData<SurgicalHistoryAllApiModel>(queryListKey);
      const previousList = previousObject?.surgicalHistory ?? [];

      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === currentItem?.id);
      newList[itemIndex] = { ...currentItem, ...values };

      queryClient.setQueryData(queryListKey, { surgicalHistory: newList });

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'SurgicalHistory' }] });
      }

      return { previousObject };
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData<SurgicalHistory>([queryElemKey, variables.id], context?.previousItem);
      queryClient.setQueryData(queryListKey, context?.previousObject);

      onErrorCommon();
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been successfully updated`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryListKey });
      navigation.reset({ routes: [{ name: 'SurgicalHistory' }] });
      options?.onSettled?.(data, error, variables, context);

      const allData = queryClient.getQueryData<SurgicalHistoryAllApiModel>(queryListKey);
      const previousList = allData?.surgicalHistory ?? [];
      const newElem = previousList.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'surgical-history',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
};
