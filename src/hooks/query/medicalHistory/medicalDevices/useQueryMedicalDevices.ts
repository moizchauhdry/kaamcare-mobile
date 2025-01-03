import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { MedicalDevicesAllApiModel } from '../../../../model/api/medicalHistory/MedicalDevices';
import { medicalDeviceClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';

export const useQueryMedicalDevices = (
  options?: Omit<UseQueryOptions<MedicalDevicesAllApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<MedicalDevicesAllApiModel, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICES_GET],
    queryFn: () =>
      medicalDeviceClient.getMedicalDevicesList().then((res) => ({
        medicalDevices: sortByName(res.medicalDevices, 'name'),
      })),
    ...options,
  });
