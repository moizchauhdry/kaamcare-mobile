import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query/build/modern/index';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { Diagnosis } from '../../../../model/api/medicalHistory/Diagnosis';
import { diagnosisHistoryClient } from '../../../../services/http/ApiServices';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

export const useMutationDiagnosisUpdate = (
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, Diagnosis>,
): UseMutationResult<void, ErrorResponse, Diagnosis> => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET];
  const queryElemKey = QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_GET;

  return useMutation<void, ErrorResponse, Diagnosis, { previousItem?: Diagnosis; previousList?: Diagnosis[] }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_UPDATE],
    mutationFn: (variables) => diagnosisHistoryClient.putDiagnosisHistory(variables.id, { ...variables }),
    onMutate: async (values): Promise<{ previousItem?: Diagnosis; previousList?: Diagnosis[] }> => {
      await queryClient.cancelQueries({ queryKey: [queryElemKey, id] });
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousList = queryClient.getQueryData<Diagnosis[]>(queryListKey) ?? [];
      const previousItem = previousList.find((elem) => elem.id === values.id);
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === previousItem?.id);
      newList[itemIndex] = { ...previousItem, ...values, id };

      queryClient.setQueryData(queryListKey, newList);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Diagnosis' }] });
      }

      return { previousItem, previousList };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData<Diagnosis>([queryElemKey, id], context?.previousItem);
      queryClient.setQueryData(queryListKey, context?.previousList);

      onErrorCommon();
    },
    onSuccess: () => {
      showToast({
        text1: `Diagnosis has been successfully updated`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.removeQueries({ queryKey: [queryElemKey, id] });
      await queryClient.invalidateQueries({ queryKey: queryListKey });
      navigation.reset({ routes: [{ name: 'Diagnosis' }] });
      options?.onSettled?.(data, error, variables, context);

      const allData = queryClient.getQueryData<Diagnosis[]>([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET]) ?? [];
      const newElem = allData.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'diagnosis',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
};
