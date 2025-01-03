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
import type { VisionHistoryName } from '../../../../constants/query/visionHistory';
import { getVisionHistoryKeys } from '../../../../constants/query/visionHistory';
import { visionHistoryClient } from '../../../../services/http/ApiServices';
import { visionHistoryApiNames } from '../../../../constants/data/medicalHistory/visionHistory';
import type { VisionHistoryAllApiModel, VisionHistoryModel } from '../../../../model/api/medicalHistory/VisionHistory';
import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';

type MutateReturnType = {
  previousObject?: VisionHistoryAllApiModel;
  previousItem?: VisionHistoryModel;
};

export function useMutationVisionHistoryDelete(
  id: string,
  visionHistoryName: VisionHistoryName,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const keys = getVisionHistoryKeys(id)[visionHistoryName];
  const mutationKey = keys.delete;
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey,
    mutationFn: (deletionId) =>
      visionHistoryClient.deleteVisionHistory(visionHistoryApiNames[visionHistoryName], deletionId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: keys.mutation });
      const prevData = queryClient.getQueryData<VisionHistoryAllApiModel>(keys.list);
      const newData = {
        ...prevData,
        [visionHistoryName]: prevData?.[visionHistoryName].filter((elem) => elem.id !== id),
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'VisionHistory' }] });
      }

      return { previousObject: prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your Vision History list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(keys.list, context?.previousObject);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });

      navigation.reset({ routes: [{ name: 'VisionHistory' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
