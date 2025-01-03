import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query/build/modern/index';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import type { Allergies, Allergy } from '../../../../model/api/medicalHistory/Allergies';
import { useCommonMethods } from '../../useCommonMethods';
import { allergiesClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';

export const useMutationAllergyUpdate = (
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, Allergy>,
): UseMutationResult<void, ErrorResponse, Allergy> => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_ALLERGIES_GET];
  const queryElemKey = QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_GET;

  return useMutation<void, ErrorResponse, Allergy, { previousAllergy?: Allergy; previousList: Allergies }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_UPDATE, id],
    mutationFn: (values) => allergiesClient.putUserAllergy(values),
    onMutate: async (values): Promise<{ previousAllergy?: Allergy; previousList: Allergies }> => {
      await queryClient.cancelQueries({ queryKey: [queryElemKey, values.userAllergyId] });
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousList = queryClient.getQueryData<Allergies>(queryListKey) ?? [];
      const previousAllergy = previousList.find((elem) => elem.allergyName === values.allergyName);
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.userAllergyId === previousAllergy?.userAllergyId);
      newList[itemIndex] = { ...previousAllergy, ...values };

      queryClient.setQueryData<Allergy>([queryElemKey, values.userAllergyId], values);
      queryClient.setQueryData(queryListKey, newList);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'Allergies' }] });
      }

      return { previousAllergy, previousList };
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData<Allergy>([queryElemKey, variables.userAllergyId], context?.previousAllergy);
      queryClient.setQueryData(queryListKey, context?.previousList);

      onErrorCommon();
    },
    onSuccess: () => {
      showToast({
        text1: `Allergy has been successfully updated`,
      });
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [queryElemKey, variables.userAllergyId] });
      queryClient.invalidateQueries({ queryKey: queryListKey });

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
