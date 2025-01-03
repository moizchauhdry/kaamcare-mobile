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
import type { FamilyMembersModel, NewFamilyMember } from 'model/api/medicalHistory/FamilyHistory';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { sortByName } from '../../../../utils/array/array';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { familyHistoryClient } from '../../../../services/http/ApiServices';
import { capitalize } from '../../../../utils/string/string';

type MutateReturnType = {
  previousList: FamilyMembersModel | undefined;
};

export function useMutationFamilyMemberAdd(
  options?: UseMutationOptions<void, ErrorResponse, NewFamilyMember, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, NewFamilyMember, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_LIST];

  return useMutation<void, ErrorResponse, NewFamilyMember, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_ADD],
    mutationFn: (variables) => familyHistoryClient.postFamilyMember(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousList = queryClient.getQueryData<FamilyMembersModel>(listKey) ?? [];
      const newItem = {
        id: uuidv4(),
        familyMemberName: variables.name,
        relationshipName: variables.relationshipKindName,
      };
      const newData = sortByName([...previousList, newItem], 'familyMemberName');
      queryClient.setQueryData(listKey, newData);

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
        text1: `${capitalize(variables.name || variables.relationshipKindName)} has been added to your family history member list.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      navigation.reset({ routes: [{ name: 'FamilyHistory' }] });
    },
  });
}
