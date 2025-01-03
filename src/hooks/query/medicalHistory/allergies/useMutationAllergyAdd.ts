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
import type { Allergies, Allergy, NewAllergy } from '../../../../model/api/medicalHistory/Allergies';
import { useCommonMethods } from '../../useCommonMethods';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { allergiesClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';

export const useMutationAllergyAdd = (
  options?: UseMutationOptions<void, ErrorResponse, NewAllergy>,
): UseMutationResult<void, ErrorResponse, NewAllergy> => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_ALLERGIES_GET];

  return useMutation<void, ErrorResponse, NewAllergy, { previousList: Allergies }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_ADD],
    mutationFn: (values) => allergiesClient.postUserAllergy(values),
    onMutate: async (values): Promise<{ previousAllergy?: Allergy; previousList: Allergies }> => {
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousList = queryClient.getQueryData<Allergies>([queryListKey]) ?? [];
      const newAllergy = { userAllergyId: uuidv4(), ...values };

      queryClient.setQueryData<Allergies>(queryListKey, (old = []) => sortByName([...old, newAllergy], 'allergyName'));

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Allergies' }] });
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryListKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `Allergy ${variables.allergyName} has been successfully added.`,
      });
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_UPDATE] });
      queryClient.invalidateQueries({ queryKey: queryListKey });

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
