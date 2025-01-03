import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type {
  FamilyHistoryApiDiagnosisType,
  NewFamilyMemberDiagnosis,
  FamilyMemberDiagnosisModel,
} from '../../../../model/api/medicalHistory/FamilyHistory';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { familyHistoryClient } from '../../../../services/http/ApiServices';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: FamilyMemberDiagnosisModel[] | undefined;
};

export function useMutationFamilyMemberDiagnosisAdd(
  userId: string,
  type: FamilyHistoryApiDiagnosisType,
  options?: UseMutationOptions<string, ErrorResponse, NewFamilyMemberDiagnosis, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewFamilyMemberDiagnosis, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<string, ErrorResponse, NewFamilyMemberDiagnosis, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_ADD],
    mutationFn: (variables) =>
      familyHistoryClient.postFamilyMemberDiagnosis({ ...variables, familyMemberId: userId, formType: type }),
    onMutate: async (variables): Promise<MutateReturnType> => {
      const diagnosis =
        queryClient.getQueryData<FamilyMemberDiagnosisModel[]>([
          QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET,
        ]) ?? [];
      const newItem: FamilyMemberDiagnosisModel = {
        id: uuidv4(),
        familyMemberId: userId,
        ...variables,
        formType: type,
      };
      const newData = [...diagnosis, newItem];
      queryClient.setQueryData([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET], newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'FamilyHistoryMember', params: { id: userId, type } }] });
      }

      return { previousList: diagnosis };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET], context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.values.name} has been added to your family history list.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET] });
      navigation.reset({ routes: [{ name: 'FamilyHistoryMember', params: { id: userId } }] });

      const diagnosis =
        queryClient.getQueryData<FamilyMemberDiagnosisModel[]>([
          QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET,
        ]) ?? [];
      const newElem = diagnosis.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'family-history',
        photoType: undefined,
        typeName: undefined,
      });

      options?.onSettled?.(data, error, variables, context);
    },
  });
}
