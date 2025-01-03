import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query/build/modern/index';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type { Allergies } from '../../../../model/api/medicalHistory/Allergies';
import { allergiesClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';

export const useMutationAllergyDelete = (
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_DELETE, id];
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_ALLERGIES_GET];

  return useMutation<void, ErrorResponse, string, { prevData: Allergies }>({
    ...options,
    mutationKey,
    mutationFn: (allergyId) => allergiesClient.deleteUserAllergy(allergyId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<Allergies>(listKey) ?? [];
      const newData = prevData.filter((elem) => elem.userAllergyId !== id);
      queryClient.setQueryData(listKey, newData);
      options?.onMutate?.(variables);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Allergies' }] });
      }

      return { prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: 'This allergy has been successfully deleted from your list.',
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.prevData);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
