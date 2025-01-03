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
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { FamilyMember } from '../../../../model/api/medicalHistory/FamilyHistory';
import { familyHistoryClient } from '../../../../services/http/ApiServices';

type MutateReturnType = {
  previousList?: FamilyMember[];
};

export function useMutationFamilyMemberDelete(
  id?: string,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_LIST];

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DELETE],
    mutationFn: (deletionId) => familyHistoryClient.deleteFamilyMember(deletionId),
    onMutate: async (): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previousList = queryClient.getQueryData<FamilyMember[]>(listKey) ?? [];
      const newData = previousList.filter((elem) => elem.id !== id);

      queryClient.setQueryData(listKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'FamilyHistory' }] });
      }

      return { previousList };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your Family members list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.previousList);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET] });
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      navigation.reset({ routes: [{ name: 'FamilyHistory' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
