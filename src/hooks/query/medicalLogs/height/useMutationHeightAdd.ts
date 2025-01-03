import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { HeightLog, HeightLogs, NewHeightLog } from '../../../../model/api/medicalLogs/Height';
import { heightClient } from '../../../../services/http/ApiServices';
import { useLogsMutationAddMethods } from '../useLogsMutationAddMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

export function useMutationHeightAdd(
  redirect?: string,
  redirectScreen?: keyof AddMedicalDataNavigationParamsList,
  days?: number,
  options?: UseMutationOptions<string, ErrorResponse, NewHeightLog, { prevData: HeightLogs; newData: HeightLog }>,
): UseMutationResult<string, ErrorResponse, NewHeightLog, { prevData: HeightLogs; newData: HeightLog }> {
  const mutationMethods = useLogsMutationAddMethods<string, ErrorResponse, NewHeightLog, HeightLog>({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_GET],
      dashboard: [QUERY_KEYS.DASHBOARD_HEIGHT],
    },
    redirectScreen: redirectScreen ?? 'Height',
    type: redirect === 'personal' ? 'heightPersonal' : 'height',
    days,
  });

  return useMutation<string, ErrorResponse, NewHeightLog, { prevData: HeightLogs; newData: HeightLog }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_ADD],
    mutationFn: (variables) => heightClient.postHeight(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `New Height log has been added to your list.`);
    },
  });
}
