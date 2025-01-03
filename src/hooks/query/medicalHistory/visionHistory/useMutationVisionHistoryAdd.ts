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

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { VisionHistoryName } from '../../../../constants/query/visionHistory';
import { getVisionHistoryKeys } from '../../../../constants/query/visionHistory';
import { visionHistoryClient } from '../../../../services/http/ApiServices';
import { visionHistoryApiNames } from '../../../../constants/data/medicalHistory/visionHistory';
import type {
  NewVisionHistoryModel,
  VisionHistoryAllApiModel,
} from '../../../../model/api/medicalHistory/VisionHistory';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { sortByName } from '../../../../utils/array/array';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: VisionHistoryAllApiModel | undefined;
};

export function useMutationVisionHistoryAdd(
  visionHistory: VisionHistoryName,
  options?: UseMutationOptions<string, ErrorResponse, NewVisionHistoryModel, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewVisionHistoryModel, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const keys = getVisionHistoryKeys()[visionHistory];
  const sectionName = visionHistoryApiNames[visionHistory];
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<string, ErrorResponse, NewVisionHistoryModel, MutateReturnType>({
    ...options,
    mutationKey: keys.add,
    mutationFn: (variables) => visionHistoryClient.postVisionHistory(sectionName, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousObject = queryClient.getQueryData<VisionHistoryAllApiModel>(keys.list);
      const previousList = previousObject?.[visionHistory] ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = {
        ...previousObject,
        [visionHistory]: sortByName([...previousList, newItem], 'name'),
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
        text1: `${variables.name} has been added to your vision history list.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: keys.list });

      const allData = queryClient.getQueryData<VisionHistoryAllApiModel>(keys.list);
      const previousList = allData?.[visionHistory] ?? [];
      const newElem = previousList.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'vision',
        photoType: undefined,
        typeName: sectionName,
      });

      navigation.reset({ routes: [{ name: 'VisionHistory' }] });
    },
  });
}
