import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query/build/modern';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import type { MedicalDevice, MedicalDevicesAllApiModel } from '../../../../model/api/medicalHistory/MedicalDevices';
import { medicalDeviceClient } from '../../../../services/http/ApiServices';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { fetchAttachments } from '../../../../utils/query/queryFetchAttachments';

export const useMutationMedicalDeviceUpdate = (
  currentItem: MedicalDevice | null,
  options?: UseMutationOptions<void, ErrorResponse, MedicalDevice>,
): UseMutationResult<void, ErrorResponse, MedicalDevice> => {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICES_GET];

  return useMutation<void, ErrorResponse, MedicalDevice, { previousObject?: MedicalDevicesAllApiModel }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICE_UPDATE],
    mutationFn: (variables) => medicalDeviceClient.putMedicalDevices(variables.id, variables),
    onMutate: async (values): Promise<{ previousItem?: MedicalDevice; previousObject?: MedicalDevicesAllApiModel }> => {
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousObject = queryClient.getQueryData<MedicalDevicesAllApiModel>(queryListKey);
      const previousList = previousObject?.medicalDevices ?? [];

      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === currentItem?.id);
      newList[itemIndex] = { ...currentItem, ...values };

      queryClient.setQueryData(queryListKey, { medicalDevices: newList });

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'MedicalDevices' }] });
      }

      return { previousObject };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryListKey, context?.previousObject);
      onErrorCommon();
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.name} has been successfully updated`,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryListKey });

      navigation.reset({ routes: [{ name: 'MedicalDevices' }] });
      options?.onSettled?.(data, error, variables, context);

      const allData = queryClient.getQueryData<MedicalDevicesAllApiModel>(queryListKey);
      const previousList = allData?.medicalDevices ?? [];
      const newElem = previousList.find((elem) => elem.id === variables.id);

      fetchAttachments(queryClient, newElem, {
        name: 'medical-history',
        sectionName: 'medical-devices',
        photoType: undefined,
        typeName: undefined,
      });
    },
  });
};
