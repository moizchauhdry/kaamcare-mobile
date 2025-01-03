import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';
import { getSocialHistoryKeys } from 'constants/query/socialHistory';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type {
  SocialHistory,
  SocialHistoryAllApiModel,
  SocialHistoryName,
} from '../../../../model/api/medicalHistory/SocialHistory';
import { socialHistoryClient } from '../../../../services/http/ApiServices';
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';

type MutateReturnType = {
  previousObject?: SocialHistoryAllApiModel;
  previousItem?: SocialHistory;
};

export function useMutationSocialHistoryDelete(
  id: string,
  socialHistoryName: SocialHistoryName,
  options?: UseMutationOptions<void, ErrorResponse, string | undefined>,
): UseMutationResult<void, ErrorResponse, string | undefined> {
  const queryClient = useQueryClient();
  const keys = getSocialHistoryKeys(id);
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = keys.delete;
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return useMutation<void, ErrorResponse, string | undefined, MutateReturnType>({
    ...options,
    mutationKey,
    mutationFn: (variables) => socialHistoryClient.deleteSocialHistory(variables ?? id),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.mutation });
      const prevData = queryClient.getQueryData<SocialHistoryAllApiModel>(keys.list);
      const currentItem = prevData?.[socialHistoryName].find((elem) => elem.id === (variables ?? id));
      const newData = {
        ...prevData,
        [socialHistoryName]: prevData?.[socialHistoryName].filter((elem) => elem.id !== id),
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'SocialHistory' }] });
      }

      return { previousObject: prevData, previousItem: currentItem };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${context.previousItem?.type} has been successfully deleted from your Social History list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(keys.list, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });
      queryClient.invalidateQueries({ queryKey: keys.delete });
      queryClient.removeQueries({ queryKey: keys.single });

      navigation.reset({ routes: [{ name: 'SocialHistory' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
