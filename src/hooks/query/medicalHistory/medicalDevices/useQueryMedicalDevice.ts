import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { MedicalDevice, MedicalDevicesAllApiModel } from '../../../../model/api/medicalHistory/MedicalDevices';

export const useQueryMedicalDevice = (id?: string, enabled?: boolean): MedicalDevice | null => {
  const queryClient = useQueryClient();

  if (!id || !enabled) {
    return null;
  }

  const data =
    queryClient.getQueryData<MedicalDevicesAllApiModel>([QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICES_GET])
      ?.medicalDevices ?? [];

  return data.find((elem) => elem.id === id) ?? null;
};
