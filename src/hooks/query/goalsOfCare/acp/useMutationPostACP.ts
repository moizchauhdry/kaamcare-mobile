import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import type { ACPApiModel } from '../../../../model/api/goalsOfCare/ACPModel';
import { acpClient } from '../../../../services/http/ApiServices';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

export const useMutationPostACP = (
  options?: UseMutationOptions<void, ErrorResponse, ACPApiModel>,
): UseMutationResult<void, ErrorResponse, ACPApiModel> => {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.GOALS_OF_CARE_ACP_GET];

  return useMutation<void, ErrorResponse, ACPApiModel, { previousList: ACPApiModel }>({
    ...options,
    mutationKey: [QUERY_KEYS.GOALS_OF_CARE_ACP_POST],
    mutationFn: (values) => acpClient.postACPData(values),
    onMutate: async (values): Promise<{ previousList: ACPApiModel }> => {
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousList = queryClient.getQueryData<ACPApiModel>([queryListKey])!;

      queryClient.setQueryData<ACPApiModel>(queryListKey, values);

      if (!onlineManager.isOnline()) {
        navigation.goBack();
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryListKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: () => {
      showToast({
        text1: `ACP's has been successfully added.`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryListKey });
      navigation.goBack();
      const previousList = queryClient.getQueryData<ACPApiModel>([queryListKey])!;

      if (previousList && previousList.livingWillAttachments) {
        fetchAttachments(
          queryClient,
          { attachments: previousList.livingWillAttachments },
          {
            name: 'goals-of-care',
            sectionName: 'advanced-care-planning',
            photoType: undefined,
            typeName: undefined,
          },
        );
      }

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
