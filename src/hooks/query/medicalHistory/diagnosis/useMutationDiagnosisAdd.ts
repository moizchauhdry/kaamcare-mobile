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
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { sortByName } from '../../../../utils/array/array';
import type { Diagnosis, NewDiagnosis } from '../../../../model/api/medicalHistory/Diagnosis';
import { diagnosisHistoryClient } from '../../../../services/http/ApiServices';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

export const useMutationDiagnosisAdd = (
  options?: UseMutationOptions<string, ErrorResponse, NewDiagnosis>,
): UseMutationResult<string, ErrorResponse, NewDiagnosis> => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET];

  return useMutation<string, ErrorResponse, NewDiagnosis, { previousList?: Diagnosis[] }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_ADD],
    mutationFn: (variables) => diagnosisHistoryClient.postDiagnosisHistory(variables),
    onMutate: async (values): Promise<{ previousList?: Diagnosis[] }> => {
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const prevList = queryClient.getQueryData<Diagnosis[]>(queryListKey) ?? [];
      const newItem = { id: uuidv4(), ...values };
      const newData = sortByName([...prevList, newItem], 'name');
      queryClient.setQueryData(queryListKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Diagnosis' }] });
      }

      return { previousList: prevList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryListKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `Diagnosis ${variables.name} has been successfully added.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryListKey });

      navigation.reset({ routes: [{ name: 'Diagnosis' }] });

      const allData = queryClient.getQueryData<Diagnosis[]>([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET]) ?? [];
      const newElem = allData.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'diagnosis',
        photoType: undefined,
        typeName: undefined,
      });

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
