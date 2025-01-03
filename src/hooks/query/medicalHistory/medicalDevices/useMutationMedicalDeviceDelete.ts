import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query/build/modern';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';
import type { MedicalDevicesAllApiModel } from 'model/api/medicalHistory/MedicalDevices';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { medicalDeviceClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';

export const useMutationMedicalDeviceDelete = (
  id: string,
  itemName?: string,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICE_DELETE];
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICES_GET];

  return useMutation<void, ErrorResponse, string, { prevData?: MedicalDevicesAllApiModel }>({
    ...options,
    mutationKey,
    mutationFn: (medicalDeviceId) => medicalDeviceClient.deleteMedicalDevices(medicalDeviceId),
    onMutate: async (variables): Promise<{ prevData?: MedicalDevicesAllApiModel }> => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<MedicalDevicesAllApiModel>(listKey);
      const prevList = prevData?.medicalDevices ?? [];
      const newData = prevList.filter((elem) => elem.id !== id);
      queryClient.setQueryData(listKey, { medicalDevices: newData });
      options?.onMutate?.(variables);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'MedicalDevices' }] });
      }

      return { prevData };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${itemName ?? 'Item'} has been successfully deleted from your list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.prevData);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });

      navigation.reset({ routes: [{ name: 'MedicalDevices' }] });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
