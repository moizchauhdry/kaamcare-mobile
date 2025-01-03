import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { onlineManager } from '@tanstack/react-query/build/modern';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import type { MedicalDevicesAllApiModel, NewMedicalDevice } from '../../../../model/api/medicalHistory/MedicalDevices';
import { medicalDeviceClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { sortByName } from '../../../../utils/array/array';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

type MutateReturnType = {
  previousList: MedicalDevicesAllApiModel | undefined;
};

export const useMutationMedicalDeviceAdd = (
  options?: UseMutationOptions<string, ErrorResponse, NewMedicalDevice, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, NewMedicalDevice, MutateReturnType> => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICES_GET];
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICE_ADD];

  return useMutation<string, ErrorResponse, NewMedicalDevice, MutateReturnType>({
    ...options,
    mutationKey,
    mutationFn: (variables) => medicalDeviceClient.postMedicalDevices(variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousObject = queryClient.getQueryData<MedicalDevicesAllApiModel>(listKey);
      const previousList = previousObject?.medicalDevices ?? [];
      const newItem = { id: uuidv4(), ...variables };
      const newData = {
        medicalDevices: sortByName([...previousList, newItem], 'name'),
      };
      queryClient.setQueryData(listKey, newData);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'MedicalDevices' }] });
      }

      return { previousList: previousObject };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(listKey, context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been added to your medical devices list.`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: listKey });
      navigation.reset({ routes: [{ name: 'MedicalDevices' }] });

      const allData = queryClient.getQueryData<MedicalDevicesAllApiModel>(listKey);
      const previousList = allData?.medicalDevices ?? [];
      const newElem = previousList.find((elem) => elem.id === data);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'medical-devices',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
};
