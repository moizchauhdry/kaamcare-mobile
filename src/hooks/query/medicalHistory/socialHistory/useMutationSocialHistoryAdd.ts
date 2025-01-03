import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import { getSocialHistoryKeys } from '../../../../constants/query/socialHistory';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { socialHistoryClient } from '../../../../services/http/ApiServices';
import type {
  NewSocialHistory,
  SocialHistoryAllApiModel,
  SocialHistoryName,
} from '../../../../model/api/medicalHistory/SocialHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { sortByName } from '../../../../utils/array/array';

type MutateReturnType = {
  previousList: SocialHistoryAllApiModel | undefined;
};

export function useMutationSocialHistoryAdd(
  socialHistoryName: SocialHistoryName,
  options?: UseMutationOptions<undefined, ErrorResponse, NewSocialHistory, MutateReturnType>,
): UseMutationResult<undefined, ErrorResponse, NewSocialHistory, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getSocialHistoryKeys();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<undefined, ErrorResponse, NewSocialHistory, MutateReturnType>({
    ...options,
    mutationKey: keys.add,
    mutationFn: (variables) => socialHistoryClient.postSocialHistory(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<SocialHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[socialHistoryName] ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = {
        ...previousObject,
        [socialHistoryName]: sortByName([...previousList, newItem], 'type'),
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'SocialHistory' }] });
      }

      return { previousList: previousObject };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(keys.list, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.type} has been added to your social history list.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.add });
      queryClient.invalidateQueries({ queryKey: keys.list });

      navigation.reset({ routes: [{ name: 'SocialHistory' }] });
    },
  });
}
