import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type { FamilyHistoryApiDiagnosisType, FamilyMember } from '../../../../model/api/medicalHistory/FamilyHistory';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { familyHistoryClient } from '../../../../services/http/ApiServices';

type MutateReturnType = {
  previousList: FamilyMember[] | undefined;
};

export function useMutationFamilyMemberDiagnosisDelete(
  userId: string,
  elemId: string,
  type: FamilyHistoryApiDiagnosisType,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_DELETE],
    mutationFn: (deletionId) => familyHistoryClient.deleteFamilyMemberDiagnosis(deletionId),
    onMutate: async (): Promise<MutateReturnType> => {
      const data =
        queryClient.getQueryData<FamilyMember[]>([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET]) ?? [];
      const newData = data.filter((elem) => elem.id !== elemId);

      queryClient.setQueryData([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET], newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'FamilyHistoryMember', params: { id: userId, type } }] });
      }

      return { previousList: data };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET], context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: () => {
      showToast({
        text1: `Item has been remover from your Family member diagnosis list.`,
      });
    },
    onSettled: () => {
      navigation.reset({ routes: [{ name: 'FamilyHistoryMember', params: { id: userId, type } }] });
    },
  });
}
