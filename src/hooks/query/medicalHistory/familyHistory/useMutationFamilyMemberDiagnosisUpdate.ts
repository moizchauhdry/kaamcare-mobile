import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import type {
  FamilyHistoryApiDiagnosisType,
  FamilyMemberDiagnosisModel,
} from '../../../../model/api/medicalHistory/FamilyHistory';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { familyHistoryClient } from '../../../../services/http/ApiServices';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: FamilyMemberDiagnosisModel[] | undefined;
};

export function useMutationFamilyMemberDiagnosisUpdate(
  userId: string,
  elemId: string,
  type: FamilyHistoryApiDiagnosisType,
  options?: UseMutationOptions<void, ErrorResponse, FamilyMemberDiagnosisModel, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, FamilyMemberDiagnosisModel, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<void, ErrorResponse, FamilyMemberDiagnosisModel, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_DIAGNOSIS_UPDATE],
    mutationFn: (variables) =>
      familyHistoryClient.putFamilyMemberDiagnosis(variables.id, {
        ...variables,
        familyMemberId: userId,
        formType: type,
      }),
    onMutate: async (variables): Promise<MutateReturnType> => {
      const data =
        queryClient.getQueryData<FamilyMemberDiagnosisModel[]>([
          QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET,
        ]) ?? [];
      const elemIndex = data.findIndex((elem) => elem.id === elemId);
      const newItem = { ...variables, id: elemId, familyMemberId: userId, formType: type };
      const newData = [...data];
      newData[elemIndex] = newItem;
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
        text1: `Family member diagnosis has been successfully updated.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET] });
      options?.onSettled?.(data, error, variables, context);
      navigation.reset({ routes: [{ name: 'FamilyHistoryMember', params: { id: userId, type } }] });

      const diagnosis =
        queryClient.getQueryData<FamilyMemberDiagnosisModel[]>([
          QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET,
        ]) ?? [];
      const newElem = diagnosis.find((elem) => elem.id === variables.id);
      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'family-history',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
}
