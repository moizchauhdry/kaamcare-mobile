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

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { FamilyMemberModel, NewFamilyMember } from '../../../../model/api/medicalHistory/FamilyHistory';
import { familyHistoryClient } from '../../../../services/http/ApiServices';

type MutateReturnType = {
  previousList: FamilyMemberModel[] | undefined;
};

export function useMutationFamilyMemberUpdate(
  id?: string,
  options?: UseMutationOptions<void, ErrorResponse, FamilyMemberModel & NewFamilyMember, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, FamilyMemberModel & NewFamilyMember, MutateReturnType> {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_LIST];

  return useMutation<void, ErrorResponse, FamilyMemberModel & NewFamilyMember, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_UPDATE],
    mutationFn: (variables) => familyHistoryClient.putFamilyMember(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<FamilyMemberModel[]>(listKey) ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === id);

      if (itemIndex === -1) {
        return { previousList };
      }

      newList[itemIndex] = {
        ...newList[itemIndex]!,
        familyMemberName: variables.name,
        relationshipName: variables.relationshipKindName,
      };
      queryClient.setQueryData(listKey, newList);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'FamilyHistory' }] });
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(listKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name || variables.relationshipKindName} has been successfully updated`,
      });
    },
    onSettled: () => {
      navigation.reset({ routes: [{ name: 'FamilyHistory' }] });
    },
  });
}
