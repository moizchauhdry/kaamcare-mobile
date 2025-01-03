import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { onlineManager } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { VisionHistoryName } from '../../../../constants/query/visionHistory';
import { getVisionHistoryKeys } from '../../../../constants/query/visionHistory';
import { visionHistoryClient } from '../../../../services/http/ApiServices';
import type { VisionHistoryModel, VisionHistoryAllApiModel } from '../../../../model/api/medicalHistory/VisionHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { visionHistoryApiNames } from '../../../../constants/data/medicalHistory/visionHistory';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: VisionHistoryAllApiModel | undefined;
};

export function useMutationVisionHistoryUpdate(
  id: string,
  visionHistoryName: VisionHistoryName,
  currentItem: VisionHistoryModel | null,
  options?: UseMutationOptions<void, ErrorResponse, VisionHistoryModel>,
): UseMutationResult<void, ErrorResponse, VisionHistoryModel> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const sectionName = visionHistoryApiNames[visionHistoryName];
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getVisionHistoryKeys(id)[visionHistoryName];

  return useMutation<void, ErrorResponse, VisionHistoryModel, MutateReturnType>({
    ...options,
    mutationKey: keys.mutation,
    mutationFn: (variables) => visionHistoryClient.putVisionHistory(sectionName, id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<VisionHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[visionHistoryName] ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === currentItem?.id);

      newList[itemIndex] = { ...currentItem, ...variables };
      const newData = {
        ...previousObject,
        [visionHistoryName]: newList,
      };
      queryClient.setQueryData(keys.list, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'VisionHistory' }] });
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
        text1: `${variables.name} has been successfully updated`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: keys.list });
      options?.onSettled?.(data, error, variables, context);
      navigation.reset({ routes: [{ name: 'VisionHistory' }] });

      const allData = queryClient.getQueryData<VisionHistoryAllApiModel>(keys.list);
      const previousList = allData?.[visionHistoryName] ?? [];
      const newElem = previousList.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'vision',
        photoType: undefined,
        typeName: sectionName,
      });
    },
  });
}
