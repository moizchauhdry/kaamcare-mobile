import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import { getSocialHistoryKeys } from '../../../../constants/query/socialHistory';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type {
  SocialHistory,
  SocialHistoryAllApiModel,
  SocialHistoryName,
} from '../../../../model/api/medicalHistory/SocialHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { socialHistoryClient } from '../../../../services/http/ApiServices';

type MutateReturnType = {
  previousList: SocialHistoryAllApiModel | undefined;
};

export function useMutationSocialHistoryUpdate(
  id: string,
  socialHistoryName: SocialHistoryName,
  options?: UseMutationOptions<void, ErrorResponse, SocialHistory>,
): UseMutationResult<void, ErrorResponse, SocialHistory> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getSocialHistoryKeys(id);

  return useMutation<void, ErrorResponse, SocialHistory, MutateReturnType>({
    ...options,
    mutationKey: keys.mutation,
    mutationFn: (variables) => socialHistoryClient.putSocialHistory(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<SocialHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[socialHistoryName] ?? [];
      const previousItem = previousList.find((elem) => elem.id === variables.id);
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === previousItem?.id);
      newList[itemIndex] = { ...previousItem, ...variables };
      const newData = {
        ...previousObject,
        [socialHistoryName]: newList,
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
        text1: `${variables.type} has been successfully updated.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });
      queryClient.invalidateQueries({ queryKey: keys.list });

      navigation.reset({ routes: [{ name: 'SocialHistory' }] });
    },
  });
}
